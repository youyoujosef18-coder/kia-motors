# Handoff: Dealership OS — vehicle catalogue, private admin, CRM, sales pipeline & customer portal

## Overview

An export-market vehicle dealership system: a public catalogue of 152 factory
configurations priced FOB, plus a URL-gated admin covering a site content editor,
inventory management, CRM leads, a drag-and-drop sales pipeline, a quotation builder, a
customer portal and a mobile salesperson view.

Source of record for all vehicle data is `CPC-kai - 0901.pdf` (included in `uploads/`).
Market is Algeria-facing with EN / FR / 中文 storefront copy and USD / EUR / DZD display.

## About the design files

The files in this bundle are **design references created in HTML** — a working prototype
showing intended look and behaviour, **not production code to copy directly**.

`Dealership OS.dc.html` is authored for a streaming component runtime (`support.js`) with
an inline-styles-only constraint. Do not port that runtime. The task is to **recreate
these designs in the target codebase's existing environment** — React, Vue, Svelte,
Laravel/Blade, whatever is established — using its own routing, styling and component
patterns. If no environment exists yet, choose the framework appropriate to the team and
implement there.

What *should* transfer verbatim:

- `catalog.js` — the vehicle data transcription. This is real, reviewed data; treat it as
  the seed for your database, not as a design artefact.
- The design tokens, layout measurements and behaviour rules documented below.
- The business rules, which are commercial requirements rather than design preferences.

## Fidelity

**High-fidelity.** Final colours, typography, spacing and interactions. Recreate the UI
closely using the codebase's existing libraries. Every value in the Design Tokens section
is exact.

Caveat: the prototype uses inline styles exclusively because of its runtime. Your
implementation should use the codebase's normal styling approach (CSS modules, Tailwind,
styled-components) — the constraint is not part of the design.

---

## Architecture: routing & access

Two zones in one application.

**Public** — `store` (showroom) and `vehicle` (detail page). No session required.

**Private** — `dashboard`, `content` (site editor), `inventory`, `crm`, `quote`, `garage`,
`mobile`. Reached only at **`/admin`**. The prototype uses `#admin` because it is a
single file; implement as a real route.

The gate rule, which matters:

> A private screen renders only when the request has **both** a valid session **and** the
> `/admin` route. A session alone is not enough.

This exists because a session left open on a shared machine would otherwise surface admin
navigation on the public URL. Leaving `/admin` while on a private screen redirects to the
public storefront and drops selection state. The public site carries **no link and no
sign-in button** pointing at the admin.

### Roles

| Role | Screens |
| --- | --- |
| Super Admin | dashboard, content, inventory, crm, quote, mobile, garage |
| General Manager | dashboard, content, inventory, crm, quote |
| Sales Manager | dashboard, crm, quote, mobile |
| Salesperson | crm, quote, mobile |
| Inventory Manager | inventory, dashboard |
| Marketing | content, dashboard |
| Accountant | dashboard, quote |
| Customer | garage |

Navigation is built by filtering the screen list through the role's allow-list, so each
account sees only its own surfaces. On sign-in, land the user on the first screen in their
allow-list.

Demo accounts (prototype only — replace with real auth):

| Email | Role |
| --- | --- |
| `admin@kaimotors.dz` | Super Admin |
| `gm@kaimotors.dz` | General Manager |
| `marketing@kaimotors.dz` | Marketing |
| `stock@kaimotors.dz` | Inventory Manager |
| `sales@kaimotors.dz` | Salesperson |
| `ines@example.com` | Customer |

Staff password `kai2026`, customer `garage`. Sessions persist 8 hours in `localStorage`.

> **The prototype gate hides and scopes; it does not protect.** Credentials are in
> client-side JavaScript. Production needs server-side authentication, hashed passwords
> (bcrypt/argon2), HTTP-only session cookies and **server-enforced** RBAC on every
> endpoint. Client-side role filtering is a UI convenience, never the boundary.

---

## Design tokens

