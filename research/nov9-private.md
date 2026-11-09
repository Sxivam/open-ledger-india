# Private markets and investment research refresh — 9 November 2026

Output: `lib/refresh-nov9-private.json` (10 additions, 22 retained records, four removals, 15 excluded leads). All 26 assigned existing records are accounted for. No historical data files were changed.

## Verification approach

Searched employer careers pages, official ATS records, company and decision-maker LinkedIn posts, employer LinkedIn jobs, and established third-party listings. Opened the underlying role rather than treating a search result or careers directory as an opportunity. Direct HTTP checks were used to distinguish current pages from stale indexed copies. Workday public requisition responses provided explicit `canApply` and posting/end dates. No application was submitted and nobody was contacted.

Three additions have explicit posting dates since the previous 2 November refresh: Kodo (4 November), UBS Global Research (6 November), and Nomura private-credit industrial trainee (9 November). Other additions are newly discovered existing openings; do not describe them as newly posted this week. Dates in the JSON come from employer listing structured metadata or official Workday posting data. Automatically generated LinkedIn `validThrough` dates are not treated as employer closing dates. The TCG article-trainee advert explicitly closes 15 November.

## Material audit findings

- Bajaj PM-07, InCred ER-02 and CRISIL PM-15 now redirect with `expired_jd_redirect`; indexed job descriptions still misleadingly show Apply.
- BlackRock PM-32 returns 404 from the official role URL and R266880 is absent from its current Workday search. Removed.
- Ares R8502 and BlackRock R265369 remain in employer Workday data. BlackRock retains the 31 December end date.
- Udyat PM-24 and StepUp PM-28 lack a standard Apply button but still publish explicit company-domain email application instructions. StepUp publishes the 30 November deadline, so both remain actionable.
- Daylight retains its decision-maker invitation to email applications. No closure notice was returned from the post. This is weaker than ATS confirmation of an unfilled vacancy, so no guaranteed availability is implied.

## Deliberate exclusions and uncertainties

Light Hill Capital appeared exceptionally fresh, but direct HTML explicitly says it is no longer accepting applications. It was excluded despite cached Apply content. SilverX and MAVREK descriptions remain accessible, but neither returned an active Apply control or explicit alternative instructions; automatic job-poster messaging widgets were not accepted as evidence of an open intake. The same concern applies to Valemont and Nyasa. These are unconfirmed, not declared closed.

Keynote, EQT and Gruhas have explicit closure notices; Alkemi has a past deadline. YourNest’s appealing investment-intern title describes full-stack engineering work. Precursor’s remote internship has US study/work-authorisation requirements. All were excluded. Rebalance’s linked form and 3one4’s detailed application route could not be verified; access errors do not prove closure.

Aarii/Aurrevia is supported by an employer advertisement on Glassdoor with a company-domain CV address, published stipend and Mumbai work location. Pay, duration and academic restrictions are represented literally. Neve’s addition is investment-related legal work, clearly labelled as such. TCG is a two-year CA articleship classified under apprenticeship because the catalogue has no separate articleship kind; its transfer-eligibility wording conflicts and is flagged.

UBS’s official HTML includes generic hidden error/expired template text alongside its full description; current employer LinkedIn job 4488140360 independently returns Apply and a 6 November posting timestamp. Used the actionable employer LinkedIn source rather than treating template strings as definitive closure. Compensation is not disclosed; the misleading LinkedIn Volunteer category is flagged without inferring unpaid status.

The sweep is broad but cannot establish that every finance vacancy in India has been found. Newness and current availability are separate claims; keep the source, checked date and eligibility visible.
