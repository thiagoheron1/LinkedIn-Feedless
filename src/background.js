(function () {
  "use strict";

  var ACTIVE_TITLE = "LinkedIn Feedless";
  var INACTIVE_TITLE = "LinkedIn Feedless works on LinkedIn only";
  var CLEANUP_ALARM = "linkedInFeedlessHiddenCleanup";
  var POPUP_PATH = "popup/popup.html";
  var STORAGE_KEYS = {
    hiddenPosts: "hiddenPosts",
    settings: "settings"
  };
  var DEFAULT_SETTINGS = {
    autoHidePromoted: false,
    autoCleanHidden: false,
    darkMode: false,
    hiddenRulesEnabled: true,
    highlightEnabled: true,
    language: "en",
    hiddenRetentionAmount: 7,
    hiddenRetentionUnit: "days"
  };
  var LANGUAGE_VALUES = ["en", "pt-BR", "es", "de", "fr"];

  function normalizeRecords(value) {
    if (Array.isArray(value)) {
      return value.reduce(function (records, item) {
        if (item && item.id) {
          records[item.id] = item;
        }
        return records;
      }, {});
    }

    if (value && typeof value === "object") {
      return Object.keys(value).reduce(function (records, key) {
        var item = value[key];

        if (item && item.id) {
          records[item.id] = item;
        } else {
          records[key] = item;
        }

        return records;
      }, {});
    }

    return {};
  }

  function normalizeRetentionAmount(value) {
    var amount = Number(value);

    if (!Number.isFinite(amount)) {
      return DEFAULT_SETTINGS.hiddenRetentionAmount;
    }

    return Math.min(365, Math.max(1, Math.round(amount)));
  }

  function normalizeRetentionUnit(value) {
    return value === "hours" || value === "days" ? value : DEFAULT_SETTINGS.hiddenRetentionUnit;
  }

  function normalizeLanguage(value) {
    return LANGUAGE_VALUES.includes(value) ? value : DEFAULT_SETTINGS.language;
  }

  function normalizeSettings(value) {
    var settings = Object.assign({}, DEFAULT_SETTINGS, value && typeof value === "object" ? value : {});

    settings.autoHidePromoted = Boolean(settings.autoHidePromoted);
    settings.autoCleanHidden = Boolean(settings.autoCleanHidden);
    settings.darkMode = Boolean(settings.darkMode);
    settings.hiddenRulesEnabled = settings.hiddenRulesEnabled !== false;
    settings.highlightEnabled = settings.highlightEnabled !== false;
    settings.language = normalizeLanguage(settings.language);
    settings.hiddenRetentionAmount = normalizeRetentionAmount(settings.hiddenRetentionAmount);
    settings.hiddenRetentionUnit = normalizeRetentionUnit(settings.hiddenRetentionUnit);
    return settings;
  }

  function getHiddenRetentionMs(settings) {
    if (!settings.autoCleanHidden) {
      return 0;
    }

    return settings.hiddenRetentionAmount * (settings.hiddenRetentionUnit === "hours" ? 3600000 : 86400000);
  }

  function pruneHiddenPosts(records, settings, now) {
    var retentionMs = getHiddenRetentionMs(settings);
    var cutoff = now - retentionMs;
    var next = {};
    var changed = false;

    if (!retentionMs) {
      return null;
    }

    Object.keys(records).forEach(function (id) {
      var post = records[id];
      var hiddenAt = new Date(post && post.hiddenAt).getTime();

      if (Number.isFinite(hiddenAt) && hiddenAt < cutoff) {
        changed = true;
        return;
      }

      next[id] = post;
    });

    return changed ? next : null;
  }

  function cleanupHiddenPosts() {
    chrome.storage.local.get([STORAGE_KEYS.hiddenPosts, STORAGE_KEYS.settings], function (items) {
      var settings;
      var hiddenPosts;
      var nextHiddenPosts;

      if (chrome.runtime.lastError || !items) {
        return;
      }

      settings = normalizeSettings(items[STORAGE_KEYS.settings]);
      hiddenPosts = normalizeRecords(items[STORAGE_KEYS.hiddenPosts]);
      nextHiddenPosts = pruneHiddenPosts(hiddenPosts, settings, Date.now());

      if (nextHiddenPosts) {
        chrome.storage.local.set({ hiddenPosts: nextHiddenPosts });
      }
    });
  }

  function ensureCleanupAlarm() {
    if (!chrome.alarms) {
      return;
    }

    chrome.alarms.create(CLEANUP_ALARM, {
      delayInMinutes: 1,
      periodInMinutes: 60
    });
  }

  function isLinkedInUrl(value) {
    var url;

    try {
      url = new URL(String(value || ""));
    } catch (error) {
      return false;
    }

    return (
      url.protocol === "https:" &&
      url.hostname === "www.linkedin.com" &&
      /^\/feed\/?$/.test(url.pathname)
    );
  }

  function setActionState(tabId, enabled) {
    if (typeof tabId !== "number") {
      return;
    }

    chrome.action.setTitle({
      tabId: tabId,
      title: enabled ? ACTIVE_TITLE : INACTIVE_TITLE
    });
    chrome.action.setPopup({
      tabId: tabId,
      popup: enabled ? POPUP_PATH : ""
    });

    if (enabled) {
      chrome.action.enable(tabId);
      return;
    }

    chrome.action.disable(tabId);
  }

  function updateTab(tabId, knownUrl) {
    if (knownUrl !== undefined) {
      setActionState(tabId, isLinkedInUrl(knownUrl));
      return;
    }

    chrome.tabs.get(tabId, function (tab) {
      if (chrome.runtime.lastError || !tab) {
        return;
      }

      setActionState(tabId, isLinkedInUrl(tab.url));
    });
  }

  function updateActiveTabs(windowId) {
    var query = { active: true };

    if (typeof windowId === "number") {
      query.windowId = windowId;
    } else {
      query.lastFocusedWindow = true;
    }

    chrome.tabs.query(query, function (tabs) {
      if (chrome.runtime.lastError || !tabs) {
        return;
      }

      tabs.forEach(function (tab) {
        updateTab(tab.id, tab.url);
      });
    });
  }

  chrome.runtime.onInstalled.addListener(function () {
    chrome.action.disable();
    ensureCleanupAlarm();
    cleanupHiddenPosts();
    updateActiveTabs();
  });

  chrome.runtime.onStartup.addListener(function () {
    chrome.action.disable();
    ensureCleanupAlarm();
    cleanupHiddenPosts();
    updateActiveTabs();
  });

  if (chrome.alarms && chrome.alarms.onAlarm) {
    chrome.alarms.onAlarm.addListener(function (alarm) {
      if (alarm && alarm.name === CLEANUP_ALARM) {
        cleanupHiddenPosts();
      }
    });
  }

  if (chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener(function (changes, areaName) {
      if (
        areaName === "local" &&
        (changes[STORAGE_KEYS.hiddenPosts] || changes[STORAGE_KEYS.settings])
      ) {
        cleanupHiddenPosts();
      }
    });
  }

  chrome.tabs.onActivated.addListener(function (activeInfo) {
    updateTab(activeInfo.tabId);
  });

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url !== undefined) {
      updateTab(tabId, changeInfo.url);
      return;
    }

    if (tab && tab.active && changeInfo.status === "complete") {
      updateTab(tabId, tab.url);
    }
  });

  if (chrome.windows && chrome.windows.onFocusChanged) {
    chrome.windows.onFocusChanged.addListener(function (windowId) {
      if (windowId === chrome.windows.WINDOW_ID_NONE) {
        return;
      }

      updateActiveTabs(windowId);
    });
  }

  ensureCleanupAlarm();
  cleanupHiddenPosts();
  updateActiveTabs();
})();