Sourced from the bound Organic design system, retuned to an automotive-commercial
register (dark navy chrome, squared geometry).

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#f4f5f7` | Page ground |
| `--color-surface` | `#ffffff` | Cards, tables, panels |
| `--color-text` | `#101a33` | Body and headings |
| `--color-accent` | `#c8102e` | Primary actions, active states, emphasis |
| `--color-accent-2` | `#1f4e79` | Secondary voice, sage-replacement accent |
| Header chrome | `#0b1121` | Top navigation bar |
| `--color-divider` | rule colour | Table rules, input borders |

Ramps `--color-neutral-100…900`, `--color-accent-100…900`, `--color-accent-2-100…900` are
available. Convention used throughout:

- **100–300** — tinted fills, hovers, subtle borders
- **500** — the role's base
- **700–900** — text on tinted fills, pressed states

Status colour mapping:

- Available → `--color-accent-2-100` bg / `--color-accent-2-800` text
- Reserved, Suspended, warnings → `--color-accent-200` bg / `--color-accent-800` text
- Sold, neutral, inactive → `--color-neutral-200/300` bg / `--color-neutral-800/900` text

Body copy in the accent must use `--color-accent-700` or deeper — the base accent hits
only 3:1 against the ground, enough for chrome and headline-scale type but not paragraphs.

### Typography

- Headings: `--font-heading` (Caprasimo) — display voice, used for numerals and prices too
- Body: `--font-body` (Figtree)

| Element | Size | Notes |
| --- | --- | --- |
| Hero headline | `clamp(34px, 4.4vw, 56px)` | `text-wrap: balance` |
| Screen title (h1) | `clamp(30px, 3.4vw, 42px)` | |
| Vehicle name (aside h2) | 26px / 1.15 | |
| FOB price (aside) | 32px / 1.1 | heading font |
| Card price | 20px | heading font |
| Card model name | 16px / 1.2 | heading font |
| Section heading (h4) | ~17px | |
| Body / table cell | 13px | |
| Meta, captions | 11–12px | `.text-muted` |
| Uppercase label | 11px, `letter-spacing: 0.06em` | |
| Tag / pill | 10–11px | |

Mobile view hit targets: `min-height: 44px`.

### Spacing

Use the `--space-*` scale only. **`--space-5` does not exist** — it silently drops the
declaration. Valid: `--space-1` through `--space-4`, `--space-6`, `--space-8`
(`--space-4` ≈ 17.6px, `--space-6` ≈ 26.4px).

### Radius & elevation

Squared geometry: `2px` on buttons, pills, chips, inputs, scrollbar thumbs.
`--radius-sm` / `--radius-md` / `--radius-lg` for containers, `--radius-md` on textareas.
Elevation via `--shadow-sm` / `--shadow-md` / `--shadow-lg` — never ad-hoc box-shadows.

### Motion

- `riseIn` — 0.18–0.2s ease, `opacity 0→1` with `translateY(6px)→0`. Used on dialogs,
  toasts, the bulk-action bar and expanding drawers.
- `heroDrift` — 26s ease-in-out infinite alternate, `scale(1.04)` → `scale(1.14)
  translate3d(-2%, -1.5%, 0)`. The hero image-slot fallback. Wrapped in
  `@media (prefers-reduced-motion: reduce)` which disables it.
- Card hover — `translateY(-2px)` plus shadow step up.
- Pipeline column drop target — `background` transition 0.12s.

Focus: `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }`
Never leave the browser default ring.

---

## Screens

### 1. Showroom (public, `/`)

**Purpose** — browse all published configurations, filter to a shortlist, open one.

**Layout**

- Full-bleed hero, `min-height` ~440px, dark overlay gradient over video or image.
  Headline block flush-left, max-width 52ch, with kicker tag above and stat strip below.
- Hero background: `<video>` when a URL is configured (`position:absolute; inset:0;
  object-fit:cover`), otherwise the drop-in image slot with `heroDrift`.
- Stat strip: 3 cells, `--space-4 --space-6` padding, on `--color-surface`.
- Filter bar: search input (max-width 380px), sort segmented control, result count
  pushed right with `margin-left:auto`. Below it, a wrapping row of brand pills.
