(function () {
  "use strict";

  var previousCleanup = window.__linkedInFeedlessCleanup;
  var CONTENT_SCRIPT_VERSION = "2026-08-21-feed-performance";
  var SCAN_DEBOUNCE_MS = 80;
  var SCAN_INTERVAL_MS = 8000;
  var MIN_SCAN_GAP_MS = 140;
  var SCAN_WATCHDOG_INTERVAL_MS = 5000;
  var SCAN_STALE_AFTER_MS = 16000;
  var MAX_CANDIDATE_POSTS = 90;
  var MAX_COLLECTED_POSTS = 260;
  var MAX_FALLBACK_SELECTOR_VISITS = 700;
  var VIEWPORT_SCAN_MARGIN_PX = 2600;
  var ENHANCEMENT_RETAIN_MARGIN_PX = 7000;
  var STORED_TEXT_LIMIT = 800;
  var STORED_TITLE_LIMIT = 140;
  var STORED_META_LIMIT = 180;
  var HIDDEN_STORED_TEXT_LIMIT = 220;
  var HIDDEN_STORED_TITLE_LIMIT = 110;
  var HIDDEN_STORED_META_LIMIT = 120;

  function isFeedPage() {
    return /^\/feed\/?$/.test(window.location.pathname);
  }

  if (window.__linkedInFeedlessLoadedVersion === CONTENT_SCRIPT_VERSION) {
    if (typeof window.__linkedInFeedlessWake === "function") {
      window.__linkedInFeedlessWake();
    }

    return;
  }

  if (typeof previousCleanup === "function") {
    try {
      previousCleanup();
    } catch (error) {
      console.warn("LinkedIn Feedless could not clean up the previous content script", error);
    }
  }

  window.__linkedInFeedlessLoadedVersion = CONTENT_SCRIPT_VERSION;
  window.__linkedInFeedlessLoaded = true;

  var DEFAULT_FOLDERS = ["Jobs", "Databricks", "Spark", "Data Engineer"];
  var DEFAULT_SUBFOLDERS = {
    Databricks: ["Unity Catalog"],
    "Data Engineer": ["Databricks"]
  };
  var DEFAULT_HIGHLIGHT_COLOR = "#164e63";
  var DEFAULT_HIGHLIGHT_GROUP = "Jobs";
  var DEFAULT_SETTINGS = {
    autoHidePromoted: false,
    autoCleanHidden: false,
    darkMode: false,
    folderSort: "custom",
    hiddenRulesEnabled: true,
    highlightEnabled: true,
    language: "en",
    hiddenRetentionAmount: 7,
    hiddenRetentionUnit: "days"
  };
  var LANGUAGE_VALUES = ["en", "pt-BR", "es", "de", "fr"];
  var MESSAGES = {
    en: {
      alreadySaved: "Already saved",
      countdownLabel: "Seconds before this post is hidden",
      couldNot: "Could not",
      hide: "Hide",
      hidePost: "hide post",
      hideTitle: "Hide this post if it appears again",
      hideAgain: "Hide again",
      highlightMatched: "Highlight matched: ",
      matched: "Matched: ",
      newFolder: "+ New folder",
      newSubfolder: "+ New subfolder",
      postHidden: "Post hidden",
      hiddenNotice: "LinkedIn Feedless: post hidden",
      postRemovedFromSaved: "Removed from saved posts",
      postSaved: "Post saved",
      save: "Save",
      savePost: "save post",
      saved: "Saved",
      savedPrefix: "Saved: ",
      saveTitle: "Save this post to a folder",
      savedTitle: "Remove this post from saved posts",
      saveTo: "Save to",
      reveal: "Reveal",
      undo: "Undo"
    },
    "pt-BR": {
      alreadySaved: "Ja salvo",
      countdownLabel: "Segundos antes deste post ser ocultado",
      couldNot: "Nao foi possivel",
      hide: "Ocultar",
      hidePost: "ocultar post",
      hideTitle: "Ocultar este post se ele aparecer novamente",
      hideAgain: "Ocultar novamente",
      highlightMatched: "Destaque encontrado: ",
      matched: "Encontrado: ",
      newFolder: "+ Nova pasta",
      newSubfolder: "+ Nova subpasta",
      postHidden: "Post oculto",
      hiddenNotice: "LinkedIn Feedless: post oculto",
      postRemovedFromSaved: "Removido dos posts salvos",
      postSaved: "Post salvo",
      save: "Salvar",
      savePost: "salvar post",
      saved: "Salvo",
      savedPrefix: "Salvo: ",
      saveTitle: "Salvar este post em uma pasta",
      savedTitle: "Remover este post dos posts salvos",
      saveTo: "Salvar em",
      reveal: "Revelar",
      undo: "Desfazer"
    },
    es: {
      alreadySaved: "Ya guardado",
      countdownLabel: "Segundos antes de ocultar esta publicacion",
      couldNot: "No se pudo",
      hide: "Ocultar",
      hidePost: "ocultar publicacion",
      hideTitle: "Ocultar esta publicacion si aparece otra vez",
      hideAgain: "Ocultar de nuevo",
      highlightMatched: "Destacado encontrado: ",
      matched: "Coincide: ",
      newFolder: "+ Nueva carpeta",
      newSubfolder: "+ Nueva subcarpeta",
      postHidden: "Publicacion oculta",
      hiddenNotice: "LinkedIn Feedless: publicacion oculta",
      postRemovedFromSaved: "Eliminada de publicaciones guardadas",
      postSaved: "Publicacion guardada",
      save: "Guardar",
      savePost: "guardar publicacion",
      saved: "Guardado",
      savedPrefix: "Guardado: ",
      saveTitle: "Guardar esta publicacion en una carpeta",
      savedTitle: "Eliminar esta publicacion de las guardadas",
      saveTo: "Guardar en",
      reveal: "Mostrar",
      undo: "Deshacer"
    },
    de: {
      alreadySaved: "Schon gespeichert",
      countdownLabel: "Sekunden bis dieser Beitrag ausgeblendet wird",
      couldNot: "Konnte nicht",
      hide: "Ausblenden",
      hidePost: "Beitrag ausblenden",
      hideTitle: "Diesen Beitrag ausblenden, wenn er erneut erscheint",
      hideAgain: "Wieder ausblenden",
      highlightMatched: "Hervorhebung gefunden: ",
      matched: "Treffer: ",
      newFolder: "+ Neuer Ordner",
      newSubfolder: "+ Neuer Unterordner",
      postHidden: "Beitrag ausgeblendet",
      hiddenNotice: "LinkedIn Feedless: Beitrag ausgeblendet",
      postRemovedFromSaved: "Aus gespeicherten Beitraegen entfernt",
      postSaved: "Beitrag gespeichert",
      save: "Speichern",
      savePost: "Beitrag speichern",
      saved: "Gespeichert",
      savedPrefix: "Gespeichert: ",
      saveTitle: "Diesen Beitrag in einem Ordner speichern",
      savedTitle: "Diesen Beitrag aus gespeicherten Beitraegen entfernen",
      saveTo: "Speichern in",
      reveal: "Anzeigen",
      undo: "Rueckgaengig"
    },
    fr: {
      alreadySaved: "Deja sauvegarde",
      countdownLabel: "Secondes avant que ce post soit masque",
      couldNot: "Impossible de",
      hide: "Masquer",
      hidePost: "masquer le post",
      hideTitle: "Masquer ce post s'il reapparait",
      hideAgain: "Masquer a nouveau",
      highlightMatched: "Surbrillance trouvee: ",
      matched: "Trouve: ",
      newFolder: "+ Nouveau dossier",
      newSubfolder: "+ Nouveau sous-dossier",
      postHidden: "Post masque",
      hiddenNotice: "LinkedIn Feedless : post masque",
      postRemovedFromSaved: "Retire des posts sauvegardes",
      postSaved: "Post sauvegarde",
      save: "Sauvegarder",
      savePost: "sauvegarder le post",
      saved: "Sauvegarde",
      savedPrefix: "Sauvegarde: ",
      saveTitle: "Sauvegarder ce post dans un dossier",
      savedTitle: "Retirer ce post des posts sauvegardes",
      saveTo: "Sauvegarder dans",
      reveal: "Afficher",
      undo: "Annuler"
    }
  };
  var STORAGE_KEYS = {
    analytics: "analytics",
    folders: "folders",
    hiddenPosts: "hiddenPosts",
    hiddenRules: "hiddenRules",
    highlightGroups: "highlightGroups",
    highlightRules: "highlightRules",
    savedPosts: "savedPosts",
    settings: "settings",
    subfolders: "subfolders"
  };
  var hasBrowserPromises =
    typeof browser !== "undefined" && browser.storage && browser.storage.local;
  var storageApi = hasBrowserPromises ? browser.storage.local : chrome.storage.local;

  var state = {
    folders: DEFAULT_FOLDERS.slice(),
    hiddenPosts: {},
    analytics: { hiddenPostsTotal: 0, promotedPostsHiddenTotal: 0, highlightPostsByGroup: {} },
    hiddenRules: [],
    highlightGroups: [],
    highlightRules: [],
    savedPosts: {},
    settings: Object.assign({}, DEFAULT_SETTINGS),
    subfolders: {},
    scanInProgress: false,
    pendingScan: false,
    scanTimer: 0,
    scanInterval: 0,
    scanWatchdogInterval: 0,
    lastScanAt: 0,
    lastScanCompletedAt: 0,
    hiddenPostsSaveTimer: 0,
    analyticsSaveTimer: 0,
    scanBurstTimers: [],
    observer: null,
    observerTarget: null,
    routeWatchInterval: 0,
    lastLocationHref: "",
    storageChangeHandler: null,
    runtimeMessageHandler: null,
    documentClickHandler: null,
    visibilityChangeHandler: null,
    pageShowHandler: null,
    focusHandler: null,
    scrollHandler: null,
    disposed: false,
    undoTimers: {}
  };

  function storageGet(keys) {
    if (hasBrowserPromises) {
      return storageApi.get(keys).then(function (items) {
        return items || {};
      });
    }

    return new Promise(function (resolve, reject) {
      try {
        storageApi.get(keys, function (items) {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }

          resolve(items || {});
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function storageSet(items) {
    if (hasBrowserPromises) {
      return storageApi.set(items);
    }

    return new Promise(function (resolve, reject) {
      try {
        storageApi.set(items, function () {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }

          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function startWithDefaultState(error) {
    console.warn("LinkedIn Feedless could not load saved settings; starting with defaults", error);
    applyTheme();
  }

  function reportActionError(toolbar, action, error) {
    console.warn("LinkedIn Feedless could not " + action, error);

    if (toolbar) {
      showToolbarNotice(toolbar, t("couldNot") + " " + action);
    }
  }

  function safeStorageSet(items, warning) {
    return storageSet(items).catch(function (error) {
      console.warn(warning, error);
    });
  }

  function trimForStorage(value, limit) {
    return cleanText(value).slice(0, limit);
  }

  function compactStoredRecord(record, fallbackId) {
    var source = record && typeof record === "object" ? record : {};
    var compact = Object.assign({}, source);

    compact.id = cleanText(compact.id) || cleanText(fallbackId);

    if (compact.author) {
      compact.author = trimForStorage(compact.author, STORED_META_LIMIT);
    }

    if (compact.company) {
      compact.company = trimForStorage(compact.company, STORED_META_LIMIT);
    }

    if (compact.title) {
      compact.title = trimForStorage(compact.title, STORED_TITLE_LIMIT);
    }

    if (compact.text) {
      compact.text = trimForStorage(compact.text, STORED_TEXT_LIMIT);
    }

    return compact;
  }

  function compactHiddenRecord(record, fallbackId) {
    var compact = compactStoredRecord(record, fallbackId);

    if (compact.author) {
      compact.author = trimForStorage(compact.author, HIDDEN_STORED_META_LIMIT);
    }

    if (compact.company) {
      compact.company = trimForStorage(compact.company, HIDDEN_STORED_META_LIMIT);
    }

    if (compact.title) {
      compact.title = trimForStorage(compact.title, HIDDEN_STORED_TITLE_LIMIT);
    }

    if (compact.text) {
      compact.text = trimForStorage(compact.text, HIDDEN_STORED_TEXT_LIMIT);
    }

    return compact;
  }

  function compactSavedRecord(record, fallbackId) {
    var source = record && typeof record === "object" ? record : {};

    return {
      id: cleanText(source.id) || cleanText(fallbackId),
      url: cleanText(source.url),
      folder: cleanText(source.folder),
      subfolder: cleanText(source.subfolder),
      savedAt: cleanText(source.savedAt) || new Date().toISOString()
    };
  }

  function normalizeSavedRecords(value) {
    var records = normalizeRecords(value);

    Object.keys(records).forEach(function (id) {
      records[id] = compactSavedRecord(records[id], id);
    });

    return records;
  }

  function normalizeRecords(value) {
    if (Array.isArray(value)) {
      return value.reduce(function (records, item) {
        if (item && item.id) {
          records[item.id] = compactStoredRecord(item, item.id);
        }
        return records;
      }, {});
    }

    if (value && typeof value === "object") {
      return Object.keys(value).reduce(function (records, key) {
        var item = value[key];

        if (item && item.id) {
          records[item.id] = compactStoredRecord(item, item.id);
        } else {
          records[key] = compactStoredRecord(item, key);
        }

        return records;
      }, {});
    }

    return {};
  }

  function normalizeHiddenRecords(value) {
    var records = normalizeRecords(value);

    Object.keys(records).forEach(function (id) {
      records[id] = compactHiddenRecord(records[id], id);
    });

    return records;
  }

  function normalizeFolders(value) {
    var names = Array.isArray(value) ? value : DEFAULT_FOLDERS;
    var clean = names
      .map(function (name) {
        return String(name || "").trim();
      })
      .filter(Boolean);

    return Array.from(new Set(clean));
  }

  function normalizeSubfolders(value, folders, savedPosts) {
    var hasStoredSubfolders = value && typeof value === "object" && !Array.isArray(value);
    var source = hasStoredSubfolders ? value : {};
    var records = {};

    function add(folder, subfolder) {
      var folderName = cleanText(folder);
      var subfolderName = cleanText(subfolder);

      if (!folderName) {
        return;
      }

      if (!folders.includes(folderName)) {
        folders.push(folderName);
      }

      if (!records[folderName]) {
        records[folderName] = [];
      }

      if (subfolderName && !records[folderName].includes(subfolderName)) {
        records[folderName].push(subfolderName);
      }
    }

    folders.forEach(function (folder) {
      add(folder, "");
    });

    if (!hasStoredSubfolders) {
      Object.keys(DEFAULT_SUBFOLDERS).forEach(function (folder) {
        DEFAULT_SUBFOLDERS[folder].forEach(function (subfolder) {
          add(folder, subfolder);
        });
      });
    }

    Object.keys(source).forEach(function (folder) {
      var subfolders = Array.isArray(source[folder]) ? source[folder] : [];

      add(folder, "");
      subfolders.forEach(function (subfolder) {
        add(folder, subfolder);
      });
    });

    Object.values(savedPosts || {}).forEach(function (post) {
      add(post && post.folder, post && post.subfolder);
    });

    folders.forEach(function (folder) {
      add(folder, "");
    });

    return records;
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

  function normalizeFolderSort(value) {
    return value === "nameAsc" || value === "nameDesc" ? value : DEFAULT_SETTINGS.folderSort;
  }

  function normalizeLanguage(value) {
    return LANGUAGE_VALUES.includes(value) ? value : DEFAULT_SETTINGS.language;
  }

  function t(key) {
    var language = normalizeLanguage(state.settings && state.settings.language);
    var messages = MESSAGES[language] || MESSAGES.en;

    return messages[key] || MESSAGES.en[key] || key;
  }

  function normalizeSettings(value) {
    var settings = Object.assign({}, DEFAULT_SETTINGS, value && typeof value === "object" ? value : {});

    settings.autoHidePromoted = Boolean(settings.autoHidePromoted);
    settings.autoCleanHidden = Boolean(settings.autoCleanHidden);
    settings.darkMode = Boolean(settings.darkMode);
    settings.folderSort = normalizeFolderSort(settings.folderSort);
    settings.hiddenRulesEnabled = settings.hiddenRulesEnabled !== false;
    settings.highlightEnabled = settings.highlightEnabled !== false;
    settings.language = normalizeLanguage(settings.language);
    settings.hiddenRetentionAmount = normalizeRetentionAmount(settings.hiddenRetentionAmount);
    settings.hiddenRetentionUnit = normalizeRetentionUnit(settings.hiddenRetentionUnit);
    return settings;
  }

  function normalizeAnalytics(value) {
    var source = value && typeof value === "object" ? value : {};
    var groups = source.highlightPostsByGroup && typeof source.highlightPostsByGroup === "object"
      ? source.highlightPostsByGroup
      : {};
    var normalizedGroups = {};

    Object.keys(groups).forEach(function (groupId) {
      normalizedGroups[groupId] = Math.max(0, Number(groups[groupId]) || 0);
    });

    return {
      hiddenPostsTotal: Math.max(0, Number(source.hiddenPostsTotal) || 0),
      promotedPostsHiddenTotal: Math.max(0, Number(source.promotedPostsHiddenTotal) || 0),
      highlightPostsByGroup: normalizedGroups
    };
  }

  function scheduleAnalyticsSave() {
    window.clearTimeout(state.analyticsSaveTimer);
    state.analyticsSaveTimer = window.setTimeout(function () {
      state.analyticsSaveTimer = 0;
      safeStorageSet({ analytics: state.analytics }, "LinkedIn Feedless failed to save analytics");
    }, 250);
  }

  function recordAnalytics(type, groupId) {
    if (type === "hidden") {
      state.analytics.hiddenPostsTotal += 1;
    } else if (type === "promoted") {
      state.analytics.promotedPostsHiddenTotal += 1;
    } else if (type === "highlight" && groupId) {
      state.analytics.highlightPostsByGroup[groupId] =
        (state.analytics.highlightPostsByGroup[groupId] || 0) + 1;
    }
    scheduleAnalyticsSave();
  }

  function getHiddenRetentionMs(settings) {
    if (!settings.autoCleanHidden) {
      return 0;
    }

    return settings.hiddenRetentionAmount * (settings.hiddenRetentionUnit === "hours" ? 3600000 : 86400000);
  }

  function pruneExpiredHiddenPosts(now) {
    var retentionMs = getHiddenRetentionMs(state.settings);
    var cutoff = now - retentionMs;
    var next = {};
    var changed = false;

    if (!retentionMs) {
      return false;
    }

    Object.keys(state.hiddenPosts).forEach(function (id) {
      var post = state.hiddenPosts[id];
      var hiddenAt = new Date(post && post.hiddenAt).getTime();

      if (Number.isFinite(hiddenAt) && hiddenAt < cutoff) {
        changed = true;
        return;
      }

      next[id] = post;
    });

    if (changed) {
      state.hiddenPosts = next;
    }

    return changed;
  }

  function normalizeColor(value) {
    var color = cleanText(value).toLowerCase();

    return /^#[0-9a-f]{6}$/i.test(color) ? color : DEFAULT_HIGHLIGHT_COLOR;
  }

  function normalizeGroupName(value) {
    return cleanText(value) || DEFAULT_HIGHLIGHT_GROUP;
  }

  function createHighlightGroupId(name) {
    var key = normalizeLabel(name).replace(/\s+/g, "-").slice(0, 60);

    return "highlight-group-" + (key || normalizeLabel(DEFAULT_HIGHLIGHT_GROUP));
  }

  function isLegacyGeneralGroupName(value) {
    return /^general(?: \d+)?$/.test(normalizeLabel(value));
  }

  function normalizeHighlightRules(value) {
    var source = Array.isArray(value) ? value : [];
    var seen = {};
    var groupColors = {};

    return source.reduce(function (rules, item, index) {
      var type = cleanText(item && item.type);
      var text = cleanText(item && item.value);
      var normalized = normalizeLabel(text);
      var color = normalizeColor(item && item.color);
      var rawGroupName = cleanText(item && (item.groupName || item.group || item.category));
      var groupName = normalizeGroupName(rawGroupName);
      var groupId;

      if (!text || !normalized || seen[normalized]) {
        return rules;
      }

      if (!rawGroupName || isLegacyGeneralGroupName(groupName)) {
        groupName = DEFAULT_HIGHLIGHT_GROUP;
      }

      groupId = cleanText(item && item.groupId) || createHighlightGroupId(groupName);
      if (isLegacyGeneralGroupName(groupId.replace(/^highlight-group-/, "").replace(/-/g, " "))) {
        groupId = createHighlightGroupId(DEFAULT_HIGHLIGHT_GROUP);
      }
      if (!groupColors[groupId]) {
        groupColors[groupId] = color;
      }

      seen[normalized] = true;
      rules.push({
        id:
          cleanText(item && item.id) ||
          "highlight-" + simpleHash(type + "|" + text + "|" + color + "|" + index),
        type: "text",
        value: text,
        groupId: groupId,
        groupName: groupName,
        color: groupColors[groupId],
        createdAt: cleanText(item && item.createdAt)
      });

      return rules;
    }, []);
  }

  function getRuleGroupId(rule) {
    return cleanText(rule && rule.groupId) || createHighlightGroupId(rule && rule.groupName);
  }

  function getRuleGroupName(rule) {
    return normalizeGroupName(rule && rule.groupName);
  }

  function normalizeHighlightGroups(value, rules) {
    var source = Array.isArray(value) ? value : [];
    var seen = {};
    var groups = [];

    function addGroup(item) {
      var rawName = cleanText(item && (item.name || item.groupName || item.group || item.category));
      var name = normalizeGroupName(rawName);
      var id;
      var normalizedName;

      if (!rawName || isLegacyGeneralGroupName(name)) {
        name = DEFAULT_HIGHLIGHT_GROUP;
      }

      normalizedName = normalizeLabel(name);
      if (!normalizedName || seen[normalizedName]) {
        return;
      }

      id = cleanText(item && item.id) || createHighlightGroupId(name);
      if (isLegacyGeneralGroupName(id.replace(/^highlight-group-/, "").replace(/-/g, " "))) {
        id = createHighlightGroupId(DEFAULT_HIGHLIGHT_GROUP);
      }

      seen[normalizedName] = true;
      groups.push({
        id: id,
        name: name,
        color: normalizeColor(item && item.color),
        enabled: !item || item.enabled !== false,
        createdAt: cleanText(item && item.createdAt)
      });
    }

    source.forEach(addGroup);
    (Array.isArray(rules) ? rules : []).forEach(function (rule) {
      addGroup({
        id: getRuleGroupId(rule),
        name: getRuleGroupName(rule),
        color: rule && rule.color,
        createdAt: rule && rule.createdAt
      });
    });

    return groups;
  }

  function getPriorityHighlightRules() {
    var usedRuleIds = {};
    var rules = [];

    state.highlightGroups.forEach(function (group) {
      if (group.enabled === false) {
        return;
      }

      state.highlightRules.forEach(function (rule) {
        if (usedRuleIds[rule.id] || getRuleGroupId(rule) !== group.id) {
          return;
        }

        usedRuleIds[rule.id] = true;
        rules.push(rule);
      });
    });

    state.highlightRules.forEach(function (rule) {
      var group = state.highlightGroups.find(function (item) {
        return item.id === getRuleGroupId(rule);
      });

      if (usedRuleIds[rule.id] || (group && group.enabled === false)) {
        return;
      }

      usedRuleIds[rule.id] = true;
      rules.push(rule);
    });

    return rules;
  }

  function normalizeHiddenRules(value) {
    var source = Array.isArray(value) ? value : [];
    var seen = {};

    return source.reduce(function (rules, item, index) {
      var text = cleanText(item && item.value);
      var normalized = normalizeLabel(text);

      if (!text || !normalized || seen[normalized]) {
        return rules;
      }

      seen[normalized] = true;
      rules.push({
        id: cleanText(item && item.id) || "hidden-rule-" + simpleHash(text + "|" + index),
        value: text,
        createdAt: cleanText(item && item.createdAt)
      });

      return rules;
    }, []);
  }

  function compareFolderNames(left, right) {
    return cleanText(left).localeCompare(cleanText(right), undefined, {
      numeric: true,
      sensitivity: "base"
    });
  }

  function getOrderedFolders() {
    var folders = state.folders.slice();
    var sort = normalizeFolderSort(state.settings.folderSort);

    if (sort === "nameAsc") {
      return folders.sort(compareFolderNames);
    }

    if (sort === "nameDesc") {
      return folders.sort(function (left, right) {
        return compareFolderNames(right, left);
      });
    }

    return folders;
  }

  function applyTheme() {
    document.documentElement.classList.toggle("lf-theme-dark", Boolean(state.settings.darkMode));
  }

  async function loadState() {
    var items = await storageGet([
      STORAGE_KEYS.analytics,
      STORAGE_KEYS.folders,
      STORAGE_KEYS.hiddenPosts,
      STORAGE_KEYS.hiddenRules,
      STORAGE_KEYS.highlightGroups,
      STORAGE_KEYS.highlightRules,
      STORAGE_KEYS.savedPosts,
      STORAGE_KEYS.settings,
      STORAGE_KEYS.subfolders
    ]);

    state.analytics = normalizeAnalytics(items[STORAGE_KEYS.analytics]);
    state.folders = normalizeFolders(items[STORAGE_KEYS.folders]);
    state.hiddenPosts = normalizeHiddenRecords(items[STORAGE_KEYS.hiddenPosts]);
    state.hiddenRules = normalizeHiddenRules(items[STORAGE_KEYS.hiddenRules]);
    state.highlightRules = normalizeHighlightRules(items[STORAGE_KEYS.highlightRules]);
    state.highlightGroups = normalizeHighlightGroups(items[STORAGE_KEYS.highlightGroups], state.highlightRules);
    state.savedPosts = normalizeSavedRecords(items[STORAGE_KEYS.savedPosts]);
    state.settings = normalizeSettings(items[STORAGE_KEYS.settings]);
    applyTheme();
    state.subfolders = normalizeSubfolders(
      items[STORAGE_KEYS.subfolders],
      state.folders,
      state.savedPosts
    );
    if (pruneExpiredHiddenPosts(Date.now())) {
      await safeStorageSet(
        { hiddenPosts: state.hiddenPosts },
        "LinkedIn Feedless failed to save pruned hidden posts"
      );
    }
  }

  function cleanText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeLabel(value) {
    return cleanText(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}+#]+/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getNodeText(node) {
    if (!(node instanceof HTMLElement)) {
      return "";
    }

    var text = cleanText(node && (node.innerText || node.textContent));

    getPostToolbars(node).forEach(function (toolbar) {
      text = text.replace(cleanText(toolbar.innerText || toolbar.textContent), " ");
    });

    return cleanText(text);
  }

  function simpleHash(value) {
    var hash = 2166136261;
    var text = String(value || "");

    for (var index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }

    return (hash >>> 0).toString(36);
  }

  function safeDecode(value) {
    var text = String(value || "");

    try {
      return decodeURIComponent(text);
    } catch (error) {
      return text;
    }
  }

  function normalizeUrn(value) {
    var urnMatch = String(value || "").match(/^urn:li:(activity|share|ugcPost):([0-9]+)$/i);
    var type;

    if (!urnMatch) {
      return "";
    }

    type = urnMatch[1].toLowerCase() === "ugcpost" ? "ugcPost" : urnMatch[1].toLowerCase();
    return "urn:li:" + type + ":" + urnMatch[2];
  }

  function normalizeCommentUrn(value) {
    var raw = safeDecode(value);
    var urnMatch = raw.match(
      /urn:li:comment:\(\s*(urn:li:(?:activity|share|ugcPost):[0-9]+)\s*,\s*([0-9]+)\s*\)/i
    );
    var pairMatch;
    var parent;

    if (urnMatch) {
      parent = normalizeUrn(urnMatch[1]);
      return parent ? "urn:li:comment:(" + parent + "," + urnMatch[2] + ")" : "";
    }

    pairMatch = raw.match(
      /commentId[=:(\s'"]+([0-9]{10,})[\s\S]{0,260}?thread[=:(\s'"]+(urn:li:(?:activity|share|ugcPost):[0-9]+)/i
    );
    if (pairMatch) {
      parent = normalizeUrn(pairMatch[2]);
      return parent ? "urn:li:comment:(" + parent + "," + pairMatch[1] + ")" : "";
    }

    return "";
  }

  function getCommentParentPostId(value) {
    var commentId = normalizeCommentUrn(value);
    var match = commentId.match(/urn:li:comment:\((urn:li:(?:activity|share|ugcPost):[0-9]+),[0-9]+\)/i);

    return match ? normalizeUrn(match[1]) : "";
  }

  function canonicalizeId(value) {
    var raw = safeDecode(value);
    var commentUrn = normalizeCommentUrn(raw);
    var urnMatch = raw.match(/urn:li:(activity|share|ugcPost):[0-9]+/i);
    var updateMatch;
    var typedPatterns;
    var patternIndex;
    var typedMatch;
    var activityMatch;

    if (commentUrn) {
      return commentUrn;
    }

    if (urnMatch) {
      return normalizeUrn(urnMatch[0]);
    }

    updateMatch = raw.match(/\/feed\/update\/([^/?#]+)/i);
    if (updateMatch) {
      return canonicalizeId(updateMatch[1].replace(/\/$/, ""));
    }

    typedPatterns = [
      {
        type: "activity",
        regex: /(?:activityId|activityUrn|activity)[=:(\s'"]+(?:urn:li:activity:)?([0-9]{10,})/i
      },
      {
        type: "share",
        regex: /(?:shareId|shareUrn|share)[=:(\s'"]+(?:urn:li:share:)?([0-9]{10,})/i
      },
      {
        type: "ugcPost",
        regex: /(?:ugcPostId|ugcPostUrn|ugcPost)[=:(\s'"]+(?:urn:li:ugcPost:)?([0-9]{10,})/i
      }
    ];

    for (patternIndex = 0; patternIndex < typedPatterns.length; patternIndex += 1) {
      typedMatch = raw.match(typedPatterns[patternIndex].regex);
      if (typedMatch) {
        return "urn:li:" + typedPatterns[patternIndex].type + ":" + typedMatch[1];
      }
    }

    activityMatch = raw.match(/(?:^|[\/_-])activity[-_:]([0-9]{10,})/i);
    if (activityMatch) {
      return "urn:li:activity:" + activityMatch[1];
    }

    return "";
  }

  function buildPostUrl(id) {
    var postId = normalizeUrn(id);
    var commentId = normalizeCommentUrn(id);
    var commentParentMatch;

    if (commentId) {
      commentParentMatch = commentId.match(/urn:li:comment:\((urn:li:(?:activity|share|ugcPost):[0-9]+),[0-9]+\)/i);
      return commentParentMatch ? buildPostUrl(commentParentMatch[1]) : "";
    }

    return postId ? "https://www.linkedin.com/feed/update/" + postId + "/" : "";
  }

  function isPostPermalink(value) {
    return Boolean(buildPostUrl(canonicalizeId(value)));
  }

  function normalizePostUrl(value) {
    return buildPostUrl(canonicalizeId(value));
  }

  function findPostLink(post) {
    return Array.prototype.slice.call(post.querySelectorAll("a[href]")).find(function (link) {
      return isPostPermalink(link.href);
    });
  }

  function isFeedPostHeading(node) {
    return node && node.matches("h2") && normalizeLabel(node.textContent).includes("feed post");
  }

  function getFeedPostHeadingCount(node) {
    if (!(node instanceof HTMLElement)) {
      return 0;
    }

    return Array.prototype.filter.call(node.querySelectorAll("h2"), isFeedPostHeading).length;
  }

  function isFeedPostContainer(node) {
    if (!(node instanceof HTMLElement)) {
      return false;
    }

    return Array.prototype.some.call(node.children, isFeedPostHeading) && getFeedPostHeadingCount(node) === 1;
  }

  function isPromotedLabel(node) {
    var text = normalizeLabel(node && node.textContent);

    if (!text || node.closest(".lf-toolbar, .lf-save-menu, [data-testid='expandable-text-box']")) {
      return false;
    }

    return ["promoted", "sponsored", "promovido", "patrocinado"].includes(text);
  }

  function isPromotedPost(post) {
    var candidates;

    if (
      post.querySelector(
        '[aria-label="Promoted"], [aria-label="Sponsored"], [aria-label="Promovido"], [aria-label="Patrocinado"]'
      )
    ) {
      return true;
    }

    candidates = post.querySelectorAll("span, p");
    return Array.prototype.some.call(candidates, function (node, index) {
      return index < 140 && isPromotedLabel(node);
    });
  }

  function hasOverflowIcon(button) {
    var icon = button.querySelector("svg");
    var iconName = cleanText(
      icon &&
        [
          icon.getAttribute("data-test-icon"),
          icon.getAttribute("id"),
          icon.getAttribute("aria-label")
        ].join(" ")
    ).toLowerCase();
    var buttonText = cleanText(button.innerText || button.textContent);

    return (
      iconName.includes("overflow") ||
      iconName.includes("ellipsis") ||
      buttonText === "..." ||
      buttonText.charCodeAt(0) === 8230
    );
  }

  function findPostMenuButton(post) {
    var controlButton = post.querySelector(
      '[class*="feed-shared-control-menu"] button, [class*="update-components-control-menu"] button, [class*="control-menu"] button'
    );

    if (controlButton && !controlButton.closest(".lf-toolbar")) {
      return controlButton;
    }

    var buttons = Array.prototype.slice.call(
      post.querySelectorAll('button[aria-label], [role="button"][aria-label]')
    );

    return buttons.find(function (button) {
      var label = normalizeLabel(button.getAttribute("aria-label"));
      var looksLikePostMenu =
        /open control menu|control menu|more actions|more options|open options|mais acoes|mais opcoes|abrir menu|abrir opcoes/i.test(
          label
        );

      return !button.closest(".lf-toolbar") && (looksLikePostMenu || hasOverflowIcon(button));
    });
  }

  function getPostText(post) {
    var selectors = [
      '[class*="update-components-text"]',
      '[class*="feed-shared-update-v2__description"]',
      '[class*="feed-shared-text"]',
      ".break-words"
    ];
    var parts = [];

    selectors.forEach(function (selector) {
      post.querySelectorAll(selector).forEach(function (node) {
        var text = cleanText(node.innerText || node.textContent);
        if (text && !parts.includes(text)) {
          parts.push(text);
        }
      });
    });

    if (parts.join(" ").length < 30) {
      parts.push(getNodeText(post));
    }

    return cleanText(parts.join(" ")).slice(0, 2000);
  }

  function getAuthor(post) {
    var selectors = [
      '[class*="update-components-actor__name"]',
      '[class*="feed-shared-actor__name"]',
      '[aria-label*="Open control menu for post by"]',
      'a[href*="/in/"] span[aria-hidden="true"]',
      'a[href*="/company/"] span[aria-hidden="true"]'
    ];

    for (var index = 0; index < selectors.length; index += 1) {
      var node = post.querySelector(selectors[index]);
      var text = cleanText(node && (node.innerText || node.textContent));
      var labelMatch = cleanText(node && node.getAttribute("aria-label")).match(
        /post by\s+(.+)$/i
      );

      if (labelMatch && labelMatch[1]) {
        return labelMatch[1].slice(0, 140);
      }

      if (text) {
        return text.slice(0, 140);
      }
    }

    return getNodeText(post).split(" ").slice(0, 10).join(" ");
  }

  function getCompanyNames(post) {
    var names = [];

    function addName(value) {
      var text = cleanText(value);

      if (text && !names.includes(text)) {
        names.push(text.slice(0, 140));
      }
    }

    post.querySelectorAll('a[href*="/company/"]').forEach(function (link) {
      var companyIndex;
      var pathParts;
      var slug;

      addName(link.innerText || link.textContent);

      try {
        pathParts = new URL(link.href).pathname.split("/").filter(Boolean);
        companyIndex = pathParts.indexOf("company");
        slug = companyIndex >= 0 ? pathParts[companyIndex + 1] : "";
        if (slug) {
          addName(slug.replace(/-/g, " "));
        }
      } catch (error) {
        // Ignore malformed LinkedIn hrefs.
      }
    });

    return names.slice(0, 10);
  }

  function getPostUrl(post, id) {
    var link = findPostLink(post);
    var linkUrl;
    var idUrl;

    if (link && link.href) {
      linkUrl = normalizePostUrl(link.href);
      if (linkUrl) {
        return linkUrl;
      }
    }

    idUrl = buildPostUrl(id);
    if (idUrl) {
      return idUrl;
    }

    return isPostPermalink(window.location.href) ? normalizePostUrl(window.location.href) : "";
  }

  function getPostId(post) {
    var candidates = [post].concat(
      Array.prototype.slice.call(
        post.querySelectorAll(
          "[id], [componentkey], [data-urn], [data-id], [data-activity-urn], [data-chameleon-result-urn]"
        )
      )
    );
    var attrs = [
      "data-urn",
      "data-id",
      "data-activity-urn",
      "data-chameleon-result-urn",
      "id",
      "componentkey"
    ];

    for (var nodeIndex = 0; nodeIndex < candidates.length; nodeIndex += 1) {
      for (var attrIndex = 0; attrIndex < attrs.length; attrIndex += 1) {
        var value = candidates[nodeIndex].getAttribute(attrs[attrIndex]);
        var id = canonicalizeId(value);

        if (id && /urn:li:|activity|share/i.test(id)) {
          return id;
        }
      }
    }

    var link = findPostLink(post);
    if (link && link.href) {
      return canonicalizeId(link.href);
    }

    return "fallback:" + simpleHash(getAuthor(post) + "|" + getPostText(post));
  }

  function readPostInfo(post) {
    var id = getPostId(post);
    var text = getPostText(post);
    var author = getAuthor(post);

    return {
      id: id,
      author: author || "LinkedIn post",
      company: getCompanyNames(post).join(", "),
      text: text,
      title: text ? text.slice(0, 140) : "LinkedIn post",
      url: getPostUrl(post, id)
    };
  }

  function isLikelyPost(node) {
    if (!(node instanceof HTMLElement)) {
      return false;
    }

    if (node.closest(".lf-save-menu")) {
      return false;
    }

    if (getFeedPostHeadingCount(node) > 1) {
      return false;
    }

    if (
      node.matches(
        'main article, main [data-urn*="urn:li:"], main [data-id*="urn:li:"], main [data-activity-urn], main div.feed-shared-update-v2'
      )
    ) {
      return true;
    }

    if (isFeedPostContainer(node) && findPostMenuButton(node)) {
      return true;
    }

    var text = getNodeText(node);

    return text.length >= 30 && Boolean(findPostLink(node) || findPostMenuButton(node));
  }

  function getCommentContainer(node) {
    var replaceable;

    if (!(node instanceof HTMLElement)) {
      return null;
    }

    replaceable = node.closest('[componentkey^="replaceableComment_urn:li:comment"]');
    if (replaceable) {
      return replaceable;
    }

    return node.closest(
      '[componentkey*="urn:li:comment:"], [componentkey*="CommentUrn(commentId"], [id*="CommentUrn(commentId"]'
    );
  }

  function isCommentContainer(node) {
    return (
      node instanceof HTMLElement &&
      node.matches('[componentkey^="replaceableComment_urn:li:comment"]')
    );
  }

  function getPostContainer(node) {
    return getCommentContainer(node) || node;
  }

  function closestPostFromNode(node) {
    var selectors = [
      '[componentkey^="replaceableComment_urn:li:comment"]',
      "div.feed-shared-update-v2",
      'div[data-urn*="urn:li:activity"]',
      'div[data-urn*="urn:li:share"]',
      'div[data-id*="urn:li:activity"]',
      'div[data-id*="urn:li:share"]',
      "div[data-activity-urn]",
      "article",
      "li"
    ];
    var main = node.closest("main");
    var current;
    var match;

    match = getCommentContainer(node);
    if (match && isLikelyPost(match)) {
      return match;
    }

    current = node.parentElement;
    while (current && current !== main && current !== document.body) {
      if (isFeedPostContainer(current) && findPostMenuButton(current)) {
        return current;
      }
      current = current.parentElement;
    }

    for (var index = 0; index < selectors.length; index += 1) {
      match = node.closest(selectors[index]);
      if (match && isLikelyPost(match)) {
        return match;
      }
    }

    current = node.parentElement;
    while (current && current !== main && current !== document.body) {
      if (isLikelyPost(current)) {
        return current;
      }
      current = current.parentElement;
    }

    return null;
  }

  function getPostViewportDistance(post) {
    var rect;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;

    try {
      rect = post.getBoundingClientRect();
    } catch (error) {
      return Number.MAX_SAFE_INTEGER;
    }

    if (rect.bottom < 0) {
      return Math.abs(rect.bottom);
    }

    if (rect.top > viewportHeight) {
      return rect.top - viewportHeight;
    }

    return 0;
  }

  function isPostWithinScanRange(post) {
    return getPostViewportDistance(post) <= VIEWPORT_SCAN_MARGIN_PX;
  }

  function isElementWithinScanRange(node) {
    return node instanceof HTMLElement && getPostViewportDistance(node) <= VIEWPORT_SCAN_MARGIN_PX;
  }

  function getPostScanScore(post) {
    var distance = getPostViewportDistance(post);
    var score = distance;

    if (distance <= VIEWPORT_SCAN_MARGIN_PX) {
      score -= VIEWPORT_SCAN_MARGIN_PX;
    }

    if (!getPostToolbars(post).length) {
      score -= 650;
    }

    if (post.dataset.lfEnhanced !== "true") {
      score -= 350;
    }

    if (post.classList.contains("lf-hidden-post")) {
      score += 250;
    }

    return score;
  }

  function getCandidatePosts() {
    var selectors = [
      'main [componentkey^="replaceableComment_urn:li:comment"]',
      "main div.feed-shared-update-v2",
      'main [data-urn*="urn:li:activity"]',
      'main [data-urn*="urn:li:share"]',
      'main [data-id*="urn:li:activity"]',
      'main [data-id*="urn:li:share"]',
      "main [data-activity-urn]",
      "main article"
    ];
    var menuSelector =
      '[class*="feed-shared-control-menu"] button, [class*="update-components-control-menu"] button, [class*="control-menu"] button, button[aria-label], [role="button"][aria-label]';
    var raw = [];
    var seen = new Set();
    var scores = new WeakMap();
    var fallbackVisits = 0;

    function addPost(node) {
      if (raw.length >= MAX_COLLECTED_POSTS || !(node instanceof HTMLElement)) {
        return;
      }

      node = getPostContainer(node);
      if (
        node &&
        (node.dataset.lfEnhanced !== "true" || isPostWithinScanRange(node)) &&
        getFeedPostHeadingCount(node) <= 1 &&
        !seen.has(node) &&
        isLikelyPost(node)
      ) {
        seen.add(node);
        raw.push(node);
      }
    }

    function addClosestPost(node) {
      var post;

      if (raw.length >= MAX_COLLECTED_POSTS || !(node instanceof HTMLElement) || isExtensionNode(node)) {
        return;
      }

      post = closestPostFromNode(node);
      addPost(post || node);
    }

    function getPointElements(x, y) {
      if (typeof document.elementsFromPoint === "function") {
        return document.elementsFromPoint(x, y);
      }

      return [document.elementFromPoint(x, y)].filter(Boolean);
    }

    function getViewportScanXPoints() {
      var viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
      var main = document.querySelector("main");
      var rect;
      var left;
      var right;
      var width;

      if (!viewportWidth) {
        return [];
      }

      if (main) {
        try {
          rect = main.getBoundingClientRect();
        } catch (error) {
          rect = null;
        }
      }

      left = rect ? Math.max(0, rect.left) : 0;
      right = rect ? Math.min(viewportWidth - 1, rect.right) : viewportWidth - 1;

      if (right <= left) {
        left = 0;
        right = viewportWidth - 1;
      }

      width = right - left;

      return [0.32, 0.42, 0.5, 0.58, 0.68].map(function (ratio) {
        return Math.round(left + width * ratio);
      });
    }

    function addViewportPointPosts() {
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      var xPoints = getViewportScanXPoints();
      var step = Math.max(96, Math.round(viewportHeight / 10));
      var y;

      if (!viewportHeight || !xPoints.length) {
        return;
      }

      for (y = 72; y < viewportHeight && raw.length < MAX_COLLECTED_POSTS; y += step) {
        xPoints.forEach(function (x) {
          if (raw.length >= MAX_COLLECTED_POSTS) {
            return;
          }

          getPointElements(x, y).forEach(addClosestPost);
        });
      }
    }

    function addVisibleMenuButtonPosts() {
      Array.prototype.some.call(document.querySelectorAll(menuSelector), function (button) {
        fallbackVisits += 1;

        if (raw.length >= MAX_COLLECTED_POSTS || fallbackVisits >= MAX_FALLBACK_SELECTOR_VISITS) {
          return true;
        }

        if (isElementWithinScanRange(button)) {
          addClosestPost(button);
        }

        return false;
      });
    }

    function addSelectorPosts() {
      selectors.some(function (selector) {
        if (raw.length >= MAX_COLLECTED_POSTS || fallbackVisits >= MAX_FALLBACK_SELECTOR_VISITS) {
          return true;
        }

        return Array.prototype.some.call(document.querySelectorAll(selector), function (node) {
          fallbackVisits += 1;

          if (raw.length >= MAX_COLLECTED_POSTS || fallbackVisits >= MAX_FALLBACK_SELECTOR_VISITS) {
            return true;
          }

          addPost(node);
          return false;
        });
      });
    }

    function addHeadingPosts() {
      Array.prototype.some.call(document.querySelectorAll("main h2, h2"), function (heading) {
        fallbackVisits += 1;

        if (raw.length >= MAX_COLLECTED_POSTS || fallbackVisits >= MAX_FALLBACK_SELECTOR_VISITS) {
          return true;
        }

        if (isFeedPostHeading(heading)) {
          addPost(heading.parentElement);
        }

        return false;
      });
    }

    function hasStrongPostSignal(node) {
      return Boolean(
        node &&
          (
            isFeedPostContainer(node) ||
            findPostMenuButton(node) ||
            node.matches(
              'main article, main [data-urn*="urn:li:"], main [data-id*="urn:li:"], main [data-activity-urn], main div.feed-shared-update-v2'
            )
          )
      );
    }

    function scorePost(node) {
      if (!scores.has(node)) {
        scores.set(node, getPostScanScore(node));
      }

      return scores.get(node);
    }

    addSelectorPosts();
    if (!raw.length || !raw.some(hasStrongPostSignal)) {
      addVisibleMenuButtonPosts();
      addHeadingPosts();
      addViewportPointPosts();
    }

    return raw.filter(function (node) {
      return !raw.some(function (other) {
        if (other === node || !node.contains(other)) {
          return false;
        }

        if (isCommentContainer(other) && !isCommentContainer(node)) {
          return false;
        }

        return isFeedPostContainer(other) || !isFeedPostContainer(node);
      });
    }).sort(function (left, right) {
      return scorePost(left) - scorePost(right);
    }).slice(0, MAX_CANDIDATE_POSTS);
  }

  function createButton(label, kind) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "lf-action";
    button.dataset.kind = kind;
    button.textContent = label;
    return button;
  }

  function closeMenus() {
    document.querySelectorAll(".lf-save-menu").forEach(function (menu) {
      menu.remove();
    });
  }

  function isToolbarOwnedByPost(toolbar, post) {
    return post.contains(toolbar) && getCommentContainer(toolbar) === getCommentContainer(post);
  }

  function getPostToolbars(post) {
    return Array.prototype.slice.call(post.querySelectorAll(".lf-toolbar")).filter(function (toolbar) {
      return isToolbarOwnedByPost(toolbar, post);
    });
  }

  function removePostToolbars(post) {
    getPostToolbars(post).forEach(function (toolbar) {
      toolbar.remove();
    });
  }

  function removeStaleToolbars(post, postId) {
    getPostToolbars(post).forEach(function (toolbar) {
      if (toolbar.dataset.lfPostId !== postId) {
        toolbar.remove();
      }
    });
  }

  function removeDuplicateToolbars(post, activeToolbar) {
    getPostToolbars(post).forEach(function (toolbar) {
      if (toolbar !== activeToolbar) {
        toolbar.remove();
      }
    });
  }

  function getDecoratedPosts() {
    var posts = [];
    var seen = new Set();

    document
      .querySelectorAll(
        "main .lf-toolbar, main .lf-highlighted-post, main [data-lf-enhanced='true']:not(.lf-hidden-post):not(.lf-hide-pending)"
      )
      .forEach(function (node) {
        var post = closestPostFromNode(node) || getPostContainer(node);

        if (post && post.isConnected && !seen.has(post)) {
          seen.add(post);
          posts.push(post);
        }
      });

    return posts;
  }

  function clearPostDecoration(post) {
    removePostToolbars(post);
    clearHighlight(post);
    post.classList.remove("lf-enhanced");
    delete post.dataset.lfEnhanced;
    delete post.dataset.lfPostId;
    delete post.dataset.lfAutoHiddenPromoted;
    delete post.dataset.lfAutoHiddenRule;
  }

  function cleanupDistantEnhancements(activePosts) {
    var active = new Set(activePosts || []);

    getDecoratedPosts().forEach(function (post) {
      if (
        active.has(post) ||
        post.classList.contains("lf-hidden-post") ||
        post.classList.contains("lf-hide-pending") ||
        getPostViewportDistance(post) <= ENHANCEMENT_RETAIN_MARGIN_PX
      ) {
        return;
      }

      clearPostDecoration(post);
    });
  }

  function getHiddenPostId(info, post) {
    var ids = [
      info && info.id,
      post && post.dataset && post.dataset.lfPostId
    ];
    var url = normalizePostUrl(info && info.url);
    var id;
    var record;

    function isRecordActive(item) {
      return state.settings.hiddenRulesEnabled || !(item && item.hiddenByRule);
    }

    for (var index = 0; index < ids.length; index += 1) {
      id = cleanText(ids[index]);
      record = state.hiddenPosts[id];
      if (id && record && isRecordActive(record)) {
        return id;
      }
    }

    if (!url || normalizeCommentUrn(info && info.id)) {
      return "";
    }

    return (
      Object.keys(state.hiddenPosts).find(function (hiddenId) {
        record = state.hiddenPosts[hiddenId];

        return isRecordActive(record) && !normalizeCommentUrn(hiddenId) && normalizePostUrl(record && record.url) === url;
      }) || ""
    );
  }

  function getHiddenCommentParentId(info) {
    var parentId = getCommentParentPostId(info && info.id);
    var parentNumericId = parentId.split(":").pop();
    var hiddenId;
    var record;
    var recordCanonicalId;

    if (!parentId) {
      return "";
    }

    for (hiddenId in state.hiddenPosts) {
      if (!Object.prototype.hasOwnProperty.call(state.hiddenPosts, hiddenId)) {
        continue;
      }

      record = state.hiddenPosts[hiddenId];
      if (record && record.hiddenByRule && !state.settings.hiddenRulesEnabled) {
        continue;
      }

      recordCanonicalId =
        canonicalizeId(hiddenId) ||
        canonicalizeId(record && record.id) ||
        canonicalizeId(record && record.url);
      if (
        recordCanonicalId === parentId ||
        (recordCanonicalId && recordCanonicalId.split(":").pop() === parentNumericId)
      ) {
        return hiddenId;
      }
    }

    return "";
  }

  function getTargetLabel(folder, subfolder) {
    var folderName = cleanText(folder);
    var subfolderName = cleanText(subfolder);

    return subfolderName ? folderName + " / " + subfolderName : folderName;
  }

  function buildSavedRecord(info, folder, subfolder) {
    return compactSavedRecord({
      id: info.id,
      url: info.url,
      folder: folder,
      subfolder: cleanText(subfolder),
      savedAt: new Date().toISOString()
    }, info.id);
  }

  function getSavedPostUrl(record) {
    return normalizePostUrl(record && record.url) || buildPostUrl(record && record.id);
  }

  function getSavedPostMatch(info) {
    var id = cleanText(info && info.id);
    var url = normalizePostUrl(info && info.url) || buildPostUrl(id);
    var canonicalId = canonicalizeId(id) || canonicalizeId(info && info.url);
    var record;
    var recordId;
    var recordUrl;
    var key;

    if (id && state.savedPosts[id]) {
      return {
        id: id,
        record: state.savedPosts[id]
      };
    }

    for (key in state.savedPosts) {
      if (!Object.prototype.hasOwnProperty.call(state.savedPosts, key)) {
        continue;
      }

      record = state.savedPosts[key];
      recordId = canonicalizeId(record && record.id) || canonicalizeId(record && record.url);
      recordUrl = getSavedPostUrl(record);

      if ((canonicalId && recordId === canonicalId) || (url && recordUrl === url)) {
        return {
          id: key,
          record: record
        };
      }
    }

    return {
      id: "",
      record: null
    };
  }

  function buildHiddenRecord(info, rule) {
    var record = compactHiddenRecord({
      id: info.id,
      author: info.author,
      company: info.company,
      text: info.text,
      title: info.title,
      url: info.url,
      hiddenAt: new Date().toISOString()
    }, info.id);

    if (rule) {
      record.hiddenByRule = rule.id;
      record.hiddenRuleValue = rule.value;
    }

    return record;
  }

  async function savePost(info, folder, subfolder) {
    var folderName = cleanText(folder);
    var subfolderName = cleanText(subfolder);
    var savedMatch = getSavedPostMatch(info);

    if (savedMatch.record) {
      return {
        duplicate: true,
        record: savedMatch.record
      };
    }

    if (!folderName) {
      return {
        duplicate: false,
        record: null
      };
    }

    if (!state.folders.includes(folderName)) {
      state.folders.push(folderName);
    }

    if (!state.subfolders[folderName]) {
      state.subfolders[folderName] = [];
    }

    if (subfolderName && !state.subfolders[folderName].includes(subfolderName)) {
      state.subfolders[folderName].push(subfolderName);
    }

    state.savedPosts[info.id] = buildSavedRecord(info, folderName, subfolderName);
    await storageSet({
      folders: state.folders,
      savedPosts: state.savedPosts,
      subfolders: state.subfolders
    });

    return {
      duplicate: false,
      record: state.savedPosts[info.id]
    };
  }

  async function removeSavedPost(info) {
    var savedMatch = getSavedPostMatch(info);

    if (!savedMatch.record) {
      return false;
    }

    delete state.savedPosts[savedMatch.id];
    await storageSet({ savedPosts: state.savedPosts });
    return true;
  }

  function clearUndoTimer(postId) {
    if (state.undoTimers[postId]) {
      if (typeof state.undoTimers[postId] === "number") {
        window.clearTimeout(state.undoTimers[postId]);
      } else {
        window.clearTimeout(state.undoTimers[postId].timeout);
        window.clearInterval(state.undoTimers[postId].interval);
      }

      delete state.undoTimers[postId];
    }
  }

  function removeInlineUndo(post) {
    if (!post) {
      return;
    }

    Array.prototype.slice.call(post.children || []).forEach(function (child) {
      if (child.classList && child.classList.contains("lf-inline-undo")) {
        child.remove();
      }
    });
  }

  function removeHiddenPlaceholder(post) {
    if (!post) {
      return;
    }

    Array.prototype.slice.call(post.children || []).forEach(function (child) {
      if (child.classList && child.classList.contains("lf-hidden-placeholder")) {
        child.remove();
      }
    });
  }

  function ensureHiddenPlaceholder(post) {
    var placeholder = Array.prototype.find.call(post.children || [], function (child) {
      return child.classList && child.classList.contains("lf-hidden-placeholder");
    });
    var message;
    var reveal;

    if (!placeholder) {
      placeholder = document.createElement("div");
      placeholder.className = "lf-hidden-placeholder";
      placeholder.setAttribute("role", "status");
      message = document.createElement("span");
      message.className = "lf-hidden-placeholder-message";
      reveal = document.createElement("button");
      reveal.type = "button";
      reveal.className = "lf-hidden-reveal";
      placeholder.appendChild(message);
      placeholder.appendChild(reveal);
      post.appendChild(placeholder);

      reveal.addEventListener("click", function (event) {
        var revealed = post.dataset.lfHiddenRevealed === "true";

        event.preventDefault();
        event.stopPropagation();
        if (revealed) {
          delete post.dataset.lfHiddenRevealed;
          post.classList.remove("lf-hidden-post-revealed");
          post.classList.add("lf-hidden-post");
        } else {
          post.dataset.lfHiddenRevealed = "true";
          post.classList.remove("lf-hidden-post");
          post.classList.add("lf-hidden-post-revealed");
        }
        ensureHiddenPlaceholder(post);
      });
    }

    message = placeholder.querySelector(".lf-hidden-placeholder-message");
    reveal = placeholder.querySelector(".lf-hidden-reveal");
    message.textContent = t("hiddenNotice");
    reveal.textContent = post.dataset.lfHiddenRevealed === "true" ? t("hideAgain") : t("reveal");
    return placeholder;
  }

  function applyHiddenPostState(post) {
    ensureHiddenPlaceholder(post);
    if (post.dataset.lfHiddenRevealed === "true") {
      post.classList.remove("lf-hidden-post");
      post.classList.add("lf-hidden-post-revealed");
      return;
    }

    post.classList.remove("lf-hidden-post-revealed");
    post.classList.add("lf-hidden-post");
  }

  function finalizeHiddenPost(info, post) {
    if (!info || !info.id) {
      return;
    }

    clearUndoTimer(info.id);

    if (post && post.isConnected) {
      removeInlineUndo(post);
      post.classList.remove("lf-hide-pending");
      applyHiddenPostState(post);
    }
  }

  async function restoreHiddenPost(info, post) {
    if (!info || !info.id) {
      return;
    }

    clearUndoTimer(info.id);
    delete state.hiddenPosts[info.id];
    await storageSet({ hiddenPosts: state.hiddenPosts });

    if (post && post.isConnected) {
      removeInlineUndo(post);
      removeHiddenPlaceholder(post);
      post.classList.remove("lf-hide-pending");
      post.classList.remove("lf-hidden-post");
      post.classList.remove("lf-hidden-post-revealed");
      delete post.dataset.lfHiddenRevealed;
      delete post.dataset.lfAutoHiddenPromoted;
      delete post.dataset.lfAutoHiddenRule;
    }

    scheduleScan();
  }

  function showInlineUndo(info, post) {
    var placeholder = document.createElement("div");
    var content = document.createElement("div");
    var message = document.createElement("span");
    var actions = document.createElement("div");
    var countdown = document.createElement("span");
    var undo = document.createElement("button");
    var remaining = 5;

    clearUndoTimer(info.id);
    removeInlineUndo(post);

    placeholder.className = "lf-inline-undo";
    placeholder.setAttribute("role", "status");
    placeholder.setAttribute("aria-live", "polite");
    content.className = "lf-inline-undo-message";

    message.textContent = t("postHidden");
    countdown.className = "lf-inline-countdown";
    countdown.textContent = String(remaining);
    countdown.setAttribute("aria-label", t("countdownLabel"));

    actions.className = "lf-inline-undo-actions";
    undo.type = "button";
    undo.textContent = t("undo");
    undo.addEventListener("click", async function (event) {
      event.preventDefault();
      event.stopPropagation();

      try {
        await restoreHiddenPost(info, post);
      } catch (error) {
        reportActionError(null, "restore post", error);
      }
    });

    content.appendChild(message);
    actions.appendChild(countdown);
    actions.appendChild(undo);
    placeholder.appendChild(content);
    placeholder.appendChild(actions);
    post.appendChild(placeholder);

    state.undoTimers[info.id] = {
      interval: window.setInterval(function () {
        remaining -= 1;

        if (remaining >= 1) {
          countdown.textContent = String(remaining);
        }
      }, 1000),
      timeout: window.setTimeout(function () {
        finalizeHiddenPost(info, post);
      }, 5000)
    };
  }

  async function hidePost(info, post) {
    var target = getPostContainer(post);
    var isNewHiddenPost = !state.hiddenPosts[info.id];

    target.dataset.lfEnhanced = "true";
    target.dataset.lfPostId = info.id;
    removePostToolbars(target);
    clearHighlight(target);
    target.classList.remove("lf-hidden-post");
    target.classList.add("lf-hide-pending");

    state.hiddenPosts[info.id] = buildHiddenRecord(info);
    if (isNewHiddenPost) {
      recordAnalytics("hidden");
    }

    showInlineUndo(info, target);
    await storageSet({ hiddenPosts: state.hiddenPosts });
  }

  function scheduleHiddenPostsSave() {
    if (state.disposed) {
      return;
    }

    window.clearTimeout(state.hiddenPostsSaveTimer);
    state.hiddenPostsSaveTimer = window.setTimeout(function () {
      state.hiddenPostsSaveTimer = 0;
      safeStorageSet(
        { hiddenPosts: state.hiddenPosts },
        "LinkedIn Feedless failed to save auto-hidden posts"
      );
    }, 300);
  }

  function hidePostByRule(info, post, rule) {
    var target = getPostContainer(post);

    target.dataset.lfEnhanced = "true";
    target.dataset.lfPostId = info.id;
    target.dataset.lfAutoHiddenRule = rule.id;
    removePostToolbars(target);
    removeInlineUndo(target);
    clearHighlight(target);
    target.classList.remove("lf-hide-pending");
    applyHiddenPostState(target);

    if (state.hiddenPosts[info.id]) {
      return;
    }

    state.hiddenPosts[info.id] = buildHiddenRecord(info, rule);
    recordAnalytics("hidden");
    scheduleHiddenPostsSave();
  }

  function updateSaveButton(button, postId) {
    var record = state.savedPosts[postId];

    button.dataset.saved = record ? "true" : "false";
    button.textContent = record ? t("savedPrefix") + getTargetLabel(record.folder, record.subfolder) : t("save");
    button.title = record ? t("savedTitle") : t("saveTitle");
  }

  function updateSaveButtonForInfo(button, info) {
    var match = getSavedPostMatch(info);
    var record = match.record;

    button.dataset.saved = record ? "true" : "false";
    button.textContent = record ? t("savedPrefix") + getTargetLabel(record.folder, record.subfolder) : t("save");
    button.title = record ? t("savedTitle") : t("saveTitle");
  }

  function showToolbarNotice(toolbar, message) {
    var notice = toolbar.querySelector(".lf-save-notice");

    if (!notice) {
      notice = document.createElement("span");
      notice.className = "lf-save-notice";
      toolbar.appendChild(notice);
    }

    window.clearTimeout(toolbar._lfSaveNoticeTimer);
    notice.textContent = cleanText(message) || t("saved");
    notice.hidden = false;
    toolbar._lfSaveNoticeTimer = window.setTimeout(function () {
      notice.hidden = true;
    }, 1800);
  }

  function clearHighlight(post) {
    post.classList.remove("lf-highlighted-post");
    post.style.removeProperty("background-color");
    post.style.removeProperty("--lf-highlight-color");
    delete post.dataset.lfHighlightRule;
    delete post.dataset.lfHighlightValue;
  }

  function matchesTextRule(info, rule) {
    var needle = normalizeLabel(rule && rule.value);
    var haystack = normalizeLabel([
      info && info.author,
      info && info.company,
      info && info.title,
      info && info.text
    ].join(" "));

    if (!needle) {
      return false;
    }

    return haystack.includes(needle);
  }

  function getMatchingHiddenRule(info) {
    if (!state.settings.hiddenRulesEnabled) {
      return null;
    }

    return (
      state.hiddenRules.find(function (item) {
        return matchesTextRule(info, item);
      }) || null
    );
  }

  function applyHighlight(post, info) {
    if (!state.settings.highlightEnabled) {
      clearHighlight(post);
      return null;
    }

    var rule = getPriorityHighlightRules().find(function (item) {
      return matchesTextRule(info, item);
    });

    if (!rule) {
      clearHighlight(post);
      return null;
    }

    post.classList.add("lf-highlighted-post");
    post.style.setProperty("background-color", normalizeColor(rule.color), "important");
    post.style.setProperty("--lf-highlight-color", normalizeColor(rule.color));
    post.dataset.lfHighlightRule = rule.id;
    post.dataset.lfHighlightValue = cleanText(rule.value);
    if (post.dataset.lfAnalyticsHighlightGroup !== getRuleGroupId(rule)) {
      post.dataset.lfAnalyticsHighlightGroup = getRuleGroupId(rule);
      recordAnalytics("highlight", getRuleGroupId(rule));
    }
    return rule;
  }

  function openFolderMenu(toolbar, info, saveButton) {
    closeMenus();

    var menu = document.createElement("div");
    menu.className = "lf-save-menu";

    var title = document.createElement("div");
    title.className = "lf-save-menu-title";
    title.textContent = t("saveTo");
    menu.appendChild(title);

    function appendOption(folder, subfolder) {
      var option = document.createElement("button");
      var subfolderName = cleanText(subfolder);

      option.type = "button";
      option.className = "lf-folder-option";
      option.textContent = getTargetLabel(folder, subfolderName);

      if (subfolderName) {
        option.dataset.subfolder = "true";
      }

      option.addEventListener("click", async function (event) {
        var result;

        event.preventDefault();
        event.stopPropagation();

        try {
          result = await savePost(info, folder, subfolderName);
          updateSaveButtonForInfo(saveButton, info);
          closeMenus();
          showToolbarNotice(toolbar, result && result.duplicate ? t("alreadySaved") : t("postSaved"));
        } catch (error) {
          reportActionError(toolbar, t("savePost"), error);
        }
      });
      menu.appendChild(option);
    }

    getOrderedFolders().forEach(function (folder) {
      appendOption(folder, "");

      (state.subfolders[folder] || []).forEach(function (subfolder) {
        appendOption(folder, subfolder);
      });
    });

    var create = document.createElement("button");
    create.type = "button";
    create.className = "lf-folder-option";
    create.dataset.create = "true";
    create.textContent = t("newFolder");
    create.addEventListener("click", async function (event) {
      event.preventDefault();
      event.stopPropagation();

      var folder = window.prompt("Folder name");
      if (!folder) {
        return;
      }

      try {
        var result = await savePost(info, folder, "");
        updateSaveButtonForInfo(saveButton, info);
        closeMenus();
        showToolbarNotice(toolbar, result && result.duplicate ? t("alreadySaved") : t("postSaved"));
      } catch (error) {
        reportActionError(toolbar, t("savePost"), error);
      }
    });

    menu.appendChild(create);

    var createSubfolder = document.createElement("button");
    createSubfolder.type = "button";
    createSubfolder.className = "lf-folder-option";
    createSubfolder.dataset.create = "true";
    createSubfolder.textContent = t("newSubfolder");
    createSubfolder.addEventListener("click", async function (event) {
      var folder;
      var subfolder;

      event.preventDefault();
      event.stopPropagation();

      folder = cleanText(window.prompt("Parent folder name", state.folders[0] || ""));
      if (!folder) {
        return;
      }

      subfolder = cleanText(window.prompt("Subfolder name"));
      if (!subfolder) {
        return;
      }

      try {
        var result = await savePost(info, folder, subfolder);
        updateSaveButtonForInfo(saveButton, info);
        closeMenus();
        showToolbarNotice(toolbar, result && result.duplicate ? t("alreadySaved") : t("postSaved"));
      } catch (error) {
        reportActionError(toolbar, t("savePost"), error);
      }
    });

    menu.appendChild(createSubfolder);
    toolbar.appendChild(menu);
  }

  function findExistingToolbar(post, postId) {
    var toolbars = getPostToolbars(post);
    var toolbar;

    for (var index = 0; index < toolbars.length; index += 1) {
      if (toolbars[index].dataset.lfPostId === postId) {
        if (!toolbar) {
          toolbar = toolbars[index];
        } else {
          toolbars[index].remove();
        }
      }
    }

    return toolbar;
  }

  function findMenuPlacement(post) {
    var button = findPostMenuButton(post);
    var anchor;
    var parent;

    if (!button || button.closest(".lf-toolbar")) {
      return null;
    }

    anchor =
      button.closest('[class*="feed-shared-control-menu"], [class*="update-components-control-menu"], [class*="control-menu"], .artdeco-dropdown, [class*="dropdown"]') ||
      button;
    parent = anchor.parentElement || button.parentElement;

    if (!parent || parent.closest(".lf-toolbar")) {
      return null;
    }

    return {
      anchor: anchor,
      parent: parent
    };
  }

  function placeToolbar(post, toolbar) {
    var placement = findMenuPlacement(post);

    if (placement) {
      toolbar.classList.remove("lf-toolbar--fallback");
      toolbar.classList.add("lf-toolbar--inline");
      placement.parent.classList.add("lf-control-host");

      if (toolbar.parentElement !== placement.parent || toolbar.nextSibling !== placement.anchor) {
        placement.parent.insertBefore(toolbar, placement.anchor);
      }

      return;
    }

    post.classList.add("lf-enhanced");
    toolbar.classList.remove("lf-toolbar--inline");
    toolbar.classList.add("lf-toolbar--fallback");

    if (toolbar.parentElement !== post || toolbar !== post.firstElementChild) {
      post.prepend(toolbar);
    }
  }

  function shortenMatchText(value) {
    var text = cleanText(value);
    var limit = 32;

    if (text.length <= limit) {
      return text;
    }

    return text.slice(0, limit - 3).trim() + "...";
  }

  function ensureToolbarLayout(toolbar) {
    var actionRow = toolbar.querySelector(".lf-toolbar-actions");

    if (!actionRow) {
      actionRow = document.createElement("div");
      actionRow.className = "lf-toolbar-actions";
      Array.prototype.slice.call(toolbar.querySelectorAll(".lf-action")).forEach(function (button) {
        actionRow.appendChild(button);
      });
      toolbar.insertBefore(actionRow, toolbar.firstChild);
    }

    return actionRow;
  }

  function renderHighlightMatchTag(toolbar, rule) {
    var chip = toolbar.querySelector(".lf-highlight-match");
    var fullText = cleanText(rule && rule.value);

    if (!fullText) {
      if (chip) {
        chip.remove();
      }
      return;
    }

    if (!chip) {
      chip = document.createElement("span");
      chip.className = "lf-highlight-match";
      toolbar.appendChild(chip);
    }

    chip.textContent = t("matched") + shortenMatchText(fullText);
    chip.title = t("highlightMatched") + fullText;
  }

  function buildToolbar(post, info) {
    var toolbar = document.createElement("div");
    var actionRow;
    var hideButton = createButton(t("hide"), "hide");
    var saveButton = createButton(t("save"), "save");

    toolbar.className = "lf-toolbar";
    toolbar.dataset.lfPostId = info.id;
    actionRow = ensureToolbarLayout(toolbar);

    hideButton.title = t("hideTitle");
    hideButton.addEventListener("click", async function (event) {
      event.preventDefault();
      event.stopPropagation();

      try {
        await hidePost(readPostInfo(post), post);
      } catch (error) {
        reportActionError(toolbar, t("hidePost"), error);
      }
    });

    updateSaveButtonForInfo(saveButton, info);
    saveButton.addEventListener("click", async function (event) {
      var currentInfo;

      event.preventDefault();
      event.stopPropagation();
      currentInfo = readPostInfo(post);
      if (getSavedPostMatch(currentInfo).record) {
        try {
          await removeSavedPost(currentInfo);
          updateSaveButtonForInfo(saveButton, currentInfo);
          closeMenus();
          showToolbarNotice(toolbar, t("postRemovedFromSaved"));
        } catch (error) {
          reportActionError(toolbar, t("savePost"), error);
        }
        return;
      }

      openFolderMenu(toolbar, currentInfo, saveButton);
    });

    actionRow.appendChild(hideButton);
    actionRow.appendChild(saveButton);

    return toolbar;
  }

  function enhancePost(post) {
    var info = readPostInfo(post);
    var hiddenPostId;
    var hiddenRule;
    var isPromoted = isPromotedPost(post);
    var highlightRule;
    var toolbar;
    var hideButton;
    var saveButton;

    if (!info.id) {
      return;
    }

    if (getHiddenCommentParentId(info)) {
      removePostToolbars(post);
      clearHighlight(post);
      removeHiddenPlaceholder(post);
      post.classList.remove("lf-hidden-post", "lf-hidden-post-revealed");
      post.classList.add("lf-hidden-related-comment");
      return;
    }

    post.classList.remove("lf-hidden-related-comment");

    hiddenPostId = getHiddenPostId(info, post);
    if (hiddenPostId) {
      post.dataset.lfEnhanced = "true";
      post.dataset.lfPostId = hiddenPostId;
      removePostToolbars(post);
      clearHighlight(post);
      if (post.classList.contains("lf-hide-pending")) {
        return;
      }

      applyHiddenPostState(post);
      return;
    }

    post.dataset.lfEnhanced = "true";
    post.dataset.lfPostId = info.id;
    removeStaleToolbars(post, info.id);

    hiddenRule = getMatchingHiddenRule(info);
    if (hiddenRule) {
      hidePostByRule(info, post, hiddenRule);
      return;
    }

    if (post.dataset.lfAutoHiddenRule) {
      delete post.dataset.lfAutoHiddenRule;
      post.classList.remove("lf-hidden-post");
      post.classList.remove("lf-hidden-post-revealed");
      removeHiddenPlaceholder(post);
    }

    if (isPromoted && state.settings.autoHidePromoted) {
      if (post.dataset.lfAnalyticsPromotedCounted !== "true") {
        post.dataset.lfAnalyticsPromotedCounted = "true";
        recordAnalytics("promoted");
      }
      post.dataset.lfAutoHiddenPromoted = "true";
      removePostToolbars(post);
      clearHighlight(post);
      applyHiddenPostState(post);
      return;
    }

    if (post.dataset.lfAutoHiddenPromoted === "true") {
      delete post.dataset.lfAutoHiddenPromoted;
      post.classList.remove("lf-hidden-post");
      post.classList.remove("lf-hidden-post-revealed");
      removeHiddenPlaceholder(post);
    }

    post.classList.remove("lf-hide-pending");
    removeInlineUndo(post);
    post.classList.remove("lf-hidden-post");
    post.classList.remove("lf-hidden-post-revealed");
    removeHiddenPlaceholder(post);
    highlightRule = applyHighlight(post, info);
    toolbar = findExistingToolbar(post, info.id) || buildToolbar(post, info);
    ensureToolbarLayout(toolbar);
    renderHighlightMatchTag(toolbar, highlightRule);
    hideButton = toolbar.querySelector('[data-kind="hide"]');
    saveButton = toolbar.querySelector('[data-kind="save"]');

    if (hideButton) {
      hideButton.textContent = t("hide");
      hideButton.title = t("hideTitle");
    }

    if (saveButton) {
      updateSaveButtonForInfo(saveButton, info);
    }

    placeToolbar(post, toolbar);
    removeDuplicateToolbars(post, toolbar);
  }

  function isExtensionNode(node) {
    return (
      node instanceof HTMLElement &&
      Boolean(node.closest(".lf-toolbar, .lf-save-menu, .lf-inline-undo, .lf-hidden-placeholder"))
    );
  }

  function hasRelevantMutation(mutations) {
    return Array.prototype.some.call(mutations || [], function (mutation) {
      if (isExtensionNode(mutation.target)) {
        return false;
      }

      return Array.prototype.some.call(mutation.addedNodes || [], function (node) {
        return node instanceof HTMLElement && !isExtensionNode(node);
      }) || Array.prototype.some.call(mutation.removedNodes || [], function (node) {
        return node instanceof HTMLElement && !isExtensionNode(node);
      });
    });
  }

  function scanPosts() {
    var now = Date.now();
    var candidates = [];

    if (state.disposed || document.hidden || !isFeedPage()) {
      return;
    }

    if (state.scanInProgress) {
      state.pendingScan = true;
      return;
    }

    if (now - state.lastScanAt < MIN_SCAN_GAP_MS) {
      scheduleScan();
      return;
    }

    state.lastScanAt = now;
    state.scanInProgress = true;
    state.pendingScan = false;
    ensureObserverTarget();

    try {
      candidates = getCandidatePosts();
      candidates.forEach(function (post) {
        try {
          enhancePost(post);
        } catch (error) {
          console.warn("LinkedIn Feedless skipped a post that could not be enhanced", error);
        }
      });
      cleanupDistantEnhancements(candidates);
    } catch (error) {
      console.warn("LinkedIn Feedless scan failed; the next scan will retry", error);
    } finally {
      state.lastScanCompletedAt = Date.now();
      state.scanInProgress = false;

      if (state.pendingScan && !state.disposed) {
        state.pendingScan = false;
        scheduleScan();
      }
    }
  }

  function scheduleScan() {
    if (state.disposed || !isFeedPage()) {
      return;
    }

    window.clearTimeout(state.scanTimer);
    state.scanTimer = window.setTimeout(scanPosts, SCAN_DEBOUNCE_MS);
  }

  function clearScanBurstTimers() {
    state.scanBurstTimers.forEach(function (timer) {
      window.clearTimeout(timer);
    });
    state.scanBurstTimers = [];
  }

  function scanPostsNow() {
    if (state.disposed || !isFeedPage()) {
      return;
    }

    window.clearTimeout(state.scanTimer);
    clearScanBurstTimers();
    scanPosts();
    state.scanBurstTimers = [
      window.setTimeout(scanPosts, 1000)
    ];
  }

  function getObserverTarget() {
    return document.querySelector("main") || document.body || document.documentElement;
  }

  function ensureObserverTarget() {
    var target = getObserverTarget();

    if (state.disposed || !target || !isFeedPage()) {
      return;
    }

    if (state.observer && state.observerTarget === target && target.isConnected) {
      return;
    }

    if (state.observer) {
      state.observer.disconnect();
      state.observer = null;
    }

    var observer = new MutationObserver(function (mutations) {
      processAddedFeedPosts(mutations);
      if (hasRelevantMutation(mutations)) {
        scheduleScan();
      }
    });

    observer.observe(target, {
      childList: true,
      subtree: true
    });
    state.observer = observer;
    state.observerTarget = target;
  }

  function startObserver() {
    ensureObserverTarget();
  }

  function processAddedFeedPosts(mutations) {
    var selector = [
      "div.feed-shared-update-v2",
      '[data-urn*="urn:li:activity"]',
      '[data-urn*="urn:li:share"]',
      '[data-id*="urn:li:activity"]',
      '[data-id*="urn:li:share"]',
      "[data-activity-urn]",
      "article"
    ].join(",");
    var posts = [];
    var seen = new Set();

    if (!isFeedPage()) {
      return;
    }

    function add(node) {
      var post;

      if (!(node instanceof HTMLElement) || posts.length >= 50 || isExtensionNode(node)) {
        return;
      }

      post = node.matches(selector) ? node : closestPostFromNode(node);
      post = getPostContainer(post);
      if (post && !seen.has(post) && isLikelyPost(post)) {
        seen.add(post);
        posts.push(post);
      }
    }

    Array.prototype.forEach.call(mutations || [], function (mutation) {
      Array.prototype.forEach.call(mutation.addedNodes || [], function (node) {
        if (!(node instanceof HTMLElement)) {
          return;
        }

        add(node);
        Array.prototype.some.call(node.querySelectorAll(selector), function (candidate) {
          add(candidate);
          return posts.length >= 50;
        });
      });
    });

    posts.forEach(function (post) {
      try {
        enhancePost(post);
      } catch (error) {
        console.warn("LinkedIn Feedless skipped a newly loaded post", error);
      }
    });
  }

  function startPeriodicScan() {
    window.clearInterval(state.scanInterval);
    state.scanInterval = window.setInterval(scanPosts, SCAN_INTERVAL_MS);
  }

  function startScanWatchdog() {
    window.clearInterval(state.scanWatchdogInterval);
    state.scanWatchdogInterval = window.setInterval(function () {
      if (state.disposed || document.hidden || !isFeedPage()) {
        return;
      }

      ensureObserverTarget();

      if (
        !state.scanTimer &&
        !state.scanInProgress &&
        Date.now() - state.lastScanCompletedAt > SCAN_STALE_AFTER_MS
      ) {
        scanPostsNow();
      }
    }, SCAN_WATCHDOG_INTERVAL_MS);
  }

  function watchRouteChanges() {
    window.clearInterval(state.routeWatchInterval);
    state.lastLocationHref = window.location.href;
    state.routeWatchInterval = window.setInterval(function () {
      if (state.disposed) {
        return;
      }

      if (window.location.href !== state.lastLocationHref) {
        state.lastLocationHref = window.location.href;
        if (isFeedPage()) {
          ensureObserverTarget();
          scanPostsNow();
        } else if (state.observer) {
          state.observer.disconnect();
          state.observer = null;
          state.observerTarget = null;
        }
      }
    }, 1500);
  }

  function watchVisibility() {
    state.visibilityChangeHandler = function () {
      if (!document.hidden) {
        scanPostsNow();
      }
    };

    document.addEventListener("visibilitychange", state.visibilityChangeHandler);
  }

  function watchPageLifecycle() {
    state.pageShowHandler = function () {
      if (!document.hidden) {
        scanPostsNow();
      }
    };
    state.focusHandler = function () {
      if (!document.hidden) {
        scanPostsNow();
      }
    };

    window.addEventListener("pageshow", state.pageShowHandler);
    window.addEventListener("focus", state.focusHandler);
  }

  function watchScroll() {
    state.scrollHandler = function () {
      scheduleScan();
    };

    window.addEventListener("scroll", state.scrollHandler, { passive: true });
  }

  function watchStorageChanges() {
    var storageEvents = hasBrowserPromises ? browser.storage : chrome.storage;

    state.storageChangeHandler = function (changes, areaName) {
      if (areaName !== "local") {
        return;
      }

      if (changes[STORAGE_KEYS.folders]) {
        state.folders = normalizeFolders(changes[STORAGE_KEYS.folders].newValue);
      }

      if (changes[STORAGE_KEYS.analytics]) {
        state.analytics = normalizeAnalytics(changes[STORAGE_KEYS.analytics].newValue);
      }

      if (changes[STORAGE_KEYS.hiddenPosts]) {
        state.hiddenPosts = normalizeHiddenRecords(changes[STORAGE_KEYS.hiddenPosts].newValue);
      }

      if (changes[STORAGE_KEYS.hiddenRules]) {
        state.hiddenRules = normalizeHiddenRules(changes[STORAGE_KEYS.hiddenRules].newValue);
      }

      if (changes[STORAGE_KEYS.highlightGroups]) {
        state.highlightGroups = normalizeHighlightGroups(
          changes[STORAGE_KEYS.highlightGroups].newValue,
          state.highlightRules
        );
      }

      if (changes[STORAGE_KEYS.highlightRules]) {
        state.highlightRules = normalizeHighlightRules(changes[STORAGE_KEYS.highlightRules].newValue);
        state.highlightGroups = normalizeHighlightGroups(state.highlightGroups, state.highlightRules);
      }

      if (changes[STORAGE_KEYS.savedPosts]) {
        state.savedPosts = normalizeSavedRecords(changes[STORAGE_KEYS.savedPosts].newValue);
      }

      if (changes[STORAGE_KEYS.settings]) {
        state.settings = normalizeSettings(changes[STORAGE_KEYS.settings].newValue);
        applyTheme();
      }

      if (changes[STORAGE_KEYS.subfolders]) {
        state.subfolders = normalizeSubfolders(
          changes[STORAGE_KEYS.subfolders].newValue,
          state.folders,
          state.savedPosts
        );
      }

      if (
        (changes[STORAGE_KEYS.hiddenPosts] || changes[STORAGE_KEYS.settings]) &&
        pruneExpiredHiddenPosts(Date.now())
      ) {
        safeStorageSet(
          { hiddenPosts: state.hiddenPosts },
          "LinkedIn Feedless failed to save pruned hidden posts"
        ).then(scanPostsNow);
        return;
      }

      if (
        changes[STORAGE_KEYS.hiddenRules] ||
        changes[STORAGE_KEYS.highlightGroups] ||
        changes[STORAGE_KEYS.highlightRules]
      ) {
        scanPostsNow();
        return;
      }

      scheduleScan();
    };

    storageEvents.onChanged.addListener(state.storageChangeHandler);
  }

  function refreshFromStorage() {
    return loadState()
      .then(function () {
        scanPostsNow();
      })
      .catch(function (error) {
        console.warn("LinkedIn Feedless failed to refresh settings", error);
      });
  }

  function watchRuntimeMessages() {
    var runtime =
      typeof browser !== "undefined" && browser.runtime
        ? browser.runtime
        : typeof chrome !== "undefined"
          ? chrome.runtime
          : null;

    if (!runtime || !runtime.onMessage) {
      return;
    }

    state.runtimeMessageHandler = function (message, sender, sendResponse) {
      if (!message || message.type !== "LINKEDIN_FEEDLESS_REFRESH") {
        return undefined;
      }

      refreshFromStorage().then(function () {
        if (sendResponse) {
          sendResponse({
            ok: true,
            version: CONTENT_SCRIPT_VERSION
          });
        }
      });

      return true;
    };

    runtime.onMessage.addListener(state.runtimeMessageHandler);
  }

  function cleanup() {
    var storageEvents = hasBrowserPromises ? browser.storage : chrome.storage;
    var runtime =
      typeof browser !== "undefined" && browser.runtime
        ? browser.runtime
        : typeof chrome !== "undefined"
          ? chrome.runtime
          : null;

    state.disposed = true;
    window.clearTimeout(state.scanTimer);
    if (state.hiddenPostsSaveTimer) {
      window.clearTimeout(state.hiddenPostsSaveTimer);
      safeStorageSet({ hiddenPosts: state.hiddenPosts }, "LinkedIn Feedless failed to save hidden posts during cleanup");
      state.hiddenPostsSaveTimer = 0;
    }
    if (state.analyticsSaveTimer) {
      window.clearTimeout(state.analyticsSaveTimer);
      safeStorageSet({ analytics: state.analytics }, "LinkedIn Feedless failed to save analytics during cleanup");
      state.analyticsSaveTimer = 0;
    }
    window.clearInterval(state.scanInterval);
    window.clearInterval(state.scanWatchdogInterval);
    state.scanWatchdogInterval = 0;
    window.clearInterval(state.routeWatchInterval);
    state.routeWatchInterval = 0;
    clearScanBurstTimers();

    Object.keys(state.undoTimers).forEach(clearUndoTimer);

    if (state.observer) {
      state.observer.disconnect();
      state.observer = null;
      state.observerTarget = null;
    }

    if (state.storageChangeHandler && storageEvents && storageEvents.onChanged) {
      storageEvents.onChanged.removeListener(state.storageChangeHandler);
      state.storageChangeHandler = null;
    }

    if (state.runtimeMessageHandler && runtime && runtime.onMessage) {
      runtime.onMessage.removeListener(state.runtimeMessageHandler);
      state.runtimeMessageHandler = null;
    }

    if (state.documentClickHandler) {
      document.removeEventListener("click", state.documentClickHandler);
      state.documentClickHandler = null;
    }

    if (state.visibilityChangeHandler) {
      document.removeEventListener("visibilitychange", state.visibilityChangeHandler);
      state.visibilityChangeHandler = null;
    }

    if (state.pageShowHandler) {
      window.removeEventListener("pageshow", state.pageShowHandler);
      state.pageShowHandler = null;
    }

    if (state.focusHandler) {
      window.removeEventListener("focus", state.focusHandler);
      state.focusHandler = null;
    }

    if (state.scrollHandler) {
      window.removeEventListener("scroll", state.scrollHandler);
      state.scrollHandler = null;
    }

    if (window.__linkedInFeedlessWake === scanPostsNow) {
      window.__linkedInFeedlessWake = null;
    }

    if (window.__linkedInFeedlessLoadedVersion === CONTENT_SCRIPT_VERSION) {
      window.__linkedInFeedlessLoadedVersion = "";
      window.__linkedInFeedlessLoaded = false;
    }
  }

  window.__linkedInFeedlessCleanup = cleanup;
  window.__linkedInFeedlessWake = scanPostsNow;

  state.documentClickHandler = function (event) {
    if (!event.target.closest(".lf-toolbar")) {
      closeMenus();
    }
  };

  document.addEventListener("click", state.documentClickHandler);

  loadState()
    .catch(function (error) {
      startWithDefaultState(error);
    })
    .then(function () {
      if (state.disposed) {
        return;
      }

      try {
        scanPosts();
        startObserver();
        startPeriodicScan();
        startScanWatchdog();
        watchRouteChanges();
        watchStorageChanges();
        watchRuntimeMessages();
        watchVisibility();
        watchPageLifecycle();
        watchScroll();
      } catch (error) {
        console.warn("LinkedIn Feedless failed to start runtime watchers", error);
        cleanup();
      }
    });
})();
