# Open Ledger by Shivam Meet

An India-only finance opportunity desk covering work, training, study funding,
competitions and independent learning. The research snapshot was checked on
2 November 2026: **90 records, with 82 available routes and eight upcoming or
unconfirmed next-intake entries**. This expansion adds 40 records to the 50
India roles retained in the same-day employer audit.

The catalogue separates 11 types: internships, apprenticeships, industrial
training, graduate programmes, entry-level roles, experienced roles,
returnships, scholarships, fellowships, competitions and learning programmes.
Funding and globally accessible online learning are included only when Indian
applicants can participate. Overseas job placements are excluded.

Users can search and filter by goal, opportunity type, candidate stage, finance
field, format and availability, save a shortlist in their browser, share a
filtered view and open eligibility details with direct source/application links.
Upcoming and unconfirmed routes stay out of the default available-now results.
The qualification and benefit details distinguish fee discounts, cash funding,
paid work and unpaid learning. A listed route is never a promise of selection.

Dates expire automatically in the browser, including exact foreign-time-zone
cutoffs converted to India time. Undated openings are a verified snapshot,
not a guarantee that recruitment remains active indefinitely. Source coverage
is broad but cannot promise every vacancy in the market. Closed and unverified
leads have explicit audit trails in the research JSON files.

`lib/catalogue-data.ts` combines the historical employer audit with three new
research batches (`deep-openings`, `deep-scholarships`, `deep-programmes`).
`lib/catalogue-rules.ts` owns expiry and filter behaviour. Validation rejects
non-India additions and country changes to retained listings. Each research
record includes eligibility, benefits, caveats, evidence and a checked date.
See `research/november-expanded-audit.md` for the scope of this expansion.

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
