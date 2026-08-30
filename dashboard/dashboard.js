(function () {
  "use strict";

  var DEFAULT_FOLDERS = ["Jobs", "Databricks", "Spark", "Data Engineer"];
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
  var LANGUAGE_OPTIONS = [
    { value: "en", label: "English" },
    { value: "pt-BR", label: "Portugues (Brasil)" },
    { value: "es", label: "Espanol" },
    { value: "de", label: "Deutsch" },
    { value: "fr", label: "Francais" }
  ];
  var LANGUAGE_VALUES = LANGUAGE_OPTIONS.map(function (item) {
    return item.value;
  });
  var MESSAGES = {
    en: {
      autoCleanHiddenPosts: "Auto-clean hidden posts",
      autoHideMatchingPosts: "Auto-hide matching posts",
      autoHidePromotedPosts: "Auto-hide promoted posts",
      changesSaved: "Changes saved",
      cleanAfter: "Clean after",
      dashboard: "Dashboard",
      darkMode: "Dark mode",
      collapseAll: "Collapse all",
      collapseFolder: "Collapse folder",
      expandAll: "Expand all",
      expandFolder: "Expand folder",
      hiddenPosts: "Hidden Posts",
      highlightGroups: "Highlight groups",
      highlightMatchingPosts: "Highlight matching posts",
      highlightPosts: "Highlight Posts",
      highlightWords: "Highlight words",
      language: "Language",
      languageHint: "Changes popup, dashboard, and LinkedIn buttons",
      library: "Library",
      localDataSaved: "Local data saved by the extension",
      memoryHint: "Approximate JS heap for this extension page",
      memoryUsed: "Memory usage",
      noHiddenMatches: "No hidden matches",
      noHighlightGroups: "No highlight groups",
      noHighlightMatches: "No highlight matches",
      noSavedMatches: "No saved matches",
      nothingHidden: "Nothing hidden",
      nothingSaved: "Nothing saved yet",
      noSubfolder: "No subfolder",
      openLinkedIn: "Open LinkedIn",
      postSingular: "post",
      postPlural: "posts",
      preferences: "Preferences",
      saved: "Saved",
      savedPostRemoved: "Saved post removed",
      savedPosts: "Saved Posts",
      searchHiddenPosts: "Search hidden posts",
      searchHighlightGroups: "Search highlight groups",
      searchPosts: "Search posts",
      searchSavedPosts: "Search saved posts",
      settings: "Settings",
      storageUsed: "Storage used",
      timeline: "Timeline",
      tryAnotherSearch: "Try another search.",
      unavailable: "Unavailable"
    },
    "pt-BR": {
      autoCleanHiddenPosts: "Limpeza automatica de posts ocultos",
      autoHideMatchingPosts: "Ocultar posts correspondentes",
      autoHidePromotedPosts: "Ocultar posts promovidos",
      changesSaved: "Alteracoes salvas",
      cleanAfter: "Limpar apos",
      dashboard: "Painel",
      darkMode: "Modo escuro",
      collapseAll: "Recolher tudo",
      collapseFolder: "Recolher pasta",
      expandAll: "Expandir tudo",
      expandFolder: "Expandir pasta",
      hiddenPosts: "Posts Ocultos",
      highlightGroups: "Grupos destacados",
      highlightMatchingPosts: "Destacar posts correspondentes",
      highlightPosts: "Posts Destacados",
      highlightWords: "Palavras destacadas",
      language: "Idioma",
      languageHint: "Altera popup, painel e botoes no LinkedIn",
      library: "Biblioteca",
      localDataSaved: "Dados locais salvos pela extensao",
      memoryHint: "Heap JS aproximado desta pagina da extensao",
      memoryUsed: "Uso de memoria",
      noHiddenMatches: "Nenhum oculto encontrado",
      noHighlightGroups: "Nenhum grupo destacado",
      noHighlightMatches: "Nenhum destaque encontrado",
      noSavedMatches: "Nenhum salvo encontrado",
      nothingHidden: "Nada oculto",
      nothingSaved: "Nada salvo ainda",
      noSubfolder: "Sem subpasta",
      openLinkedIn: "Abrir LinkedIn",
      postSingular: "post",
      postPlural: "posts",
      preferences: "Preferencias",
      saved: "Salvos",
      savedPostRemoved: "Post salvo removido",
      savedPosts: "Posts Salvos",
      searchHiddenPosts: "Buscar posts ocultos",
      searchHighlightGroups: "Buscar grupos destacados",
      searchPosts: "Buscar posts",
      searchSavedPosts: "Buscar posts salvos",
      settings: "Configuracoes",
      storageUsed: "Armazenamento usado",
      timeline: "Linha do tempo",
      tryAnotherSearch: "Tente outra busca.",
      unavailable: "Indisponivel"
    },
    es: {
      autoCleanHiddenPosts: "Limpiar publicaciones ocultas automaticamente",
      autoHideMatchingPosts: "Ocultar publicaciones coincidentes",
      autoHidePromotedPosts: "Ocultar publicaciones promocionadas",
      changesSaved: "Cambios guardados",
      cleanAfter: "Limpiar despues de",
      dashboard: "Panel",
      darkMode: "Modo oscuro",
      collapseAll: "Contraer todo",
      collapseFolder: "Contraer carpeta",
      expandAll: "Expandir todo",
      expandFolder: "Expandir carpeta",
      hiddenPosts: "Publicaciones ocultas",
      highlightGroups: "Grupos destacados",
      highlightMatchingPosts: "Destacar publicaciones coincidentes",
      highlightPosts: "Publicaciones destacadas",
      highlightWords: "Palabras destacadas",
      language: "Idioma",
      languageHint: "Cambia el popup, el panel y los botones de LinkedIn",
      library: "Biblioteca",
      localDataSaved: "Datos locales guardados por la extension",
      memoryHint: "Heap JS aproximado de esta pagina de la extension",
      memoryUsed: "Uso de memoria",
      noHiddenMatches: "No hay coincidencias ocultas",
      noHighlightGroups: "No hay grupos destacados",
      noHighlightMatches: "No hay coincidencias destacadas",
      noSavedMatches: "No hay coincidencias guardadas",
      nothingHidden: "Nada oculto",
      nothingSaved: "Nada guardado aun",
      noSubfolder: "Sin subcarpeta",
      openLinkedIn: "Abrir LinkedIn",
      postSingular: "publicacion",
      postPlural: "publicaciones",
      preferences: "Preferencias",
      saved: "Guardadas",
      savedPostRemoved: "Publicacion guardada eliminada",
      savedPosts: "Publicaciones guardadas",
      searchHiddenPosts: "Buscar publicaciones ocultas",
      searchHighlightGroups: "Buscar grupos destacados",
      searchPosts: "Buscar publicaciones",
      searchSavedPosts: "Buscar publicaciones guardadas",
      settings: "Configuracion",
      storageUsed: "Almacenamiento usado",
      timeline: "Linea de tiempo",
      tryAnotherSearch: "Prueba otra busqueda.",
      unavailable: "No disponible"
    },
    de: {
      autoCleanHiddenPosts: "Ausgeblendete Beitraege automatisch bereinigen",
      autoHideMatchingPosts: "Passende Beitraege ausblenden",
      autoHidePromotedPosts: "Gesponserte Beitraege ausblenden",
      changesSaved: "Aenderungen gespeichert",
      cleanAfter: "Bereinigen nach",
      dashboard: "Dashboard",
      darkMode: "Dunkler Modus",
      collapseAll: "Alle einklappen",
      collapseFolder: "Ordner einklappen",
      expandAll: "Alle ausklappen",
      expandFolder: "Ordner ausklappen",
      hiddenPosts: "Ausgeblendete Beitraege",
      highlightGroups: "Hervorgehobene Gruppen",
      highlightMatchingPosts: "Passende Beitraege hervorheben",
      highlightPosts: "Hervorgehobene Beitraege",
      highlightWords: "Hervorgehobene Woerter",
      language: "Sprache",
      languageHint: "Aendert Popup, Dashboard und LinkedIn-Schaltflaechen",
      library: "Bibliothek",
      localDataSaved: "Von der Erweiterung gespeicherte lokale Daten",
      memoryHint: "Ungefaehre JS-Heap-Nutzung dieser Erweiterungsseite",
      memoryUsed: "Speichernutzung",
      noHiddenMatches: "Keine ausgeblendeten Treffer",
      noHighlightGroups: "Keine hervorgehobenen Gruppen",
      noHighlightMatches: "Keine Hervorhebungs-Treffer",
      noSavedMatches: "Keine gespeicherten Treffer",
      nothingHidden: "Nichts ausgeblendet",
      nothingSaved: "Noch nichts gespeichert",
      noSubfolder: "Kein Unterordner",
      openLinkedIn: "LinkedIn oeffnen",
      postSingular: "Beitrag",
      postPlural: "Beitraege",
      preferences: "Einstellungen",
      saved: "Gespeichert",
      savedPostRemoved: "Gespeicherter Beitrag entfernt",
      savedPosts: "Gespeicherte Beitraege",
      searchHiddenPosts: "Ausgeblendete Beitraege suchen",
      searchHighlightGroups: "Hervorgehobene Gruppen suchen",
      searchPosts: "Beitraege suchen",
      searchSavedPosts: "Gespeicherte Beitraege suchen",
      settings: "Einstellungen",
      storageUsed: "Speicher belegt",
      timeline: "Zeitleiste",
      tryAnotherSearch: "Versuche eine andere Suche.",
      unavailable: "Nicht verfuegbar"
    },
    fr: {
      autoCleanHiddenPosts: "Nettoyer automatiquement les posts masques",
      autoHideMatchingPosts: "Masquer les posts correspondants",
      autoHidePromotedPosts: "Masquer les posts sponsorises",
      changesSaved: "Modifications enregistrees",
      cleanAfter: "Nettoyer apres",
      dashboard: "Tableau de bord",
      darkMode: "Mode sombre",
      collapseAll: "Tout replier",
      collapseFolder: "Replier le dossier",
      expandAll: "Tout developper",
      expandFolder: "Developper le dossier",
      hiddenPosts: "Posts masques",
      highlightGroups: "Groupes en surbrillance",
      highlightMatchingPosts: "Mettre en surbrillance les posts correspondants",
      highlightPosts: "Posts en surbrillance",
      highlightWords: "Mots en surbrillance",
      language: "Langue",
      languageHint: "Change le popup, le tableau de bord et les boutons LinkedIn",
      library: "Bibliotheque",
      localDataSaved: "Donnees locales enregistrees par l'extension",
      memoryHint: "Heap JS approximatif de cette page d'extension",
      memoryUsed: "Utilisation memoire",
      noHiddenMatches: "Aucun post masque trouve",
      noHighlightGroups: "Aucun groupe en surbrillance",
      noHighlightMatches: "Aucun resultat en surbrillance",
      noSavedMatches: "Aucun post sauvegarde trouve",
      nothingHidden: "Rien de masque",
      nothingSaved: "Rien de sauvegarde",
      noSubfolder: "Sans sous-dossier",
      openLinkedIn: "Ouvrir LinkedIn",
      postSingular: "post",
      postPlural: "posts",
      preferences: "Preferences",
      saved: "Sauvegardes",
      savedPostRemoved: "Post sauvegarde supprime",
      savedPosts: "Posts sauvegardes",
      searchHiddenPosts: "Rechercher des posts masques",
      searchHighlightGroups: "Rechercher des groupes",
      searchPosts: "Rechercher des posts",
      searchSavedPosts: "Rechercher des posts sauvegardes",
      settings: "Parametres",
      storageUsed: "Stockage utilise",
      timeline: "Chronologie",
      tryAnotherSearch: "Essayez une autre recherche.",
      unavailable: "Indisponible"
    }
  };
  var STORAGE_KEYS = {
    folders: "folders",
    hiddenPosts: "hiddenPosts",
    hiddenRules: "hiddenRules",
    highlightGroups: "highlightGroups",
    highlightRules: "highlightRules",
    savedPosts: "savedPosts",
    settings: "settings",
    subfolders: "subfolders"
  };
  var STORAGE_USAGE_KEYS = Object.keys(STORAGE_KEYS).map(function (key) {
    return STORAGE_KEYS[key];
  });
  var hasBrowserPromises =
    typeof browser !== "undefined" && browser.storage && browser.storage.local;
  var storageApi = hasBrowserPromises ? browser.storage.local : chrome.storage.local;
  var state = {
    view: "saved",
    query: "",
    folders: DEFAULT_FOLDERS.slice(),
    hiddenPosts: {},
    hiddenRules: [],
    highlightGroups: [],
    highlightRules: [],
    savedPosts: {},
    settings: Object.assign({}, DEFAULT_SETTINGS),
    storageBytes: null,
    subfolders: {},
    expandedSavedFolders: {},
    expandedSavedSubfolders: {},
    selectedSavedFolder: "",
    selectedSavedSubfolder: ""
  };
  var elements = {};
  var toastTimer = 0;

  function cleanText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function storageGet(keys) {
    if (hasBrowserPromises) {
      return storageApi.get(keys).then(function (items) {
        return items || {};
      });
    }

    return new Promise(function (resolve) {
      storageApi.get(keys, function (items) {
        resolve(items || {});
      });
    });
  }

  function storageSet(items) {
    if (hasBrowserPromises) {
      return storageApi.set(items);
    }

    return new Promise(function (resolve) {
      storageApi.set(items, resolve);
    });
  }

  function getUtf8ByteLength(value) {
    var text = String(value || "");

    if (typeof TextEncoder !== "undefined") {
      return new TextEncoder().encode(text).length;
    }

    return encodeURIComponent(text).replace(/%[0-9A-F]{2}/gi, "x").length;
  }

  function estimateStorageBytes(keys) {
    return storageGet(keys).then(function (items) {
      return getUtf8ByteLength(JSON.stringify(items || {}));
    });
  }

  function storageGetBytesInUse(keys) {
    if (storageApi && typeof storageApi.getBytesInUse === "function") {
      if (hasBrowserPromises) {
        return storageApi.getBytesInUse(keys).catch(function () {
          return estimateStorageBytes(keys);
        });
      }

      return new Promise(function (resolve) {
        storageApi.getBytesInUse(keys, function (bytes) {
          if (chrome.runtime && chrome.runtime.lastError) {
            estimateStorageBytes(keys).then(resolve);
            return;
          }

          resolve(Number(bytes) || 0);
        });
      });
    }

    return estimateStorageBytes(keys);
  }

  function formatStorageSize(bytes) {
    var value = Number(bytes);
    var mb = 1024 * 1024;
    var gb = mb * 1024;

    if (!Number.isFinite(value)) {
      return "Unavailable";
    }

    if (value <= 0) {
      return "0 MB";
    }

    if (value >= gb) {
      return (value / gb).toFixed(value >= 10 * gb ? 1 : 2) + " GB";
    }

    return Math.max(0.01, value / mb).toFixed(value >= 10 * mb ? 1 : 2) + " MB";
  }

  function getMemoryUsageBytes() {
    if (
      typeof performance !== "undefined" &&
      performance.memory &&
      Number.isFinite(Number(performance.memory.usedJSHeapSize))
    ) {
      return Number(performance.memory.usedJSHeapSize);
    }

    return NaN;
  }

  function formatMemorySize(bytes) {
    return Number.isFinite(Number(bytes)) ? formatStorageSize(bytes) : t("unavailable");
  }

  async function refreshStorageUsage() {
    state.storageBytes = await storageGetBytesInUse(STORAGE_USAGE_KEYS);
  }

  function queryLinkedInTabs() {
    var query = { url: "https://www.linkedin.com/*" };

    if (hasBrowserPromises && browser.tabs && browser.tabs.query) {
      return browser.tabs.query(query).catch(function () {
        return [];
      });
    }

    if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.query) {
      return new Promise(function (resolve) {
        chrome.tabs.query(query, function (tabs) {
          if (chrome.runtime && chrome.runtime.lastError) {
            resolve([]);
            return;
          }

          resolve(tabs || []);
        });
      });
    }

    return Promise.resolve([]);
  }

  function sendMessageToTab(tabId, message) {
    if (tabId === undefined || tabId === null) {
      return Promise.resolve(null);
    }

    if (hasBrowserPromises && browser.tabs && browser.tabs.sendMessage) {
      return browser.tabs.sendMessage(tabId, message).catch(function () {
        return null;
      });
    }

    if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.sendMessage) {
      return new Promise(function (resolve) {
        chrome.tabs.sendMessage(tabId, message, function (response) {
          if (chrome.runtime && chrome.runtime.lastError) {
            resolve(null);
            return;
          }

          resolve(response || null);
        });
      });
    }

    return Promise.resolve(null);
  }

  async function notifyLinkedInTabs(changedKeys) {
    var tabs = await queryLinkedInTabs();
    var message = {
      type: "LINKEDIN_FEEDLESS_REFRESH",
      changedKeys: changedKeys || []
    };

    await Promise.all(
      tabs.map(function (tab) {
        return sendMessageToTab(tab.id, message);
      })
    );
  }

  function createElement(tag, options) {
    var node = document.createElement(tag);
    var opts = options || {};

    if (opts.className) {
      node.className = opts.className;
    }

    if (opts.text !== undefined) {
      node.textContent = opts.text;
    }

    if (opts.attrs) {
      Object.keys(opts.attrs).forEach(function (name) {
        var value = opts.attrs[name];
        if (value !== undefined && value !== null) {
          node.setAttribute(name, value);
        }
      });
    }

    return node;
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

  function normalizeRecords(value) {
    if (Array.isArray(value)) {
      return value.reduce(function (records, item) {
        if (item && item.id) {
          records[item.id] = Object.assign({}, item);
        }
        return records;
      }, {});
    }

    if (value && typeof value === "object") {
      return Object.keys(value).reduce(function (records, key) {
        var item = value[key];

        if (item && typeof item === "object") {
          records[item.id || key] = Object.assign({ id: item.id || key }, item);
        }

        return records;
      }, {});
    }

    return {};
  }

  function normalizeSavedRecords(value) {
    var records = normalizeRecords(value);

    Object.keys(records).forEach(function (id) {
      var item = records[id];

      records[id] = {
        id: cleanText(item.id) || id,
        url: cleanText(item.url),
        folder: cleanText(item.folder),
        subfolder: cleanText(item.subfolder),
        savedAt: cleanText(item.savedAt) || new Date().toISOString()
      };
    });

    return records;
  }

  function savedRecordsContainContent(value) {
    return Object.values(value && typeof value === "object" ? value : {}).some(function (item) {
      return Boolean(item && (item.author || item.company || item.title || item.text));
    });
  }

  function normalizeFolders(value) {
    var source = Array.isArray(value) ? value : DEFAULT_FOLDERS;
    var seen = {};
    var folders = [];

    source.forEach(function (item) {
      var folder = cleanText(item);
      var key = folder.toLowerCase();

      if (folder && !seen[key]) {
        seen[key] = true;
        folders.push(folder);
      }
    });

    return folders.length ? folders : DEFAULT_FOLDERS.slice();
  }

  function normalizeSubfolders(value, folders, savedPosts) {
    var records = {};

    function add(folder, subfolder) {
      var folderName = cleanText(folder);
      var subfolderName = cleanText(subfolder);

      if (!folderName) {
        return;
      }

      if (!records[folderName]) {
        records[folderName] = [];
      }

      if (subfolderName && !records[folderName].includes(subfolderName)) {
        records[folderName].push(subfolderName);
      }
    }

    normalizeFolders(folders).forEach(function (folder) {
      add(folder, "");
    });

    Object.keys(value && typeof value === "object" ? value : {}).forEach(function (folder) {
      (Array.isArray(value[folder]) ? value[folder] : []).forEach(function (subfolder) {
        add(folder, subfolder);
      });
    });

    Object.values(savedPosts || {}).forEach(function (post) {
      add(post && post.folder, post && post.subfolder);
    });

    return records;
  }

  function normalizeColor(value) {
    var color = cleanText(value).toLowerCase();

    return /^#[0-9a-f]{6}$/i.test(color) ? color : DEFAULT_HIGHLIGHT_COLOR;
  }

  function normalizeRuleText(value) {
    return cleanText(value)
      .toLowerCase()
      .replace(/[^a-z0-9+#]+/g, " ")
      .trim();
  }

  function normalizeGroupName(value) {
    return cleanText(value) || DEFAULT_HIGHLIGHT_GROUP;
  }

  function createHighlightGroupId(name) {
    var key = normalizeRuleText(name).replace(/\s+/g, "-").slice(0, 60);

    return "highlight-group-" + (key || normalizeRuleText(DEFAULT_HIGHLIGHT_GROUP));
  }

  function getRuleGroupName(rule) {
    return normalizeGroupName(rule && rule.groupName);
  }

  function getRuleGroupId(rule) {
    return cleanText(rule && rule.groupId) || createHighlightGroupId(getRuleGroupName(rule));
  }

  function normalizeHighlightRules(value) {
    var source = Array.isArray(value) ? value : [];
    var seen = {};

    return source.reduce(function (rules, item, index) {
      var text = cleanText(item && item.value);
      var key = normalizeRuleText(text);
      var groupName = normalizeGroupName(item && (item.groupName || item.group || item.category));
      var groupId = cleanText(item && item.groupId) || createHighlightGroupId(groupName);

      if (!text || !key || seen[key]) {
        return rules;
      }

      seen[key] = true;
      rules.push({
        id: cleanText(item && item.id) || "highlight-" + index,
        type: "text",
        value: text,
        groupId: groupId,
        groupName: groupName,
        color: normalizeColor(item && item.color),
        createdAt: cleanText(item && item.createdAt) || ""
      });

      return rules;
    }, []);
  }

  function normalizeHighlightGroups(value, rules) {
    var source = Array.isArray(value) ? value : [];
    var seen = {};
    var groups = [];

    function addGroup(item) {
      var name = normalizeGroupName(item && (item.name || item.groupName || item.group || item.category));
      var key = normalizeRuleText(name);
      var id = cleanText(item && item.id) || createHighlightGroupId(name);

      if (!key || seen[key]) {
        return;
      }

      seen[key] = true;
      groups.push({
        id: id,
        name: name,
        color: normalizeColor(item && item.color),
        enabled: !item || item.enabled !== false,
        createdAt: cleanText(item && item.createdAt) || ""
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

  function normalizeHiddenRules(value) {
    var source = Array.isArray(value) ? value : [];
    var seen = {};

    return source.reduce(function (rules, item, index) {
      var text = cleanText(item && item.value);
      var key = normalizeRuleText(text);

      if (!text || !key || seen[key]) {
        return rules;
      }

      seen[key] = true;
      rules.push({
        id: cleanText(item && item.id) || "hidden-rule-" + index,
        value: text,
        createdAt: cleanText(item && item.createdAt) || ""
      });

      return rules;
    }, []);
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
    var parent;

    if (!urnMatch) {
      return "";
    }

    parent = normalizeUrn(urnMatch[1]);
    return parent ? "urn:li:comment:(" + parent + "," + urnMatch[2] + ")" : "";
  }

  function canonicalizeId(value) {
    var raw = safeDecode(value);
    var commentUrn = normalizeCommentUrn(raw);
    var urnMatch = raw.match(/urn:li:(activity|share|ugcPost):[0-9]+/i);
    var updateMatch;
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

    activityMatch = raw.match(/(?:activityId|activityUrn|activity)[=:(\s'"]+(?:urn:li:activity:)?([0-9]{10,})/i);
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

  function isGenericLinkedInPage(value) {
    var url;

    try {
      url = new URL(value);
    } catch (error) {
      return false;
    }

    if (!/(^|\.)linkedin\.com$/i.test(url.hostname)) {
      return false;
    }

    return (
      /^\/feed\/?$/i.test(url.pathname) ||
      /^\/company\/[^/]+\/posts\/?$/i.test(url.pathname) ||
      /^\/in\/[^/]+\/?$/i.test(url.pathname) ||
      /^\/in\/[^/]+\/recent-activity\/?/i.test(url.pathname)
    );
  }

  function resolvePostUrl(post) {
    var storedUrl = cleanText(post && post.url);
    var postUrl = buildPostUrl(canonicalizeId(storedUrl)) || buildPostUrl(canonicalizeId(post && post.id));

    if (postUrl) {
      return postUrl;
    }

    return storedUrl && !isGenericLinkedInPage(storedUrl) ? storedUrl : "";
  }

  function resolvePostEmbedUrl(post) {
    var canonicalId = canonicalizeId(post && post.url) || canonicalizeId(post && post.id);
    var commentMatch;

    if (normalizeCommentUrn(canonicalId)) {
      commentMatch = canonicalId.match(/urn:li:comment:\((urn:li:(?:activity|share|ugcPost):[0-9]+),[0-9]+\)/i);
      canonicalId = commentMatch ? normalizeUrn(commentMatch[1]) : "";
    }

    return canonicalId
      ? "https://www.linkedin.com/embed/feed/update/" + canonicalId
      : "";
  }

  function openExternalUrl(url) {
    if (!url) {
      return;
    }

    if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
      chrome.tabs.create({ url: url });
      return;
    }

    window.open(url, "_blank", "noopener");
  }

  function formatDate(value) {
    var date = value ? new Date(value) : null;

    if (!date || Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  function getPostTitle(post, fallback) {
    var storedTitle = cleanText(post && (post.title || post.author || post.company));
    var canonicalId = canonicalizeId(post && (post.url || post.id));
    var numericId = canonicalId.match(/:([0-9]+)$/);

    return storedTitle || (numericId ? "LinkedIn post " + numericId[1] : fallback);
  }

  function getPostSummary(post) {
    return cleanText(post && post.text).slice(0, 420);
  }

  function getPostFolderLabel(post) {
    var folder = cleanText(post && post.folder) || "Unfiled";
    var subfolder = cleanText(post && post.subfolder);

    return subfolder ? folder + " / " + subfolder : folder;
  }

  function getSavedFolder(post) {
    return cleanText(post && post.folder) || "Unfiled";
  }

  function getSavedSubfolder(post) {
    return cleanText(post && post.subfolder);
  }

  function getCountLabel(count) {
    return count + " " + (count === 1 ? t("postSingular") : t("postPlural"));
  }

  function getSavedFolderStateKey(folderName) {
    return "folder:" + cleanText(folderName);
  }

  function getSavedSubfolderStateKey(folderName, subfolderName) {
    return "subfolder:" + cleanText(folderName) + ":" + cleanText(subfolderName);
  }

  function isSavedFolderExpanded(folderName) {
    var key = getSavedFolderStateKey(folderName);

    if (state.expandedSavedFolders[key] === undefined) {
      state.expandedSavedFolders[key] = false;
    }

    return state.expandedSavedFolders[key] !== false;
  }

  function setSavedFoldersExpanded(groups, expanded) {
    groups.forEach(function (folder) {
      state.expandedSavedFolders[getSavedFolderStateKey(folder.name)] = expanded;
    });
    renderTimeline();
  }

  function getRecords(records, dateKey) {
    return Object.values(records || {}).sort(function (left, right) {
      return new Date(right && right[dateKey]).getTime() - new Date(left && left[dateKey]).getTime();
    });
  }

  function matchesQuery(values) {
    var query = normalizeRuleText(state.query);

    if (!query) {
      return true;
    }

    return normalizeRuleText(values.join(" ")).includes(query);
  }

  function getHighlightGroupRows() {
    var byId = {};
    var groups = [];

    state.highlightGroups.forEach(function (group) {
      byId[group.id] = {
        group: group,
        rules: []
      };
      groups.push(byId[group.id]);
    });

    state.highlightRules.forEach(function (rule) {
      var groupId = getRuleGroupId(rule);
      var group;

      if (!byId[groupId]) {
        group = {
          id: groupId,
          name: getRuleGroupName(rule),
          color: normalizeColor(rule.color),
          enabled: true,
          createdAt: rule.createdAt
        };
        byId[groupId] = {
          group: group,
          rules: []
        };
        groups.push(byId[groupId]);
      }

      byId[groupId].rules.push(rule);
    });

    return groups;
  }

  function applyTheme() {
    document.documentElement.dataset.theme = state.settings.darkMode ? "dark" : "light";
  }

  function setText(node, text) {
    if (node) {
      node.textContent = text;
    }
  }

  function getSwitchTextNode(input) {
    var row = input && input.closest("label");

    return row ? row.querySelector("strong") : null;
  }

  function applyLocalizedText() {
    var language = normalizeLanguage(state.settings.language);
    var languageRow = elements.languageSelect && elements.languageSelect.closest(".language-row");
    var storageRow = elements.storageUsageValue && elements.storageUsageValue.closest(".storage-row");
    var memoryRow = elements.memoryUsageValue && elements.memoryUsageValue.closest(".memory-row");

    document.documentElement.lang = language;
    document.title = "LinkedIn Feedless " + t("dashboard");

    if (elements.navItems && elements.navItems.length) {
      setText(elements.navItems[0].querySelector("span:last-of-type"), t("savedPosts"));
      setText(elements.navItems[1].querySelector("span:last-of-type"), t("hiddenPosts"));
      setText(elements.navItems[2].querySelector("span:last-of-type"), t("highlightPosts"));
      setText(elements.navItems[3].querySelector("span:last-of-type"), t("settings"));
    }

    setText(elements.openLinkedInButton, t("openLinkedIn"));
    setText(elements.summarySaved && elements.summarySaved.previousElementSibling, t("saved"));
    setText(elements.summaryHidden && elements.summaryHidden.previousElementSibling, t("hiddenPosts"));
    setText(elements.summaryGroups && elements.summaryGroups.previousElementSibling, t("highlightGroups"));
    setText(elements.summaryHighlightWords && elements.summaryHighlightWords.previousElementSibling, t("highlightWords"));
    setText(getSwitchTextNode(elements.autoCleanHiddenToggle), t("autoCleanHiddenPosts"));
    setText(getSwitchTextNode(elements.autoHidePromotedToggle), t("autoHidePromotedPosts"));
    setText(getSwitchTextNode(elements.darkModeToggle), t("darkMode"));
    setText(getSwitchTextNode(elements.hiddenRulesEnabledToggle), t("autoHideMatchingPosts"));
    setText(getSwitchTextNode(elements.highlightEnabledToggle), t("highlightMatchingPosts"));
    setText(elements.hiddenRetentionControls && elements.hiddenRetentionControls.querySelector("span"), t("cleanAfter"));

    if (languageRow) {
      setText(languageRow.querySelector("strong"), t("language"));
      setText(languageRow.querySelector("small"), t("languageHint"));
    }

    if (storageRow) {
      storageRow.setAttribute("aria-label", t("storageUsed"));
      setText(storageRow.querySelector("strong"), t("storageUsed"));
      setText(storageRow.querySelector("small"), t("localDataSaved"));
    }

    if (memoryRow) {
      memoryRow.setAttribute("aria-label", t("memoryUsed"));
      setText(memoryRow.querySelector("strong"), t("memoryUsed"));
      setText(memoryRow.querySelector("small"), t("memoryHint"));
    }
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    elements.toast.textContent = cleanText(message) || t("changesSaved");
    elements.toast.hidden = false;
    toastTimer = window.setTimeout(function () {
      elements.toast.hidden = true;
    }, 1600);
  }

  async function loadState() {
    var items = await storageGet([
      STORAGE_KEYS.folders,
      STORAGE_KEYS.hiddenPosts,
      STORAGE_KEYS.hiddenRules,
      STORAGE_KEYS.highlightGroups,
      STORAGE_KEYS.highlightRules,
      STORAGE_KEYS.savedPosts,
      STORAGE_KEYS.settings,
      STORAGE_KEYS.subfolders
    ]);

    state.folders = normalizeFolders(items[STORAGE_KEYS.folders]);
    state.hiddenPosts = normalizeRecords(items[STORAGE_KEYS.hiddenPosts]);
    state.hiddenRules = normalizeHiddenRules(items[STORAGE_KEYS.hiddenRules]);
    state.highlightRules = normalizeHighlightRules(items[STORAGE_KEYS.highlightRules]);
    state.highlightGroups = normalizeHighlightGroups(items[STORAGE_KEYS.highlightGroups], state.highlightRules);
    state.savedPosts = normalizeSavedRecords(items[STORAGE_KEYS.savedPosts]);
    state.settings = normalizeSettings(items[STORAGE_KEYS.settings]);
    state.subfolders = normalizeSubfolders(items[STORAGE_KEYS.subfolders], state.folders, state.savedPosts);
    if (savedRecordsContainContent(items[STORAGE_KEYS.savedPosts])) {
      await storageSet({ savedPosts: state.savedPosts });
    }
    applyTheme();
    await refreshStorageUsage();
  }

  async function persist(partial, message) {
    var changedKeys = Object.keys(partial || {});

    await storageSet(partial);
    Object.assign(state, partial);
    state.folders = normalizeFolders(state.folders);
    state.hiddenPosts = normalizeRecords(state.hiddenPosts);
    state.hiddenRules = normalizeHiddenRules(state.hiddenRules);
    state.highlightRules = normalizeHighlightRules(state.highlightRules);
    state.highlightGroups = normalizeHighlightGroups(state.highlightGroups, state.highlightRules);
    state.savedPosts = normalizeSavedRecords(state.savedPosts);
    state.settings = normalizeSettings(state.settings);
    state.subfolders = normalizeSubfolders(state.subfolders, state.folders, state.savedPosts);
    applyTheme();
    await refreshStorageUsage();
    render();
    await notifyLinkedInTabs(changedKeys);
    showToast(message || t("changesSaved"));
  }

  function createTimelineItem(card, color) {
    var item = createElement("article", { className: "timeline-item" });
    var marker = createElement("div", { className: "timeline-marker" });
    var dot = createElement("span", { className: "timeline-dot" });

    if (color) {
      dot.style.background = color;
    }

    marker.appendChild(dot);
    item.appendChild(marker);
    item.appendChild(card);
    return item;
  }

  function createChip(text, className) {
    return createElement("span", {
      className: "chip" + (className ? " " + className : ""),
      text: text
    });
  }

  function createButton(text, className) {
    return createElement("button", {
      className: "button" + (className ? " " + className : ""),
      text: text,
      attrs: { type: "button" }
    });
  }

  function renderPostCard(post, kind, options) {
    var opts = options || {};
    var card = createElement("div", { className: "card" });
    var header = createElement("div", { className: "card-header" });
    var titleWrap = createElement("div");
    var title = createElement("h2", {
      text: getPostTitle(post, kind === "saved" ? "Saved post" : "Hidden post")
    });
    var meta = createElement("small", {
      text: [
        post.author,
        post.company,
        formatDate(kind === "saved" ? post.savedAt : post.hiddenAt)
      ].filter(Boolean).join(" - ")
    });
    var chips = createElement("div", { className: "chips" });
    var summary = getPostSummary(post);
    var actions = createElement("div", { className: "card-actions" });
    var url = resolvePostUrl(post);
    var embedUrl = kind === "saved" ? resolvePostEmbedUrl(post) : "";
    var open = createButton("Open post", "primary");
    var preview = createButton("Show original post", "");
    var previewFrame;

    titleWrap.appendChild(title);
    if (meta.textContent) {
      titleWrap.appendChild(meta);
    }
    header.appendChild(titleWrap);
    card.appendChild(header);

    if (kind === "saved") {
      if (!opts.hideFolderChip) {
        chips.appendChild(createChip(getPostFolderLabel(post)));
      }
    } else if (post.hiddenRuleValue) {
      chips.appendChild(createChip("Matched: " + post.hiddenRuleValue));
    } else {
      chips.appendChild(createChip("Manually hidden"));
    }

    if (chips.children.length) {
      card.appendChild(chips);
    }

    if (summary) {
      card.appendChild(createElement("p", { text: summary }));
    }

    if (url) {
      open.addEventListener("click", function () {
        openExternalUrl(url);
      });
    } else {
      open.disabled = true;
    }
    actions.appendChild(open);

    if (embedUrl) {
      preview.addEventListener("click", function () {
        if (!previewFrame) {
          previewFrame = createElement("div", { className: "linkedin-post-preview" });
          previewFrame.appendChild(createElement("iframe", {
            attrs: {
              src: embedUrl,
              title: "Original LinkedIn post",
              loading: "lazy",
              allowfullscreen: "true"
            }
          }));
          card.insertBefore(previewFrame, actions);
          preview.textContent = "Hide original post";
          return;
        }

        previewFrame.hidden = !previewFrame.hidden;
        preview.textContent = previewFrame.hidden ? "Show original post" : "Hide original post";
      });
      actions.appendChild(preview);
    }

    if (kind === "saved") {
      actions.appendChild(createRemoveSavedButton(post));
    } else {
      actions.appendChild(createRestoreHiddenButton(post));
    }

    card.appendChild(actions);
    return card;
  }

  function createRemoveSavedButton(post) {
    var button = createButton("Remove", "danger");

    button.addEventListener("click", async function () {
      delete state.savedPosts[post.id];
      await persist({ savedPosts: state.savedPosts }, t("savedPostRemoved"));
    });

    return button;
  }

  function createRestoreHiddenButton(post) {
    var button = createButton("Restore", "");

    button.addEventListener("click", async function () {
      delete state.hiddenPosts[post.id];
      await persist({ hiddenPosts: state.hiddenPosts }, "Post restored");
    });

    return button;
  }

  async function deleteHighlightGroup(groupId) {
    var row = getHighlightGroupRows().find(function (item) {
      return item.group.id === groupId;
    });
    var message;

    if (!row) {
      return;
    }

    message = row.rules.length
      ? 'Delete "' + row.group.name + '"? ' + row.rules.length + (row.rules.length === 1 ? " highlight word" : " highlight words") + " will be removed."
      : 'Delete "' + row.group.name + '"?';

    if (!window.confirm(message)) {
      return;
    }

    state.highlightGroups = state.highlightGroups.filter(function (group) {
      return group.id !== groupId;
    });
    state.highlightRules = state.highlightRules.filter(function (rule) {
      return getRuleGroupId(rule) !== groupId;
    });

    await persist({
      highlightGroups: state.highlightGroups,
      highlightRules: state.highlightRules
    }, "Group deleted");
  }

  function getSavedFolderGroups(options) {
    var opts = options || {};
    var folderMap = {};
    var folderOrder = [];
    var posts = getRecords(state.savedPosts, "savedAt").filter(function (post) {
      return opts.ignoreQuery || matchesQuery([post.title, post.author, post.company, post.text, post.folder, post.subfolder]);
    });

    function addFolderName(folderName) {
      if (folderMap[folderName]) {
        return folderMap[folderName];
      }

      folderMap[folderName] = {
        name: folderName,
        directPosts: [],
        subfolders: {},
        subfolderOrder: [],
        total: 0
      };
      folderOrder.push(folderName);
      return folderMap[folderName];
    }

    function addSubfolderName(folder, subfolderName) {
      if (!folder.subfolders[subfolderName]) {
        folder.subfolders[subfolderName] = [];
        folder.subfolderOrder.push(subfolderName);
      }

      return folder.subfolders[subfolderName];
    }

    state.folders.forEach(function (folderName) {
      var folder = addFolderName(folderName);

      (state.subfolders[folderName] || []).forEach(function (subfolderName) {
        addSubfolderName(folder, subfolderName);
      });
    });

    posts.forEach(function (post) {
      var folderName = getSavedFolder(post);
      var subfolderName = getSavedSubfolder(post);
      var folder = addFolderName(folderName);

      folder.total += 1;

      if (subfolderName) {
        addSubfolderName(folder, subfolderName).push(post);
        return;
      }

      folder.directPosts.push(post);
    });

    return folderOrder.map(function (folderName) {
      return folderMap[folderName];
    }).filter(function (folder) {
      return folder.total > 0;
    });
  }

  function renderSavedPostList(posts) {
    var list = createElement("div", { className: "saved-post-list" });

    posts.forEach(function (post) {
      list.appendChild(renderPostCard(post, "saved", { hideFolderChip: true }));
    });

    return list;
  }

  function renderSavedFolderToolbar(groups) {
    var toolbar = createElement("div", { className: "saved-folder-toolbar" });
    var expandAll = createButton(t("expandAll"), "");
    var collapseAll = createButton(t("collapseAll"), "");

    expandAll.addEventListener("click", function () {
      setSavedFoldersExpanded(groups, true);
    });
    collapseAll.addEventListener("click", function () {
      setSavedFoldersExpanded(groups, false);
    });

    toolbar.appendChild(expandAll);
    toolbar.appendChild(collapseAll);
    return toolbar;
  }

  function renderSavedSubfolderGroup(folderName, name, posts) {
    var section = createElement("section", { className: "saved-subfolder-section" });
    var header = createElement("div", { className: "saved-subfolder-header" });
    var key = getSavedSubfolderStateKey(folderName, name);
    var collapsible = Boolean(cleanText(name));
    var expanded = collapsible && state.expandedSavedSubfolders[key] === true;
    var toggle;

    header.appendChild(createElement("h3", { text: name || t("noSubfolder") }));
    header.appendChild(createElement("span", { text: getCountLabel(posts.length) }));
    section.appendChild(header);

    if (collapsible) {
      toggle = createElement("button", {
        className: "saved-subfolder-toggle",
        text: expanded ? t("collapseFolder") : t("expandFolder"),
        attrs: {
          type: "button",
          "aria-expanded": expanded ? "true" : "false"
        }
      });
      header.appendChild(toggle);
      section.classList.toggle("is-collapsed", !expanded);
      toggle.addEventListener("click", function () {
        state.expandedSavedSubfolders[key] = !expanded;
        renderTimeline();
      });
    }

    var postList = renderSavedPostList(posts);
    postList.hidden = collapsible && !expanded;
    section.appendChild(postList);
    return section;
  }

  function renderSavedFolderGroup(folder) {
    var section = createElement("article", { className: "saved-folder-section" });
    var header = createElement("div", { className: "saved-folder-header" });
    var titleWrap = createElement("div", { className: "saved-folder-title" });
    var content = createElement("div", { className: "saved-folder-content" });
    var expanded = isSavedFolderExpanded(folder.name);
    var toggle = createElement("button", {
      className: "saved-folder-toggle",
      text: expanded ? t("collapseFolder") : t("expandFolder"),
      attrs: {
        type: "button",
        "aria-expanded": expanded ? "true" : "false"
      }
    });

    section.classList.toggle("is-collapsed", !expanded);
    section.dataset.folderName = folder.name;
    titleWrap.appendChild(createElement("h2", { text: folder.name }));
    titleWrap.appendChild(createElement("small", { text: getCountLabel(folder.total) }));
    header.appendChild(titleWrap);
    header.appendChild(toggle);
    section.appendChild(header);
    content.hidden = !expanded;

    toggle.addEventListener("click", function () {
      if (!expanded) {
        folder.subfolderOrder.forEach(function (subfolderName) {
          state.expandedSavedSubfolders[getSavedSubfolderStateKey(folder.name, subfolderName)] = false;
        });
      }
      state.expandedSavedFolders[getSavedFolderStateKey(folder.name)] = !expanded;
      renderTimeline();
    });

    if (folder.directPosts.length) {
      content.appendChild(renderSavedSubfolderGroup(folder.name, "", folder.directPosts));
    }

    folder.subfolderOrder.forEach(function (subfolderName) {
      var posts = folder.subfolders[subfolderName] || [];

      if (posts.length) {
        content.appendChild(renderSavedSubfolderGroup(folder.name, subfolderName, posts));
      }
    });

    section.appendChild(content);
    return section;
  }

  function renderSavedTimeline() {
    var groups = getSavedFolderGroups();

    if (!groups.length) {
      return [];
    }

    return [renderSavedFolderToolbar(groups)].concat(groups.map(renderSavedFolderGroup));
  }

  function openSavedLocation(folderName, subfolderName) {
    var folderKey = getSavedFolderStateKey(folderName);

    Object.keys(state.expandedSavedFolders).forEach(function (key) {
      state.expandedSavedFolders[key] = false;
    });
    Object.keys(state.expandedSavedSubfolders).forEach(function (key) {
      state.expandedSavedSubfolders[key] = false;
    });

    state.selectedSavedFolder = folderName;
    state.selectedSavedSubfolder = subfolderName || "";
    state.expandedSavedFolders[folderKey] = true;
    if (subfolderName) {
      state.expandedSavedSubfolders[getSavedSubfolderStateKey(folderName, subfolderName)] = true;
    }

    setView("saved");
    window.requestAnimationFrame(function () {
      var target = Array.prototype.find.call(
        document.querySelectorAll(".saved-folder-section"),
        function (section) {
          return section.dataset.folderName === folderName;
        }
      );

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  function renderSavedFolderNav() {
    var groups = getSavedFolderGroups({ ignoreQuery: true });

    elements.savedFolderNav.replaceChildren();
    elements.savedFolderNav.hidden = state.view !== "saved" || !groups.length;

    groups.forEach(function (folder) {
      var group = createElement("div", { className: "saved-folder-nav-group" });
      var folderButton = createElement("button", {
        className: "saved-folder-nav-item" + (state.selectedSavedFolder === folder.name && !state.selectedSavedSubfolder ? " is-active" : ""),
        attrs: { type: "button", title: folder.name }
      });
      var folderName = createElement("span", { text: folder.name });
      var count = createElement("strong", { text: String(folder.total) });

      folderButton.appendChild(folderName);
      folderButton.appendChild(count);
      folderButton.addEventListener("click", function () {
        openSavedLocation(folder.name, "");
      });
      group.appendChild(folderButton);

      folder.subfolderOrder.forEach(function (subfolderName) {
        var posts = folder.subfolders[subfolderName] || [];
        var subfolderButton;

        if (!posts.length) {
          return;
        }

        subfolderButton = createElement("button", {
          className: "saved-subfolder-nav-item" + (state.selectedSavedFolder === folder.name && state.selectedSavedSubfolder === subfolderName ? " is-active" : ""),
          attrs: { type: "button", title: folder.name + " / " + subfolderName }
        });
        subfolderButton.appendChild(createElement("span", { text: subfolderName }));
        subfolderButton.appendChild(createElement("strong", { text: String(posts.length) }));
        subfolderButton.addEventListener("click", function () {
          openSavedLocation(folder.name, subfolderName);
        });
        group.appendChild(subfolderButton);
      });

      elements.savedFolderNav.appendChild(group);
    });
  }

  function renderHiddenTimeline() {
    return getRecords(state.hiddenPosts, "hiddenAt").filter(function (post) {
      return matchesQuery([post.title, post.author, post.company, post.text, post.hiddenRuleValue]);
    }).map(function (post) {
      return createTimelineItem(renderPostCard(post, "hidden"));
    });
  }

  function renderHighlightTimeline() {
    return getHighlightGroupRows().filter(function (row) {
      return matchesQuery([row.group.name].concat(row.rules.map(function (rule) {
        return rule.value;
      })));
    }).map(function (row, index) {
      var card = createElement("div", { className: "card" });
      var header = createElement("div", { className: "card-header" });
      var titleWrap = createElement("div");
      var chips = createElement("div", { className: "chips" });
      var words = createElement("div", { className: "word-list" });
      var colorChip = createChip(row.group.color.toUpperCase(), "chip--color");
      var actions = createElement("div", { className: "card-actions" });
      var remove = createButton("Delete group", "danger");

      colorChip.style.setProperty("--chip-color", row.group.color);
      titleWrap.appendChild(createElement("h2", { text: row.group.name }));
      titleWrap.appendChild(
        createElement("small", {
          text:
            (index === 0 ? "Highest priority" : "Priority " + (index + 1)) +
            " - " +
            row.rules.length +
            (row.rules.length === 1 ? " word" : " words")
        })
      );
      header.appendChild(titleWrap);
      card.appendChild(header);

      chips.appendChild(colorChip);
      chips.appendChild(createChip(
        state.settings.highlightEnabled && row.group.enabled !== false ? "Enabled" : "Paused"
      ));
      card.appendChild(chips);

      row.rules.forEach(function (rule) {
        words.appendChild(createElement("span", { className: "word-pill", text: rule.value }));
      });

      if (words.children.length) {
        card.appendChild(words);
      }

      remove.addEventListener("click", async function () {
        await deleteHighlightGroup(row.group.id);
      });
      actions.appendChild(remove);
      card.appendChild(actions);

      return createTimelineItem(card, row.group.color);
    });
  }

  function renderSettings() {
    elements.autoHidePromotedToggle.checked = Boolean(state.settings.autoHidePromoted);
    elements.autoCleanHiddenToggle.checked = Boolean(state.settings.autoCleanHidden);
    elements.darkModeToggle.checked = Boolean(state.settings.darkMode);
    elements.hiddenRulesEnabledToggle.checked = state.settings.hiddenRulesEnabled !== false;
    elements.highlightEnabledToggle.checked = state.settings.highlightEnabled !== false;
    elements.hiddenRetentionAmount.value = String(state.settings.hiddenRetentionAmount);
    elements.hiddenRetentionUnit.value = state.settings.hiddenRetentionUnit;
    elements.languageSelect.value = normalizeLanguage(state.settings.language);
    elements.hiddenRetentionControls.classList.toggle("is-disabled", !state.settings.autoCleanHidden);
    elements.hiddenRetentionAmount.disabled = !state.settings.autoCleanHidden;
    elements.hiddenRetentionUnit.disabled = !state.settings.autoCleanHidden;
    elements.storageUsageValue.textContent = formatStorageSize(state.storageBytes);
    elements.memoryUsageValue.textContent = formatMemorySize(getMemoryUsageBytes());
    applyLocalizedText();
  }

  function renderSummary() {
    elements.savedCount.textContent = String(Object.keys(state.savedPosts).length);
    elements.hiddenCount.textContent = String(Object.keys(state.hiddenPosts).length);
    elements.highlightCount.textContent = String(state.highlightRules.length);
    elements.summarySaved.textContent = String(Object.keys(state.savedPosts).length);
    elements.summaryHidden.textContent = String(Object.keys(state.hiddenPosts).length);
    elements.summaryGroups.textContent = String(state.highlightGroups.length);
    elements.summaryHighlightWords.textContent = String(state.highlightRules.length);
  }

  function renderTimeline() {
    var items = [];

    elements.timeline.replaceChildren();
    elements.timeline.classList.toggle("timeline--folders", state.view === "saved");
    elements.timeline.hidden = state.view === "settings";
    elements.settingsPanel.hidden = state.view !== "settings";

    if (state.view === "saved") {
      items = renderSavedTimeline();
    } else if (state.view === "hidden") {
      items = renderHiddenTimeline();
    } else if (state.view === "highlight") {
      items = renderHighlightTimeline();
    }

    items.forEach(function (item) {
      elements.timeline.appendChild(item);
    });

    renderEmpty(items.length);
  }

  function renderEmpty(count) {
    var hasQuery = cleanText(state.query).length > 0;

    elements.emptyState.hidden = state.view === "settings" || count > 0;

    if (elements.emptyState.hidden) {
      return;
    }

    if (state.view === "saved") {
      elements.emptyTitle.textContent = hasQuery ? t("noSavedMatches") : t("nothingSaved");
      elements.emptyText.textContent = hasQuery ? t("tryAnotherSearch") : "Saved posts will appear here.";
    } else if (state.view === "hidden") {
      elements.emptyTitle.textContent = hasQuery ? t("noHiddenMatches") : t("nothingHidden");
      elements.emptyText.textContent = hasQuery ? t("tryAnotherSearch") : "Hidden posts will appear here.";
    } else {
      elements.emptyTitle.textContent = hasQuery ? t("noHighlightMatches") : t("noHighlightGroups");
      elements.emptyText.textContent = hasQuery ? t("tryAnotherSearch") : "Highlight groups will appear here.";
    }
  }

  function setView(view) {
    state.view = view;
    elements.navItems.forEach(function (item) {
      item.classList.toggle("is-active", item.dataset.view === view);
    });
    elements.viewTitle.textContent =
      view === "saved"
        ? t("savedPosts")
        : view === "hidden"
          ? t("hiddenPosts")
          : view === "highlight"
            ? t("highlightPosts")
            : t("settings");
    elements.viewKicker.textContent = view === "settings" ? t("preferences") : t("timeline");
    elements.searchInput.disabled = view === "settings";
    elements.searchInput.placeholder =
      view === "highlight"
        ? t("searchHighlightGroups")
        : view === "hidden"
          ? t("searchHiddenPosts")
          : t("searchSavedPosts");
    render();
  }

  function render() {
    renderSummary();
    renderSettings();
    renderSavedFolderNav();
    renderTimeline();
  }

  function bindElements() {
    elements.navItems = Array.prototype.slice.call(document.querySelectorAll(".nav-item"));
    elements.savedCount = document.getElementById("savedCount");
    elements.savedFolderNav = document.getElementById("savedFolderNav");
    elements.hiddenCount = document.getElementById("hiddenCount");
    elements.highlightCount = document.getElementById("highlightCount");
    elements.summarySaved = document.getElementById("summarySaved");
    elements.summaryHidden = document.getElementById("summaryHidden");
    elements.summaryGroups = document.getElementById("summaryGroups");
    elements.summaryHighlightWords = document.getElementById("summaryHighlightWords");
    elements.viewKicker = document.getElementById("viewKicker");
    elements.viewTitle = document.getElementById("viewTitle");
    elements.searchInput = document.getElementById("searchInput");
    elements.timeline = document.getElementById("timeline");
    elements.emptyState = document.getElementById("emptyState");
    elements.emptyTitle = document.getElementById("emptyTitle");
    elements.emptyText = document.getElementById("emptyText");
    elements.settingsPanel = document.getElementById("settingsPanel");
    elements.autoCleanHiddenToggle = document.getElementById("autoCleanHiddenToggle");
    elements.autoHidePromotedToggle = document.getElementById("autoHidePromotedToggle");
    elements.darkModeToggle = document.getElementById("darkModeToggle");
    elements.hiddenRulesEnabledToggle = document.getElementById("hiddenRulesEnabledToggle");
    elements.highlightEnabledToggle = document.getElementById("highlightEnabledToggle");
    elements.hiddenRetentionControls = document.getElementById("hiddenRetentionControls");
    elements.hiddenRetentionAmount = document.getElementById("hiddenRetentionAmount");
    elements.hiddenRetentionUnit = document.getElementById("hiddenRetentionUnit");
    elements.languageSelect = document.getElementById("languageSelect");
    elements.storageUsageValue = document.getElementById("storageUsageValue");
    elements.memoryUsageValue = document.getElementById("memoryUsageValue");
    elements.openLinkedInButton = document.getElementById("openLinkedInButton");
    elements.toast = document.getElementById("toast");
  }

  function bindEvents() {
    elements.navItems.forEach(function (item) {
      item.addEventListener("click", function () {
        setView(item.dataset.view || "saved");
      });
    });

    elements.searchInput.addEventListener("input", function () {
      state.query = elements.searchInput.value;
      renderTimeline();
    });

    elements.openLinkedInButton.addEventListener("click", function () {
      openExternalUrl("https://www.linkedin.com/feed/");
    });

    elements.autoCleanHiddenToggle.addEventListener("change", async function () {
      state.settings.autoCleanHidden = elements.autoCleanHiddenToggle.checked;
      await persist({ settings: state.settings }, t("changesSaved"));
    });

    elements.autoHidePromotedToggle.addEventListener("change", async function () {
      state.settings.autoHidePromoted = elements.autoHidePromotedToggle.checked;
      await persist({ settings: state.settings }, t("changesSaved"));
    });

    elements.darkModeToggle.addEventListener("change", async function () {
      state.settings.darkMode = elements.darkModeToggle.checked;
      await persist({ settings: state.settings }, t("changesSaved"));
    });

    elements.languageSelect.addEventListener("change", async function () {
      state.settings.language = normalizeLanguage(elements.languageSelect.value);
      await persist({ settings: state.settings }, t("changesSaved"));
    });

    elements.hiddenRulesEnabledToggle.addEventListener("change", async function () {
      state.settings.hiddenRulesEnabled = elements.hiddenRulesEnabledToggle.checked;
      await persist({ settings: state.settings }, t("changesSaved"));
    });

    elements.highlightEnabledToggle.addEventListener("change", async function () {
      state.settings.highlightEnabled = elements.highlightEnabledToggle.checked;
      await persist({ settings: state.settings }, t("changesSaved"));
    });

    elements.hiddenRetentionAmount.addEventListener("change", async function () {
      state.settings.hiddenRetentionAmount = normalizeRetentionAmount(elements.hiddenRetentionAmount.value);
      await persist({ settings: state.settings }, t("changesSaved"));
    });

    elements.hiddenRetentionUnit.addEventListener("change", async function () {
      state.settings.hiddenRetentionUnit = normalizeRetentionUnit(elements.hiddenRetentionUnit.value);
      await persist({ settings: state.settings }, t("changesSaved"));
    });
  }

  function watchStorageChanges() {
    var storageEvents = hasBrowserPromises ? browser.storage : chrome.storage;

    if (!storageEvents || !storageEvents.onChanged) {
      return;
    }

    storageEvents.onChanged.addListener(function (changes, areaName) {
      if (areaName !== "local" || !Object.keys(changes || {}).length) {
        return;
      }

      loadState().then(render);
    });
  }

  bindElements();
  bindEvents();
  loadState()
    .then(function () {
      setView("saved");
      watchStorageChanges();
    })
    .catch(function (error) {
      console.warn("LinkedIn Feedless dashboard failed to start", error);
    });
})();
