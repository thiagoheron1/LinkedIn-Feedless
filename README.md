<div align="center">
  <img src="assets/logo-source.png" alt="LinkedIn Feedless logo" width="180">

  # LinkedIn Feedless

  **A calmer, more useful LinkedIn feed.**

  Hide distractions, save valuable posts into folders, and highlight the topics that matter to you.

  ![Version](https://img.shields.io/badge/version-0.1.0-0A66C2?style=flat-square)
  ![Chrome](https://img.shields.io/badge/Chrome-Manifest_V3-34A853?style=flat-square&logo=googlechrome&logoColor=white)
  ![Privacy](https://img.shields.io/badge/data-stored_locally-5B5FC7?style=flat-square)
  ![Dependencies](https://img.shields.io/badge/dependencies-none-24292F?style=flat-square)
</div>

---

## About

LinkedIn Feedless is a browser extension that gives you direct control over your LinkedIn feed. Small **Hide** and **Save** controls appear beside each post's menu, helping you remove unwanted content and build an organized library of posts worth revisiting.

Rules can automatically hide promoted or unwanted posts, while customizable highlight groups make important people, companies, jobs, and technical topics stand out as soon as they appear.

The extension runs only on the LinkedIn feed and stores its data locally in your browser.

## Features

| Feature | What it does |
| --- | --- |
| **Hide posts** | Removes a post after a five-second undo window and remembers it when it appears again. |
| **Save posts** | Saves useful posts without duplicates and organizes them in folders and subfolders. |
| **Highlight groups** | Highlights matching words or sentences with a color assigned to each priority group. |
| **Hidden-word rules** | Automatically hides feed posts containing configured words or sentences. |
| **Promoted-post filter** | Automatically removes promoted posts when enabled. |
| **Dashboard** | Opens a full-page workspace for saved posts, hidden posts, highlights, analytics, and settings. |
| **Analytics** | Tracks hidden posts, promoted posts, highlights by group, and estimated time saved. |
| **Dark mode** | Gives the popup and extension controls a comfortable dark appearance. |
| **Automatic cleanup** | Removes old hidden-post records after a configurable number of hours or days. |
| **Backup and restore** | Exports extension data so your folders, rules, posts, and preferences can be preserved. |

## Install in Chrome

> LinkedIn Feedless is currently installed as an unpacked extension while it is in development.

1. Download or clone this repository.
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** in the top-right corner.
4. Click **Load unpacked**.
5. Select the repository folder containing `manifest.json`.
6. Open or refresh [LinkedIn Feed](https://www.linkedin.com/feed/).

The LinkedIn Feedless icon will appear in Chrome's extensions menu. Pin it to the toolbar for quick access.

## How to Use

### Hide a post

Click **Hide** beside a LinkedIn post's three-dot menu. The post becomes a small, full-width message with a five-second countdown. Click **Undo** during that time to restore it; otherwise, LinkedIn Feedless removes it and remembers your choice.

Hidden posts can be reviewed, sorted, restored, or removed from the **Hidden Posts** tab. You can also add words or sentences that should hide matching posts automatically.

### Save a post

Click **Save** beside a post, then choose a folder and optional subfolder. You can create a structure such as:

```text
Data Engineering
└── Databricks
    └── Unity Catalog
```

Click **Save** again to remove an already-saved post. Open the **Saved Posts** tab or dashboard to expand folders and select a post; it opens the original LinkedIn post in a new tab.

### Highlight important posts

1. Open **Highlight Posts**.
2. Create a group, such as `Jobs`, `Databricks`, or `People to follow`.
3. Choose the group's highlight color.
4. Open the group and add words, names, companies, or sentences.
5. Move groups up or down to set their priority when more than one rule matches.

Matching is case-insensitive and tolerant of accents and common punctuation. A short label on the post shows which rule matched. Groups and all highlighting can be enabled or disabled independently.

### Configure the extension

Open **Settings** from the top-right button to manage:

- Auto-hide promoted posts
- Automatic cleanup of hidden-post history
- Dark mode
- Extension language
- Storage usage
- Data export and import

Changes are saved immediately and confirmed with a brief notification.

## Dashboard

Use the dashboard button in the popup to open LinkedIn Feedless in a full browser tab. Its sidebar provides access to saved folders, hidden posts, highlight groups, analytics, and settings without the space limits of the popup.

Saved folders and subfolders begin collapsed for easier scanning. Expand only the area you need, then click a post row to open its original LinkedIn URL.

## Package for Chrome

To build a distributable ZIP from PowerShell:

```powershell
.\scripts\package-chrome.ps1
```

The package is created at:

```text
dist\linkedin-feedless-chrome-v0.1.0.zip
```

## Privacy and Storage

LinkedIn Feedless does not use an external server. Configuration and post metadata are stored with `chrome.storage.local` in your browser profile.

The extension stores only the information needed for its features, including post IDs and links, folder names, hidden-post history, highlight rules, settings, and analytics counters. It does **not** store a complete copy of each LinkedIn post.

Because local extension storage does not automatically follow you to every browser profile or device, use the export feature to keep a backup of your configuration and saved-post library.

## Browser Support

| Browser | Status |
| --- | --- |
| **Google Chrome** | Primary target; load directly as a Manifest V3 extension. |
| **Microsoft Edge** | Can load the same unpacked extension from `edge://extensions`. |
| **Firefox** | Planned; requires Manifest V3 compatibility checks and browser-specific metadata. |
| **Safari** | Planned; requires conversion and packaging with Xcode. |

## Project Structure

```text
LinkedIn-Feedless/
├── assets/       # Logo and extension icons
├── dashboard/    # Full-page extension dashboard
├── popup/        # Toolbar popup interface
├── scripts/      # Packaging utilities
├── src/          # Feed controls and background worker
└── manifest.json # Chrome extension configuration
```

## Development Notes

LinkedIn changes its page structure regularly. If feed controls stop appearing after a LinkedIn update, the post discovery and selector logic in `src/content.js` is the first place to inspect.

After making changes, return to `chrome://extensions`, click the extension's **Reload** button, and refresh the LinkedIn feed.

---

<div align="center">
  Built for a quieter, more intentional LinkedIn experience.
</div>
