'use client';

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Calculator,
  Check,
  Compass,
  FileCheck2,
  GraduationCap,
  Route,
  Target,
  TriangleAlert,
} from 'lucide-react';
import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LedgerFooter,
  LedgerHeader,
  WisprSection,
} from '@/components/ledger-brand';
import {
  credentials,
  gradeBands,
  guideSources,
  pathways,
  profileRoutes,
  type GuideFamily,
  type Pathway,
} from '@/lib/guide-data';

const familyMeta: Record<GuideFamily, { label: string; note: string }> = {
  vc: {
    label: 'Venture capital',
    note: 'Most porous when you bring a sector, operator record or original access—not just finance vocabulary.',
  },
  pe: {
    label: 'Private capital',
    note: 'The most credible route is usually adjacent work first: transactions, diligence, consulting, credit or sector operations.',
  },
  finance: {
    label: 'Finance',
    note: 'A wide field. Choose by daily work and hiring test, because “finance” alone is not a career direction.',
  },
};

const sourceById = new Map(
  guideSources.map((source) => [source.id, source] as const),
);

const pathwaysByFamily: Record<GuideFamily, Pathway[]> = {
  vc: pathways.filter((pathway) => pathway.family === 'vc'),
  pe: pathways.filter((pathway) => pathway.family === 'pe'),
  finance: pathways.filter((pathway) => pathway.family === 'finance'),
};

function pathwayCount(family: GuideFamily) {
  return `${String(pathwaysByFamily[family].length).padStart(2, '0')} paths`;
}

const decisionLanes = [
  {
    question: 'Want to judge companies?',
    direction: 'Seed VC · growth · buyout · public markets',
  },
  {
    question: 'Want to execute transactions?',
    direction: 'Investment banking · deals · valuation · corp dev',
  },
  {
    question: 'Want to judge repayment and downside?',
    direction: 'Credit · ratings · private credit · risk',
  },
  {
    question: 'Want to run the financial engine?',
    direction: 'FP&A · treasury · controllership · business finance',
  },
  {
    question: 'Want to advise and retain clients?',
    direction: 'Wealth · investment advice · relationship management',
  },
];

const operatingPlan = [
  {
    period: 'Days 01–07',
    title: 'Pick one lane',
    text: 'Read ten real job descriptions. Choose one target and one adjacent entry route; reject the rest for now.',
  },
  {
    period: 'Days 08–30',
    title: 'Close the technical floor',
    text: 'Study the exact hiring test: accounting and valuation, credit, statistics and coding, or operating finance.',
  },
  {
    period: 'Days 31–60',
    title: 'Build one employer-grade artifact',
    text: 'Produce a model, memo, market map, dashboard or research notebook that resembles the team’s real output.',
  },
  {
    period: 'Days 61–90',
    title: 'Run a narrow search',
    text: 'Target 30–40 relevant teams. Pair each application or message with one precise observation and the right artifact.',
  },
  {
    period: 'Months 04–18',
    title: 'Take the closest credible seat',
    text: 'Optimise for work content, a strong manager and measurable reps—not a title that merely sounds like investing.',
  },
  {
    period: 'Months 12–36',
    title: 'Lateral on evidence',
    text: 'Move when your deal, research, underwriting or operating log proves you can already do part of the destination job.',
  },
];

const overallGradeRead = [
  {
    band: '8.5+ / top 10–15%',
    read: 'Clean academic signal for scarce campus funnels. Still not sufficient without internships, cases or transactions.',
  },
  {
    band: '8.0–8.49 / top 25%',
    read: 'Competitive for many analyst processes. Direct megafund PE still normally needs a feeder campus or employer.',
  },
  {
    band: '7.0–7.99',
    read: 'Workable across much of finance and seed VC. Large-bank IB and buyout entry become more route-dependent.',
  },
  {
    band: 'Below 7.0',
    read: 'A material screen risk, not a market-wide ban. Build a two-step route through a less-gated, skill-verifiable role.',
  },
];

