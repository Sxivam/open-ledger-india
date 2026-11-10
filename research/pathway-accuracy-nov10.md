# Finance pathway accuracy review — 10 November 2026

Scope: `lib/guide-data.ts`. Existing 14 pathway IDs and the Pathway type are
preserved. User-facing navigation and map implementation are owned by the main
agent. These are career-planning routes, not predictions of hiring outcomes.

## Corrections applied

- Removed all generic numerical CGPA/percentage targets from pathway academic
  signals and the legacy `gradeBands` export. The existing primary references
  do not establish universal 7.5+, 8+ or 8.5+ cutoffs, percentile equivalences,
  or a common conversion between CGPA and percentages.
- Retained real numerical thresholds only as labelled, programme-specific
  examples: NITI's undergraduate and postgraduate/research eligibility differs
  by stage. Employer degree/experience screens remain separate.
- Converted all 42 roadmap period labels from fixed month ranges into stages:
  build the foundation, gain relevant practice, apply with evidence. The order
  is editorial guidance; job transitions depend on skills, openings and
  employer selection, not elapsed calendar months.
- Removed unsupported comparative claims about private credit being the most
  accessible route, universal buyout feeder tenure, and likelihood claims
  about who usually wins a VC role.
- Distinguished investment decision work from Global Centres support,
  portfolio monitoring, legal/operations/platform roles and distribution.
  Relevant skills can transfer; a conversion into front-office investing is
  not automatic.
- Hiring/placement links now explicitly serve as examples. Availability belongs
  in the opportunity ledger. Kalaari's October-closed intake is not promoted as
  currently accepting summer interns.
- Kept the suggested models/memos as practice/application work. Public-markets
  research preparation now specifies public data and exclusion of confidential
  employer/client material.

## Rechecked primary evidence

| Source | Verified fact | URL |
| --- | --- | --- |
| CFA Institute | Charter requires all three exams, Practical Skills Modules, 4,000 qualifying work hours over at least 36 months and membership/references. Passing Level I/all exams alone is not the charter. | https://www.cfainstitute.org/programs/cfa-program/charter |
| GARP | No educational/professional prerequisite to register for FRM exams. Certification requires both parts plus two years of relevant full-time experience. | https://www.garp.org/frm/frequently-asked-questions |
| ICAI | Intermediate passed plus at least 12 months practical training for industrial training; 9–12 month duration, advance principal notice and prescribed registration arrangements. Announcement lists minimum ₹15,000 monthly stipend. | https://www.icai.org/post/23674 |
| NISM | Revised XV research analyst exam launched 20 January 2026. | https://www.nism.ac.in/revamp-nism/research-analyst-certification-examination/ |
| SEBI | June 24, 2026 circular distinguishes advice sales/non-core staff using XXV-B from other covered advice staff using X-A/X-B; transition provisions apply. | https://www.sebi.gov.in/sebi_data/attachdocs/jun-2026/1782299902147.pdf |
| NISM / SEBI | March 2026 XXV-A circular covers research-services sales and other non-core staff. | https://www.nism.ac.in/circular/sebi-circular-for-nism-series-xxv-a-persons-associated-with-research-services-sales-and-other-non-core-services-certification-examination-dated-march-11-2026/ |
| NISM | V-A is the mutual-fund distribution certification, a different role from investment advice. | https://www.nism.ac.in/mutual-fund-distributors/ |
| NISM | XIX-D concerns Category I/II AIF managers and key investment teams. This should not be advertised as a universal entry requirement for every VC/PE applicant. | https://www.nism.ac.in/certifications/nism-series-xix-d-category-i-and-ii-alternative-investment-fund-managers |
| Morgan Stanley | Mumbai Global Centres IB internship specifies postgraduate/equivalent study and analytical skills, with no published numerical grade cutoff; work includes execution support. | https://morganstanley.tal.net/vx/lang-en-GB/mobile-0/brand-2/candidate/so/pm/1/pl/1/opp/21362-2027-Investment-Banking-Global-Capital-Markets-GC-Summer-Analyst-Program-Mumbai/en-GB |
| Goldman Sachs | Mumbai private-credit associate example requires 3–6 years in named feeder fields and strong academic record; no numerical cutoff. This is experienced hiring. | https://higher.gs.com/roles/160621 |
| Kalaari | Two-year paid, full-time Bengaluru fellowship; no prescribed academic/professional background; cases/interviews; not short internships. Published applications ended October 4 for March 2027 cohort. | https://kalaari.com/fellowship |
| IIMA | March 2026 placements name IB/markets and PE/VC/asset-management recruiters. Campus access evidence is not a guarantee or a numerical grade rule. | https://www.iima.ac.in/inmediapgp-final-placements-2025-26 |
| NITI | Degree-stage-specific 85% Class XII and 70% graduation/PG thresholds, plus timing requirements. | https://www.niti.gov.in/sites/default/files/2023-01/NITI_Internship_Guidelines_17012023.pdf |

Regulatory source pointers were updated from the old February 2025 references
to SEBI's February 2026 master circular pages, explicitly to be read with later
amendments. No exam is described as an independent RA/IA registration or as
permission to offer regulated services.

GARP's FAQ contains duplicated sections with inconsistent experience-submission
windows (five versus ten years). The separate Important Notices page confirms
the extension to ten years. The guide avoids that ancillary deadline and states
only the clear exams + relevant experience distinction.
https://www.garp.org/important-notices

NIIF and IIM Bangalore pages returned access failures during this check. Their
previously recorded references remain labelled as programme/historical examples,
not newly verified current job openings. CFA's self-service enrolment page also
returned a client-render error; no new enrolment-window claim was added from it.

## Useful pathway structure for the new map

1. Identify the actual destination work and inspect its published eligibility.
2. Choose one realistic entry branch: direct internship/graduate route if
   eligible, professional-training route, or adjacent experience route.
3. Build the specific technical foundation and one defensible work sample.
4. Obtain feedback and supervised experience in the closest relevant function.
5. Apply against job-specific requirements; keep an adjacent route available.

CA, CFA, FRM and MBA belong on conditional/optional branches where aligned,
not a mandatory shared trunk. Regulatory certifications belong on activity-
specific gates. Academic eligibility is checked per application, with no
invented market-wide score threshold.

Validation: formatted the modified data file and ran TypeScript checking without
errors. No opportunity records, guide UI, signup/API files, Git commits or
production deployments were changed by this subtask.
