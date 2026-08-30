(function () {
  "use strict";

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
      addAutoHideRule: "Add auto-hide rule",
      addFolder: "Add folder",
      addSubfolder: "Add subfolder",
      addWordSentence: "Add a word or sentence. Matching posts will be hidden automatically.",
      autoHideWords: "Auto-hide Words",
      wordOrSentence: "Word or sentence",
      alreadyHidden: "Already added in Hidden Posts",
      alreadyHighlight: "Already added in Highlight Posts",
      autoCleanHiddenPosts: "Auto-clean hidden posts",
      autoHideMatchingPosts: "Auto-hide matching posts",
      autoHidePromotedPosts: "Auto-hide promoted posts",
      calculating: "Calculating...",
      changesSaved: "Changes saved",
      chooseFolderFirst: "Choose a folder first",
      cleanAfter: "Clean after",
      clearHidden: "Clear Hidden",
      createGroup: "Create group",
      createGroupDescription: "Create a group first, then open it to add words or sentences. Top groups have priority.",
      dashboard: "Dashboard",
      darkMode: "Dark mode",
      folders: "Folders",
      hiddenPosts: "Hidden Posts",
      highlightMatchingPosts: "Highlight matching posts",
      highlightPosts: "Highlight Posts",
      language: "Language",
      languageHint: "Changes popup, dashboard, and LinkedIn buttons",
      localDataSaved: "Local data saved by the extension",
      memoryHint: "Approximate JS heap for this extension page",
      memoryUsed: "Memory usage",
      noHiddenMatches: "No hidden matches",
      noPostsHere: "No posts here",
      noSavedMatches: "No saved matches",
      nothingHidden: "Nothing hidden",
      nothingSaved: "Nothing saved yet",
      openLinkedIn: "Open LinkedIn",
      order: "Order",
      savedLibrary: "Saved library",
      savedPostRemoved: "Saved post removed",
      savedPosts: "Saved Posts",
      searchHiddenPosts: "Search hidden posts",
      searchSavedPosts: "Search saved posts",
      settings: "Settings",
      sort: "Sort",
      storageUsed: "Storage used",
      subfolders: "Subfolders",
      tryDifferentSearch: "Try a different search.",
      unavailable: "Unavailable"
    },
    "pt-BR": {
      addAutoHideRule: "Adicionar regra de ocultacao",
      addFolder: "Adicionar pasta",
      addSubfolder: "Adicionar subpasta",
      addWordSentence: "Adicione uma palavra ou frase. Posts correspondentes serao ocultados automaticamente.",
      autoHideWords: "Palavras para ocultar",
      wordOrSentence: "Palavra ou frase",
      alreadyHidden: "Ja adicionado em Posts Ocultos",
      alreadyHighlight: "Ja adicionado em Posts Destacados",
      autoCleanHiddenPosts: "Limpeza automatica de posts ocultos",
      autoHideMatchingPosts: "Ocultar posts correspondentes",
      autoHidePromotedPosts: "Ocultar posts promovidos",
      calculating: "Calculando...",
      changesSaved: "Alteracoes salvas",
      chooseFolderFirst: "Escolha uma pasta primeiro",
      cleanAfter: "Limpar apos",
      clearHidden: "Limpar ocultos",
      createGroup: "Criar grupo",
      createGroupDescription: "Crie um grupo primeiro, depois abra para adicionar palavras ou frases. Grupos no topo tem prioridade.",
      dashboard: "Painel",
      darkMode: "Modo escuro",
      folders: "Pastas",
      hiddenPosts: "Posts Ocultos",
      highlightMatchingPosts: "Destacar posts correspondentes",
      highlightPosts: "Posts Destacados",
      language: "Idioma",
      languageHint: "Altera popup, painel e botoes no LinkedIn",
      localDataSaved: "Dados locais salvos pela extensao",
      memoryHint: "Heap JS aproximado desta pagina da extensao",
      memoryUsed: "Uso de memoria",
      noHiddenMatches: "Nenhum oculto encontrado",
      noPostsHere: "Nenhum post aqui",
      noSavedMatches: "Nenhum salvo encontrado",
      nothingHidden: "Nada oculto",
      nothingSaved: "Nada salvo ainda",
      openLinkedIn: "Abrir LinkedIn",
      order: "Ordem",
      savedLibrary: "Biblioteca salva",
      savedPostRemoved: "Post salvo removido",
      savedPosts: "Posts Salvos",
      searchHiddenPosts: "Buscar posts ocultos",
      searchSavedPosts: "Buscar posts salvos",
      settings: "Configuracoes",
      sort: "Ordenar",
      storageUsed: "Armazenamento usado",
      subfolders: "Subpastas",
      tryDifferentSearch: "Tente outra busca.",
      unavailable: "Indisponivel"
    },
    es: {
      addAutoHideRule: "Agregar regla de ocultar",
      addFolder: "Agregar carpeta",
      addSubfolder: "Agregar subcarpeta",
      addWordSentence: "Agrega una palabra o frase. Las publicaciones coincidentes se ocultaran automaticamente.",
      autoHideWords: "Palabras para ocultar",
      wordOrSentence: "Palabra o frase",
      alreadyHidden: "Ya esta en Publicaciones ocultas",
      alreadyHighlight: "Ya esta en Publicaciones destacadas",
      autoCleanHiddenPosts: "Limpiar publicaciones ocultas automaticamente",
      autoHideMatchingPosts: "Ocultar publicaciones coincidentes",
      autoHidePromotedPosts: "Ocultar publicaciones promocionadas",
      calculating: "Calculando...",
      changesSaved: "Cambios guardados",
      chooseFolderFirst: "Elige una carpeta primero",
      cleanAfter: "Limpiar despues de",
      clearHidden: "Limpiar ocultas",
      createGroup: "Crear grupo",
      createGroupDescription: "Crea un grupo primero y luego abrelo para agregar palabras o frases. Los grupos superiores tienen prioridad.",
      dashboard: "Panel",
      darkMode: "Modo oscuro",
      folders: "Carpetas",
      hiddenPosts: "Publicaciones ocultas",
      highlightMatchingPosts: "Destacar publicaciones coincidentes",
      highlightPosts: "Publicaciones destacadas",
      language: "Idioma",
      languageHint: "Cambia el popup, el panel y los botones de LinkedIn",
      localDataSaved: "Datos locales guardados por la extension",
      memoryHint: "Heap JS aproximado de esta pagina de la extension",
      memoryUsed: "Uso de memoria",
      noHiddenMatches: "No hay coincidencias ocultas",
      noPostsHere: "No hay publicaciones aqui",
      noSavedMatches: "No hay coincidencias guardadas",
      nothingHidden: "Nada oculto",
      nothingSaved: "Nada guardado aun",
      openLinkedIn: "Abrir LinkedIn",
      order: "Orden",
      savedLibrary: "Biblioteca guardada",
      savedPostRemoved: "Publicacion guardada eliminada",
      savedPosts: "Publicaciones guardadas",
      searchHiddenPosts: "Buscar publicaciones ocultas",
      searchSavedPosts: "Buscar publicaciones guardadas",
      settings: "Configuracion",
      sort: "Ordenar",
      storageUsed: "Almacenamiento usado",
      subfolders: "Subcarpetas",
      tryDifferentSearch: "Prueba otra busqueda.",
      unavailable: "No disponible"
    },
    de: {
      addAutoHideRule: "Auto-Ausblendregel hinzufuegen",
      addFolder: "Ordner hinzufuegen",
      addSubfolder: "Unterordner hinzufuegen",
      addWordSentence: "Fuege ein Wort oder einen Satz hinzu. Passende Beitraege werden automatisch ausgeblendet.",
      autoHideWords: "Auto-Ausblendwoerter",
      wordOrSentence: "Wort oder Satz",
      alreadyHidden: "Schon in Ausgeblendete Beitraege hinzugefuegt",
      alreadyHighlight: "Schon in Hervorgehobene Beitraege hinzugefuegt",
      autoCleanHiddenPosts: "Ausgeblendete Beitraege automatisch bereinigen",
      autoHideMatchingPosts: "Passende Beitraege ausblenden",
      autoHidePromotedPosts: "Gesponserte Beitraege ausblenden",
      calculating: "Wird berechnet...",
      changesSaved: "Aenderungen gespeichert",
      chooseFolderFirst: "Waehle zuerst einen Ordner",
      cleanAfter: "Bereinigen nach",
      clearHidden: "Ausgeblendete leeren",
      createGroup: "Gruppe erstellen",
      createGroupDescription: "Erstelle zuerst eine Gruppe und oeffne sie dann, um Woerter oder Saetze hinzuzufuegen. Obere Gruppen haben Prioritaet.",
      dashboard: "Dashboard",
      darkMode: "Dunkler Modus",
      folders: "Ordner",
      hiddenPosts: "Ausgeblendete Beitraege",
      highlightMatchingPosts: "Passende Beitraege hervorheben",
      highlightPosts: "Hervorgehobene Beitraege",
      language: "Sprache",
      languageHint: "Aendert Popup, Dashboard und LinkedIn-Schaltflaechen",
      localDataSaved: "Von der Erweiterung gespeicherte lokale Daten",
      memoryHint: "Ungefaehre JS-Heap-Nutzung dieser Erweiterungsseite",
      memoryUsed: "Speichernutzung",
      noHiddenMatches: "Keine ausgeblendeten Treffer",
      noPostsHere: "Keine Beitraege hier",
      noSavedMatches: "Keine gespeicherten Treffer",
      nothingHidden: "Nichts ausgeblendet",
      nothingSaved: "Noch nichts gespeichert",
      openLinkedIn: "LinkedIn oeffnen",
      order: "Reihenfolge",
      savedLibrary: "Gespeicherte Bibliothek",
      savedPostRemoved: "Gespeicherter Beitrag entfernt",
      savedPosts: "Gespeicherte Beitraege",
      searchHiddenPosts: "Ausgeblendete Beitraege suchen",
      searchSavedPosts: "Gespeicherte Beitraege suchen",
      settings: "Einstellungen",
      sort: "Sortieren",
      storageUsed: "Speicher belegt",
      subfolders: "Unterordner",
      tryDifferentSearch: "Versuche eine andere Suche.",
      unavailable: "Nicht verfuegbar"
    },
    fr: {
      addAutoHideRule: "Ajouter une regle de masquage",
      addFolder: "Ajouter un dossier",
      addSubfolder: "Ajouter un sous-dossier",
      addWordSentence: "Ajoutez un mot ou une phrase. Les posts correspondants seront masques automatiquement.",
      autoHideWords: "Mots a masquer",
      wordOrSentence: "Mot ou phrase",
      alreadyHidden: "Deja ajoute dans Posts masques",
      alreadyHighlight: "Deja ajoute dans Posts en surbrillance",
      autoCleanHiddenPosts: "Nettoyer automatiquement les posts masques",
      autoHideMatchingPosts: "Masquer les posts correspondants",
      autoHidePromotedPosts: "Masquer les posts sponsorises",
      calculating: "Calcul...",
      changesSaved: "Modifications enregistrees",
      chooseFolderFirst: "Choisissez d'abord un dossier",
      cleanAfter: "Nettoyer apres",
      clearHidden: "Effacer les masques",
      createGroup: "Creer un groupe",
      createGroupDescription: "Creez d'abord un groupe, puis ouvrez-le pour ajouter des mots ou phrases. Les groupes du haut ont la priorite.",
      dashboard: "Tableau de bord",
      darkMode: "Mode sombre",
      folders: "Dossiers",
      hiddenPosts: "Posts masques",
      highlightMatchingPosts: "Mettre en surbrillance les posts correspondants",
      highlightPosts: "Posts en surbrillance",
      language: "Langue",
      languageHint: "Change le popup, le tableau de bord et les boutons LinkedIn",
      localDataSaved: "Donnees locales enregistrees par l'extension",
      memoryHint: "Heap JS approximatif de cette page d'extension",
      memoryUsed: "Utilisation memoire",
      noHiddenMatches: "Aucun post masque trouve",
      noPostsHere: "Aucun post ici",
      noSavedMatches: "Aucun post sauvegarde trouve",
      nothingHidden: "Rien de masque",
      nothingSaved: "Rien de sauvegarde",
      openLinkedIn: "Ouvrir LinkedIn",
      order: "Ordre",
      savedLibrary: "Bibliotheque sauvegardee",
      savedPostRemoved: "Post sauvegarde supprime",
      savedPosts: "Posts sauvegardes",
      searchHiddenPosts: "Rechercher des posts masques",
      searchSavedPosts: "Rechercher des posts sauvegardes",
      settings: "Parametres",
      sort: "Trier",
      storageUsed: "Stockage utilise",
      subfolders: "Sous-dossiers",
      tryDifferentSearch: "Essayez une autre recherche.",
      unavailable: "Indisponible"
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
  var STORAGE_USAGE_KEYS = Object.keys(STORAGE_KEYS).map(function (key) {
    return STORAGE_KEYS[key];
  });
  var hasBrowserPromises =
    typeof browser !== "undefined" && browser.storage && browser.storage.local;
  var storageApi = hasBrowserPromises ? browser.storage.local : chrome.storage.local;
  var HIGHLIGHT_PAGE_SIZE = 20;
  var HIDDEN_PAGE_SIZE = 10;
  var STORED_TEXT_LIMIT = 800;
  var STORED_TITLE_LIMIT = 140;
  var STORED_META_LIMIT = 180;

  var state = {
    view: "saved",
    folder: "All",
    hiddenPage: 1,
    hiddenSort: "desc",
    query: "",
    subfolder: "All",
    folders: DEFAULT_FOLDERS.slice(),
    analytics: { hiddenPostsTotal: 0, promotedPostsHiddenTotal: 0, highlightPostsByGroup: {} },
    hiddenPosts: {},
    hiddenRules: [],
    highlightGroups: [],
    highlightRules: [],
    highlightPage: 1,
    savedPosts: {},
    settings: Object.assign({}, DEFAULT_SETTINGS),
    storageBytes: null,
    subfolders: {},
    expandedFolders: {},
    expandedHighlightGroups: {}
  };

  var elements = {};
  var toastTimer = 0;
  var folderDragSource = "";

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

  async function exportBackup() {
    var data = await storageGet(STORAGE_USAGE_KEYS);
    var backup = {
      format: "linkedin-feedless-backup",
      version: 1,
      exportedAt: new Date().toISOString(),
      data: data
    };
    var blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");

    link.href = url;
    link.download = "linkedin-feedless-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    showToast("Backup exported");
  }

  async function importBackupFile(file) {
    var backup;
    var restored = {
      analytics: {},
      folders: [],
      hiddenPosts: {},
      hiddenRules: [],
      highlightGroups: [],
      highlightRules: [],
      savedPosts: {},
      settings: {},
      subfolders: {}
    };

    if (!file || file.size > 25 * 1024 * 1024) {
      showToast("Backup file is invalid or too large");
      return;
    }

    try {
      backup = JSON.parse(await file.text());
    } catch (error) {
      showToast("Could not read this backup");
      return;
    }

    if (!backup || backup.format !== "linkedin-feedless-backup" || !backup.data) {
      showToast("This is not a LinkedIn Feedless backup");
      return;
    }

    STORAGE_USAGE_KEYS.forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(backup.data, key)) {
        restored[key] = backup.data[key];
      }
    });

    if (!window.confirm("Import this backup and replace the current extension data?")) {
      return;
    }

    await storageSet(restored);
    await loadState();
    render();
    await notifyLinkedInTabs(Object.keys(restored));
    showToast("Backup imported");
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

  function recordsNeedCompaction(value) {
    var source;

    if (Array.isArray(value)) {
      source = value;
    } else if (value && typeof value === "object") {
      source = Object.values(value);
    } else {
      return false;
    }

    return source.some(function (record) {
      return (
        record &&
        typeof record === "object" &&
        (cleanText(record.text).length > STORED_TEXT_LIMIT ||
          cleanText(record.title).length > STORED_TITLE_LIMIT ||
          cleanText(record.author).length > STORED_META_LIMIT ||
          cleanText(record.company).length > STORED_META_LIMIT)
      );
    });
  }

  function queryLinkedInTabs() {
    var query = { url: "https://www.linkedin.com/*" };

    if (typeof browser !== "undefined" && browser.tabs && browser.tabs.query) {
      return browser.tabs.query(query).catch(function () {
        return [];
      });
    }

    if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.query) {
      return new Promise(function (resolve) {
        try {
          chrome.tabs.query(query, function (tabs) {
            if (chrome.runtime && chrome.runtime.lastError) {
              resolve([]);
              return;
            }

            resolve(tabs || []);
          });
        } catch (error) {
          resolve([]);
        }
      });
    }

    return Promise.resolve([]);
  }

  function sendMessageToTab(tabId, message) {
    if (tabId === undefined || tabId === null) {
      return Promise.resolve(false);
    }

    if (typeof browser !== "undefined" && browser.tabs && browser.tabs.sendMessage) {
      return browser.tabs.sendMessage(tabId, message).then(
        function (response) {
          return response || null;
        },
        function () {
          return null;
        }
      );
    }

    if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.sendMessage) {
      return new Promise(function (resolve) {
        try {
          chrome.tabs.sendMessage(tabId, message, function (response) {
            if (chrome.runtime && chrome.runtime.lastError) {
              // LinkedIn tabs without the current content script can ignore this refresh.
              resolve(null);
              return;
            }

            resolve(response || null);
          });
        } catch (error) {
          resolve(null);
        }
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

  function normalizeAnalytics(value, hiddenPosts) {
    var source = value && typeof value === "object" ? value : {};
    var groups = source.highlightPostsByGroup && typeof source.highlightPostsByGroup === "object"
      ? source.highlightPostsByGroup
      : {};
    var normalizedGroups = {};

    Object.keys(groups).forEach(function (groupId) {
      normalizedGroups[groupId] = Math.max(0, Number(groups[groupId]) || 0);
    });

    return {
      hiddenPostsTotal: Math.max(Object.keys(hiddenPosts || {}).length, Number(source.hiddenPostsTotal) || 0),
      promotedPostsHiddenTotal: Math.max(0, Number(source.promotedPostsHiddenTotal) || 0),
      highlightPostsByGroup: normalizedGroups
    };
  }

  function formatAnalyticsDuration(seconds) {
    var total = Math.max(0, Math.round(seconds || 0));
    var hours = Math.floor(total / 3600);
    var minutes = Math.floor((total % 3600) / 60);
    var remaining = total % 60;

    if (hours) {
      return hours + "h " + minutes + "m";
    }
    if (minutes) {
      return minutes + "m " + remaining + "s";
    }
    return remaining + "s";
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

  function createId(prefix) {
    return [
      prefix,
      Date.now().toString(36),
      Math.random().toString(36).slice(2, 8)
    ].join("-");
  }

  function normalizeColor(value) {
    var color = cleanText(value).toLowerCase();

    return /^#[0-9a-f]{6}$/i.test(color) ? color : DEFAULT_HIGHLIGHT_COLOR;
  }

  function normalizeGroupName(value) {
    return cleanText(value) || DEFAULT_HIGHLIGHT_GROUP;
  }

  function createHighlightGroupId(name) {
    var key = normalizeRuleText(name).replace(/\s+/g, "-").slice(0, 60);

    return "highlight-group-" + (key || normalizeRuleText(DEFAULT_HIGHLIGHT_GROUP));
  }

  function isLegacyGeneralGroupName(value) {
    return /^general(?: \d+)?$/.test(normalizeRuleText(value));
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
    var groupColors = {};

    return source.reduce(function (rules, item) {
      var text = cleanText(item && item.value);
      var normalized = normalizeRuleText(text);
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
        id: cleanText(item && item.id) || createId("highlight"),
        type: "text",
        value: text,
        groupId: groupId,
        groupName: groupName,
        color: groupColors[groupId],
        createdAt: cleanText(item && item.createdAt) || new Date().toISOString()
      });

      return rules;
    }, []);
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

      normalizedName = normalizeRuleText(name);
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
        createdAt: cleanText(item && item.createdAt) || new Date().toISOString()
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

    return source.reduce(function (rules, item) {
      var text = cleanText(item && item.value);
      var normalized = normalizeRuleText(text);

      if (!text || !normalized || seen[normalized]) {
        return rules;
      }

      seen[normalized] = true;
      rules.push({
        id: cleanText(item && item.id) || createId("hidden-rule"),
        value: text,
        createdAt: cleanText(item && item.createdAt) || new Date().toISOString()
      });

      return rules;
    }, []);
  }

  function normalizeRuleText(value) {
    return cleanText(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}+#]+/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function findRuleByValue(rules, value, exceptId) {
    var normalized = normalizeRuleText(value);

    if (!normalized) {
      return null;
    }

    return (
      rules.find(function (rule) {
        return rule.id !== exceptId && normalizeRuleText(rule && rule.value) === normalized;
      }) || null
    );
  }

  function formatColorHex(value) {
    return normalizeColor(value).toUpperCase();
  }

  function parseColorHex(value) {
    var text = cleanText(value).replace(/^#?/, "#");

    return /^#[0-9a-f]{6}$/i.test(text) ? text.toLowerCase() : "";
  }

  function setHexInputValue(input, value) {
    if (!input) {
      return;
    }

    input.value = formatColorHex(value);
    input.classList.remove("is-invalid");
    input.setAttribute("aria-invalid", "false");
  }

  function markHexInputValidity(input, valid) {
    if (!input) {
      return;
    }

    input.classList.toggle("is-invalid", !valid);
    input.setAttribute("aria-invalid", valid ? "false" : "true");
  }

  function updateCopyButtonColor(copy, color) {
    var hex = formatColorHex(color);

    copy.title = "Copy " + hex;
    copy.setAttribute("aria-label", "Copy highlight color " + hex);
  }

  function updateHighlightColorHex(value) {
    if (!elements.highlightColorHex) {
      return;
    }

    setHexInputValue(elements.highlightColorHex, value);
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
    var savedTabLabel = elements.savedTab && elements.savedTab.querySelector("span");
    var hiddenTabLabel = elements.hiddenTab && elements.hiddenTab.querySelector("span");
    var highlightTabLabel = elements.highlightTab && elements.highlightTab.querySelector("span");
    var settingsTitle = elements.settingsPanel && elements.settingsPanel.querySelector(".section-heading h2");
    var autoCleanLabel = getSwitchTextNode(elements.autoCleanHiddenToggle);
    var autoHideLabel = getSwitchTextNode(elements.autoHidePromotedToggle);
    var darkModeLabel = getSwitchTextNode(elements.darkModeToggle);
    var hiddenRulesLabel = getSwitchTextNode(elements.hiddenRulesEnabledToggle);
    var highlightEnabledLabel = getSwitchTextNode(elements.highlightEnabledToggle);
    var retentionLabel = elements.hiddenRetentionControls && elements.hiddenRetentionControls.querySelector("span");
    var languageRow = elements.languageSelect && elements.languageSelect.closest(".language-row");
    var storageRow = elements.storageUsageValue && elements.storageUsageValue.closest(".storage-row");
    var memoryRow = elements.memoryUsageValue && elements.memoryUsageValue.closest(".memory-row");

    document.documentElement.lang = language;
    document.title = "LinkedIn Feedless";
    setText(elements.openDashboardButton, t("dashboard"));
    setText(elements.settingsButton, t("settings"));
    setText(savedTabLabel, t("savedPosts"));
    setText(hiddenTabLabel, t("hiddenPosts"));
    setText(highlightTabLabel, t("highlightPosts"));
    setText(settingsTitle, t("settings"));
    setText(autoCleanLabel, t("autoCleanHiddenPosts"));
    setText(autoHideLabel, t("autoHidePromotedPosts"));
    setText(darkModeLabel, t("darkMode"));
    setText(retentionLabel, t("cleanAfter"));
    setText(hiddenRulesLabel, t("autoHideMatchingPosts"));
    setText(highlightEnabledLabel, t("highlightMatchingPosts"));
    setText(elements.clearHiddenButton, t("clearHidden"));

    if (elements.openLinkedInButton) {
      elements.openLinkedInButton.title = t("openLinkedIn");
      elements.openLinkedInButton.setAttribute("aria-label", t("openLinkedIn"));
    }

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

    if (elements.highlightPanel) {
      setText(elements.highlightPanel.querySelector(".section-heading h2"), t("highlightPosts"));
      setText(elements.highlightPanel.querySelector(".highlight-description"), t("createGroupDescription"));
      elements.highlightGroupValue.placeholder = t("createGroup");
      elements.addHighlightButton.title = t("createGroup");
      elements.addHighlightButton.setAttribute("aria-label", t("createGroup"));
    }

    if (elements.hiddenRulePanel) {
      setText(elements.hiddenRulePanel.querySelector(".section-heading h2"), t("autoHideWords"));
      setText(elements.hiddenRulePanel.querySelector(".hidden-rule-description"), t("addWordSentence"));
      elements.hiddenRuleValue.placeholder = t("wordOrSentence");
      elements.addHiddenRuleButton.title = t("addAutoHideRule");
      elements.addHiddenRuleButton.setAttribute("aria-label", t("addAutoHideRule"));
    }

    if (elements.hiddenSortGroup) {
      setText(elements.hiddenSortGroup.querySelector("span"), t("sort"));
    }

    if (elements.folderPanel) {
      setText(elements.folderPanel.querySelector(".folder-group .folder-heading-text strong"), t("folders"));
      setText(elements.folderPanel.querySelector(".folder-sort span"), t("order"));
      elements.addFolderButton.title = t("addFolder");
      elements.addFolderButton.setAttribute("aria-label", t("addFolder"));
    }

    if (elements.subfolderGroup) {
      setText(elements.subfolderGroup.querySelector(".folder-heading-text strong"), t("subfolders"));
      setText(elements.subfolderHint, t("chooseFolderFirst"));
      elements.addSubfolderButton.title = t("addSubfolder");
      elements.addSubfolderButton.setAttribute("aria-label", t("addSubfolder"));
    }
  }

  function showToast(message) {
    if (!elements.toast) {
      return;
    }

    window.clearTimeout(toastTimer);
    elements.toast.textContent = cleanText(message) || t("changesSaved");
    elements.toast.hidden = false;

    window.requestAnimationFrame(function () {
      elements.toast.classList.add("is-visible");
    });

    toastTimer = window.setTimeout(function () {
      elements.toast.classList.remove("is-visible");

      toastTimer = window.setTimeout(function () {
        elements.toast.hidden = true;
      }, 180);
    }, 1500);
  }

  function cleanText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim();
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
    var storedUrl = cleanText(post.url);
    var postUrl = buildPostUrl(canonicalizeId(storedUrl)) || buildPostUrl(canonicalizeId(post.id));

    if (postUrl) {
      return postUrl;
    }

    return storedUrl && !isGenericLinkedInPage(storedUrl) ? storedUrl : "";
  }

  function openExternalUrl(url) {
    if (!url) {
      return;
    }

    if (hasBrowserPromises && typeof browser !== "undefined" && browser.tabs && browser.tabs.create) {
      browser.tabs.create({ url: url }).catch(function () {
        window.open(url, "_blank", "noopener");
      });
      return;
    }

    if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
      try {
        chrome.tabs.create({ url: url }, function () {
          if (chrome.runtime && chrome.runtime.lastError) {
            window.open(url, "_blank", "noopener");
          }
        });
      } catch (error) {
        window.open(url, "_blank", "noopener");
      }
      return;
    }

    window.open(url, "_blank", "noopener");
  }

  function repairRecordUrls(records) {
    var changed = false;

    Object.keys(records).forEach(function (id) {
      var post = records[id];
      var resolvedUrl;

      if (!post || typeof post !== "object") {
        return;
      }

      resolvedUrl = resolvePostUrl(post);
      if (resolvedUrl && post.url !== resolvedUrl) {
        post.url = resolvedUrl;
        changed = true;
        return;
      }

      if (!resolvedUrl && post.url && isGenericLinkedInPage(post.url)) {
        post.url = "";
        changed = true;
      }
    });

    return changed;
  }

  function pruneUnopenableSavedPosts(records) {
    var changed = false;

    Object.keys(records).forEach(function (id) {
      if (!resolvePostUrl(records[id])) {
        delete records[id];
        changed = true;
      }
    });

    return changed;
  }

  function getTargetLabel(folder, subfolder) {
    var folderName = cleanText(folder);
    var subfolderName = cleanText(subfolder);

    return subfolderName ? folderName + " / " + subfolderName : folderName;
  }

  function ensureFolder(folder) {
    var folderName = cleanText(folder);

    if (!folderName) {
      return "";
    }

    if (!state.folders.includes(folderName)) {
      state.folders.push(folderName);
    }

    if (!state.subfolders[folderName]) {
      state.subfolders[folderName] = [];
    }

    return folderName;
  }

  function ensureSubfolder(folder, subfolder) {
    var folderName = ensureFolder(folder);
    var subfolderName = cleanText(subfolder);

    if (!folderName || !subfolderName) {
      return "";
    }

    if (!state.subfolders[folderName].includes(subfolderName)) {
      state.subfolders[folderName].push(subfolderName);
    }

    return subfolderName;
  }

  async function createSubfolderForFolder(folder) {
    var folderName = ensureFolder(folder);
    var subfolder;

    if (!folderName || folderName === "All") {
      return;
    }

    subfolder = cleanText(window.prompt("Subfolder name"));
    if (!subfolder) {
      return;
    }

    ensureSubfolder(folderName, subfolder);
    state.folder = folderName;
    state.subfolder = subfolder;
    state.expandedFolders = {};
    state.expandedFolders[folderName] = true;
    await persist({
      folders: state.folders,
      subfolders: state.subfolders
    }, "Subfolder created");
  }

  function getSavedFolder(post) {
    return cleanText(post && post.folder) || "Unfiled";
  }

  function getSavedSubfolder(post) {
    return cleanText(post && post.subfolder);
  }

  function createElement(tagName, options) {
    var node = document.createElement(tagName);
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

  function createActionIcon(kind) {
    return createElement("span", {
      className: "rule-action-icon rule-action-icon--" + kind,
      attrs: {
        "aria-hidden": "true"
      }
    });
  }

  async function copyText(value) {
    var text = cleanText(value);
    var textarea;
    var copied = false;

    if (!text) {
      return false;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        // Fall through to the older copy path for extension contexts that block Clipboard API.
      }
    }

    textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    textarea.remove();
    return copied;
  }

  async function copyColor(value) {
    var hex = formatColorHex(value);
    var copied = await copyText(hex);

    showToast(copied ? "Copied " + hex : "Copy failed");
  }

  function formatDate(value) {
    var date;

    if (!value) {
      return "";
    }

    date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat(undefined, {
      day: "numeric",
      month: "short"
    }).format(date);
  }

  function getRecords(records, dateKey) {
    return Object.values(records).sort(function (left, right) {
      return new Date(right[dateKey] || 0).getTime() - new Date(left[dateKey] || 0).getTime();
    });
  }

  function postMatchesQuery(post) {
    var query = state.query.toLowerCase();
    var queryText;

    if (!query) {
      return true;
    }

    queryText = [post.author, post.company, post.title, post.text, post.folder, post.subfolder]
      .join(" ")
      .toLowerCase();

    return queryText.includes(query);
  }

  function getVisibleSavedPosts() {
    return getRecords(state.savedPosts, "savedAt").filter(postMatchesQuery);
  }

  function getFolderCounts() {
    return getVisibleSavedPosts().reduce(function (counts, post) {
      var folder = getSavedFolder(post);
      counts[folder] = (counts[folder] || 0) + 1;
      return counts;
    }, {});
  }

  function getSubfolderCounts(folder) {
    return getVisibleSavedPosts().reduce(function (counts, post) {
      var subfolder;

      if (getSavedFolder(post) !== folder) {
        return counts;
      }

      subfolder = getSavedSubfolder(post);
      if (subfolder) {
        counts[subfolder] = (counts[subfolder] || 0) + 1;
      }

      return counts;
    }, {});
  }

  function getFolderSort() {
    return normalizeFolderSort(state.settings.folderSort);
  }

  function compareFolderNames(left, right) {
    return cleanText(left).localeCompare(cleanText(right), undefined, {
      numeric: true,
      sensitivity: "base"
    });
  }

  function getOrderedFolders() {
    var folders = state.folders.slice();
    var sort = getFolderSort();

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

  function canDragFolders() {
    return true;
  }

  function getActiveItems() {
    var dateKey = state.view === "saved" ? "savedAt" : "hiddenAt";
    var source =
      state.view === "saved"
        ? getRecords(state.savedPosts, "savedAt")
        : getRecords(state.hiddenPosts, "hiddenAt");

    if (state.view === "hidden" && state.hiddenSort === "asc") {
      source = source.slice().sort(function (left, right) {
        return new Date(left[dateKey] || 0).getTime() - new Date(right[dateKey] || 0).getTime();
      });
    }

    return source.filter(function (post) {
      var folderMatches =
        state.view !== "saved" || state.folder === "All" || getSavedFolder(post) === state.folder;
      var subfolderMatches =
        state.view !== "saved" ||
        state.subfolder === "All" ||
        getSavedSubfolder(post) === state.subfolder;
      return folderMatches && subfolderMatches && postMatchesQuery(post);
    });
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
    var persisted;

    state.folders = normalizeFolders(items[STORAGE_KEYS.folders]);
    state.hiddenPosts = normalizeRecords(items[STORAGE_KEYS.hiddenPosts]);
    state.analytics = normalizeAnalytics(items[STORAGE_KEYS.analytics], state.hiddenPosts);
    state.hiddenRules = normalizeHiddenRules(items[STORAGE_KEYS.hiddenRules]);
    state.highlightRules = normalizeHighlightRules(items[STORAGE_KEYS.highlightRules]);
    state.highlightGroups = normalizeHighlightGroups(items[STORAGE_KEYS.highlightGroups], state.highlightRules);
    if (state.highlightGroups.length && !Object.keys(state.expandedHighlightGroups).length) {
      state.expandedHighlightGroups[state.highlightGroups[0].id] = true;
    }
    state.savedPosts = normalizeRecords(items[STORAGE_KEYS.savedPosts]);
    state.settings = normalizeSettings(items[STORAGE_KEYS.settings]);
    applyTheme();
    state.subfolders = normalizeSubfolders(
      items[STORAGE_KEYS.subfolders],
      state.folders,
      state.savedPosts
    );

    persisted = {
      folders: state.folders,
      hiddenRules: state.hiddenRules,
      highlightGroups: state.highlightGroups,
      highlightRules: state.highlightRules,
      settings: state.settings,
      subfolders: state.subfolders
    };

    if (repairRecordUrls(state.savedPosts)) {
      persisted.savedPosts = state.savedPosts;
    }

    if (pruneUnopenableSavedPosts(state.savedPosts)) {
      persisted.savedPosts = state.savedPosts;
    }

    if (recordsNeedCompaction(items[STORAGE_KEYS.savedPosts])) {
      persisted.savedPosts = state.savedPosts;
    }

    if (repairRecordUrls(state.hiddenPosts)) {
      persisted.hiddenPosts = state.hiddenPosts;
    }

    if (recordsNeedCompaction(items[STORAGE_KEYS.hiddenPosts])) {
      persisted.hiddenPosts = state.hiddenPosts;
    }

    if (
      !items[STORAGE_KEYS.analytics] ||
      state.analytics.hiddenPostsTotal > Number(items[STORAGE_KEYS.analytics].hiddenPostsTotal || 0)
    ) {
      persisted.analytics = state.analytics;
    }

    if (pruneExpiredHiddenPosts(Date.now())) {
      persisted.hiddenPosts = state.hiddenPosts;
    }

    await storageSet(persisted);
    await refreshStorageUsage();
  }

  async function persist(partial, toastMessage) {
    var changedKeys = Object.keys(partial || {});

    await storageSet(partial);
    Object.assign(state, partial);
    state.hiddenRules = normalizeHiddenRules(state.hiddenRules);
    state.highlightRules = normalizeHighlightRules(state.highlightRules);
    state.highlightGroups = normalizeHighlightGroups(state.highlightGroups, state.highlightRules);
    state.settings = normalizeSettings(state.settings);

    if (pruneExpiredHiddenPosts(Date.now())) {
      await storageSet({ hiddenPosts: state.hiddenPosts });
    }

    await refreshStorageUsage();
    applyTheme();
    render();
    await notifyLinkedInTabs(changedKeys);

    if (toastMessage) {
      showToast(toastMessage);
    }
  }

  function setView(view) {
    state.view = view;

    if (view === "hidden") {
      state.folder = "All";
      state.subfolder = "All";
    }

    elements.savedTab.classList.toggle("is-active", view === "saved");
    elements.hiddenTab.classList.toggle("is-active", view === "hidden");
    elements.highlightTab.classList.toggle("is-active", view === "highlight");
    elements.analyticsTab.classList.toggle("is-active", view === "analytics");
    elements.settingsButton.classList.toggle("is-active", view === "settings");
    elements.savedTab.setAttribute("aria-selected", view === "saved" ? "true" : "false");
    elements.hiddenTab.setAttribute("aria-selected", view === "hidden" ? "true" : "false");
    elements.highlightTab.setAttribute("aria-selected", view === "highlight" ? "true" : "false");
    elements.analyticsTab.setAttribute("aria-selected", view === "analytics" ? "true" : "false");
    elements.settingsButton.setAttribute("aria-pressed", view === "settings" ? "true" : "false");
    elements.settingsPanel.hidden = view !== "settings";
    elements.highlightPanel.hidden = view !== "highlight";
    elements.analyticsPanel.hidden = view !== "analytics";
    elements.hiddenRulePanel.hidden = view !== "hidden";
    elements.controls.hidden = view === "highlight" || view === "analytics" || view === "settings";
    elements.controls.classList.toggle("is-hidden-view", view === "hidden");
    elements.addFolderButton.hidden = view !== "saved";
    elements.addSubfolderButton.hidden = true;
    elements.hiddenSortGroup.hidden = view !== "hidden";
    elements.clearHiddenButton.hidden = view !== "hidden";
    elements.folderPanel.hidden = view !== "saved";
    elements.folderStrip.hidden = view !== "saved";
    elements.subfolderGroup.hidden = true;
    elements.subfolderStrip.hidden = true;
    elements.list.hidden = view !== "hidden";
    elements.hiddenPager.hidden = view !== "hidden";
    elements.viewTitle.textContent =
      view === "saved"
        ? t("savedPosts")
        : view === "hidden"
          ? t("hiddenPosts")
          : view === "highlight"
            ? t("highlightPosts")
            : view === "analytics"
              ? "Analytics"
              : t("settings");
    elements.searchInput.placeholder =
      view === "saved" ? t("searchSavedPosts") : t("searchHiddenPosts");
    elements.hiddenSortSelect.value = state.hiddenSort;

    render();
  }

  function renderSummary() {
    var savedCount = Object.keys(state.savedPosts).length;
    var hiddenCount = Object.keys(state.hiddenPosts).length;

    elements.savedTabCount.textContent = String(savedCount);
    elements.hiddenTabCount.textContent = String(hiddenCount);
    elements.highlightTabCount.textContent = String(state.highlightRules.length);
  }

  function renderAnalytics() {
    var counts = state.analytics.highlightPostsByGroup || {};
    var known = {};

    elements.analyticsHiddenTotal.textContent = String(state.analytics.hiddenPostsTotal);
    elements.analyticsPromotedTotal.textContent = String(state.analytics.promotedPostsHiddenTotal);
    elements.analyticsHiddenTime.textContent = formatAnalyticsDuration(state.analytics.hiddenPostsTotal * 4);
    elements.analyticsPromotedTime.textContent = formatAnalyticsDuration(state.analytics.promotedPostsHiddenTotal * 3);
    elements.analyticsGroupList.replaceChildren();

    state.highlightGroups.forEach(function (group) {
      var row = createElement("div", { className: "analytics-group-row" });
      var dot = createElement("i");
      var count = counts[group.id] || 0;

      known[group.id] = true;
      dot.style.setProperty("--analytics-color", group.color);
      row.appendChild(dot);
      row.appendChild(createElement("span", { text: group.name }));
      row.appendChild(createElement("strong", { text: String(count) }));
      elements.analyticsGroupList.appendChild(row);
    });

    Object.keys(counts).forEach(function (groupId) {
      var row;

      if (known[groupId]) {
        return;
      }
      row = createElement("div", { className: "analytics-group-row" });
      row.appendChild(createElement("i"));
      row.appendChild(createElement("span", { text: "Deleted group" }));
      row.appendChild(createElement("strong", { text: String(counts[groupId]) }));
      elements.analyticsGroupList.appendChild(row);
    });

    if (!elements.analyticsGroupList.children.length) {
      elements.analyticsGroupList.appendChild(createElement("p", { text: "No highlight activity yet." }));
    }
  }

  function renderSettings() {
    elements.autoHidePromotedToggle.checked = Boolean(state.settings.autoHidePromoted);
    elements.darkModeToggle.checked = Boolean(state.settings.darkMode);
    elements.autoCleanHiddenToggle.checked = Boolean(state.settings.autoCleanHidden);
    elements.hiddenRulesEnabledToggle.checked = state.settings.hiddenRulesEnabled !== false;
    elements.highlightEnabledToggle.checked = state.settings.highlightEnabled !== false;
    elements.folderSortSelect.value = getFolderSort();
    elements.hiddenRetentionAmount.value = String(state.settings.hiddenRetentionAmount);
    elements.hiddenRetentionUnit.value = state.settings.hiddenRetentionUnit;
    elements.hiddenRetentionControls.classList.toggle("is-disabled", !state.settings.autoCleanHidden);
    elements.hiddenRetentionAmount.disabled = !state.settings.autoCleanHidden;
    elements.hiddenRetentionUnit.disabled = !state.settings.autoCleanHidden;
    elements.languageSelect.value = normalizeLanguage(state.settings.language);
    elements.storageUsageValue.textContent = formatStorageSize(state.storageBytes);
    elements.memoryUsageValue.textContent = formatMemorySize(getMemoryUsageBytes());
    applyLocalizedText();
  }

  async function saveHighlightRuleColor(ruleId, color) {
    var nextColor = normalizeColor(color);
    var changed = false;

    state.highlightRules = state.highlightRules.map(function (item) {
      if (item.id !== ruleId) {
        return item;
      }

      changed = item.color !== nextColor;
      return Object.assign({}, item, { color: nextColor });
    });

    if (!changed) {
      return;
    }

    await storageSet({ highlightRules: state.highlightRules });
    await refreshStorageUsage();
    renderSettings();
    await notifyLinkedInTabs(["highlightRules"]);
    showToast(t("changesSaved"));
  }

  async function saveHighlightRuleValue(ruleId, value) {
    var nextValue = cleanText(value);
    var changed = false;

    if (!nextValue) {
      return;
    }

    if (findRuleByValue(state.hiddenRules, nextValue)) {
      showToast(t("alreadyHidden"));
      return;
    }

    if (findRuleByValue(state.highlightRules, nextValue, ruleId)) {
      showToast(t("alreadyHighlight"));
      return;
    }

    state.highlightRules = state.highlightRules.map(function (item) {
      if (item.id !== ruleId) {
        return item;
      }

      changed = item.value !== nextValue;
      return Object.assign({}, item, { value: nextValue });
    });

    if (!changed) {
      return;
    }

    await persist({ highlightRules: state.highlightRules }, t("changesSaved"));
  }

  function getHighlightGroups() {
    var groups = [];
    var byId = {};

    state.highlightGroups.forEach(function (group, index) {
      var groupId = cleanText(group && group.id) || createHighlightGroupId(group && group.name);
      var groupName = normalizeGroupName(group && group.name);

      if (!byId[groupId]) {
        byId[groupId] = {
          id: groupId,
          name: groupName,
          color: normalizeColor(group && group.color),
          enabled: !group || group.enabled !== false,
          rules: [],
          firstIndex: index,
          createdAt: cleanText(group && group.createdAt) || new Date().toISOString()
        };
        groups.push(byId[groupId]);
      }
    });

    state.highlightRules.forEach(function (rule, index) {
      var groupId = getRuleGroupId(rule);
      var groupName = getRuleGroupName(rule);

      if (!byId[groupId]) {
        byId[groupId] = {
          id: groupId,
          name: groupName,
          color: normalizeColor(rule.color),
          enabled: true,
          rules: [],
          firstIndex: state.highlightGroups.length + index,
          createdAt: cleanText(rule && rule.createdAt) || new Date().toISOString()
        };
        groups.push(byId[groupId]);
      }

      byId[groupId].rules.push(rule);
    });

    return groups;
  }

  function getHighlightGroupById(groupId) {
    return getHighlightGroups().find(function (group) {
      return group.id === groupId;
    }) || null;
  }

  function getHighlightGroupByName(groupName) {
    var normalized = normalizeRuleText(groupName);

    return getHighlightGroups().find(function (group) {
      return normalizeRuleText(group.name) === normalized;
    }) || null;
  }

  function getHighlightGroupInsertIndex(groupId) {
    var lastIndex = -1;
    var groups;
    var groupIndex;
    var nextGroupIndex;
    var nextRuleIndex;

    state.highlightRules.forEach(function (rule, index) {
      if (getRuleGroupId(rule) === groupId) {
        lastIndex = index;
      }
    });

    if (lastIndex >= 0) {
      return lastIndex + 1;
    }

    groups = getHighlightGroups();
    groupIndex = groups.findIndex(function (group) {
      return group.id === groupId;
    });

    if (groupIndex < 0) {
      return state.highlightRules.length;
    }

    for (nextGroupIndex = groupIndex + 1; nextGroupIndex < groups.length; nextGroupIndex += 1) {
      nextRuleIndex = state.highlightRules.findIndex(function (rule) {
        return getRuleGroupId(rule) === groups[nextGroupIndex].id;
      });

      if (nextRuleIndex >= 0) {
        return nextRuleIndex;
      }
    }

    return state.highlightRules.length;
  }

  async function createHighlightGroup(groupName, color) {
    var name = cleanText(groupName);
    var group;

    if (!name) {
      return false;
    }

    if (getHighlightGroupByName(name)) {
      showToast("Highlight group already exists");
      return false;
    }

    group = {
      id: createHighlightGroupId(name),
      name: name,
      color: normalizeColor(color),
      enabled: true,
      createdAt: new Date().toISOString()
    };

    state.highlightGroups.push(group);
    state.expandedHighlightGroups = {};
    state.expandedHighlightGroups[group.id] = true;
    await persist({ highlightGroups: state.highlightGroups }, "Group created");
    return true;
  }

  async function addHighlightRuleToGroup(groupName, value, color) {
    var name = normalizeGroupName(groupName);
    var group = getHighlightGroupByName(name);
    var groupId = group ? group.id : createHighlightGroupId(name);
    var nextColor = group ? group.color : normalizeColor(color);
    var rule;
    var insertIndex;

    if (!cleanText(value)) {
      return false;
    }

    if (findRuleByValue(state.hiddenRules, value)) {
      showToast(t("alreadyHidden"));
      return false;
    }

    if (findRuleByValue(state.highlightRules, value)) {
      showToast(t("alreadyHighlight"));
      return false;
    }

    if (!group) {
      group = {
        id: groupId,
        name: name,
        color: nextColor,
        enabled: true,
        createdAt: new Date().toISOString()
      };
      state.highlightGroups.push(group);
    }

    rule = normalizeHighlightRules([
      {
        id: createId("highlight"),
        type: "text",
        value: value,
        groupId: groupId,
        groupName: group ? group.name : name,
        color: nextColor,
        createdAt: new Date().toISOString()
      }
    ])[0];

    insertIndex = group ? getHighlightGroupInsertIndex(groupId) : state.highlightRules.length;
    state.highlightRules.splice(insertIndex, 0, rule);
    state.expandedHighlightGroups[groupId] = true;
    await persist({
      highlightGroups: state.highlightGroups,
      highlightRules: state.highlightRules
    }, t("changesSaved"));
    return true;
  }

  async function saveHighlightGroupColor(groupId, color) {
    var nextColor = normalizeColor(color);
    var changed = false;

    state.highlightRules = state.highlightRules.map(function (rule) {
      if (getRuleGroupId(rule) !== groupId) {
        return rule;
      }

      changed = changed || rule.color !== nextColor;
      return Object.assign({}, rule, { color: nextColor });
    });

    state.highlightGroups = state.highlightGroups.map(function (group) {
      if (group.id !== groupId) {
        return group;
      }

      changed = changed || group.color !== nextColor;
      return Object.assign({}, group, { color: nextColor });
    });

    if (!changed) {
      return;
    }

    await persist({
      highlightGroups: state.highlightGroups,
      highlightRules: state.highlightRules
    }, t("changesSaved"));
  }

  async function deleteHighlightGroup(groupId) {
    var group = getHighlightGroupById(groupId);
    var rules = state.highlightRules.filter(function (rule) {
      return getRuleGroupId(rule) === groupId;
    });
    var message;

    if (!group) {
      return;
    }

    message = rules.length
      ? 'Delete "' + group.name + '"? ' + rules.length + (rules.length === 1 ? " highlight word" : " highlight words") + " will be removed."
      : 'Delete "' + group.name + '"?';

    if (!window.confirm(message)) {
      return;
    }

    state.highlightGroups = state.highlightGroups.filter(function (item) {
      return item.id !== groupId;
    });
    state.highlightRules = state.highlightRules.filter(function (rule) {
      return getRuleGroupId(rule) !== groupId;
    });
    delete state.expandedHighlightGroups[groupId];

    await persist({
      highlightGroups: state.highlightGroups,
      highlightRules: state.highlightRules
    }, "Group deleted");
  }

  function getGroupChunks() {
    return getHighlightGroups().map(function (group) {
      return {
        group: group,
        rules: state.highlightRules.filter(function (rule) {
          return getRuleGroupId(rule) === group.id;
        })
      };
    });
  }

  function replaceHighlightRulesFromChunks(chunks) {
    state.highlightRules = chunks.reduce(function (rules, chunk) {
      return rules.concat(chunk.rules);
    }, []);
    state.highlightGroups = chunks.map(function (chunk) {
      return {
        id: chunk.group.id,
        name: chunk.group.name,
        color: normalizeColor(chunk.group.color),
        enabled: chunk.group.enabled !== false,
        createdAt: cleanText(chunk.group.createdAt) || new Date().toISOString()
      };
    });
  }

  async function moveHighlightGroup(groupId, direction) {
    var chunks = getGroupChunks();
    var index = chunks.findIndex(function (chunk) {
      return chunk.group.id === groupId;
    });
    var nextIndex = index + direction;
    var chunk;

    if (index < 0 || nextIndex < 0 || nextIndex >= chunks.length) {
      return;
    }

    chunk = chunks[index];
    chunks.splice(index, 1);
    chunks.splice(nextIndex, 0, chunk);
    replaceHighlightRulesFromChunks(chunks);
    await persistHighlightOrder();
  }

  async function moveHighlightGroupTo(draggedId, targetId, insertAfter) {
    var chunks = getGroupChunks();
    var fromIndex = chunks.findIndex(function (chunk) {
      return chunk.group.id === draggedId;
    });
    var toIndex = chunks.findIndex(function (chunk) {
      return chunk.group.id === targetId;
    });
    var chunk;

    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
      return;
    }

    chunk = chunks[fromIndex];
    chunks.splice(fromIndex, 1);

    if (fromIndex < toIndex) {
      toIndex -= 1;
    }

    if (insertAfter) {
      toIndex += 1;
    }

    chunks.splice(toIndex, 0, chunk);
    replaceHighlightRulesFromChunks(chunks);
    await persistHighlightOrder();
  }

  function removeHighlightDropState() {
    if (!elements.highlightList) {
      return;
    }

    elements.highlightList.querySelectorAll(".highlight-rule, .highlight-group").forEach(function (row) {
      row.classList.remove("is-dragging", "is-drop-before", "is-drop-after");
    });
  }

  async function persistHighlightOrder(toastMessage) {
    await persist({
      highlightGroups: state.highlightGroups,
      highlightRules: state.highlightRules
    }, toastMessage || "Priority updated");
  }

  async function moveHighlightRule(ruleId, direction) {
    var index = state.highlightRules.findIndex(function (item) {
      return item.id === ruleId;
    });
    var nextIndex = index + direction;
    var rule;

    if (index < 0 || nextIndex < 0 || nextIndex >= state.highlightRules.length) {
      return;
    }

    rule = state.highlightRules[index];
    state.highlightRules.splice(index, 1);
    state.highlightRules.splice(nextIndex, 0, rule);
    state.highlightPage = Math.floor(nextIndex / HIGHLIGHT_PAGE_SIZE) + 1;
    await persistHighlightOrder();
  }

  async function moveHighlightRuleTo(draggedId, targetId, insertAfter) {
    var fromIndex = state.highlightRules.findIndex(function (item) {
      return item.id === draggedId;
    });
    var toIndex = state.highlightRules.findIndex(function (item) {
      return item.id === targetId;
    });
    var rule;

    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
      return;
    }

    rule = state.highlightRules[fromIndex];
    state.highlightRules.splice(fromIndex, 1);

    if (fromIndex < toIndex) {
      toIndex -= 1;
    }

    if (insertAfter) {
      toIndex += 1;
    }

    state.highlightRules.splice(toIndex, 0, rule);
    state.highlightPage = Math.floor(toIndex / HIGHLIGHT_PAGE_SIZE) + 1;
    await persistHighlightOrder();
  }

  async function saveHiddenRuleValue(ruleId, value) {
    var nextValue = cleanText(value);
    var changed = false;

    if (!nextValue) {
      return;
    }

    if (findRuleByValue(state.highlightRules, nextValue)) {
      showToast(t("alreadyHighlight"));
      return;
    }

    if (findRuleByValue(state.hiddenRules, nextValue, ruleId)) {
      showToast(t("alreadyHidden"));
      return;
    }

    state.hiddenRules = state.hiddenRules.map(function (item) {
      if (item.id !== ruleId) {
        return item;
      }

      changed = item.value !== nextValue;
      return Object.assign({}, item, { value: nextValue });
    });

    if (!changed) {
      return;
    }

    await persist({ hiddenRules: state.hiddenRules }, t("changesSaved"));
  }

  function renderHighlights() {
    var groups = getHighlightGroups();
    var wordTotal = state.highlightRules.length;

    elements.highlightCount.textContent = String(wordTotal);
    updateHighlightColorHex(elements.highlightColor.value);
    elements.highlightList.replaceChildren();
    elements.highlightList.hidden = groups.length === 0;
    elements.highlightPager.hidden = true;

    groups.forEach(function (group, groupIndex) {
      var expanded = Boolean(state.expandedHighlightGroups[group.id]);
      var groupCard = createElement("div", {
        className: "highlight-group",
        attrs: {
          draggable: "true",
          "data-group-id": group.id
        }
      });
      var header = createElement("div", { className: "highlight-group-header" });
      var dragHandle = createElement("span", {
        className: "highlight-drag-handle",
        text: "::",
        attrs: {
          title: "Drag to change group priority",
          "aria-hidden": "true"
        }
      });
      var expandButton = createElement("button", {
        className: "highlight-expand-button",
        attrs: {
          type: "button",
          "aria-expanded": expanded ? "true" : "false",
          title: (expanded ? "Collapse " : "Expand ") + group.name,
          "aria-label": (expanded ? "Collapse highlight group " : "Expand highlight group ") + group.name
        }
      });
      var expandIcon = createElement("span", {
        className: "highlight-expand-icon",
        attrs: {
          "aria-hidden": "true"
        }
      });
      var title = createElement("button", {
        className: "highlight-group-title highlight-group-toggle",
        attrs: {
          type: "button",
          "aria-expanded": expanded ? "true" : "false",
          title: (expanded ? "Close " : "Open ") + group.name
        }
      });
      var titleText = createElement("strong", { text: group.name });
      var meta = createElement("small", {
        text:
          (groupIndex === 0 ? "Highest priority" : "Group priority " + (groupIndex + 1)) +
          " - " +
          group.rules.length +
          (group.rules.length === 1 ? " word" : " words")
      });
      var colorField = createElement("div", { className: "highlight-rule-color-field" });
      var enabledToggle = createElement("label", {
        className: "highlight-group-enabled",
        attrs: {
          title: (group.enabled === false ? "Enable " : "Disable ") + group.name
        }
      });
      var enabledInput = createElement("input", {
        attrs: {
          type: "checkbox",
          "aria-label": "Enable highlight group " + group.name
        }
      });
      var enabledTrack = createElement("span", {
        className: "switch-track",
        attrs: { "aria-hidden": "true" }
      });
      var swatch = createElement("input", {
        className: "highlight-swatch highlight-rule-color",
        attrs: {
          type: "color",
          value: group.color,
          title: "Change group color",
          "aria-label": "Change highlight color for group " + group.name
        }
      });
      var hex = createElement("input", {
        className: "color-hex color-hex-input",
        attrs: {
          type: "text",
          value: formatColorHex(group.color),
          maxlength: "7",
          spellcheck: "false",
          title: "Group color hex",
          "aria-label": "Highlight group color hex for " + group.name
        }
      });
      var copy = createElement("button", {
        className: "color-copy-button",
        attrs: {
          type: "button",
          title: "Copy " + formatColorHex(group.color),
          "aria-label": "Copy highlight color " + formatColorHex(group.color)
        }
      });
      var copyIcon = createElement("span", {
        className: "copy-icon",
        attrs: { "aria-hidden": "true" }
      });
      var groupActions = createElement("div", { className: "highlight-group-actions" });
      var moveUp = createElement("button", {
        className: "highlight-move",
        attrs: {
          type: "button",
          title: "Move group up",
          "aria-label": "Move highlight group " + group.name + " up"
        }
      });
      var moveDown = createElement("button", {
        className: "highlight-move",
        attrs: {
          type: "button",
          title: "Move group down",
          "aria-label": "Move highlight group " + group.name + " down"
        }
      });
      var removeGroup = createElement("button", {
        className: "highlight-remove danger",
        attrs: {
          type: "button",
          title: "Delete group",
          "aria-label": "Delete highlight group " + group.name
        }
      });
      var addForm = createElement("form", { className: "highlight-group-add" });
      var addInput = createElement("input", {
        attrs: {
          type: "text",
          placeholder: "Add word to " + group.name,
          "aria-label": "Add word to " + group.name,
          autocomplete: "off"
        }
      });
      var addButton = createElement("button", {
        className: "icon-button primary",
        text: "+",
        attrs: {
          type: "submit",
          title: "Add word",
          "aria-label": "Add word to " + group.name
        }
      });
      var words = createElement("div", { className: "highlight-group-words" });

      title.appendChild(titleText);
      title.appendChild(meta);
      enabledInput.checked = state.settings.highlightEnabled !== false && group.enabled !== false;
      enabledInput.disabled = state.settings.highlightEnabled === false;
      enabledToggle.appendChild(enabledInput);
      enabledToggle.appendChild(enabledTrack);
      expandButton.appendChild(expandIcon);
      colorField.appendChild(swatch);
      colorField.appendChild(hex);
      copy.appendChild(copyIcon);
      colorField.appendChild(copy);
      groupActions.appendChild(moveUp);
      groupActions.appendChild(moveDown);
      moveUp.appendChild(createElement("span", {
        className: "highlight-move-icon highlight-move-icon--up",
        attrs: { "aria-hidden": "true" }
      }));
      moveDown.appendChild(createElement("span", {
        className: "highlight-move-icon highlight-move-icon--down",
        attrs: { "aria-hidden": "true" }
      }));
      removeGroup.appendChild(createActionIcon("trash"));
      groupActions.appendChild(removeGroup);
      header.appendChild(dragHandle);
      header.appendChild(expandButton);
      header.appendChild(title);
      header.appendChild(enabledToggle);
      header.appendChild(colorField);
      header.appendChild(groupActions);
      addForm.appendChild(addInput);
      addForm.appendChild(addButton);

      moveUp.disabled = groupIndex === 0;
      moveDown.disabled = groupIndex === groups.length - 1;

      function toggleGroupExpansion() {
        if (expanded) {
          delete state.expandedHighlightGroups[group.id];
        } else {
          state.expandedHighlightGroups[group.id] = true;
        }

        renderHighlights();
      }

      expandButton.addEventListener("click", toggleGroupExpansion);

      title.addEventListener("click", function () {
        toggleGroupExpansion();
      });

      groupCard.addEventListener("dragstart", function (event) {
        groupCard.classList.add("is-dragging");
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", group.id);
      });

      groupCard.addEventListener("dragover", function (event) {
        var bounds = groupCard.getBoundingClientRect();
        var insertAfter = event.clientY > bounds.top + bounds.height / 2;

        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        groupCard.classList.toggle("is-drop-before", !insertAfter);
        groupCard.classList.toggle("is-drop-after", insertAfter);
      });

      groupCard.addEventListener("dragleave", function () {
        groupCard.classList.remove("is-drop-before", "is-drop-after");
      });

      groupCard.addEventListener("dragend", removeHighlightDropState);

      groupCard.addEventListener("drop", async function (event) {
        var bounds = groupCard.getBoundingClientRect();
        var draggedId = event.dataTransfer.getData("text/plain");
        var insertAfter = event.clientY > bounds.top + bounds.height / 2;

        event.preventDefault();
        removeHighlightDropState();
        await moveHighlightGroupTo(draggedId, group.id, insertAfter);
      });

      moveUp.addEventListener("click", async function () {
        await moveHighlightGroup(group.id, -1);
      });

      moveDown.addEventListener("click", async function () {
        await moveHighlightGroup(group.id, 1);
      });

      removeGroup.addEventListener("click", async function () {
        await deleteHighlightGroup(group.id);
      });

      enabledInput.addEventListener("change", async function () {
        state.highlightGroups = state.highlightGroups.map(function (item) {
          return item.id === group.id
            ? Object.assign({}, item, { enabled: enabledInput.checked })
            : item;
        });
        await persist({ highlightGroups: state.highlightGroups }, t("changesSaved"));
      });

      swatch.addEventListener("input", function () {
        setHexInputValue(hex, swatch.value);
        updateCopyButtonColor(copy, swatch.value);
      });

      swatch.addEventListener("change", async function () {
        setHexInputValue(hex, swatch.value);
        updateCopyButtonColor(copy, swatch.value);
        await saveHighlightGroupColor(group.id, swatch.value);
      });

      hex.addEventListener("input", async function () {
        var nextColor = parseColorHex(hex.value);

        markHexInputValidity(hex, Boolean(nextColor));

        if (!nextColor) {
          return;
        }

        setHexInputValue(hex, nextColor);
        swatch.value = nextColor;
        updateCopyButtonColor(copy, nextColor);
        await saveHighlightGroupColor(group.id, nextColor);
      });

      hex.addEventListener("change", function () {
        var nextColor = parseColorHex(hex.value);

        if (nextColor) {
          setHexInputValue(hex, nextColor);
          return;
        }

        setHexInputValue(hex, swatch.value);
      });

      copy.addEventListener("click", async function () {
        await copyColor(swatch.value);
      });

      addForm.addEventListener("submit", async function (event) {
        var added;

        event.preventDefault();
        added = await addHighlightRuleToGroup(group.name, addInput.value, group.color);

        if (added) {
          addInput.value = "";
        }
      });

      group.rules.forEach(function (rule) {
        var row = createElement("div", { className: "highlight-rule highlight-rule--word" });
        var text = createElement("div", { className: "highlight-rule-text" });
        var label = createElement("strong", { text: rule.value });
        var detail = createElement("small", { text: "Uses " + group.name + " color" });
        var actions = createElement("div", { className: "highlight-rule-actions" });
        var edit = createElement("button", {
          className: "highlight-edit",
          attrs: {
            type: "button",
            title: "Edit",
            "aria-label": "Edit highlight " + rule.value
          }
        });
        var remove = createElement("button", {
          className: "highlight-remove danger",
          attrs: {
            type: "button",
            title: "Remove",
            "aria-label": "Remove highlight " + rule.value
          }
        });

        edit.addEventListener("click", async function () {
          var nextValue = window.prompt("Edit highlight text", rule.value);
          await saveHighlightRuleValue(rule.id, nextValue);
        });

        remove.addEventListener("click", async function () {
          state.highlightRules = state.highlightRules.filter(function (item) {
            return item.id !== rule.id;
          });
          await persist({ highlightRules: state.highlightRules }, t("changesSaved"));
        });

        text.appendChild(label);
        text.appendChild(detail);
        edit.appendChild(createActionIcon("edit"));
        remove.appendChild(createActionIcon("trash"));
        actions.appendChild(edit);
        actions.appendChild(remove);
        row.appendChild(text);
        row.appendChild(actions);
        words.appendChild(row);
      });

      groupCard.appendChild(header);
      if (expanded) {
        groupCard.appendChild(addForm);
        groupCard.appendChild(words);
      }
      elements.highlightList.appendChild(groupCard);
    });

    return;

    var total = state.highlightRules.length;
    var pageCount = Math.max(1, Math.ceil(total / HIGHLIGHT_PAGE_SIZE));
    var startIndex;
    var endIndex;
    var visibleRules;

    if (state.highlightPage > pageCount) {
      state.highlightPage = pageCount;
    }

    if (state.highlightPage < 1) {
      state.highlightPage = 1;
    }

    startIndex = (state.highlightPage - 1) * HIGHLIGHT_PAGE_SIZE;
    endIndex = Math.min(startIndex + HIGHLIGHT_PAGE_SIZE, total);
    visibleRules = state.highlightRules.slice(startIndex, endIndex);

    elements.highlightCount.textContent = String(state.highlightRules.length);
    updateHighlightColorHex(elements.highlightColor.value);
    elements.highlightList.replaceChildren();
    elements.highlightList.hidden = total === 0;
    elements.highlightPager.hidden = total <= HIGHLIGHT_PAGE_SIZE;
    elements.highlightPrevPage.disabled = state.highlightPage <= 1;
    elements.highlightNextPage.disabled = state.highlightPage >= pageCount;
    elements.highlightPageInfo.textContent = total
      ? "Page " + state.highlightPage + " of " + pageCount + " (" + (startIndex + 1) + "-" + endIndex + " of " + total + ")"
      : "Page 1 of 1";

    visibleRules.forEach(function (rule, visibleIndex) {
      var ruleIndex = startIndex + visibleIndex;
      var row = createElement("div", {
        className: "highlight-rule",
        attrs: {
          draggable: "true",
          "data-rule-id": rule.id
        }
      });
      var dragHandle = createElement("span", {
        className: "highlight-drag-handle",
        text: "::",
        attrs: {
          title: "Drag to change priority",
          "aria-hidden": "true"
        }
      });
      var colorField = createElement("div", { className: "highlight-rule-color-field" });
      var swatch = createElement("input", {
        className: "highlight-swatch highlight-rule-color",
        attrs: {
          type: "color",
          value: rule.color,
          title: "Change color",
          "aria-label": "Change highlight color for " + rule.value
        }
      });
      var text = createElement("div", { className: "highlight-rule-text" });
      var label = createElement("strong", { text: rule.value });
      var priority = createElement("small", {
        text: ruleIndex === 0 ? "Highest priority" : "Priority " + (ruleIndex + 1)
      });
      var actions = createElement("div", { className: "highlight-rule-actions" });
      var moveUp = createElement("button", {
        className: "highlight-move",
        text: "Up",
        attrs: {
          type: "button",
          title: "Move up",
          "aria-label": "Move " + rule.value + " up"
        }
      });
      var moveDown = createElement("button", {
        className: "highlight-move",
        text: "Down",
        attrs: {
          type: "button",
          title: "Move down",
          "aria-label": "Move " + rule.value + " down"
        }
      });
      var hex = createElement("input", {
        className: "color-hex color-hex-input",
        attrs: {
          type: "text",
          value: formatColorHex(rule.color),
          maxlength: "7",
          spellcheck: "false",
          title: "Highlight color hex",
          "aria-label": "Highlight color hex for " + rule.value
        }
      });
      var copy = createElement("button", {
        className: "color-copy-button",
        attrs: {
          type: "button",
          title: "Copy " + formatColorHex(rule.color),
          "aria-label": "Copy highlight color " + formatColorHex(rule.color)
        }
      });
      var copyIcon = createElement("span", {
        className: "copy-icon",
        attrs: { "aria-hidden": "true" }
      });
      var edit = createElement("button", {
        className: "highlight-edit",
        attrs: {
          type: "button",
          title: "Edit",
          "aria-label": "Edit highlight " + rule.value
        }
      });
      var remove = createElement("button", {
        className: "highlight-remove danger",
        attrs: {
          type: "button",
          title: "Remove",
          "aria-label": "Remove highlight " + rule.value
        }
      });

      text.appendChild(label);
      text.appendChild(priority);
      colorField.appendChild(swatch);
      colorField.appendChild(hex);
      copy.appendChild(copyIcon);
      colorField.appendChild(copy);
      edit.appendChild(createActionIcon("edit"));
      remove.appendChild(createActionIcon("trash"));
      actions.appendChild(moveUp);
      actions.appendChild(moveDown);
      actions.appendChild(edit);
      actions.appendChild(remove);

      moveUp.disabled = ruleIndex === 0;
      moveDown.disabled = ruleIndex === state.highlightRules.length - 1;

      row.addEventListener("dragstart", function (event) {
        row.classList.add("is-dragging");
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", rule.id);
      });

      row.addEventListener("dragover", function (event) {
        var bounds = row.getBoundingClientRect();
        var insertAfter = event.clientY > bounds.top + bounds.height / 2;

        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        row.classList.toggle("is-drop-before", !insertAfter);
        row.classList.toggle("is-drop-after", insertAfter);
      });

      row.addEventListener("dragleave", function () {
        row.classList.remove("is-drop-before", "is-drop-after");
      });

      row.addEventListener("dragend", removeHighlightDropState);

      row.addEventListener("drop", async function (event) {
        var bounds = row.getBoundingClientRect();
        var draggedId = event.dataTransfer.getData("text/plain");
        var insertAfter = event.clientY > bounds.top + bounds.height / 2;

        event.preventDefault();
        removeHighlightDropState();
        await moveHighlightRuleTo(draggedId, rule.id, insertAfter);
      });

      moveUp.addEventListener("click", async function () {
        await moveHighlightRule(rule.id, -1);
      });

      moveDown.addEventListener("click", async function () {
        await moveHighlightRule(rule.id, 1);
      });

      swatch.addEventListener("input", async function () {
        setHexInputValue(hex, swatch.value);
        updateCopyButtonColor(copy, swatch.value);
        await saveHighlightRuleColor(rule.id, swatch.value);
      });

      swatch.addEventListener("change", async function () {
        setHexInputValue(hex, swatch.value);
        updateCopyButtonColor(copy, swatch.value);
        await saveHighlightRuleColor(rule.id, swatch.value);
      });

      hex.addEventListener("input", async function () {
        var nextColor = parseColorHex(hex.value);

        markHexInputValidity(hex, Boolean(nextColor));

        if (!nextColor) {
          return;
        }

        setHexInputValue(hex, nextColor);
        swatch.value = nextColor;
        updateCopyButtonColor(copy, nextColor);
        await saveHighlightRuleColor(rule.id, nextColor);
      });

      hex.addEventListener("change", function () {
        var nextColor = parseColorHex(hex.value);

        if (nextColor) {
          setHexInputValue(hex, nextColor);
          return;
        }

        setHexInputValue(hex, swatch.value);
      });

      copy.addEventListener("click", async function () {
        await copyColor(swatch.value);
      });

      edit.addEventListener("click", async function () {
        var nextValue = window.prompt("Edit highlight text", rule.value);
        await saveHighlightRuleValue(rule.id, nextValue);
      });

      remove.addEventListener("click", async function () {
        state.highlightRules = state.highlightRules.filter(function (item) {
          return item.id !== rule.id;
        });
        await persist({ highlightRules: state.highlightRules }, t("changesSaved"));
      });

      row.appendChild(dragHandle);
      row.appendChild(text);
      row.appendChild(colorField);
      row.appendChild(actions);
      elements.highlightList.appendChild(row);
    });
  }

  function renderHiddenRules() {
    elements.hiddenRuleCount.textContent = String(state.hiddenRules.length);
    elements.hiddenRuleList.replaceChildren();
    elements.hiddenRuleList.hidden = state.hiddenRules.length === 0;

    state.hiddenRules.forEach(function (rule) {
      var row = createElement("div", { className: "hidden-rule" });
      var text = createElement("div", { className: "hidden-rule-text" });
      var label = createElement("strong", { text: rule.value });
      var detail = createElement("small", { text: "Auto-hide word or sentence" });
      var actions = createElement("div", { className: "hidden-rule-actions" });
      var edit = createElement("button", {
        className: "hidden-rule-edit",
        attrs: {
          type: "button",
          title: "Edit",
          "aria-label": "Edit auto-hide " + rule.value
        }
      });
      var remove = createElement("button", {
        className: "hidden-rule-remove danger",
        attrs: {
          type: "button",
          title: "Remove",
          "aria-label": "Remove auto-hide " + rule.value
        }
      });

      edit.addEventListener("click", async function () {
        var nextValue = window.prompt("Edit auto-hide text", rule.value);
        await saveHiddenRuleValue(rule.id, nextValue);
      });

      remove.addEventListener("click", async function () {
        state.hiddenRules = state.hiddenRules.filter(function (item) {
          return item.id !== rule.id;
        });
        await persist({ hiddenRules: state.hiddenRules }, t("changesSaved"));
      });

      text.appendChild(label);
      text.appendChild(detail);
      edit.appendChild(createActionIcon("edit"));
      remove.appendChild(createActionIcon("trash"));
      actions.appendChild(edit);
      actions.appendChild(remove);
      row.appendChild(text);
      row.appendChild(actions);
      elements.hiddenRuleList.appendChild(row);
    });
  }

  function getSavedPostsInFolder(folder, subfolder) {
    return getVisibleSavedPosts().filter(function (post) {
      if (getSavedFolder(post) !== folder) {
        return false;
      }

      if (subfolder === undefined) {
        return true;
      }

      return getSavedSubfolder(post) === subfolder;
    });
  }

  function createFolderCount(count) {
    return createElement("span", {
      className: "folder-count",
      text: String(count)
    });
  }

  function getFolderDeleteTarget(folder) {
    var remainingFolders = state.folders.filter(function (item) {
      return item !== folder;
    });

    return remainingFolders[0] || (folder === "Unfiled" ? "Saved" : "Unfiled");
  }

  function namesMatch(left, right) {
    return cleanText(left).toLowerCase() === cleanText(right).toLowerCase();
  }

  function folderNameExists(folder, exceptFolder) {
    return state.folders.some(function (item) {
      return !namesMatch(item, exceptFolder) && namesMatch(item, folder);
    });
  }

  function subfolderNameExists(folder, subfolder, exceptSubfolder) {
    return (state.subfolders[folder] || []).some(function (item) {
      return !namesMatch(item, exceptSubfolder) && namesMatch(item, subfolder);
    });
  }

  async function deleteFolder(folder) {
    var folderName = cleanText(folder);
    var posts = getSavedPostsInFolder(folderName);
    var targetFolder = getFolderDeleteTarget(folderName);
    var message;

    if (!folderName || !state.folders.includes(folderName)) {
      return;
    }

    message = posts.length
      ? 'Delete "' + folderName + '"? ' + posts.length + (posts.length === 1 ? " saved post" : " saved posts") + ' will move to "' + targetFolder + '".'
      : 'Delete "' + folderName + '"?';

    if (!window.confirm(message)) {
      return;
    }

    state.folders = state.folders.filter(function (item) {
      return item !== folderName;
    });

    delete state.subfolders[folderName];
    delete state.expandedFolders[folderName];

    if (posts.length && !state.folders.includes(targetFolder)) {
      state.folders.push(targetFolder);
    }

    posts.forEach(function (post) {
      if (state.savedPosts[post.id]) {
        state.savedPosts[post.id].folder = targetFolder;
        state.savedPosts[post.id].subfolder = "";
        state.savedPosts[post.id].savedAt = new Date().toISOString();
      }
    });

    if (posts.length && !state.subfolders[targetFolder]) {
      state.subfolders[targetFolder] = [];
    }

    if (state.folder === folderName) {
      state.folder = posts.length ? targetFolder : "All";
      state.subfolder = "All";
      state.expandedFolders = {};

      if (posts.length) {
        state.expandedFolders[targetFolder] = true;
      }
    }

    await persist(
      {
        folders: state.folders,
        savedPosts: state.savedPosts,
        subfolders: state.subfolders
      },
      "Folder deleted"
    );
  }

  async function deleteSubfolder(folder, subfolder) {
    var folderName = cleanText(folder);
    var subfolderName = cleanText(subfolder);
    var posts = getSavedPostsInFolder(folderName, subfolderName);
    var message;

    if (!folderName || !subfolderName || !state.subfolders[folderName]) {
      return;
    }

    message = posts.length
      ? 'Delete "' + subfolderName + '"? ' + posts.length + (posts.length === 1 ? " saved post" : " saved posts") + " will move to the parent folder."
      : 'Delete "' + subfolderName + '"?';

    if (!window.confirm(message)) {
      return;
    }

    state.subfolders[folderName] = state.subfolders[folderName].filter(function (item) {
      return item !== subfolderName;
    });

    posts.forEach(function (post) {
      if (state.savedPosts[post.id]) {
        state.savedPosts[post.id].subfolder = "";
        state.savedPosts[post.id].savedAt = new Date().toISOString();
      }
    });

    if (state.folder === folderName && state.subfolder === subfolderName) {
      state.subfolder = "All";
      state.expandedFolders = {};
      state.expandedFolders[folderName] = true;
    }

    await persist(
      {
        savedPosts: state.savedPosts,
        subfolders: state.subfolders
      },
      "Subfolder deleted"
    );
  }

  async function renameFolder(folder) {
    var folderName = cleanText(folder);
    var nextName;
    var previousExpanded = Boolean(state.expandedFolders[folderName]);

    if (!folderName || !state.folders.includes(folderName)) {
      return;
    }

    nextName = cleanText(window.prompt("Rename folder", folderName));

    if (!nextName || nextName === folderName) {
      return;
    }

    if (folderNameExists(nextName, folderName)) {
      showToast("Folder already exists");
      return;
    }

    state.folders = state.folders.map(function (item) {
      return item === folderName ? nextName : item;
    });

    state.subfolders[nextName] = (state.subfolders[folderName] || []).slice();
    delete state.subfolders[folderName];

    Object.keys(state.savedPosts).forEach(function (id) {
      if (state.savedPosts[id] && state.savedPosts[id].folder === folderName) {
        state.savedPosts[id].folder = nextName;
      }
    });

    if (state.folder === folderName) {
      state.folder = nextName;
    }

    delete state.expandedFolders[folderName];
    if (previousExpanded) {
      state.expandedFolders[nextName] = true;
    }

    await persist(
      {
        folders: state.folders,
        savedPosts: state.savedPosts,
        subfolders: state.subfolders
      },
      "Folder renamed"
    );
  }

  async function renameSubfolder(folder, subfolder) {
    var folderName = cleanText(folder);
    var subfolderName = cleanText(subfolder);
    var nextName;

    if (!folderName || !subfolderName || !state.subfolders[folderName]) {
      return;
    }

    nextName = cleanText(window.prompt("Rename subfolder", subfolderName));

    if (!nextName || nextName === subfolderName) {
      return;
    }

    if (subfolderNameExists(folderName, nextName, subfolderName)) {
      showToast("Subfolder already exists");
      return;
    }

    state.subfolders[folderName] = state.subfolders[folderName].map(function (item) {
      return item === subfolderName ? nextName : item;
    });

    Object.keys(state.savedPosts).forEach(function (id) {
      var post = state.savedPosts[id];

      if (post && post.folder === folderName && post.subfolder === subfolderName) {
        post.subfolder = nextName;
      }
    });

    if (state.folder === folderName && state.subfolder === subfolderName) {
      state.subfolder = nextName;
    }

    await persist(
      {
        savedPosts: state.savedPosts,
        subfolders: state.subfolders
      },
      "Subfolder renamed"
    );
  }

  async function removeSavedPost(postId) {
    var id = cleanText(postId);

    if (!id || !state.savedPosts[id]) {
      return;
    }

    delete state.savedPosts[id];
    await persist({ savedPosts: state.savedPosts }, t("savedPostRemoved"));
  }

  function createFolderPostRow(post) {
    var url = resolvePostUrl(post);
    var row = createElement("div", {
      className: "folder-post-row" + (url ? "" : " is-disabled"),
      attrs: {
        "data-id": post.id
      }
    });
    var open = createElement("button", {
      className: "folder-post-main",
      attrs: url
        ? {
            type: "button",
            "data-url": url,
            title: "Open saved post"
          }
        : {
            type: "button",
            disabled: "disabled",
            title: "No post link available"
          }
    });
    var marker = createElement("span", { className: "folder-post-marker" });
    var text = createElement("span", { className: "folder-post-text" });
    var title = createElement("strong", {
      text: post.title || post.author || "Saved post"
    });
    var meta = createElement("small", {
      text: [post.author, formatDate(post.savedAt)].filter(Boolean).join(" - ")
    });
    var remove = createElement("button", {
      className: "folder-post-delete-button",
      attrs: {
        type: "button",
        title: "Remove saved post",
        "aria-label": "Remove saved post " + (post.title || post.author || "LinkedIn post")
      }
    });

    if (url) {
      open.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        openExternalUrl(url);
      });
    }

    text.appendChild(title);
    if (meta.textContent) {
      text.appendChild(meta);
    }

    remove.appendChild(createActionIcon("trash"));
    remove.addEventListener("click", async function (event) {
      event.preventDefault();
      event.stopPropagation();
      await removeSavedPost(post.id);
    });

    open.appendChild(marker);
    open.appendChild(text);
    row.appendChild(open);
    row.appendChild(remove);
    return row;
  }

  function appendFolderPosts(parent, posts, emptyText) {
    var list = createElement("div", { className: "folder-post-list" });

    if (!posts.length) {
      list.appendChild(
        createElement("div", {
          className: "folder-empty-row",
          text: emptyText || "No saved posts"
        })
      );
    } else {
      posts.forEach(function (post) {
        list.appendChild(createFolderPostRow(post));
      });
    }

    parent.appendChild(list);
  }

  function removeFolderDropState() {
    if (!elements.folderStrip) {
      return;
    }

    elements.folderStrip.querySelectorAll(".folder-node").forEach(function (node) {
      node.classList.remove("is-dragging", "is-drop-before", "is-drop-after");
    });
  }

  async function moveFolderTo(draggedFolder, targetFolder, insertAfter) {
    var fromIndex;
    var toIndex;
    var folderName = cleanText(draggedFolder);
    var targetName = cleanText(targetFolder);
    var nextFolders = getOrderedFolders();
    var previous = nextFolders.join("\u0000") + "|" + getFolderSort();

    if (!canDragFolders() || !folderName || !targetName || folderName === targetName) {
      return;
    }

    fromIndex = nextFolders.indexOf(folderName);
    toIndex = nextFolders.indexOf(targetName);

    if (fromIndex < 0 || toIndex < 0) {
      return;
    }

    nextFolders.splice(fromIndex, 1);

    if (fromIndex < toIndex) {
      toIndex -= 1;
    }

    if (insertAfter) {
      toIndex += 1;
    }

    nextFolders.splice(toIndex, 0, folderName);
    state.folders = nextFolders;
    state.settings.folderSort = "custom";

    if (state.folders.join("\u0000") + "|" + getFolderSort() === previous) {
      renderFolders();
      return;
    }

    await persist({
      folders: state.folders,
      settings: state.settings
    }, "Folder order updated");
  }

  function createFolderHeader(folder, count, expanded) {
    var active = state.folder === folder && state.subfolder === "All";
    var header = createElement("div", { className: "folder-node-header" });
    var dragHandle = createElement("span", {
      className: "folder-drag-handle",
      text: "::",
      attrs: {
        title: "Drag to change folder order",
        "aria-hidden": "true"
      }
    });
    var button = createElement("button", {
      className:
        "folder-node-button" +
        (active ? " is-active" : "") +
        (expanded ? " is-expanded" : ""),
      attrs: {
        type: "button",
        "data-folder": folder,
        "aria-expanded": expanded ? "true" : "false",
        title: folder + " - " + count + (count === 1 ? " post" : " posts")
      }
    });
    var expander = createElement("span", {
      className: "folder-expander",
      text: expanded ? "-" : "+"
    });
    var icon = createElement("span", { className: "folder-icon", attrs: { "aria-hidden": "true" } });
    var text = createElement("span", { className: "folder-node-text" });
    var label = createElement("strong", { text: folder });
    var meta = createElement("small", {
      text: count === 1 ? "1 saved post" : count + " saved posts"
    });
    var rename = createElement("button", {
      className: "folder-rename-button",
      attrs: {
        type: "button",
        title: "Rename folder",
        "aria-label": "Rename folder " + folder
      }
    });
    var remove = createElement("button", {
      className: "folder-delete-button",
      attrs: {
        type: "button",
        title: "Delete folder",
        "aria-label": "Delete folder " + folder
      }
    });

    text.appendChild(label);
    text.appendChild(meta);
    button.appendChild(expander);
    button.appendChild(icon);
    button.appendChild(text);
    button.appendChild(createFolderCount(count));

    dragHandle.setAttribute("draggable", "true");
    dragHandle.addEventListener("dragstart", function (event) {
      var node = dragHandle.closest(".folder-node");

      folderDragSource = folder;
      if (node) {
        node.classList.add("is-dragging");
      }

      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("application/x-linkedin-feedless-folder", folder);
      event.dataTransfer.setData("text/plain", folder);
    });

    dragHandle.addEventListener("dragend", function () {
      folderDragSource = "";
      removeFolderDropState();
    });

    button.addEventListener("click", function () {
      if (expanded && state.folder === folder && state.subfolder === "All") {
        delete state.expandedFolders[folder];
        state.folder = "All";
        state.subfolder = "All";
      } else {
        state.expandedFolders = {};
        state.expandedFolders[folder] = true;
        state.folder = folder;
        state.subfolder = "All";
      }

      render();
    });

    rename.appendChild(createActionIcon("edit"));
    rename.addEventListener("click", async function (event) {
      event.preventDefault();
      event.stopPropagation();
      await renameFolder(folder);
    });

    remove.appendChild(createActionIcon("trash"));
    remove.addEventListener("click", async function (event) {
      event.preventDefault();
      event.stopPropagation();
      await deleteFolder(folder);
    });

    header.appendChild(dragHandle);
    header.appendChild(button);
    header.appendChild(rename);
    header.appendChild(remove);
    return header;
  }

  function createSubfolderNode(folder, subfolder, posts) {
    var active = state.folder === folder && state.subfolder === subfolder;
    var hasQuery = cleanText(state.query).length > 0;
    var node = createElement("div", {
      className: "folder-subnode" + (active ? " is-active" : "")
    });
    var header = createElement("div", { className: "folder-subnode-header" });
    var button = createElement("button", {
      className: "folder-subnode-button" + (active ? " is-active" : ""),
      attrs: {
        type: "button",
        "data-folder": folder,
        "data-subfolder": subfolder,
        title: subfolder + " - " + posts.length + (posts.length === 1 ? " post" : " posts")
      }
    });
    var rename = createElement("button", {
      className: "subfolder-rename-button",
      attrs: {
        type: "button",
        title: "Rename subfolder",
        "aria-label": "Rename subfolder " + subfolder
      }
    });
    var remove = createElement("button", {
      className: "subfolder-delete-button",
      attrs: {
        type: "button",
        title: "Delete subfolder",
        "aria-label": "Delete subfolder " + subfolder
      }
    });
    var text = createElement("span", { className: "folder-node-text" });

    text.appendChild(createElement("strong", { text: subfolder }));
    text.appendChild(
      createElement("small", {
        text: posts.length === 1 ? "1 saved post" : posts.length + " saved posts"
      })
    );
    button.appendChild(createElement("span", { className: "folder-subfolder-icon", attrs: { "aria-hidden": "true" } }));
    button.appendChild(text);
    button.appendChild(createFolderCount(posts.length));

    button.addEventListener("click", function () {
      state.expandedFolders = {};
      state.expandedFolders[folder] = true;
      state.folder = folder;
      state.subfolder = subfolder;
      render();
    });

    rename.appendChild(createActionIcon("edit"));
    rename.addEventListener("click", async function (event) {
      event.preventDefault();
      event.stopPropagation();
      await renameSubfolder(folder, subfolder);
    });

    remove.appendChild(createActionIcon("trash"));
    remove.addEventListener("click", async function (event) {
      event.preventDefault();
      event.stopPropagation();
      await deleteSubfolder(folder, subfolder);
    });

    header.appendChild(button);
    header.appendChild(rename);
    header.appendChild(remove);
    node.appendChild(header);
    appendFolderPosts(node, posts, hasQuery ? "No matching posts in this subfolder" : "No posts in this subfolder");
    return node;
  }

  function createFolderChildren(folder) {
    var children = createElement("div", { className: "folder-children" });
    var directPosts = getSavedPostsInFolder(folder, "");
    var subfolders = state.subfolders[folder] || [];
    var hasQuery = cleanText(state.query).length > 0;
    var addSubfolder = createElement("button", {
      className: "folder-inline-add",
      text: "+ Subfolder",
      attrs: {
        type: "button",
        title: "Add subfolder to " + folder
      }
    });

    addSubfolder.addEventListener("click", async function () {
      await createSubfolderForFolder(folder);
    });

    children.appendChild(addSubfolder);

    if (directPosts.length) {
      children.appendChild(
        createElement("div", {
          className: "folder-section-label",
          text: "Posts"
        })
      );
      appendFolderPosts(children, directPosts);
    }

    subfolders.forEach(function (subfolder) {
      children.appendChild(createSubfolderNode(folder, subfolder, getSavedPostsInFolder(folder, subfolder)));
    });

    if (!directPosts.length && !subfolders.length) {
      appendFolderPosts(children, [], hasQuery ? "No matching posts in this folder" : "No saved posts in this folder");
    }

    return children;
  }

  function renderFolders() {
    var counts = getFolderCounts();
    var totalCount = Object.keys(state.savedPosts).length;
    var visibleCount = getVisibleSavedPosts().length;
    var hasQuery = cleanText(state.query).length > 0;

    elements.folderStrip.replaceChildren();
    elements.folderSortSelect.value = getFolderSort();
    elements.folderHint.textContent = hasQuery
      ? visibleCount === 1
        ? "1 matching post"
        : visibleCount + " matching posts"
      : totalCount === 1
        ? "1 saved post"
        : totalCount + " saved posts";

    getOrderedFolders().forEach(function (folder) {
      var count = counts[folder] || 0;
      var expanded = Boolean(state.expandedFolders[folder]);
      var node = createElement("div", {
        className: "folder-node" + (expanded ? " is-expanded" : ""),
        attrs: {
          "data-folder": folder
        }
      });

      node.appendChild(createFolderHeader(folder, count, expanded));

      if (expanded) {
        node.appendChild(createFolderChildren(folder));
      }

      node.addEventListener("dragover", function (event) {
        var bounds;
        var insertAfter;

        if (!folderDragSource || folderDragSource === folder) {
          return;
        }

        bounds = node.getBoundingClientRect();
        insertAfter = event.clientY > bounds.top + bounds.height / 2;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        node.classList.toggle("is-drop-before", !insertAfter);
        node.classList.toggle("is-drop-after", insertAfter);
      });

      node.addEventListener("dragleave", function () {
        node.classList.remove("is-drop-before", "is-drop-after");
      });

      node.addEventListener("drop", async function (event) {
        var bounds = node.getBoundingClientRect();
        var draggedFolder =
          event.dataTransfer.getData("application/x-linkedin-feedless-folder") ||
          event.dataTransfer.getData("text/plain") ||
          folderDragSource;
        var insertAfter = event.clientY > bounds.top + bounds.height / 2;

        event.preventDefault();
        removeFolderDropState();
        await moveFolderTo(draggedFolder, folder, insertAfter);
      });

      elements.folderStrip.appendChild(node);
    });
  }

  function renderSubfolders() {
    elements.subfolderGroup.hidden = true;
    elements.subfolderStrip.hidden = true;
    elements.addSubfolderButton.hidden = true;
    elements.subfolderStrip.replaceChildren();
  }

  function createFolderOptions(selectedFolder) {
    var fragment = document.createDocumentFragment();

    getOrderedFolders().forEach(function (folder) {
      var option = createElement("option", {
        text: folder,
        attrs: {
          value: folder
        }
      });

      option.selected = folder === selectedFolder;
      fragment.appendChild(option);
    });

    return fragment;
  }

  function createSubfolderOptions(folder, selectedSubfolder) {
    var fragment = document.createDocumentFragment();
    var none = createElement("option", {
      text: "No subfolder",
      attrs: {
        value: ""
      }
    });
    var create = createElement("option", {
      text: "+ New subfolder",
      attrs: {
        value: "__create__"
      }
    });

    none.selected = !selectedSubfolder;
    fragment.appendChild(none);

    (state.subfolders[folder] || []).forEach(function (subfolder) {
      var option = createElement("option", {
        text: subfolder,
        attrs: {
          value: subfolder
        }
      });

      option.selected = subfolder === selectedSubfolder;
      fragment.appendChild(option);
    });

    fragment.appendChild(create);
    return fragment;
  }

  function createSelectField(label, select) {
    var field = createElement("label", { className: "select-field" });

    field.appendChild(createElement("span", { text: label }));
    field.appendChild(select);
    return field;
  }

  function createPostHeader(post, dateLabel, includeFolder) {
    var header = createElement("div", { className: "post-header" });
    var title = createElement("div", { className: "post-title" });
    var author = createElement("span", {
      className: "author",
      text: post.author || "LinkedIn post"
    });
    var date = createElement("span", {
      className: "date",
      text: dateLabel
    });

    title.appendChild(author);
    if (dateLabel) {
      title.appendChild(date);
    }

    header.appendChild(title);

    if (includeFolder) {
      header.appendChild(
        createElement("span", {
          className: "folder-label",
          text: getTargetLabel(getSavedFolder(post), getSavedSubfolder(post)) || "Saved"
        })
      );
    }

    return header;
  }

  function createPostText(post, fallback) {
    return createElement("p", {
      className: "post-text",
      text: post.text || post.title || fallback
    });
  }

  function createOpenLink(post) {
    var url = resolvePostUrl(post);

    if (!url) {
      return createElement("button", {
        text: "No Link",
        attrs: {
          type: "button",
          disabled: "disabled"
        }
      });
    }

    return createElement("a", {
      text: "Open",
      attrs: {
        href: url,
        target: "_blank",
        rel: "noreferrer"
      }
    });
  }

  function renderSavedPost(post) {
    var card = createElement("article", {
      className: "post-card",
      attrs: {
        "data-id": post.id
      }
    });
    var actions = createElement("div", { className: "post-actions saved-actions" });
    var fileControls = createElement("div", { className: "post-file-controls" });
    var folderSelect = createElement("select", {
      attrs: {
        "aria-label": "Move folder"
      }
    });
    var subfolderSelect = createElement("select", {
      attrs: {
        "aria-label": "Move subfolder"
      }
    });
    var remove = createElement("button", {
      className: "danger",
      attrs: {
        type: "button",
        title: "Remove saved post",
        "aria-label": "Remove saved post " + (post.title || post.author || "LinkedIn post")
      }
    });

    folderSelect.appendChild(createFolderOptions(getSavedFolder(post)));
    subfolderSelect.appendChild(createSubfolderOptions(getSavedFolder(post), getSavedSubfolder(post)));

    folderSelect.addEventListener("change", async function () {
      var folderName;

      if (!state.savedPosts[post.id]) {
        return;
      }

      folderName = ensureFolder(folderSelect.value);
      state.savedPosts[post.id].folder = folderName;
      state.savedPosts[post.id].subfolder = "";
      state.savedPosts[post.id].savedAt = new Date().toISOString();
      await persist({
        folders: state.folders,
        savedPosts: state.savedPosts,
        subfolders: state.subfolders
      });
    });

    subfolderSelect.addEventListener("change", async function () {
      var folderName;
      var subfolderName;

      if (!state.savedPosts[post.id]) {
        return;
      }

      folderName = ensureFolder(state.savedPosts[post.id].folder);

      if (subfolderSelect.value === "__create__") {
        subfolderName = cleanText(window.prompt("Subfolder name"));

        if (!subfolderName) {
          render();
          return;
        }

        ensureSubfolder(folderName, subfolderName);
      } else {
        subfolderName = cleanText(subfolderSelect.value);
      }

      state.savedPosts[post.id].subfolder = subfolderName;
      state.savedPosts[post.id].savedAt = new Date().toISOString();
      await persist({
        folders: state.folders,
        savedPosts: state.savedPosts,
        subfolders: state.subfolders
      });
    });

    remove.appendChild(createActionIcon("trash"));
    remove.addEventListener("click", async function () {
      await removeSavedPost(post.id);
    });

    fileControls.appendChild(createSelectField("Folder", folderSelect));
    fileControls.appendChild(createSelectField("Subfolder", subfolderSelect));

    actions.appendChild(fileControls);
    actions.appendChild(createOpenLink(post));
    actions.appendChild(remove);

    card.appendChild(createPostHeader(post, "Saved " + formatDate(post.savedAt), true));
    card.appendChild(createPostText(post, "Saved LinkedIn post"));
    card.appendChild(actions);

    return card;
  }

  function renderHiddenPost(post) {
    var card = createElement("article", {
      className: "post-card",
      attrs: {
        "data-id": post.id
      }
    });
    var actions = createElement("div", { className: "post-actions hidden-actions" });
    var hiddenLabel = post.hiddenRuleValue
      ? "Auto-hidden " + formatDate(post.hiddenAt)
      : "Hidden " + formatDate(post.hiddenAt);
    var restore = createElement("button", {
      text: "Restore",
      attrs: {
        type: "button"
      }
    });

    restore.addEventListener("click", async function () {
      delete state.hiddenPosts[post.id];
      await persist({ hiddenPosts: state.hiddenPosts });
    });

    actions.appendChild(createOpenLink(post));
    actions.appendChild(restore);

    card.appendChild(createPostHeader(post, hiddenLabel, false));
    card.appendChild(createPostText(post, "Hidden LinkedIn post"));
    card.appendChild(actions);

    return card;
  }

  function renderList() {
    elements.list.replaceChildren();
    elements.hiddenPager.hidden = true;

    if (state.view === "saved") {
      renderSavedEmpty();
      return;
    }

    if (state.view === "highlight" || state.view === "analytics" || state.view === "settings") {
      elements.emptyState.hidden = true;
      return;
    }

    var posts = getActiveItems();
    var pageCount = Math.max(1, Math.ceil(posts.length / HIDDEN_PAGE_SIZE));
    var startIndex;
    var endIndex;
    var visiblePosts;

    if (state.hiddenPage > pageCount) {
      state.hiddenPage = pageCount;
    }

    if (state.hiddenPage < 1) {
      state.hiddenPage = 1;
    }

    startIndex = (state.hiddenPage - 1) * HIDDEN_PAGE_SIZE;
    endIndex = Math.min(startIndex + HIDDEN_PAGE_SIZE, posts.length);
    visiblePosts = posts.slice(startIndex, endIndex);

    visiblePosts.forEach(function (post) {
      elements.list.appendChild(renderHiddenPost(post));
    });

    elements.hiddenPager.hidden = posts.length <= HIDDEN_PAGE_SIZE;
    elements.hiddenPrevPage.disabled = state.hiddenPage <= 1;
    elements.hiddenNextPage.disabled = state.hiddenPage >= pageCount;
    elements.hiddenPageInfo.textContent = posts.length
      ? "Page " + state.hiddenPage + " of " + pageCount + " (" + (startIndex + 1) + "-" + endIndex + " of " + posts.length + ")"
      : "Page 1 of 1";

    renderEmpty(posts.length);
  }

  function renderSavedEmpty() {
    var totalCount = Object.keys(state.savedPosts).length;
    var visibleCount = getVisibleSavedPosts().length;
    var hasQuery = cleanText(state.query).length > 0;

    elements.emptyState.hidden = totalCount > 0 && (!hasQuery || visibleCount > 0);

    if (elements.emptyState.hidden) {
      return;
    }

    elements.emptyTitle.textContent = hasQuery ? t("noSavedMatches") : t("nothingSaved");
    elements.emptyText.textContent = hasQuery ? t("tryDifferentSearch") : "Saved posts will appear inside folders.";
  }

  function renderEmpty(count) {
    var hasQuery = cleanText(state.query).length > 0;
    var hasFolderFilter = state.view === "saved" && (state.folder !== "All" || state.subfolder !== "All");

    elements.emptyState.hidden = count !== 0;

    if (state.view === "saved") {
      elements.emptyTitle.textContent = hasQuery
        ? t("noSavedMatches")
        : hasFolderFilter
          ? t("noPostsHere")
          : t("nothingSaved");
      elements.emptyText.textContent = hasQuery
        ? t("tryDifferentSearch")
        : hasFolderFilter
          ? "Choose another folder or save a post here."
          : "Saved posts will appear here.";
      return;
    }

    elements.emptyTitle.textContent = hasQuery ? t("noHiddenMatches") : t("nothingHidden");
    elements.emptyText.textContent = hasQuery ? t("tryDifferentSearch") : "Hidden posts will appear here.";
  }

  function render() {
    renderSummary();
    renderSettings();
    renderAnalytics();
    renderHighlights();
    renderHiddenRules();
    renderFolders();
    renderSubfolders();
    renderList();
  }

  function bindElements() {
    elements.savedTabCount = document.getElementById("savedTabCount");
    elements.hiddenTabCount = document.getElementById("hiddenTabCount");
    elements.viewTitle = document.getElementById("viewTitle");
    elements.savedTab = document.getElementById("savedTab");
    elements.hiddenTab = document.getElementById("hiddenTab");
    elements.highlightTab = document.getElementById("highlightTab");
    elements.analyticsTab = document.getElementById("analyticsTab");
    elements.highlightTabCount = document.getElementById("highlightTabCount");
    elements.settingsButton = document.getElementById("settingsButton");
    elements.controls = document.getElementById("controls");
    elements.autoHidePromotedToggle = document.getElementById("autoHidePromotedToggle");
    elements.darkModeToggle = document.getElementById("darkModeToggle");
    elements.autoCleanHiddenToggle = document.getElementById("autoCleanHiddenToggle");
    elements.hiddenRetentionControls = document.getElementById("hiddenRetentionControls");
    elements.hiddenRetentionAmount = document.getElementById("hiddenRetentionAmount");
    elements.hiddenRetentionUnit = document.getElementById("hiddenRetentionUnit");
    elements.languageSelect = document.getElementById("languageSelect");
    elements.storageUsageValue = document.getElementById("storageUsageValue");
    elements.memoryUsageValue = document.getElementById("memoryUsageValue");
    elements.exportBackupButton = document.getElementById("exportBackupButton");
    elements.importBackupButton = document.getElementById("importBackupButton");
    elements.importBackupInput = document.getElementById("importBackupInput");
    elements.settingsPanel = document.getElementById("settingsPanel");
    elements.highlightPanel = document.getElementById("highlightPanel");
    elements.analyticsPanel = document.getElementById("analyticsPanel");
    elements.analyticsHiddenTotal = document.getElementById("analyticsHiddenTotal");
    elements.analyticsPromotedTotal = document.getElementById("analyticsPromotedTotal");
    elements.analyticsHiddenTime = document.getElementById("analyticsHiddenTime");
    elements.analyticsPromotedTime = document.getElementById("analyticsPromotedTime");
    elements.analyticsGroupList = document.getElementById("analyticsGroupList");
    elements.highlightCount = document.getElementById("highlightCount");
    elements.highlightEnabledToggle = document.getElementById("highlightEnabledToggle");
    elements.highlightForm = document.getElementById("highlightForm");
    elements.highlightGroupValue = document.getElementById("highlightGroupValue");
    elements.highlightColor = document.getElementById("highlightColor");
    elements.highlightColorHex = document.getElementById("highlightColorHex");
    elements.addHighlightButton = document.getElementById("addHighlightButton");
    elements.highlightList = document.getElementById("highlightList");
    elements.highlightPager = document.getElementById("highlightPager");
    elements.highlightPrevPage = document.getElementById("highlightPrevPage");
    elements.highlightPageInfo = document.getElementById("highlightPageInfo");
    elements.highlightNextPage = document.getElementById("highlightNextPage");
    elements.hiddenRulePanel = document.getElementById("hiddenRulePanel");
    elements.hiddenRuleCount = document.getElementById("hiddenRuleCount");
    elements.hiddenRulesEnabledToggle = document.getElementById("hiddenRulesEnabledToggle");
    elements.hiddenRuleForm = document.getElementById("hiddenRuleForm");
    elements.hiddenRuleValue = document.getElementById("hiddenRuleValue");
    elements.addHiddenRuleButton = document.getElementById("addHiddenRuleButton");
    elements.hiddenRuleList = document.getElementById("hiddenRuleList");
    elements.folderPanel = document.getElementById("folderPanel");
    elements.folderHint = document.getElementById("folderHint");
    elements.folderSortSelect = document.getElementById("folderSortSelect");
    elements.subfolderGroup = document.getElementById("subfolderGroup");
    elements.subfolderHint = document.getElementById("subfolderHint");
    elements.folderStrip = document.getElementById("folderStrip");
    elements.subfolderStrip = document.getElementById("subfolderStrip");
    elements.searchInput = document.getElementById("searchInput");
    elements.hiddenSortGroup = document.getElementById("hiddenSortGroup");
    elements.hiddenSortSelect = document.getElementById("hiddenSortSelect");
    elements.hiddenPager = document.getElementById("hiddenPager");
    elements.hiddenPrevPage = document.getElementById("hiddenPrevPage");
    elements.hiddenPageInfo = document.getElementById("hiddenPageInfo");
    elements.hiddenNextPage = document.getElementById("hiddenNextPage");
    elements.addFolderButton = document.getElementById("addFolderButton");
    elements.addSubfolderButton = document.getElementById("addSubfolderButton");
    elements.clearHiddenButton = document.getElementById("clearHiddenButton");
    elements.list = document.getElementById("list");
    elements.emptyState = document.getElementById("emptyState");
    elements.emptyTitle = document.getElementById("emptyTitle");
    elements.emptyText = document.getElementById("emptyText");
    elements.openLinkedInButton = document.getElementById("openLinkedInButton");
    elements.openDashboardButton = document.getElementById("openDashboardButton");
    elements.toast = document.getElementById("toast");
  }

  function bindEvents() {
    elements.savedTab.addEventListener("click", function () {
      setView("saved");
    });

    elements.hiddenTab.addEventListener("click", function () {
      setView("hidden");
    });

    elements.highlightTab.addEventListener("click", function () {
      setView("highlight");
    });

    elements.analyticsTab.addEventListener("click", function () {
      setView("analytics");
    });

    elements.settingsButton.addEventListener("click", function () {
      setView("settings");
    });

    elements.openDashboardButton.addEventListener("click", function () {
      var url = chrome.runtime.getURL("dashboard/dashboard.html");

      if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
        chrome.tabs.create({ url: url });
        return;
      }

      window.open(url, "_blank", "noopener");
    });

    elements.exportBackupButton.addEventListener("click", function () {
      exportBackup().catch(function () {
        showToast("Could not export backup");
      });
    });

    elements.importBackupButton.addEventListener("click", function () {
      elements.importBackupInput.value = "";
      elements.importBackupInput.click();
    });

    elements.importBackupInput.addEventListener("change", function () {
      importBackupFile(elements.importBackupInput.files && elements.importBackupInput.files[0]);
    });

    elements.searchInput.addEventListener("input", function () {
      state.query = elements.searchInput.value;
      state.hiddenPage = 1;
      render();
    });

    elements.hiddenSortSelect.addEventListener("change", function () {
      state.hiddenSort = elements.hiddenSortSelect.value === "asc" ? "asc" : "desc";
      state.hiddenPage = 1;
      renderList();
    });

    elements.hiddenPrevPage.addEventListener("click", function () {
      if (state.hiddenPage > 1) {
        state.hiddenPage -= 1;
        renderList();
      }
    });

    elements.hiddenNextPage.addEventListener("click", function () {
      var pageCount = Math.max(1, Math.ceil(getActiveItems().length / HIDDEN_PAGE_SIZE));

      if (state.hiddenPage < pageCount) {
        state.hiddenPage += 1;
        renderList();
      }
    });

    elements.folderSortSelect.addEventListener("change", async function () {
      state.settings.folderSort = normalizeFolderSort(elements.folderSortSelect.value);
      folderDragSource = "";
      removeFolderDropState();
      await persist({ settings: state.settings }, t("changesSaved"));
    });

    elements.hiddenRuleForm.addEventListener("submit", async function (event) {
      var value = cleanText(elements.hiddenRuleValue.value);
      var rule;

      event.preventDefault();

      if (!value) {
        elements.hiddenRuleValue.focus();
        return;
      }

      if (findRuleByValue(state.highlightRules, value)) {
        showToast(t("alreadyHighlight"));
        return;
      }

      if (findRuleByValue(state.hiddenRules, value)) {
        showToast(t("alreadyHidden"));
        return;
      }

      rule = normalizeHiddenRules([
        {
          id: createId("hidden-rule"),
          value: value,
          createdAt: new Date().toISOString()
        }
      ])[0];

      state.hiddenRules = state.hiddenRules.concat(rule);
      elements.hiddenRuleValue.value = "";
      await persist({ hiddenRules: state.hiddenRules }, t("changesSaved"));
    });

    elements.autoHidePromotedToggle.addEventListener("change", async function () {
      state.settings.autoHidePromoted = elements.autoHidePromotedToggle.checked;
      await persist({ settings: state.settings }, t("changesSaved"));
    });

    elements.darkModeToggle.addEventListener("change", async function () {
      state.settings.darkMode = elements.darkModeToggle.checked;
      applyTheme();
      await persist({ settings: state.settings }, t("changesSaved"));
    });

    elements.languageSelect.addEventListener("change", async function () {
      state.settings.language = normalizeLanguage(elements.languageSelect.value);
      await persist({ settings: state.settings }, t("changesSaved"));
    });

    elements.autoCleanHiddenToggle.addEventListener("change", async function () {
      state.settings.autoCleanHidden = elements.autoCleanHiddenToggle.checked;
      await persist({ settings: state.settings }, t("changesSaved"));
    });

    elements.highlightEnabledToggle.addEventListener("change", async function () {
      state.settings.highlightEnabled = elements.highlightEnabledToggle.checked;
      state.highlightGroups = state.highlightGroups.map(function (group) {
        return Object.assign({}, group, { enabled: elements.highlightEnabledToggle.checked });
      });
      await persist({
        highlightGroups: state.highlightGroups,
        settings: state.settings
      }, t("changesSaved"));
    });

    elements.hiddenRulesEnabledToggle.addEventListener("change", async function () {
      state.settings.hiddenRulesEnabled = elements.hiddenRulesEnabledToggle.checked;
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

    elements.highlightColor.addEventListener("input", function () {
      updateHighlightColorHex(elements.highlightColor.value);
    });

    elements.highlightColorHex.addEventListener("input", function () {
      var nextColor = parseColorHex(elements.highlightColorHex.value);

      markHexInputValidity(elements.highlightColorHex, Boolean(nextColor));

      if (!nextColor) {
        return;
      }

      elements.highlightColor.value = nextColor;
      setHexInputValue(elements.highlightColorHex, nextColor);
    });

    elements.highlightColorHex.addEventListener("change", function () {
      var nextColor = parseColorHex(elements.highlightColorHex.value);

      if (nextColor) {
        elements.highlightColor.value = nextColor;
        setHexInputValue(elements.highlightColorHex, nextColor);
        return;
      }

      setHexInputValue(elements.highlightColorHex, elements.highlightColor.value);
    });

    elements.highlightPrevPage.addEventListener("click", function () {
      if (state.highlightPage > 1) {
        state.highlightPage -= 1;
        renderHighlights();
      }
    });

    elements.highlightNextPage.addEventListener("click", function () {
      var pageCount = Math.max(1, Math.ceil(state.highlightRules.length / HIGHLIGHT_PAGE_SIZE));

      if (state.highlightPage < pageCount) {
        state.highlightPage += 1;
        renderHighlights();
      }
    });

    elements.highlightForm.addEventListener("submit", async function (event) {
      var groupName = cleanText(elements.highlightGroupValue.value);
      var created;

      event.preventDefault();

      if (!groupName) {
        elements.highlightGroupValue.focus();
        return;
      }

      created = await createHighlightGroup(groupName, elements.highlightColor.value);

      if (created) {
        elements.highlightGroupValue.value = "";
      }
    });

    elements.addFolderButton.addEventListener("click", async function () {
      var folder = cleanText(window.prompt("Folder name"));

      if (!folder || state.folders.includes(folder)) {
        return;
      }

      ensureFolder(folder);
      state.folder = folder;
      state.subfolder = "All";
      state.expandedFolders = {};
      state.expandedFolders[folder] = true;
      await persist({
        folders: state.folders,
        subfolders: state.subfolders
      }, "Folder created");
    });

    elements.addSubfolderButton.addEventListener("click", async function () {
      if (state.view !== "saved" || state.folder === "All") {
        return;
      }

      await createSubfolderForFolder(state.folder);
    });

    elements.openLinkedInButton.addEventListener("click", function () {
      if (hasBrowserPromises && browser.tabs) {
        browser.tabs.create({ url: "https://www.linkedin.com/feed/" });
        return;
      }

      chrome.tabs.create({ url: "https://www.linkedin.com/feed/" });
    });

    elements.clearHiddenButton.addEventListener("click", async function () {
      if (!Object.keys(state.hiddenPosts).length) {
        return;
      }

      if (window.confirm("Restore all hidden posts?")) {
        await persist({ hiddenPosts: {} });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", async function () {
    bindElements();
    bindEvents();
    await loadState();
    setView("saved");
  });
})();