function SourceLinks({ ids }: { ids: string[] }) {
  const sources = ids
    .map((id) => sourceById.get(id))
    .filter((source): source is (typeof guideSources)[number] =>
      Boolean(source),
    );

  return (
    <span className="inline-flex flex-wrap gap-1.5">
      {sources.map((source) => (
        <a
          key={source.id}
          href={source.url}
          target="_blank"
          rel="noreferrer"
          title={`${source.organization}: ${source.title}`}
          className="inline-flex min-h-6 items-center border border-[#bdc8b9] bg-[var(--paper)] px-1.5 font-mono text-[10px] tracking-[0.04em] text-[var(--green)] underline-offset-4 transition-colors hover:border-[var(--green)] hover:text-[var(--green-dark)] hover:underline"
        >
          {source.id}
        </a>
      ))}
    </span>
  );
}

function PathwayCard({ pathway, index }: { pathway: Pathway; index: number }) {
  return (
    <article
      id={pathway.id}
      className="scroll-mt-6 border border-[var(--line)] bg-[var(--paper-bright)]"
    >
      <div className="grid lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="border-b border-[var(--line)] p-5 sm:p-6 lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--green)]">
              Path {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-[var(--muted-ink)]">
              {pathway.shortLabel}
            </span>
          </div>
          <h3 className="mt-5 font-display text-[1.7rem] leading-[1.12] tracking-[-0.025em] text-[var(--ink)]">
            {pathway.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-[#586a50]">{pathway.fit}</p>
          <div className="mt-6 border-l-2 border-[var(--green)] pl-3">
            <p className="detail-label">Hard truth</p>
            <p className="mt-2 text-sm leading-6 text-[#455847]">
              {pathway.hardTruth}
            </p>
          </div>
        </div>

        <div>
          <div className="border-b border-[var(--line)] p-5 sm:p-6">
            <p className="detail-label">What the job actually is</p>
            <p className="mt-2 max-w-[90ch] text-base leading-7 text-[#455847]">
              {pathway.reality}
            </p>
          </div>

          <div className="grid border-b border-[var(--line)] md:grid-cols-2">
            <div className="border-b border-[var(--line)] p-5 md:border-r md:border-b-0 sm:p-6">
              <div className="flex items-center gap-2 text-[var(--green)]">
                <GraduationCap className="size-4" />
                <p className="detail-label !text-[var(--green)]">
                  Academic signal
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#51614f]">
                {pathway.academicSignal}
              </p>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-2 text-[var(--green)]">
                <Target className="size-4" />
                <p className="detail-label !text-[var(--green)]">
                  Likely hiring test
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#51614f]">
                {pathway.hiringTest}
              </p>
            </div>
          </div>

          <div className="grid border-b border-[var(--line)] md:grid-cols-3">
            <div className="border-b border-[var(--line)] p-5 md:border-r md:border-b-0 sm:p-6">
              <p className="detail-label">First credible doors</p>
              <ul className="mt-3 space-y-2.5">
                {pathway.entryDoors.map((door) => (
                  <li
                    key={door}
                    className="flex gap-2 text-sm leading-5 text-[#51614f]"
                  >
                    <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--green)]" />
                    <span>{door}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-b border-[var(--line)] p-5 md:border-r md:border-b-0 sm:p-6">
              <p className="detail-label">Credentials</p>
              <p className="mt-3 text-sm leading-6 text-[#51614f]">
                {pathway.usefulCredentials}
              </p>
            </div>
            <div className="p-5 sm:p-6">
              <p className="detail-label">Proof that travels</p>
              <p className="mt-3 text-sm leading-6 text-[#51614f]">
                {pathway.proof}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3">
            {pathway.roadmap.map((step, stepIndex) => (
              <div
                key={step.period}
                className="border-b border-[var(--line)] p-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
              >
                <div className="flex items-center gap-2">
                  <span className="grid size-5 place-items-center bg-[var(--green)] font-mono text-[9px] text-white">
                    {stepIndex + 1}
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.07em] text-[var(--green)]">
                    {step.period}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#586a50]">
                  {step.move}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] bg-[var(--paper)] px-5 py-3 sm:px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.07em] text-[var(--muted-ink)]">
              Evidence informing this route
            </p>
            <SourceLinks ids={pathway.sources} />
          </div>
        </div>
      </div>
    </article>
  );
}

function FamilyPanel({ family }: { family: GuideFamily }) {
  const items = pathwaysByFamily[family];
  const meta = familyMeta[family];

  return (
    <TabsContent value={family} className="mt-0">
      <div className="mb-5 grid gap-3 border border-[var(--line)] bg-[var(--paper-deep)] p-4 sm:grid-cols-[160px_1fr] sm:items-center sm:p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.09em] text-[var(--green)]">
          {pathwayCount(family)}
        </p>
        <p className="text-sm leading-6 text-[#586a50]">{meta.note}</p>
      </div>
      <div className="space-y-5">
        {items.map((pathway, index) => (
          <PathwayCard key={pathway.id} pathway={pathway} index={index} />
        ))}
      </div>
    </TabsContent>
  );
}

export default function BreakInGuidePage() {
  return (
    <>
      <LedgerHeader guide />
      <main id="main" className="guide-main">
        <section
          id="top"
          className="relative isolate overflow-hidden border-b border-[var(--line)] bg-[var(--paper)]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 410"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[82%] w-full opacity-55"
          >
            <path
              d="M0 320 H1440"
              fill="none"
              stroke="var(--line)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M54 320 C270 320 210 258 410 258 C616 258 562 194 758 194 C962 194 918 126 1125 126 H1440"
              fill="none"
              stroke="#cbd2c6"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="410" cy="258" r="4" fill="var(--green)" />
            <circle cx="758" cy="194" r="4" fill="var(--green)" />
            <circle cx="1125" cy="126" r="4" fill="var(--green)" />
            <text
              x="66"
              y="343"
              fill="var(--muted-ink)"
              fontSize="10"
              fontFamily="monospace"
              letterSpacing="1"
            >
              SIGNAL
            </text>
            <text
              x="421"
              y="279"
              fill="var(--muted-ink)"
              fontSize="10"
              fontFamily="monospace"
              letterSpacing="1"
            >
              PROOF
            </text>
            <text
              x="769"
              y="215"
              fill="var(--muted-ink)"
              fontSize="10"
              fontFamily="monospace"
              letterSpacing="1"
            >
              FIRST DOOR
            </text>
            <text
              x="1136"
              y="147"
              fill="var(--green)"
              fontSize="10"
              fontFamily="monospace"
              letterSpacing="1"
            >
              LATERAL
            </text>
          </svg>

          <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-11 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16 lg:px-8 lg:py-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--green)]">
                India · entry level to year five · hiring examples refreshed 10
                Oct 2026
              </p>
              <h1 className="mt-5 max-w-[900px] font-display text-[clamp(2.65rem,6.5vw,5.6rem)] font-normal leading-[0.97] tracking-[-0.05em] text-[var(--ink)]">
                How finance hiring actually works in India.
              </h1>
              <p className="mt-7 max-w-[760px] text-base leading-7 text-[#586a50] sm:text-lg sm:leading-8">
                The grades, credentials, first jobs and lateral moves that
                matter across venture capital, private equity and
                finance—separated from what merely looks good on LinkedIn.
              </p>
            </div>

            <aside className="self-end border border-[var(--line)] bg-[var(--paper-deep)] p-5 sm:p-6">
              <div className="flex items-center gap-2 text-[var(--green)]">
                <TriangleAlert className="size-4" />
                <p className="font-mono text-[10px] uppercase tracking-[0.09em]">
                  Read this first
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#455847]">
                There is no universal “80% rule” or mandatory certificate for
                private-sector VC, PE or investment banking in India.
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-ink)]">
                Numeric bands below are transparent editorial estimates of
                selection risk. A rule is called a rule only when the source
                publishes it.
              </p>
              <a
                href="#grades"
                className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--green)] underline-offset-4 hover:underline"
              >
                See the marks framework <ArrowRight className="size-3.5" />
              </a>
            </aside>
          </div>
        </section>

        <section className="border-b border-[var(--line)] bg-[var(--paper-deep)]">
          <div className="mx-auto grid max-w-[1240px] sm:grid-cols-4 sm:px-6 lg:px-8">
            {[
              ['01', 'Signal', 'Marks, degree, coursework'],
              ['02', 'Proof', 'Model, memo, map, decisions'],
              ['03', 'First door', 'Closest role with real reps'],
              ['04', 'Lateral', 'Move on evidence, not hope'],
            ].map(([number, title, text], index) => (
              <div
                key={number}
                className="grid grid-cols-[42px_1fr] gap-3 border-b border-[var(--line)] px-4 py-5 last:border-b-0 sm:block sm:border-r sm:border-b-0 sm:px-5 sm:first:border-l"
              >
                <span className="font-display text-2xl text-[var(--green)]">
                  {number}
                </span>
                <div className={index === 0 ? '' : 'sm:mt-3'}>
                  <p className="text-sm font-medium text-[var(--ink)]">
                    {title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted-ink)]">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-16">
              <div>
                <p className="section-kicker">Choose by work</p>
                <h2 className="mt-3 font-display text-3xl leading-tight tracking-[-0.03em] text-[var(--ink)] sm:text-4xl">
                  “Finance” is too broad to be a plan.
                </h2>
                <p className="mt-4 text-sm leading-6 text-[var(--muted-ink)]">
                  Start with the decision you want to make all day. Titles are
                  unreliable; work content is not.
                </p>
              </div>
              <div className="border-t border-[var(--line)]">
                {decisionLanes.map((item, index) => (
                  <div
                    key={item.question}
                    className="grid gap-2 border-b border-[var(--line)] py-4 sm:grid-cols-[42px_240px_1fr] sm:items-center"
                  >
                    <span className="font-mono text-[10px] text-[var(--muted-ink)]">
                      0{index + 1}
                    </span>
                    <p className="text-sm font-medium text-[var(--ink)]">
                      {item.question}
                    </p>
                    <p className="text-sm leading-6 text-[#586a50]">
                      {item.direction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="grades"
          className="scroll-mt-6 border-b border-[var(--line)] bg-[var(--paper-deep)]"
        >
          <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-16">
              <div>
                <p className="section-kicker">01 · Grades</p>
                <h2 className="mt-3 max-w-[780px] font-display text-4xl leading-[1.05] tracking-[-0.035em] text-[var(--ink)] sm:text-5xl">
                  Marks change the route. They do not define the ceiling.
                </h2>
              </div>
              <p className="text-sm leading-6 text-[#586a50]">
                If you still control your grades, aim high. If you do not, stop
                trying to repair an immutable number with random certificates;
                build better evidence and use a less-gated first door.
              </p>
            </div>

            <div className="mt-8 grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
              <div className="bg-[var(--paper)] p-5 sm:p-6">
                <FileCheck2 className="size-5 text-[var(--green)]" />
                <p className="mt-6 detail-label">Published requirement</p>
                <p className="mt-2 text-sm leading-6 text-[#51614f]">
                  A stated degree, graduation year, percentage, exam or
                  experience rule. Miss it and that specific application may be
                  unavailable.
                </p>
              </div>
              <div className="bg-[var(--paper)] p-5 sm:p-6">
                <Target className="size-5 text-[var(--green)]" />
                <p className="mt-6 detail-label">Competitive target</p>
                <p className="mt-2 text-sm leading-6 text-[#51614f]">
                  Our evidence-based estimate of where marks stop being an
                  obvious concern. It is not a promise and not an employer rule.
                </p>
              </div>
              <div className="bg-[var(--paper)] p-5 sm:p-6">
                <Route className="size-5 text-[var(--green)]" />
                <p className="mt-6 detail-label">Offset route</p>
                <p className="mt-2 text-sm leading-6 text-[#51614f]">
                  Relevant work, class rank, a strong manager, live transactions
                  or unusually good artifacts that reduce uncertainty after weak
                  marks.
                </p>
              </div>
            </div>

            <div className="mt-6 border border-[var(--line)] bg-[var(--paper)]">
              <div className="grid md:grid-cols-4">
                {overallGradeRead.map((item) => (
                  <div
                    key={item.band}
                    className="border-b border-[var(--line)] p-5 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
                  >
                    <p className="font-mono text-[11px] leading-5 text-[var(--green)]">
                      {item.band}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#586a50]">
                      {item.read}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 border-t border-[var(--line)] bg-[var(--paper-bright)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[90ch] text-xs leading-5 text-[var(--muted-ink)]">
                  Class X/XII marks can still affect top-MBA feeder admissions.
                  They are already fixed: report them honestly, then concentrate
                  on current rank, relevant work and proof you can improve.
                </p>
                <SourceLinks ids={['S19', 'S20']} />
              </div>
            </div>

            <div className="mt-6 border border-[var(--line)] bg-[var(--paper)]">
              <Table>
                <TableHeader>
                  <TableRow className="border-[var(--line)] bg-[var(--paper-bright)] hover:bg-[var(--paper-bright)]">
                    <TableHead className="h-12 min-w-[210px] px-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-ink)]">
                      Target lane
                    </TableHead>
                    <TableHead className="h-12 min-w-[185px] px-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-ink)]">
                      Competitive target*
                    </TableHead>
                    <TableHead className="h-12 min-w-[310px] px-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-ink)]">
                      What it means
                    </TableHead>
                    <TableHead className="h-12 min-w-[340px] px-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-ink)]">
                      If you are below it
                    </TableHead>
                    <TableHead className="h-12 px-4 text-right font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-ink)]">
                      Evidence
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gradeBands.map((band) => (
                    <TableRow
                      key={band.lane}
                      className="border-[var(--line)] align-top hover:bg-[var(--paper-deep)]"
                    >
                      <TableCell className="px-4 py-5 text-sm font-medium leading-6 text-[var(--ink)]">
                        {band.lane}
                        <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.07em] text-[var(--muted-ink)]">
                          Grade weight · {band.weight}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-5 font-mono text-[12px] leading-5 text-[var(--green)]">
                        {band.target}
                      </TableCell>
                      <TableCell className="px-4 py-5 text-sm leading-6 text-[#586a50]">
                        {band.reality}
                      </TableCell>
                      <TableCell className="px-4 py-5 text-sm leading-6 text-[#586a50]">
                        {band.recovery}
                      </TableCell>
                      <TableCell className="px-4 py-5 text-right">
                        <SourceLinks ids={band.sources} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="border-t border-[var(--line)] px-4 py-4 text-xs leading-5 text-[var(--muted-ink)]">
                * Editorial competitiveness ranges, not cutoffs. Convert grades
                only when an employer requests it; where grading is harsh, add a
                truthful class rank or percentile. By contrast, NITI Aayog’s
                published internship rules are a real hard-threshold example:{' '}
                <SourceLinks ids={['S12']} />
              </div>
            </div>
          </div>
        </section>

        <section
          id="credentials"
          className="scroll-mt-6 border-b border-[var(--line)] bg-[var(--paper)]"
        >
          <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-16">
              <div>
                <p className="section-kicker">02 · Credentials</p>
                <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-[-0.035em] text-[var(--ink)]">
                  Study the credential the role rewards.
                </h2>
                <p className="mt-5 text-sm leading-6 text-[var(--muted-ink)]">
                  The correct order is lane → skill gap → credential. Reversing
                  it creates expensive badge collections with no hiring proof.
                </p>
                <div className="mt-7 border-l-2 border-[var(--green)] pl-4">
                  <p className="font-display text-xl leading-7 text-[var(--ink)]">
                    One relevant certificate plus one excellent artifact beats
                    five unrelated certificates.
                  </p>
                </div>
              </div>

              <div className="border-t border-[var(--line)]">
                {credentials.map((credential) => (
                  <article
                    key={credential.name}
                    className="grid gap-4 border-b border-[var(--line)] py-6 md:grid-cols-[190px_1fr] md:gap-8"
                  >
                    <div>
                      <p className="font-display text-2xl tracking-[-0.025em] text-[var(--ink)]">
                        {credential.name}
                      </p>
                      <p className="mt-2 font-mono text-[10px] uppercase leading-4 tracking-[0.07em] text-[var(--green)]">
                        {credential.verdict}
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="detail-label">Best aligned with</p>
                        <p className="mt-2 text-sm leading-6 text-[#586a50]">
                          {credential.bestFor}
                        </p>
                      </div>
                      <div>
                        <p className="detail-label">Will not replace</p>
                        <p className="mt-2 text-sm leading-6 text-[#586a50]">
                          {credential.notEnough}
                        </p>
                      </div>
                      <div>
                        <p className="detail-label">Decision rule</p>
                        <p className="mt-2 text-sm leading-6 text-[#586a50]">
                          {credential.decision}
                        </p>
                        <div className="mt-3">
                          <SourceLinks ids={credential.sources} />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="lanes"
          className="scroll-mt-6 border-b border-[var(--line)] bg-[var(--paper-deep)]"
        >
          <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-16">
              <div>
                <p className="section-kicker">03 · Career paths</p>
                <h2 className="mt-3 max-w-[780px] font-display text-4xl leading-[1.05] tracking-[-0.035em] text-[var(--ink)] sm:text-5xl">
                  Pick a lane. See the real entry door.
                </h2>
              </div>
              <p className="text-sm leading-6 text-[var(--muted-ink)]">
                Each route names the work, academic signal, likely test, proof
                artifact and a realistic 0–30 month sequence. These are route
                maps, not guaranteed outcomes.
              </p>
            </div>

            <Tabs defaultValue="vc" className="mt-8 gap-0">
              <TabsList
                variant="line"
                className="grid h-auto w-full grid-cols-1 gap-0 border border-[var(--line)] p-0 sm:grid-cols-3"
                aria-label="Finance career families"
              >
                {(Object.keys(familyMeta) as GuideFamily[]).map((family) => (
                  <TabsTrigger
                    key={family}
                    value={family}
                    className="h-14 justify-between rounded-none border-b border-[var(--line)] px-4 font-mono text-[10px] uppercase tracking-[0.07em] text-[var(--muted-ink)] after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[var(--green)] hover:text-[var(--ink)] data-active:bg-[var(--paper-bright)] data-active:text-[var(--ink)] sm:border-r sm:border-b-0 sm:last:border-r-0"
                  >
                    <span>{familyMeta[family].label}</span>
                    <span className="text-[var(--muted-ink)]">
                      {pathwayCount(family)}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="mt-5">
                <FamilyPanel family="vc" />
                <FamilyPanel family="pe" />
                <FamilyPanel family="finance" />
              </div>
            </Tabs>
          </div>
        </section>

        <section className="border-b border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-16">
              <div>
                <p className="section-kicker">04 · Starting points</p>
                <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-[-0.035em] text-[var(--ink)]">
                  Pedigree changes the route—not whether a route exists.
                </h2>
              </div>
              <div className="border-t border-[var(--line)]">
                {profileRoutes.map((route, index) => (
                  <article
                    key={route.profile}
                    className="grid gap-3 border-b border-[var(--line)] py-5 md:grid-cols-[42px_210px_1fr_1fr] md:gap-5"
                  >
                    <span className="font-mono text-[10px] text-[var(--muted-ink)]">
                      0{index + 1}
                    </span>
                    <h3 className="text-sm font-medium leading-6 text-[var(--ink)]">
                      {route.profile}
                    </h3>
                    <div>
                      <p className="detail-label">First move</p>
                      <p className="mt-2 text-sm leading-6 text-[#586a50]">
                        {route.directMove}
                      </p>
                    </div>
                    <div>
                      <p className="detail-label">What must be proved</p>
                      <p className="mt-2 text-sm leading-6 text-[#586a50]">
                        {route.proofGap}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)] bg-[var(--paper-deep)]">
          <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-16">
              <div>
                <p className="section-kicker">05 · Operating plan</p>
                <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-[-0.035em] text-[var(--ink)]">
                  Ninety days to proof. Up to three years to reposition.
                </h2>
                <p className="mt-5 text-sm leading-6 text-[var(--muted-ink)]">
                  The exact duration varies. The sequence should not: focus,
                  skill, proof, first door, measured reps, lateral.
                </p>
              </div>
              <ol className="border-t border-[var(--line)]">
                {operatingPlan.map((step, index) => (
                  <li
                    key={step.period}
                    className="grid gap-3 border-b border-[var(--line)] py-5 sm:grid-cols-[50px_120px_180px_1fr] sm:items-start"
                  >
                    <span className="grid size-7 place-items-center border border-[#bdc8b9] font-mono text-[10px] text-[var(--green)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.07em] text-[var(--muted-ink)]">
                      {step.period}
                    </p>
                    <h3 className="text-sm font-medium leading-6 text-[var(--ink)]">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-6 text-[#586a50]">
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8 lg:py-16">
            <div className="md:col-span-3">
              <p className="section-kicker">Non-negotiables</p>
              <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] text-[var(--ink)]">
                What this market does not forgive
              </h2>
            </div>
            {[
              {
                icon: <Calculator className="size-5" />,
                title: 'Work you cannot defend',
                text: 'Know every number, source and sentence in a submitted model or memo. AI can critique your work; it cannot replace judgment you do not possess.',
              },
              {
                icon: <BriefcaseBusiness className="size-5" />,
                title: 'Vague exposure',
                text: '“Worked on a deal” means little. State what you modelled, researched, wrote, presented or decided—and what changed because of it.',
              },
              {
                icon: <Compass className="size-5" />,
                title: 'Undirected networking',
                text: 'Networking helps surface off-cycle roles and gets your work inspected. It does not replace competence, relevance or a precise ask.',
              },
            ].map((item) => (
              <article
                key={item.title}
                className="border border-[var(--line)] bg-[var(--paper-bright)] p-5 sm:p-6"
              >
                <div className="text-[var(--green)]">{item.icon}</div>
                <h3 className="mt-8 font-display text-2xl tracking-[-0.025em] text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#586a50]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="sources" className="scroll-mt-6 bg-[var(--paper-deep)]">
          <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-2 text-[var(--green)]">
                  <BadgeCheck className="size-4" />
                  <p className="section-kicker !text-[var(--green)]">
                    Evidence ledger
                  </p>
                </div>
                <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-[-0.035em] text-[var(--ink)]">
                  Inspect the evidence yourself.
                </h2>
                <p className="mt-5 text-sm leading-6 text-[var(--muted-ink)]">
                  Direct programme pages, regulations and company-attributable
                  hiring evidence. Guidance researched 9 September; selected
                  hiring examples refreshed 10 October 2026. Historical
                  benchmarks are not open applications. Roles and rules can
                  change.
                </p>
              </div>

              <div className="grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
                {guideSources.map((source) => (
                  <a
                    key={source.id}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-[220px] flex-col bg-[var(--paper)] p-5 transition-colors hover:bg-[var(--paper-bright)] sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--green)]">
                        {source.id} · {source.sourceType}
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-[var(--muted-ink)] transition-colors group-hover:text-[var(--ink)]" />
                    </div>
                    <p className="mt-7 text-xs text-[var(--muted-ink)]">
                      {source.organization}
                    </p>
                    <h3 className="mt-1 text-base font-medium leading-6 text-[var(--ink)]">
                      {source.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-[#586a50]">
                      {source.supports}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
            <div>
              <p className="font-display text-2xl tracking-[-0.025em] text-[var(--ink)]">
                Now use the opportunity index.
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-ink)]">
                Filter live, publicly accessible roles by track, candidate stage
                and work mode.
              </p>
            </div>
            <Link
              href="/#opportunities"
              className="inline-flex h-10 w-fit items-center gap-2 bg-[var(--green)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--green-dark)]"
            >
              Browse opportunities <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <WisprSection />
      </main>
      <LedgerFooter />
    </>
  );
}
