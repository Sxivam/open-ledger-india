# Open Ledger by Shivam Meet

A source-backed index of publicly accessible venture capital, banking,
investing, valuation and early-career finance opportunities in India.

The current dataset was verified on 10 October 2026 in Asia/Kolkata, following
the 25 September refresh. Every
included record exposes its source, application route, eligibility, deadline
notes and caveats. Programme pages are labelled separately from direct role
openings. Exact dated listings expire automatically in the browser, including
UTC deadlines converted to India time. Undated roles are snapshots, not a
guarantee that the employer will keep accepting applications.

The October audit files preserve retained records, removals, additions and
excluded leads. Relative listing ages are kept as evidence, not invented
publication dates. The India break-in guide separates editorial grade targets
from published eligibility rules.

The paper-and-forest editorial identity is shared across the ledger and guide.
Wispr Flow's three-month offer uses `SHIVAMMEETSWISPR`; the examples are
illustrative, not a live recording or transcription integration.

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
