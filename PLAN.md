# ACTION4UKR Rebuild Plan

## Context

ACTION4UKR is a 2-year-old static advocacy website (HTML/CSS/JS) that helps UK citizens email their MPs about Ukraine. The current site has 650 hardcoded UK MPs in a 3450-line scripts.js file, uses jQuery/Select2, and only supports the UK.

This rebuild modernises the stack to **React + Vite + TypeScript + TailwindCSS**, adds support for **France (deputies) and EU (MEPs)**, introduces a multi-step campaign flow, and creates a modular architecture for future country expansion — all while remaining a **static site with no backend**.

---

## Architecture Overview

**Stack:** React 18 + Vite 5 + TypeScript 5 + TailwindCSS 3
**State:** React Context API (simple linear flow, no need for Zustand)
**Routing:** Single-page stepper pattern (no React Router for MVP)
**Data:** Static JSON files per country, lazy-loaded on selection
**Postcode Lookup:** postcodes.io API (free, no API key) → maps to constituency → matches local MP data
**Email:** URL builders for mailto, Gmail, Yahoo, Outlook, Apple Mail
**Dependencies:** Minimal — React, clsx, tailwind-merge, xlsx (dev only)

**User Flow:** Country Selection → Representative Lookup → Message Editor → Email Provider → Confirmation

---

## Project Structure

```
action4ukr/
├── public/
│   ├── data/
│   │   ├── uk.json              # 650 UK MPs
│   │   ├── france.json          # French deputies
│   │   └── eu.json              # EU MEPs
│   └── assets/
│       ├── logo.png             # Migrated from current site
│       └── social/              # x.png, telegram.png, etc.
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Sticky header with logo + social share
│   │   │   └── Layout.tsx       # Main layout wrapper
│   │   ├── steps/
│   │   │   ├── CountrySelector.tsx    # Step 1: Card-based country picker
│   │   │   ├── RepresentativeLookup.tsx # Step 2: Search/postcode/filter
│   │   │   ├── MessageEditor.tsx      # Step 3: Template + editable message
│   │   │   ├── EmailProvider.tsx      # Step 4: Provider selection
│   │   │   └── Confirmation.tsx       # Step 5: Success + share
│   │   ├── representative/
│   │   │   ├── PostcodeInput.tsx      # UK postcode search
│   │   │   ├── SearchableSelect.tsx   # Name/constituency autocomplete
│   │   │   ├── FilterPanel.tsx        # Department (FR) / Member state (EU) filter
│   │   │   └── RepresentativeCard.tsx # Display selected rep info
│   │   ├── message/
│   │   │   ├── ToneSelector.tsx       # Formal / Strong / Concise toggles
│   │   │   ├── SubjectInput.tsx       # Editable subject line
│   │   │   ├── BodyEditor.tsx         # Editable message body (textarea)
│   │   │   └── CharacterCounter.tsx
│   │   ├── email/
│   │   │   ├── ProviderCard.tsx       # Individual provider button
│   │   │   └── CopyToClipboard.tsx    # Fallback copy button
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── ProgressIndicator.tsx  # Step tracker bar
│   │       └── SocialShare.tsx        # Share buttons (X, Telegram, FB, WA)
│   ├── context/
│   │   ├── AppContext.tsx         # Campaign state + actions
│   │   └── types.ts              # State & action types
│   ├── services/
│   │   ├── templateEngine.ts     # {{placeholder}} interpolation
│   │   ├── emailUrlBuilder.ts    # Provider-specific compose URLs
│   │   ├── postcodeApi.ts        # postcodes.io integration
│   │   └── representativeSearch.ts # Search/filter logic
│   ├── config/
│   │   ├── countries.ts          # Country configs (labels, flags, search types)
│   │   ├── emailProviders.ts     # Provider URL templates
│   │   └── templates.ts          # Email templates (formal/strong/concise)
│   ├── types/
│   │   └── index.ts              # Representative, Message, EmailPayload types
│   ├── App.tsx                   # Root with stepper orchestration
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Tailwind imports
├── scripts/
│   ├── extract-uk-data.ts        # Parse UK MPs from old scripts.js → uk.json
│   ├── convert-xlsx.ts           # Convert FR/EU xlsx → JSON
│   └── validate-data.ts          # Schema + email validation
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Unified Representative Schema

```typescript
interface Representative {
  id: string;           // "uk-1", "fr-42", "eu-103"
  name: string;
  email: string;
  constituency: string; // constituency (UK), circonscription (FR), or member state (EU)
  country_code: 'UK' | 'FR' | 'EU';
  party?: string;
  chamber?: string;     // "Commons", "Assemblée nationale", "European Parliament"
  department?: string;  // France only
  member_state?: string; // EU only
  political_group?: string; // EU only
}
```

---

## Implementation Phases

### Phase 1: Project Scaffolding & Data Pipeline
**Goal:** Vite project running with all three country datasets as JSON

1. Initialize Vite + React + TypeScript project in a new `app/` subdirectory
2. Configure TailwindCSS with Ukrainian theme colors (`ukraine-blue: #0057B7`, `ukraine-yellow: #FFD700`)
3. Define TypeScript types (`Representative`, `MessageTemplate`, `EmailPayload`, `CampaignStep`, `AppState`)
4. Write `scripts/extract-uk-data.ts` — parse 650 UK MPs from current `scripts.js` → `public/data/uk.json`
5. Write `scripts/convert-xlsx.ts` — use SheetJS (`xlsx` package) to inspect column names in both xlsx files, then map to unified schema → `public/data/france.json` and `public/data/eu.json`
6. Write `scripts/validate-data.ts` — validate email format, required fields, no duplicates
7. Run all scripts, verify JSON output

