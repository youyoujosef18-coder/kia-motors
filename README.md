# Dealership OS — KAI MOTORS

A luxury vehicle export storefront with a private admin, CRM, sales pipeline, quotation
builder and customer portal. One interactive prototype, eight screens, one shared store.

**Open `dealership-os.html`.** Double-click it, or drag it into a browser. No server, no
build step, no internet connection required — everything it needs is in this folder.

---

## Signing in

There is **no sign-in link on the public site**. Entry is the URL:

- Opened from disk: append **`#admin`** to the address
- Deployed to a domain: a **`/admin`** path

Password for every staff account: **`kai2026`**

| Email | Role | Sees |
| --- | --- | --- |
| `admin@kaimotors.dz` | Super Admin | Everything |
| `gm@kaimotors.dz` | General Manager | Dashboard · Site editor · Inventory · Sales desk · Quotes |
| `marketing@kaimotors.dz` | Marketing | Site editor · Dashboard |
| `stock@kaimotors.dz` | Inventory Manager | Inventory · Dashboard |
| `sales@kaimotors.dz` | Salesperson | Sales desk · Quotes · Mobile |

Customer portal: `ines@example.com` / `garage` → My Garage only.

The sign-in screen lists every account — tap a row to fill the form. Sessions last 8 hours
in `localStorage`; signing out clears them.

Private screens require **both** a valid session **and** the `/admin` route. Navigation is
built from the signed-in role, and every gated screen refuses to render without both, so a
session left open in a browser can never surface admin navigation on the public URL.
Clicking Showroom drops straight back to the public site.

> This gate **hides and scopes**. A browser cannot protect data — see *Before this goes
> live* at the end.

---

## Screens

**Public**

- **Showroom** — 151 published configurations, brand filter, search, price sort, full-screen
  hero film with the navigation floating over it
- **Vehicle page** — colour selector driving the hero, 10 gallery slots, spec table, finance
  estimate, six request actions
- **Contact** — enquiry form (name, email, phone, company, vehicle of interest, message) that
  files a real CRM lead, alongside the dealership's contact block

**Private**

- **Dashboard** — KPIs, configurations by brand, FOB price distribution, lead funnel
- **Site editor** — identity and contact details, showroom copy in EN/FR/中文, announcement
  bar, hero video, and show/hide toggles for MSRP, finance, the 360° block and the related row
- **Inventory** — all 152 rows in a scrolling table; row filter, multi-select bulk
  publish/unpublish, and a per-row drawer with the price/MOQ editor, colour manager and
  10-view image manager. Plus administrator-set exchange rates and a live audit log
- **Sales desk** — leads table with inline status changes; drag-and-drop 10-stage pipeline
- **Quotes** — live totals (discount, duty, freight, trade-in), MOQ warning, PDF export
- **My Garage** — customer portal: delivery timeline, payments, documents, saved configurations
- **Mobile** — the salesperson's floor view: call, WhatsApp, advance a lead

---

## Data

The catalogue lives in `catalog.js`, transcribed verbatim from **CPC-kai - 0901.pdf**
(`source/uploads/`). **152 configurations across 18 brand blocks.**

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

Currency displays as USD / EUR / DZD, converted at administrator-set rates (Inventory →
Exchange rates). No rate is hardcoded as truth; USD FOB stays the base.

---

## Photography and film

Vehicle heroes use one representative photograph per model family, sourced from Wikimedia
Commons under free licences — see `assets/vehicles/CREDITS.md` for the attribution each
licence requires. **They are not colour-matched to the trim**, and the vehicle page says so
in a line under the image. Replace them with manufacturer or official dealership media when
you have it.

Every hero, all ten gallery views and the admin image manager are drag-and-drop slots: drop
a file in and it persists, keyed to that configuration.

The showroom hero plays `assets/hero-loop.mp4` (H.264, 20s, muted, looping). To swap it, use
**Site editor → Hero video** — paste a direct MP4 or WebM URL, or drop a file. With the URL
empty or the toggle off, the hero falls back to a drop-in image slot with a slow 26s drift
that respects `prefers-reduced-motion`.

---

## What is in this folder

```
dealership-os.html                 the prototype — open this
catalog.js                         catalogue, colour hex mapping, EN/FR/中文 strings
support.js                         the Design Components runtime
image-slot.js                      the drag-and-drop image placeholder component
vehicle-images.js                  model → photograph mapping with licence credits
hero-fit.js                        measures the header so the hero fills exactly one screen
react.production.min.js            React 18.3.1 UMD
react-dom.production.min.js        ReactDOM 18.3.1 UMD
ds/                                the bound Organic design system
assets/hero-loop.mp4               showroom hero film
assets/vehicles/                   54 model photographs + CREDITS.md
source/                            the original export, its docs, and the source price list
```

`react*.js` are vendored rather than loaded from a CDN, which is what lets this folder run
offline and from a `file://` path.

---

## Changed from the original export

The original canvas export is kept at `source/Dealership OS (original export).dc.html` for
comparison. Since then:

1. **Full-screen hero.** Edge to edge, exactly one viewport tall. `hero-fit.js` measures the
   sticky header and publishes it as `--hero-chrome`, because the header wraps to different
   heights by width and changes again with the announcement bar or the signed-in navigation.
2. **Announcement bar off by default.** The source-of-truth strip is gone; the Site editor
   toggle still brings it back with your own copy.
3. **Navigation floats over the hero film** and turns solid once you scroll past it. Red is
   down to two elements — the logo mark and one **Get a quote →** button. The hero is text
   only: kicker, headline, one paragraph and an underlined link.
4. **Contact is its own screen**, in the navigation and in all three languages. Its form
   files a lead and a pipeline deal marked *Contact page*, with the vehicle attached when one
   is chosen.
5. **Language and currency are dropdown menus**, not six segmented buttons — which is also
   what lets the admin bar fit nine navigation items on one line.

---

## Known gaps

- **Export CSV does nothing.** The Inventory button shows a confirmation toast but produces
  no file. Export PDF on Quotes is real — it prints the quotation through a print stylesheet.
- **Sign out leaves `#admin` in the address bar.** You land on the storefront correctly; a
  reload then shows the sign-in gate.
- **Call and WhatsApp on the Mobile screen are toasts**, not `tel:` / `wa.me` links.
- **Contact → Opening hours reads `[YOUR OPENING HOURS]`** — fill it in.
- Not built from the original specification: roles and permissions management screens, a
  documents library, tasks and follow-ups, a communication centre, AI features. Admin
  internals are English-only; the EN/FR/中文 switch covers the public storefront and
  navigation.

---

## Before this goes live

Everything here runs in the browser. Leads, price edits and pipeline moves are held in memory
and reset on reload; site settings and image drops persist only in that browser's
`localStorage`, on that one machine. The passwords are in `dealership-os.html` in plain text.

That is correct for a prototype and wrong for a dealership. Taking it to production needs:

- server-side authentication with hashed passwords, and RBAC enforced on the server rather
  than by hiding navigation
- a real database behind the catalogue, leads, deals and quotations
- file storage for vehicle photography, instead of `localStorage`
- HTTPS, and an audit log written server-side

The screens, the data model and the flows are all here to build against.
