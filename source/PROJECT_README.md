# Dealership OS — prototype

A luxury vehicle export storefront with a private admin, CRM, sales pipeline, quotation
builder and customer portal. One interactive prototype, seven screens, one shared store.

**Open:** `Dealership OS.dc.html`

---

## Admin sign-in

There is **no sign-in link on the public site**. Entry is the URL:

- In preview: append **`#admin`** to the address
- Deployed: a **`/admin`** path

Password for every staff account: **`kai2026`**

| Email | Role | Sees |
| --- | --- | --- |
| `admin@kaimotors.dz` | Super Admin | Everything |
| `gm@kaimotors.dz` | General Manager | Dashboard · Site editor · Inventory · Sales desk · Quotes |
| `marketing@kaimotors.dz` | Marketing | Site editor · Dashboard |
| `stock@kaimotors.dz` | Inventory Manager | Inventory · Dashboard |
| `sales@kaimotors.dz` | Salesperson | Sales desk · Quotes · Mobile |

Customer portal: `ines@example.com` / `garage` → My Garage only.

The sign-in screen lists all six accounts — tap a row to fill the form. Sessions persist
for 8 hours in `localStorage`; signing out clears them.

Admin screens require **both** a valid session **and** the `/admin` route. Navigation is
built from the signed-in role, and every gated screen refuses to render without both — so
a session left open in a browser can never surface admin navigation on the public URL.
Leaving the route (clicking Showroom) drops straight back to the public site.

> This gate **hides and scopes** — correct for a prototype, but a browser cannot protect
> data. Production needs server-side authentication, hashed passwords and server-enforced
> RBAC.

---

## Screens

**Public**
- **Showroom** — 151 published configurations, brand filter, search, price sort
- **Vehicle page** — colour selector driving the hero, 10 gallery slots, spec table,
  finance estimate, six request actions

**Private**
- **Dashboard** — KPIs, configurations by brand, FOB price distribution, lead funnel,
  data-completeness against the source sheet
- **Site editor** — dealership identity and contact, showroom copy in EN/FR/中文,
  announcement bar, show/hide toggles for MSRP, finance, 360° block and related row
- **Inventory** — all 152 rows; row filter, multi-select bulk publish/unpublish, and a
  per-row drawer with the price/MOQ editor, colour manager and 10-view image manager.
  Plus admin-set exchange rates and a live audit log
- **Sales desk** — leads table with inline status changes; drag-and-drop 10-stage pipeline
- **Quotes** — live totals (discount, duty, freight, trade-in), MOQ warning, PDF export
- **My Garage** — customer portal: delivery timeline, payments, documents, saved configs
- **Mobile** — the salesperson's floor view: call, WhatsApp, advance a lead

---

## Data

Catalogue lives in `catalog.js`, transcribed verbatim from **CPC-kai - 0901.pdf**
(`uploads/`). **152 configurations across 18 brand blocks.**

Rules held throughout:

- **FOB Price ($) is authoritative.** China MSRP (¥) is kept as reference only.
- **Nothing is invented.** Absent specifications read *Not specified*; absent prices read
  *Contact dealer*.
- **Duplicates preserved, not corrected** — four Jetour G700 rows, two identical CS75 PRO
  7-Seat Enjoyment entries at different prices, two Kia K3s, two 1585 AWD Ultra SEs.
- **Every trim is its own configuration** when the sheet prices it separately.
- Jetour's Chinese exterior palette is kept alongside the English name, with the
  +250 / +600 USD surcharges attached to the right swatches.
- Geely Galaxy Starship 7 carries its **Suspended Sales** flag — 151 of 152 publish.

Currency display is USD / EUR / DZD, converted at administrator-set rates (Inventory →
Exchange rates). No rate is hardcoded as truth; USD FOB stays the base.

---

## Hero video

The showroom hero takes a looping film: **Site editor → Hero video**, paste a direct MP4 or
WebM URL plus an optional poster image. It plays muted, looping and autoplaying — the only
form browsers allow without a tap — and covers the full hero behind the headline gradient.

No film ships by default: host the file on your own CDN and paste the link. With the URL
empty (or the toggle off) the hero falls back to the drop-in image slot with a slow 26s
drift, which respects `prefers-reduced-motion`.

---

## Photography

Every vehicle hero, all ten gallery views and the admin image manager are **drop-in image
slots** — drag a file in and it persists, keyed to that configuration. Nothing ships with
placeholder car photography. Source priority when filling them: official manufacturer
media, then official dealership media.

---

## Files

- `Dealership OS.dc.html` — the prototype (template + logic)
- `catalog.js` — catalogue transcription, colour hex mapping, EN/FR/中文 strings
- `image-slot.js` — the drag-and-drop image placeholder component
- `uploads/` — the source PDF and its extracted text
- `_ds/` — the bound Organic design system

---

## Not yet built

From the original spec: roles/RBAC management screens, documents library, tasks &
follow-ups, communication centre, AI features. Admin internals are English-only — the
EN/FR/中文 switch covers the public storefront and navigation.

The attached `managiha` codebase has not been read yet — it can drive the data model,
branding or routes on request.
