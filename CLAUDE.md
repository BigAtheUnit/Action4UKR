# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Action For Ukraine is a static single-page website that helps citizens contact their elected representatives (MPs) to express support for Ukraine. Users select their MP from a dropdown, enter their name, preview a pre-drafted email, and send it via mailto or webmail providers (Gmail, Yahoo, Outlook, Apple Mail).

## Development

This is a plain HTML/CSS/JS project with no build system, bundler, or package manager. To develop:

- Open `index.html` directly in a browser, or serve with any static file server (e.g., `python3 -m http.server`)
- No build, lint, or test commands exist

## Architecture

**Single-file app structure** — the entire application lives in three files:

- `index.html` — Page structure with intro landing section and a hidden form section revealed on button click
- `styles.css` — All styling including responsive breakpoints (480px, 768px, 1024px). Uses Ukrainian flag colors: blue `#0057B7` and yellow `#FFD700`
- `scripts.js` (~3450 lines) — All application logic, wrapped in a single `DOMContentLoaded` handler

**scripts.js internal layout:**
- Lines 3–3256: `mpDataByCountry` object containing hardcoded MP data arrays keyed by country (currently only `"UK"`). Each entry has `name`, `constituency`, and `email`. This is the bulk of the file.
- Lines 3258–3270: DOM element references
- Lines 3272–3295: Social share button handlers (X/Twitter, Telegram, Facebook, WhatsApp)
- Lines 3297–3319: Page scroll behavior and start button handler
- Lines 3321–3338: `populateMPs()` — populates the Select2 dropdown from MP data
- Lines 3340–3363: Form validation and completion checking
- Lines 3365–3385: `updatePreview()` — live email preview with contenteditable div
- Lines 3387–3449: Email sending — mailto link, webmail provider openers, copy-to-clipboard, `openEmailClient()` helper

**Key dependencies (loaded via CDN):**
- jQuery 3.6.0 (required by Select2)
- Select2 4.1.0-rc.0 (searchable MP dropdown)

**Data files (not used by the app currently):**
- `european_parliament_meps_contact_database.xlsx` — EU MEP contacts
- `french_assemblee_nationale_deputies.xlsx` — French deputy contacts

These xlsx files suggest planned expansion to EU and French representatives.

## Key Patterns

- MP data is hardcoded in JS rather than loaded from an external file — any data updates require editing `scripts.js` directly
- The email preview (`#emailPreview`) uses `contenteditable="true"` so users can edit the message before sending
- Form sections start hidden (`.hidden` class) and are revealed progressively
- Email sending uses `mailto:` links opened in new tabs; fallback buttons open webmail compose URLs directly
- The `openEmailClient()` function constructs provider-specific compose URLs with pre-filled to/subject/body parameters
