# LinkedIn Feedless

LinkedIn Feedless is a Manifest V3 browser extension that adds controls to LinkedIn feed posts:

- Hide a post so matching repeats are removed automatically when they appear again.
- Save a post into folders and subfolders like `Databricks` -> `Unity Catalog`.
- Revisit saved posts from the extension popup.
- Restore hidden posts from the extension popup.
- Highlight posts by person, company, or post text with a custom color.
- Switch the popup and in-feed extension controls to dark mode.
- Automatically clean old hidden-post records after a configurable number of hours or days.
- Stay inactive outside `https://www.linkedin.com/*`.

## Load in Chrome

1. Open `chrome://extensions`.
2. Turn on `Developer mode`.
3. Click `Load unpacked`.
4. Select this folder: `C:\Users\Thiago\Documents\LinkedIn-Feedless`.
5. Open or refresh `https://www.linkedin.com/feed/`.

## Package for Chrome

Run this from PowerShell:

```powershell
.\scripts\package-chrome.ps1
```

The zip is written to `dist\linkedin-feedless-chrome-v0.1.0.zip`.

## Usage

On LinkedIn posts, use the `Hide` and `Save` buttons beside the post's three-dot menu. `Hide` collapses that post into a full-width in-place `Undo` prompt with a 5-second countdown, then removes it from the page and remembers it for future visits. `Save` lets you pick a folder, pick an existing subfolder, create a new folder, or create a new subfolder.

Open the extension popup from the browser toolbar:

The toolbar button is enabled on `https://www.linkedin.com/*` tabs only. On other websites it is disabled because the extension has no work to do there.

- `Saved Posts`: search saved posts, expand folders and subfolders to see saved posts inside them, and click a saved post row to open the LinkedIn post.
- `Hidden Posts`: search hidden posts, sort by newest or oldest hidden date, open a hidden post, restore one post, or clear the hidden list.
- `Highlight Posts`: enter any word or sentence, choose a color from the picker or by typing its hex value, add the rule, then copy its visible hex value, edit its word or color swatch/hex value, or remove it. Matching checks the post text, title, person name, and company name, while ignoring uppercase/lowercase, accents, and common separators like spaces, hyphens, and punctuation. Highlight rules show 20 per page with pagination. New rules use a dark-mode friendly default color.
- `Settings` button: turn on auto-hide for promoted posts, switch the extension to dark mode, and enable automatic cleanup for old hidden posts.

Configuration changes show a brief `Changes saved` confirmation in the popup.

## Browser Notes

Chrome and Edge can load this extension as an unpacked Manifest V3 extension with the same source folder.

Firefox supports most of this structure, but a production Firefox build may need a `browser_specific_settings` entry and compatibility testing for Manifest V3 behavior.

Safari Web Extensions usually need conversion through Xcode before packaging. The extension is intentionally dependency-free so that conversion work stays smaller later.

## Stored Data

The extension uses `chrome.storage.local` only. It stores:

- `folders`: folder names.
- `subfolders`: subfolder names grouped by parent folder.
- `savedPosts`: saved post metadata by post ID.
- `hiddenPosts`: hidden post metadata by post ID.
- `highlightRules`: saved highlight rules and colors.
- `settings`: extension preferences such as promoted-post hiding, dark mode, and hidden-post cleanup timing.

LinkedIn changes its page markup over time. If buttons stop appearing, the selectors in `src/content.js` are the first place to adjust.
