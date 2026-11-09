# Open Ledger by Shivam Meet

An India-only finance opportunity desk covering work, training, study funding,
competitions and independent learning. The research snapshot was checked on
9 November 2026: **116 records, with 106 available routes and 10 unconfirmed
next-intake entries**. The refresh audits all 90 previous records, removes eight
closed or unavailable listings, and adds 34 India opportunities. Nine additions
have explicit publication dates after 2 November; the remainder are newly
discovered current openings or standing schemes, not claimed as newly announced.

The catalogue separates 11 types: internships, apprenticeships, industrial
training, graduate programmes, entry-level roles, experienced roles,
returnships, scholarships, fellowships, competitions and learning programmes.
Funding and globally accessible online learning are included only when Indian
applicants can participate. Overseas job placements are excluded.

Users can search and filter by goal, opportunity type, candidate stage, finance
field, format and availability, save a shortlist in their browser, share a
filtered view, isolate additions with “New this refresh”, and open eligibility details with direct source/application links.
Upcoming and unconfirmed routes stay out of the default available-now results.
The qualification and benefit details distinguish fee discounts, cash funding,
paid work and unpaid learning. A listed route is never a promise of selection.

Dates expire automatically in the browser, including exact foreign-time-zone
cutoffs converted to India time. Undated openings are a verified snapshot,
not a guarantee that recruitment remains active indefinitely. Source coverage
is broad but cannot promise every vacancy in the market. Closed and unverified
leads have explicit audit trails in the research JSON files.

`lib/catalogue-data.ts` combines the historical employer audit and three expanded
research batches with four `refresh-nov9-*` overlays. The overlays preserve
original discovery dates and record each update, removal and excluded lead.
`lib/catalogue-rules.ts` owns expiry and filter behaviour. Validation rejects
non-India additions and country changes to retained listings. Each research
record includes eligibility, benefits, caveats, evidence and a checked date.
See `research/nov9-refresh-audit.md` for the current audit and
`research/november-expanded-audit.md` for the earlier expansion.

The forest, cream and brass editorial identity is shared across the desk and
the India break-in guide. Wispr Flow's three-month offer uses
`SHIVAMEETSWISPR`; its examples are illustrative, not a live transcription
integration. The existing signup gate and email APIs are preserved.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Verification

```bash
npm run verify:data
npm run lint
npx tsc --noEmit
```

The static site is emitted to `dist/client` for deployment on Vercel.