**Key files to reference:**
- `scripts.js` (lines 3-3256 for UK MP data)
- `european_parliament_meps_contact_database.xlsx`
- `french_assemblee_nationale_deputies.xlsx`

### Phase 2: Core Infrastructure
**Goal:** Layout, context, and shared components functional

1. Build `AppContext` with state machine for 5-step flow (`country-selection` → `representative-search` → `message-editor` → `email-provider` → `confirmation`)
2. Build `Layout` + `Header` (sticky, logo, social share icons — port from current site)
3. Build shared components: `Button`, `Card`, `ProgressIndicator`
4. Build `App.tsx` with step orchestration (renders correct step component based on `currentStep` state)
5. Implement `useCountryData` hook — lazy-loads JSON via `fetch()` when country is selected

### Phase 3: Country Selection (Step 1)
**Goal:** Beautiful card-based country picker

1. Build `CountrySelector` with 3 cards (UK flag, France flag, EU flag)
2. Each card shows: flag, country name, representative count, brief description
3. Animated transitions on hover/click
4. Mobile: stack vertically; Desktop: side-by-side
5. Selection triggers data lazy-load and advances to Step 2

### Phase 4: Representative Lookup (Step 2)
**Goal:** Country-specific search working for all 3 countries

**UK path:**
1. Build `PostcodeInput` — debounced input that calls postcodes.io API
2. postcodes.io returns `parliamentary_constituency` → match against local `uk.json` data
3. Also offer "search by name" autocomplete as alternative
4. Display matched MP in `RepresentativeCard` (name, party, constituency, email)

**France path:**
1. Build `FilterPanel` with department dropdown (extracted from france.json)
2. `SearchableSelect` for name search with autocomplete
3. Display matched deputy in `RepresentativeCard`

**EU path:**
1. Build `FilterPanel` with member state dropdown
2. `SearchableSelect` for name search with autocomplete
3. Display matched MEP in `RepresentativeCard`

**Shared:**
- `SearchableSelect` component with native `<input>` + filtered dropdown (no jQuery/Select2)
- `RepresentativeCard` shows name, party, constituency/region, email
- Selection advances to Step 3

### Phase 5: Message Editor (Step 3)
**Goal:** Template selection, editable message, live preview

1. Build `templateEngine.ts` — `{{placeholder}}` regex interpolation with `rep_name`, `constituency`, `user_name`
2. Define 3 templates in `config/templates.ts` (formal, strong, concise) — port/adapt current email text
3. Build `ToneSelector` — 3 toggle buttons to switch templates
4. Build `SubjectInput` — editable subject line, pre-filled from template
5. Build `BodyEditor` — `<textarea>` with pre-filled interpolated template, user can freely edit
6. Build `CharacterCounter`
7. User enters their name → triggers re-interpolation of template
8. "Continue" button advances to Step 4

**Current email template to port (from scripts.js lines 3365-3385):**
- Subject: "Urgent Support for Ukraine's Full Right to Defend Itself"
- Body: "Dear {{rep_name}}, My name is {{user_name}}, from {{constituency}}..."

