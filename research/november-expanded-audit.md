# Expanded India finance opportunity audit — 2 November 2026

The expansion retains the 50 India-based roles verified in the November employer
audit and adds 40 researched routes. The checked snapshot contains 82 available
routes and eight upcoming or unconfirmed next-intake entries. Twenty-two further
leads are excluded with reasons in the three new research batches. These counts
describe this curated snapshot, not all vacancies in the Indian market.

## Scope and evidence

Research covered employer career pages and application systems, employer LinkedIn
listings, public-sector notices, professional bodies, university funding pages,
government scholarship portals and learning providers. Every added record includes
a direct source, application route, checked date, eligibility, benefit and caveat.
Missing stipends, publication dates and closing times are left unstated. Conflicting
source information is surfaced in the record rather than silently resolved.

The geographical rule is India only. Global online learning and professional
scholarships accessible to Indian applicants are identified as such; overseas job
placements do not qualify. Institutional, regional, income, graduation-year,
experience and professional-registration restrictions remain visible.

## Research batches

| Batch                        | Added | Available | Upcoming / unconfirmed | Coverage                                                                                                                         |
| ---------------------------- | ----: | --------: | ---------------------: | -------------------------------------------------------------------------------------------------------------------------------- |
| `lib/deep-openings.json`     |    14 |        14 |                      0 | Banking operations, M&A, credit, tax, actuarial, CA training, payroll and accounting                                             |
| `lib/deep-scholarships.json` |    11 |         6 |                      5 | CFA discounts, ICAI support, Kerala awards, funded doctoral and senior research fellowships, professional-body funding watchlist |
| `lib/deep-programmes.json`   |    15 |        12 |                      3 | ONGC and Illumina apprenticeships, an equity competition, nine learning routes and three next-intake watchlist records           |

Notable dated additions include the BITS Hyderabad Economics & Finance doctoral
application (6 November), State Street internship (13 November), ONGC finance and
accounts apprenticeships (20 November), ICSSR senior research fellowship
(20 November, 18:00 IST) and Kerala CA/CMA/CS scholarship (25 November). The next
CFA Access Scholarship window opens on 3 November and is upcoming on the audit
date. All exact deadlines and official URLs are held in the records.

## Availability and exclusions

- Default results contain only verified open or ongoing routes. Learning is marked
  as learning, not employment, internship credit or a promise of recruitment.
- Upcoming routes have a verified future opening date. Unconfirmed intake pages
  are labelled watchlist and are never counted as open.
- Date-only deadlines expire after the stated calendar date in India. Where a
  source publishes a clock and timezone, that exact instant takes precedence,
  including when a US deadline falls on the following Indian date.
- Closed apprenticeship drives and expired scholarship cycles are excluded.
  Broad bank student pages without a verified Indian opening are not turned into
  current jobs. The RBI 2027 summer intake remains unconfirmed because the primary
  application notice could not be independently accessed.
- CFA Professor Scholarship sources disagree on the closing date; the entry
  exposes both dates and advises the earlier date. State Street student-year,
  Deloitte location and some CA-training criteria also have explicit caveats.
- Illumina's employer restriction on generative AI in recruitment is preserved.

## Product and maintenance

Three goal tabs lead to work/training, study funding and learning/competitions.
Type, candidate stage, finance field, format and status filters combine with search.
Shareable URLs preserve filters and an opened record. The shortlist is local to
the visitor's browser. Mobile layouts expose the same type selector as desktop.
The existing guide, Wispr offer, signup gate and Vercel APIs remain in place.

Run `npm run verify:data` for the historical audit checks, India-only schema checks,
expiry/timezone regressions and discovery-filter checks. Lint, TypeScript, a
production build and browser checks complete release validation. Undated records
still need periodic human rechecks; the site does not claim live ATS monitoring.