- Results: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`, gap
  `--space-4`.

**Vehicle card**

- `--color-surface`, `--space-3` padding, `--shadow-sm`, hover `translateY(-2px)` +
  `--shadow-md`.
- Colour-tinted hero block, 138px tall: `linear-gradient(150deg, {hex}55, {hex}14)` with
  `inset 0 0 0 1px color-mix(in srgb, var(--color-text) 8%, transparent)`. Colour name
  bottom-left at 12px/0.4 opacity, status tag bottom-right.
- Name block, `min-height: 58px` — brand kicker, model (heading, 16px), and a detail line
  **only when one exists** (see Data note on `detail`).
- Footer row — FOB price (heading, 20px) with `MOQ n` or `China MSRP ¥…` beneath; colour
  swatches right-aligned, max 6, 11px circles.

**Empty state** — card with "Nothing matches that filter" and a Clear filters button.

### 2. Vehicle detail (public)

Two columns: `repeat(auto-fit, minmax(330px, 1fr))`, gap `--space-8`, items start-aligned.
Right column is `position: sticky; top: 110px`.

**Left column, in order**

1. Hero image slot — `min(400px, 48vw)` tall, colour-tinted gradient ground, rounded,
   overflow hidden. Caption note beneath about source priority.
2. Colour selector — chips at 2px radius, 16px swatch, name, Chinese name when present,
   and a surcharge tag (`+250 USD` / `+600 USD`) where the sheet lists one. Selected chip:
   `--color-accent-200` fill, `1px solid var(--color-accent)`. When the sheet names no
   colour, show a card explaining the field is *Not specified* instead.
3. Gallery — `repeat(auto-fill, minmax(136px, 1fr))`, ten 4:3 image slots labelled
   Front 3/4, Rear 3/4, Side profile, Front, Rear, Interior, Dashboard, Seats, Wheels,
   Trunk.
4. Spec table + equipment card side by side, `minmax(280px, 1fr)`.
   Spec rows: label left `.text-muted`, value right, 7px vertical padding, 1px bottom
   rule at `color-mix(in srgb, var(--color-text) 8%, transparent)`. **Missing values
   render italic in `--color-neutral-600`** — this distinction is load-bearing.
5. Finance estimate (hideable) — down-payment range 0–60 step 5, term segmented
   24/36/48/60, annual rate number input, and a monthly figure on `--color-accent-2-100`.
6. 360° viewer placeholder card (hideable).
7. Related configurations (hideable) — same-brand, max 4.

**Right column** — brand kicker, model, detail line, FOB price at 32px, estimated
conversion beneath, MOQ / status / MSRP tags, then the CTA stack: Request quotation
(primary), Book a test drive, Reserve this vehicle, Value my trade-in (secondary),
WhatsApp the sales desk (ghost). Below, a note that every request creates a CRM lead.
Then a WhatsApp card on `--color-accent-2-100`.

**Finance maths** — standard amortisation. `down = price × downPct/100`,
`i = annualRate/1200`, `monthly = (price − down) × i / (1 − (1+i)^−term)`. When `i = 0`,
`monthly = (price − down) / term`. Label it indicative, never an offer.

### 3. Sign-in gate (`/admin`)

Two columns. Left: "Private area" tag, heading, explanation, and the demo account list —
each row a button that fills the form, showing role, email and the role's screen scope.
Right: a `--shadow-md` card with email, password, error strip on
`--color-accent-100`/`--color-accent-800`, Sign in (primary, block), "Back to the public
showroom" (ghost), and the production-security caveat in 11px muted text.

Enter submits from either field. Wrong credentials: "Those credentials do not match an
active account." When a signed-in user hits a screen outside their role, the heading
changes to "This area needs a sign-in" and explains the role mismatch.

### 4. Site editor (private)

Edits what the public site shows. Three cards in
`repeat(auto-fit, minmax(300px, 1fr))`:

- **Identity & contact** — dealership name (drives the header brand mark live), WhatsApp
  line, email, phone, address.
- **Showroom copy** — EN / Français / 中文 tabs; kicker input, headline textarea (74px),
  sub-headline textarea (96px). The tab switches which translation you are editing; a note
  states which language is active.
- **Hero video** — MP4/WebM URL, poster URL, and a status strip on `--color-bg` with a
  2px `--color-accent` left border showing what is playing.
- **Announcement bar** — bold label and message.
- **Show/hide toggles** — hero video, announcement bar, China MSRP, finance calculator,
  360° block, related configurations. Custom switch: 44×24 track at 2px radius,
  `--color-accent` when on / `--color-neutral-300` when off, 18px knob, `justify-content`
  flipping end/start. Row hover tints `--color-accent-100`.

Header actions: Reset to defaults (ghost), View public site (primary). Edits save on
every keystroke and persist. Toggle changes write to the audit log.

### 5. Inventory (private)

All 152 rows. Header: title, count, row filter input (200px), Export CSV.

**Bulk bar** — appears when a row is selected: `--color-neutral-900` ground,
`--color-neutral-100` text, 2px radius, `riseIn`. Count left, actions right (Publish,
Unpublish, Clear) as 1px outlined buttons in
`color-mix(in srgb, #f9f4ed 40%, transparent)`.

**Table** — `min-width: 900px`, `max-height: 620px`, scroll in both axes. Columns:
checkbox, Brand, Model/version as printed (max-width 290px, `text-wrap: pretty`),
FOB $ (tabular-nums, 600 weight), MSRP ¥, Colours (swatch cluster, max 6), MOQ, Status,
Published (a clickable tag toggling Published/Draft), Manage. Selected rows tint
`color-mix(in srgb, var(--color-accent) 8%, transparent)`.

**Manage drawer** — `riseIn`, three cards:

- Price & order — FOB price and MOQ number inputs, with a note that deviations are logged.
- Colour manager — each colour as a row (swatch, name, hex in `<code>`, delete ×), then a
  name input, native colour picker (46×36) and Add.
- Image manager — the ten view slots at `minmax(96px, 1fr)`, plus a note that each image
  stores source, source URL, colour, view and a verified-model flag.

**Below** — Exchange rates (1 USD = EUR, 1 USD = DZD; administrator-set, never fetched
live) and the Audit log (time / description / actor, 210px scroll).

### 6. Dashboard (private)

- KPI grid `repeat(auto-fill, minmax(168px, 1fr))`: Configurations, Brand blocks,
  Catalogue value, Lowest FOB, Highest FOB, New leads (accent-700), Open deals,
  Conversion (accent-2-800). Each: uppercase label, 26px heading-font value, muted sub.
- Configurations by brand — horizontal bars, 112px label gutter, 10px track on
  `--color-neutral-200`, fill `--color-accent-2-500`.
- FOB price distribution — vertical bars in 8 bands (<10k, 10–15k, 15–20k, 20–30k,
  30–45k, 45–60k, 60–80k, 80k+), 150px tall; the top three bands in `--color-accent`, the
  rest `--color-accent-300`.
- Lead conversion funnel — New → Contacted → Qualified → Negotiation → Reserved → Won,
  20px bars, last step `--color-accent-2-500`, others `--color-accent-400`.
- Data completeness — four cells counting rows with a colour named, an MSRP printed, an
  FOB price printed, and verified photography attached.

All figures derive from live state. No hardcoded chart data.

### 7. Sales desk (private)

Segmented control switches Leads / Pipeline.

**Leads** — table, `min-width: 940px`: Customer (name + date · id), Configuration
(version + brand), Colour (swatch + name), FOB, Source tag, Owner, Status (a `<select>`
of the ten statuses, 30px min-height), Follow-up (tag; unassigned leads tint accent).

**Pipeline** — ten columns, 232px wide, horizontal scroll, `min-width: max-content`.
Column header: stage name (heading, 14px), count tag, aggregate value beneath. Body is a
drop target, `min-height: 130px`; while dragged over it tints `--color-accent-200` with a
2px dashed accent outline.

Deal cards are `draggable`, `cursor: grab`, `--color-bg` ground, `--shadow-sm`, dragging
at `opacity: 0.45`. Content: customer name + deal id, vehicle, price (heading, 15px),
owner initial tag, salesperson, and a Quote button that opens the quotation builder
pre-filled with that deal.

Stages: New Lead, Qualified, Vehicle Selected, Quote Sent, Negotiation, Reservation,
Payment, Contract, Delivery, Completed.

Lead statuses: New, Contacted, Qualified, Vehicle Selected, Test Drive Scheduled,
Negotiation, Finance Pending, Reserved, Won, Lost.

### 8. Quotation builder (private)

Left: build form — configuration `<select>` (brand — version · $price), customer, units,
discount per unit, trade-in allowance, freight & fees, duty/tax %. An MOQ warning strip
appears when units fall below the sheet's minimum.

Right: the printable document, `#quote-print`, on `--color-neutral-100`, `--space-8`
padding. Dealership name and "Proforma quotation · FOB China" left; reference
(`Q-{id}-09`) and date · "valid 14 days" right. Prepared-for and salesperson blocks, then
the vehicle label and its colour/MOQ meta, then the line items:

```
FOB unit price          → money(unit)
Discount per unit       → −money(discount)  or —
Units                   → qty
Subtotal                → (unit − discount) × qty
Duty / tax {tax}%       → subtotal × tax/100
Freight & fees          → money(fees)
Trade-in allowance      → −money(tradeIn)  or —
Total                   → subtotal + duty + fees − tradeIn   [17px, heading font, no rule]
```

Footer note: FOB per the source list, converted amounts estimated and non-binding,
specification to be confirmed on the factory order sheet.

Header actions: Mark sent, Export PDF. Statuses: Draft, Sent, Viewed, Accepted, Rejected,
Expired.

**Print CSS** — hide everything, show only `#quote-print`:

```css
@media print {
  body * { visibility: hidden !important; }
  #quote-print, #quote-print * { visibility: visible !important; }
  #quote-print { position: absolute; inset: 0; margin: 0; box-shadow: none !important; }
}
```

### 9. My Garage (customer portal)

Max-width 1120px. Three cards: the owned vehicle (colour-tinted hero, name, colour ·
price, status and VIN tags); Delivery status as a vertical timeline (11px dots, 2px
connector, completed steps `--color-accent` and 600 weight, pending at 0.6 opacity);
Payments (deposit paid, balance due, then a heading-font Balance row).

Second row: Documents (Proforma quotation, Sales contract, Commercial invoice, Bill of
lading — each with a state tag), Saved configurations (clickable, opens the vehicle page),
and Service (empty state plus a booking button).

### 10. Mobile sales (private)

A 390px phone frame — `--color-neutral-900` shell, 44px outer radius, 12px padding, 34px
inner radius, 760px tall. Header "Today" plus a count tag. Scrolling lead list; each card
carries name, status tag, vehicle, colour swatch, price, and three 44px-min buttons:
Call, WhatsApp, Advance (advances the lead one status).

---

## Interactions & behaviour

**Storefront filtering** — brand pill (single-select, All default), search across
`brand + version` case-insensitive, sort by most-requested / price ascending / price
descending. Unpriced rows sort last (treat as `1e9`). Only `published` rows appear.

**Colour selection** — selecting a swatch updates the main hero for that vehicle. The
selection is keyed per vehicle id, so it survives navigating away and back, and it is
carried into any lead created from that page. Colours with no verified image stay
selectable and show "Colour preview unavailable".

**Currency** — USD / EUR / DZD switch in the header. `money(usd)` multiplies by the
admin-set rate and formats: `$1,234` / `€1,234` / `DA 1,234`. A null price renders
"Contact dealer", never `$0`. USD FOB remains the stored base; converted figures are
labelled estimates.

**Language** — EN / FR / 中文 switch covers storefront copy and navigation. Admin
internals are English-only in the prototype.

**Request actions → CRM** — each of the seven public actions (Request quotation, Book test
drive, Reserve vehicle, Request financing, Trade-in request, WhatsApp inquiry, Request
more information) opens the same dialog: name, phone, note, plus a read-only summary strip
with colour swatch, configuration and price. On submit:

1. Create a lead — status `New`, owner `Unassigned`, source = the action, with vehicle,
   version, selected colour and quoted price attached.
2. Create a pipeline deal at stage `New Lead`.
3. Increment the vehicle's request counter.
4. Schedule a 24-hour follow-up task.
5. Confirm with a toast naming the lead id, vehicle and colour.

**Pipeline drag and drop** — HTML5 drag events. `dragover` must `preventDefault()` to
allow the drop; track the hovered stage for the highlight and clear it on `dragleave` and
`dragend`. Dropping reassigns the deal's stage and flashes a toast.

**Toasts** — fixed, bottom-centre, `--color-neutral-900` ground, 2px radius,
`--shadow-lg`, `riseIn`, auto-dismiss at 2.8s. Clear the pending timeout on unmount.

**Audit log** — every stock change, publish toggle, price edit, bulk action, rate change,
colour edit, site-setting toggle and sign-in writes an entry with actor and timestamp.
Price edits record the old and new value and note the deviation from the source list.

**Hero video** — muted, looping, autoplaying, `playsInline`, `object-fit: cover`. Call
`play()` on `loadedmetadata` and swallow the rejection, since some browsers ignore the
autoplay attribute. On `error`, fall back to the image slot — a missing file must never
leave a black hero. Key the element on its source so changing the URL remounts it.

---

## State

Single store shared by every screen — the public site and the admin read and write the
same records. In production this is your database plus a typed API; the prototype holds it
in one component's state.

| Slice | Contents |
| --- | --- |
| `cars` | The 152 configurations; mutated by admin edits |
| `leads` | CRM leads |
| `deals` | Pipeline deals |
| `audit` | Audit entries, newest first |
| `site` | Editable site content, persisted |
| `auth` | Session: name, role, email |
| `rates` | `{ USD: 1, EUR, DZD }`, administrator-set |
| `screen`, `vehicleId` | Routing |
| `lang`, `currency` | Display preferences |
| `q`, `brand`, `sort`, `invQ` | Filters |
| `colorPick` | Selected colour per vehicle id |
| `down`, `term`, `rate` | Finance inputs |
| `quote` | Quotation draft |
| `sel`, `expanded` | Inventory selection and open drawer |
| `dragId`, `overStage` | Drag state |
| `dialog`, `form`, `toast` | Transient UI |

Persisted to `localStorage`: `dealership-os.session` (8h expiry) and
`dealership-os.site`. Everything else is in-memory in the prototype and belongs in the
database.

### Suggested entities

`users`, `roles`, `permissions`, `customers`, `leads`, `lead_activities`, `vehicles`,
`vehicle_images`, `vehicle_features`, `vehicle_views`, `favorites`, `comparisons`,
`appointments`, `test_drives`, `trade_ins`, `quotes`, `quote_items`, `reservations`,
`deals`, `payments`, `financing_applications`, `documents`, `tasks`, `messages`,
`notifications`, `campaigns`, `audit_logs`.

---

## Business rules

These are commercial requirements, not design preferences. They were applied throughout
the transcription and must survive the port.

1. **FOB Price ($) is authoritative.** China MSRP (¥) is reference only. Admin price
   changes require audit logging.
2. **Nothing is invented.** Absent specification → *Not specified*. Absent price →
   *Contact dealer*. Never substitute a plausible value.
3. **Duplicates are preserved, not corrected.** The sheet contains four Jetour G700 rows,
   two identical CS75 PRO 7-Seat Enjoyment entries at different prices, two Kia K3 rows,
   and two 1585 AWD Ultra SE rows. Keep them distinct.
4. **Every separately priced trim is its own configuration.**
5. **Only published vehicles appear publicly.** Geely Galaxy Starship 7 has no FOB price
   and carries a Suspended Sales flag — 151 of 152 publish.
6. **Selected colour is stored with every lead, quote and sale.**
7. **Every public vehicle requires at least one verified main image** before publishing.
8. **Sold vehicles** leave available inventory but remain in sales history.
9. **Reservations** set Reserved status immediately; expiry releases the vehicle.
10. **Exchange rates are never hardcoded** — administrator-configured, and converted
    prices are always labelled estimates.

---

## Data

`catalog.js` exports `window.CATALOG = { cars, t, hexFor, source }`.

**152 configurations across 18 brand blocks**: Volkswagen, Audi, Livan, Geely,
Lynk & Co, Kaiyi, Hyundai, Kia, MG / SAIC, GAC Trumpchi, Aion, Changan, Changan Qiyuan,
Jetour, XPeng Motors, Leopard, ZEEKR, Toyota. (The sheet groups Changan Qiyuan separately
from Changan, hence 18 blocks from 17 marques.)

Vehicle shape:

```js
{
  id, brand, model, version, detail, colorSource,
  colors: [{ name, zh, hex, surcharge }],
  interior, msrp, fob, moq, note, status,
  published, stock, views, requests
}
```

Notes for the port:

- **`version`** is the complete printed string and must be shown verbatim in the spec
  table as "Version as printed". **`detail`** is the remainder after the `·` separator and
  is used for card and aside subtitles — render it only when non-empty, or you get a
  duplicated title line.
- **`fob`, `msrp`, `moq` are nullable.** Null is meaningful: it means the sheet did not
  print a value.
- **Colour hexes are approximations** for swatch display, derived by name matching in
  `hexFor()`. They are not manufacturer paint codes.
- **Jetour** lists its exterior palette in Chinese per model family, separately from the
  interior combination. Both are kept: `colors[].zh` holds the Chinese name and
  `colors[].surcharge` the `+250 USD` / `+600 USD` uplift where the sheet states one.
- `t` holds the EN / FR / 中文 string tables for storefront copy.

---

## Assets

- **No vehicle photography ships.** Every hero, all ten gallery views per vehicle and the
  admin image manager are drop-in slots (`image-slot.js`) keyed per configuration. In
  production, replace with your upload pipeline plus CDN. Image records should store
  source, source URL, colour, view, resolution and a verified-model flag.
  Source priority: official manufacturer website → manufacturer media/newsroom → official
  dealership media → high-quality automotive publications. Verify the image matches the
  exact generation; never use watermarked or low-quality files.
- **No hero video ships.** Admin-supplied URL. A web hero wants roughly 3–8MB, 1080p,
  10–20 seconds, muted — not a multi-hundred-megabyte master.
- **Fonts** — Caprasimo and Figtree, loaded by the design system stylesheet.
- **Icons** — Lucide (https://lucide.dev) at stroke-width 2.75. None are currently placed;
  use them if the target design calls for them.

---

## Files in this bundle

| File | What it is |
| --- | --- |
| `Dealership OS.dc.html` | The full prototype — all ten screens, template plus logic. Design reference. |
| `catalog.js` | Vehicle data transcription, colour hex mapping, EN/FR/中文 strings. **Port this as data.** |
| `image-slot.js` | The drag-and-drop image placeholder component used by the slots. |
| `README.md` | The project readme, including admin credentials. |
| `uploads/` | The source price list PDF and its extracted text. |
| `_ds/` | The bound Organic design system — stylesheet, tokens, component reference. |
| `support.js` | The prototype's streaming runtime. **Do not port.** |

---

## Not built

From the original brief, still outstanding: roles/permissions management screens, the
documents library, tasks & follow-ups with their automation rules, the communication
centre (email/WhatsApp/phone threading), and the AI features (lead scoring,
recommendations, generated descriptions, forecasting). Admin internals are English-only.

A local codebase (`managiha`) was attached to the project but has not been read — if it
is the target, reconcile the data model and routing against it before implementing.