### Phase 6: Email Provider Selection (Step 4)
**Goal:** All email providers open correct compose URLs

1. Build `emailUrlBuilder.ts` with URL templates for each provider:
   - **mailto:** `mailto:{to}?subject={subject}&body={body}`
   - **Gmail:** `https://mail.google.com/mail/?view=cm&fs=1&to={to}&su={subject}&body={body}`
   - **Yahoo:** `https://compose.mail.yahoo.com/?to={to}&subject={subject}&body={body}`
   - **Outlook:** `https://outlook.live.com/owa/?path=/mail/action/compose&to={to}&subject={subject}&body={body}`
   - **Apple Mail:** `mailto:{to}?subject={subject}&body={body}`
2. Build `EmailProvider` step with `ProviderCard` buttons (icon + label)
3. Build `CopyToClipboard` using `navigator.clipboard.writeText()` (modern API, replaces current `execCommand`)
4. Clicking provider → opens compose URL in new tab → advances to Step 5

### Phase 7: Confirmation & Social Sharing (Step 5)
**Goal:** Success screen with viral sharing

1. Build `Confirmation` screen — "Your email draft is ready" message
2. Build `SocialShare` — port share URLs from current site:
   - X/Twitter: `https://twitter.com/intent/tweet?url={url}&text={text}`
   - Telegram: `https://t.me/share/url?url={url}&text={text}`
   - Facebook: `https://www.facebook.com/sharer/sharer.php?u={url}&quote={text}`
   - WhatsApp: `https://api.whatsapp.com/send?text={text}%20{url}`
3. "Contact Another Representative" button → resets flow
4. Copy campaign link button

### Phase 8: Responsive Design & Accessibility
**Goal:** WCAG AA, mobile-first, polished

1. Mobile-first responsive design (Tailwind breakpoints: `sm:480px`, `md:768px`, `lg:1024px`)
2. WCAG AA: semantic HTML, ARIA labels, focus management between steps, keyboard navigation
3. Color contrast verification (blue #0057B7 on white = 8.59:1)
4. Touch targets >= 44x44px on mobile
5. Screen reader: `aria-live` regions for dynamic content, step announcements
6. Skip links, focus trapping in modals if any

### Phase 9: Testing & Final Polish
**Goal:** Verified, performant, deployable

1. Manual testing: all 3 countries x all 5 email providers x all 3 templates
2. Lighthouse audit (target 90+ all categories)
3. Bundle size check — lazy-loaded country data should not bloat initial load
4. Cross-browser: Chrome, Firefox, Safari, Edge
5. Mobile device testing
6. Build for production: `npm run build` → verify `dist/` output

---

## Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| State management | React Context | Linear flow, simple state, no library needed |
| Routing | Single-page stepper | No distinct URLs needed for MVP; simpler than React Router |
| MP search (UK) | postcodes.io + local data | Free API, no key needed, postcode → constituency → match JSON |
| MP search (FR/EU) | Client-side filter | Filter JSON by department/member_state + name autocomplete |
| Autocomplete | Custom `<input>` + filter | Replace jQuery Select2 with lightweight native solution |
| Email preview | `<textarea>` | More accessible and predictable than `contenteditable` div |
| Clipboard | `navigator.clipboard` API | Modern replacement for deprecated `execCommand` |
| Data loading | Lazy `fetch()` per country | Only load selected country's data (~50-100KB each) |
| Build location | New `app/` subdirectory | Keep old site as reference during rebuild |

---

## Verification Plan

1. **Data pipeline:** Run conversion scripts, verify JSON files have correct entry counts and valid emails
2. **UK flow:** Enter postcode "SW1A 1AA" → should find Westminster MP → compose email via Gmail → verify compose URL opens correctly
3. **France flow:** Select a department → pick a deputy → send via Outlook → verify
4. **EU flow:** Filter by member state → pick MEP → send via mailto → verify
5. **Template switching:** Switch between formal/strong/concise → verify content changes and placeholders resolve
6. **Edit flow:** Modify subject and body → verify edits persist through to email compose URL
7. **Social sharing:** Click each share button → verify correct URL and pre-filled text
8. **Accessibility:** Tab through entire flow with keyboard only; test with screen reader
9. **Mobile:** Test full flow on mobile viewport (375px width)
10. **Performance:** Lighthouse audit, verify < 2s initial load
