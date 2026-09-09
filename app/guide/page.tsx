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
  credentials,
  gradeBands,
  guideSources,
  pathways,
  profileRoutes,
  type GuideFamily,
  type Pathway,
} from '@/lib/guide-data';

const familyMeta: Record<
  GuideFamily,
  { label: string; count: string; note: string }
> = {
  vc: {
    label: 'Venture capital',
    count: '03 paths',
    note: 'Most porous when you bring a sector, operator record or original access—not just finance vocabulary.',
  },
  pe: {
    label: 'Private capital',
    count: '03 paths',
    note: 'The most credible route is usually adjacent work first: transactions, diligence, consulting, credit or sector operations.',
  },
  finance: {
    label: 'Finance',
    count: '06 paths',
    note: 'A wide field. Choose by daily work and hiring test, because “finance” alone is not a career direction.',
  },
};

const sourceById = new Map(
  guideSources.map((source) => [source.id, source] as const),
);

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
          className="inline-flex min-h-6 items-center border border-[#484848] bg-[#181818] px-1.5 font-mono text-[10px] tracking-[0.04em] text-[#9fbcf1] underline-offset-4 transition-colors hover:border-[#76aaff] hover:text-[#d9e7ff] hover:underline"
        >
          {source.id}
        </a>
      ))}
    </span>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-[#3a3a3a] bg-[#111]">
      <nav
        className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid size-8 shrink-0 place-items-center border border-[#525252] font-mono text-[11px] text-[#eee]">
            OL
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-[0.04em]">
              OPEN LEDGER
            </span>
            <span className="hidden text-xs text-[#7e7b76] sm:block">
              India finance opportunity index
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.07em] sm:gap-4 sm:text-[11px]">
          <Link
            href="/"
            className="px-2 py-2 text-[#8e8b85] underline-offset-4 hover:text-[#eee] hover:underline"
          >
            Opportunities
          </Link>
          <a
            href="#top"
            aria-current="page"
            className="border border-[#484848] bg-[#1f1f1f] px-2.5 py-2 text-[#eee]"
          >
            Break-in guide
          </a>
        </div>
      </nav>
    </header>
  );
}

function PathwayCard({ pathway, index }: { pathway: Pathway; index: number }) {
  return (
    <article
      id={pathway.id}
      className="scroll-mt-6 border border-[#3a3a3a] bg-[#1f1f1f]"
    >
      <div className="grid lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="border-b border-[#3a3a3a] p-5 sm:p-6 lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#76aaff]">
              Path {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-[#77736e]">
              {pathway.shortLabel}
            </span>
          </div>
          <h3 className="mt-5 font-display text-[1.7rem] leading-[1.12] tracking-[-0.025em] text-[#f1f0ed]">
            {pathway.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-[#a9a69f]">{pathway.fit}</p>
          <div className="mt-6 border-l-2 border-[#2b7fff] pl-3">
            <p className="detail-label">Hard truth</p>
            <p className="mt-2 text-sm leading-6 text-[#d0cdc7]">
              {pathway.hardTruth}
            </p>
          </div>
        </div>

        <div>
          <div className="border-b border-[#3a3a3a] p-5 sm:p-6">
            <p className="detail-label">What the job actually is</p>
            <p className="mt-2 max-w-[90ch] text-base leading-7 text-[#d0cdc7]">
              {pathway.reality}
            </p>
          </div>

          <div className="grid border-b border-[#3a3a3a] md:grid-cols-2">
            <div className="border-b border-[#3a3a3a] p-5 md:border-r md:border-b-0 sm:p-6">
              <div className="flex items-center gap-2 text-[#76aaff]">
                <GraduationCap className="size-4" />
                <p className="detail-label !text-[#9fbcf1]">Academic signal</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#c0bdb7]">
                {pathway.academicSignal}
              </p>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-2 text-[#76aaff]">
                <Target className="size-4" />
                <p className="detail-label !text-[#9fbcf1]">
                  Likely hiring test
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#c0bdb7]">
                {pathway.hiringTest}
              </p>
            </div>
          </div>

          <div className="grid border-b border-[#3a3a3a] md:grid-cols-3">
            <div className="border-b border-[#3a3a3a] p-5 md:border-r md:border-b-0 sm:p-6">
              <p className="detail-label">First credible doors</p>
              <ul className="mt-3 space-y-2.5">
                {pathway.entryDoors.map((door) => (
                  <li
                    key={door}
                    className="flex gap-2 text-sm leading-5 text-[#c0bdb7]"
                  >
                    <Check className="mt-0.5 size-3.5 shrink-0 text-[#76aaff]" />
                    <span>{door}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-b border-[#3a3a3a] p-5 md:border-r md:border-b-0 sm:p-6">
              <p className="detail-label">Credentials</p>
              <p className="mt-3 text-sm leading-6 text-[#c0bdb7]">
                {pathway.usefulCredentials}
              </p>
            </div>
            <div className="p-5 sm:p-6">
              <p className="detail-label">Proof that travels</p>
              <p className="mt-3 text-sm leading-6 text-[#c0bdb7]">
                {pathway.proof}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3">
            {pathway.roadmap.map((step, stepIndex) => (
              <div
                key={step.period}
                className="border-b border-[#3a3a3a] p-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
              >
                <div className="flex items-center gap-2">
                  <span className="grid size-5 place-items-center bg-[#2b7fff] font-mono text-[9px] text-white">
                    {stepIndex + 1}
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.07em] text-[#9fbcf1]">
                    {step.period}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#a9a69f]">
                  {step.move}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[#3a3a3a] bg-[#181818] px-5 py-3 sm:px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.07em] text-[#77736e]">
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
  const items = pathways.filter((pathway) => pathway.family === family);
  const meta = familyMeta[family];

  return (
    <TabsContent value={family} className="mt-0">
      <div className="mb-5 grid gap-3 border border-[#3a3a3a] bg-[#111] p-4 sm:grid-cols-[160px_1fr] sm:items-center sm:p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.09em] text-[#76aaff]">
          {meta.count}
        </p>
        <p className="text-sm leading-6 text-[#aaa7a0]">{meta.note}</p>
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
    <main className="min-h-screen bg-[#181818] text-[#eee]">
      <SiteHeader />

      <section
        id="top"
        className="relative isolate overflow-hidden border-b border-[#3a3a3a] bg-[#181818]"
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
            stroke="#3a3a3a"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M54 320 C270 320 210 258 410 258 C616 258 562 194 758 194 C962 194 918 126 1125 126 H1440"
            fill="none"
            stroke="#323232"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="410" cy="258" r="4" fill="#2b7fff" />
          <circle cx="758" cy="194" r="4" fill="#2b7fff" />
          <circle cx="1125" cy="126" r="4" fill="#2b7fff" />
          <text
            x="66"
            y="343"
            fill="#77736e"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1"
          >
            SIGNAL
          </text>
          <text
            x="421"
            y="279"
            fill="#77736e"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1"
          >
            PROOF
          </text>
          <text
            x="769"
            y="215"
            fill="#77736e"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1"
          >
            FIRST DOOR
          </text>
          <text
            x="1136"
            y="147"
            fill="#76aaff"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1"
          >
            LATERAL
          </text>
        </svg>

        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-11 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16 lg:px-8 lg:py-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#76aaff]">
              India · entry level to year five · researched 09 Sep 2026
            </p>
            <h1 className="mt-5 max-w-[900px] font-display text-[clamp(2.65rem,6.5vw,5.6rem)] font-normal leading-[0.97] tracking-[-0.05em] text-[#f1f0ed]">
              How finance hiring actually works in India.
            </h1>
            <p className="mt-7 max-w-[760px] text-base leading-7 text-[#b6b3ad] sm:text-lg sm:leading-8">
              The grades, credentials, first jobs and lateral moves that matter
              across venture capital, private equity and finance—separated from
              what merely looks good on LinkedIn.
            </p>
          </div>

          <aside className="self-end border border-[#3a3a3a] bg-[#111] p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[#76aaff]">
              <TriangleAlert className="size-4" />
              <p className="font-mono text-[10px] uppercase tracking-[0.09em]">
                Read this first
              </p>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#d0cdc7]">
              There is no universal “80% rule” or mandatory certificate for
              private-sector VC, PE or investment banking in India.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#8f8c86]">
              Numeric bands below are transparent editorial estimates of
              selection risk. A rule is called a rule only when the source
              publishes it.
            </p>
            <a
              href="#grades"
              className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#9fbcf1] underline-offset-4 hover:underline"
            >
              See the marks framework <ArrowRight className="size-3.5" />
            </a>
          </aside>
        </div>
      </section>

      <section className="border-b border-[#3a3a3a] bg-[#111]">
        <div className="mx-auto grid max-w-[1240px] sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            ['01', 'Signal', 'Marks, degree, coursework'],
            ['02', 'Proof', 'Model, memo, map, decisions'],
            ['03', 'First door', 'Closest role with real reps'],
            ['04', 'Lateral', 'Move on evidence, not hope'],
          ].map(([number, title, text], index) => (
            <div
              key={number}
              className="grid grid-cols-[42px_1fr] gap-3 border-b border-[#3a3a3a] px-4 py-5 last:border-b-0 sm:block sm:border-r sm:border-b-0 sm:px-5 sm:first:border-l"
            >
              <span className="font-display text-2xl text-[#76aaff]">
                {number}
              </span>
              <div className={index === 0 ? '' : 'sm:mt-3'}>
                <p className="text-sm font-medium text-[#eee]">{title}</p>
                <p className="mt-1 text-xs leading-5 text-[#77736e]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-[#3a3a3a] bg-[#181818]">
        <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-16">
            <div>
              <p className="section-kicker">Choose by work</p>
              <h2 className="mt-3 font-display text-3xl leading-tight tracking-[-0.03em] text-[#eee] sm:text-4xl">
                “Finance” is too broad to be a plan.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#8f8c86]">
                Start with the decision you want to make all day. Titles are
                unreliable; work content is not.
              </p>
            </div>
            <div className="border-t border-[#3a3a3a]">
              {decisionLanes.map((item, index) => (
                <div
                  key={item.question}
                  className="grid gap-2 border-b border-[#3a3a3a] py-4 sm:grid-cols-[42px_240px_1fr] sm:items-center"
                >
                  <span className="font-mono text-[10px] text-[#77736e]">
                    0{index + 1}
                  </span>
                  <p className="text-sm font-medium text-[#eee]">
                    {item.question}
                  </p>
                  <p className="text-sm leading-6 text-[#9d9a94]">
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
        className="scroll-mt-6 border-b border-[#3a3a3a] bg-[#111]"
      >
        <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-16">
            <div>
              <p className="section-kicker">01 · Grades</p>
              <h2 className="mt-3 max-w-[780px] font-display text-4xl leading-[1.05] tracking-[-0.035em] text-[#eee] sm:text-5xl">
                Marks change the route. They do not define the ceiling.
              </h2>
            </div>
            <p className="text-sm leading-6 text-[#9d9a94]">
              If you still control your grades, aim high. If you do not, stop
              trying to repair an immutable number with random certificates;
              build better evidence and use a less-gated first door.
            </p>
          </div>

          <div className="mt-8 grid gap-px border border-[#3a3a3a] bg-[#3a3a3a] md:grid-cols-3">
            <div className="bg-[#181818] p-5 sm:p-6">
              <FileCheck2 className="size-5 text-[#76aaff]" />
              <p className="mt-6 detail-label">Published requirement</p>
              <p className="mt-2 text-sm leading-6 text-[#c0bdb7]">
                A stated degree, graduation year, percentage, exam or experience
                rule. Miss it and that specific application may be unavailable.
              </p>
            </div>
            <div className="bg-[#181818] p-5 sm:p-6">
              <Target className="size-5 text-[#76aaff]" />
              <p className="mt-6 detail-label">Competitive target</p>
              <p className="mt-2 text-sm leading-6 text-[#c0bdb7]">
                Our evidence-based estimate of where marks stop being an obvious
                concern. It is not a promise and not an employer rule.
              </p>
            </div>
            <div className="bg-[#181818] p-5 sm:p-6">
              <Route className="size-5 text-[#76aaff]" />
              <p className="mt-6 detail-label">Offset route</p>
              <p className="mt-2 text-sm leading-6 text-[#c0bdb7]">
                Relevant work, class rank, a strong manager, live transactions
                or unusually good artifacts that reduce uncertainty after weak
                marks.
              </p>
            </div>
          </div>

          <div className="mt-6 border border-[#3a3a3a] bg-[#181818]">
            <div className="grid md:grid-cols-4">
              {overallGradeRead.map((item) => (
                <div
                  key={item.band}
                  className="border-b border-[#3a3a3a] p-5 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
                >
                  <p className="font-mono text-[11px] leading-5 text-[#9fbcf1]">
                    {item.band}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#aaa7a0]">
                    {item.read}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 border-t border-[#3a3a3a] bg-[#1f1f1f] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[90ch] text-xs leading-5 text-[#8f8c86]">
                Class X/XII marks can still affect top-MBA feeder admissions.
                They are already fixed: report them honestly, then concentrate
                on current rank, relevant work and proof you can improve.
              </p>
              <SourceLinks ids={['S19', 'S20']} />
            </div>
          </div>

          <div className="mt-6 border border-[#3a3a3a] bg-[#181818]">
            <Table>
              <TableHeader>
                <TableRow className="border-[#3a3a3a] bg-[#1f1f1f] hover:bg-[#1f1f1f]">
                  <TableHead className="h-12 min-w-[210px] px-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[#8f8c86]">
                    Target lane
                  </TableHead>
                  <TableHead className="h-12 min-w-[185px] px-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[#8f8c86]">
                    Competitive target*
                  </TableHead>
                  <TableHead className="h-12 min-w-[310px] px-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[#8f8c86]">
                    What it means
                  </TableHead>
                  <TableHead className="h-12 min-w-[340px] px-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[#8f8c86]">
                    If you are below it
                  </TableHead>
                  <TableHead className="h-12 px-4 text-right font-mono text-[10px] uppercase tracking-[0.08em] text-[#8f8c86]">
                    Evidence
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gradeBands.map((band) => (
                  <TableRow
                    key={band.lane}
                    className="border-[#3a3a3a] align-top hover:bg-[#1c1c1c]"
                  >
                    <TableCell className="px-4 py-5 text-sm font-medium leading-6 text-[#eee]">
                      {band.lane}
                      <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.07em] text-[#77736e]">
                        Grade weight · {band.weight}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-5 font-mono text-[12px] leading-5 text-[#9fbcf1]">
                      {band.target}
                    </TableCell>
                    <TableCell className="px-4 py-5 text-sm leading-6 text-[#aaa7a0]">
                      {band.reality}
                    </TableCell>
                    <TableCell className="px-4 py-5 text-sm leading-6 text-[#aaa7a0]">
                      {band.recovery}
                    </TableCell>
                    <TableCell className="px-4 py-5 text-right">
                      <SourceLinks ids={band.sources} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="border-t border-[#3a3a3a] px-4 py-4 text-xs leading-5 text-[#77736e]">
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
        className="scroll-mt-6 border-b border-[#3a3a3a] bg-[#181818]"
      >
        <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-16">
            <div>
              <p className="section-kicker">02 · Credentials</p>
              <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-[-0.035em] text-[#eee]">
                Study the credential the role rewards.
              </h2>
              <p className="mt-5 text-sm leading-6 text-[#8f8c86]">
                The correct order is lane → skill gap → credential. Reversing it
                creates expensive badge collections with no hiring proof.
              </p>
              <div className="mt-7 border-l-2 border-[#2b7fff] pl-4">
                <p className="font-display text-xl leading-7 text-[#d8d5cf]">
                  One relevant certificate plus one excellent artifact beats
                  five unrelated certificates.
                </p>
              </div>
            </div>

            <div className="border-t border-[#3a3a3a]">
              {credentials.map((credential) => (
                <article
                  key={credential.name}
                  className="grid gap-4 border-b border-[#3a3a3a] py-6 md:grid-cols-[190px_1fr] md:gap-8"
                >
                  <div>
                    <p className="font-display text-2xl tracking-[-0.025em] text-[#eee]">
                      {credential.name}
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase leading-4 tracking-[0.07em] text-[#76aaff]">
                      {credential.verdict}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="detail-label">Best aligned with</p>
                      <p className="mt-2 text-sm leading-6 text-[#b5b2ac]">
                        {credential.bestFor}
                      </p>
                    </div>
                    <div>
                      <p className="detail-label">Will not replace</p>
                      <p className="mt-2 text-sm leading-6 text-[#b5b2ac]">
                        {credential.notEnough}
                      </p>
                    </div>
                    <div>
                      <p className="detail-label">Decision rule</p>
                      <p className="mt-2 text-sm leading-6 text-[#b5b2ac]">
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
        className="scroll-mt-6 border-b border-[#3a3a3a] bg-[#111]"
      >
        <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-16">
            <div>
              <p className="section-kicker">03 · Career paths</p>
              <h2 className="mt-3 max-w-[780px] font-display text-4xl leading-[1.05] tracking-[-0.035em] text-[#eee] sm:text-5xl">
                Pick a lane. See the real entry door.
              </h2>
            </div>
            <p className="text-sm leading-6 text-[#8f8c86]">
              Each route names the work, academic signal, likely test, proof
              artifact and a realistic 0–30 month sequence. These are route
              maps, not guaranteed outcomes.
            </p>
          </div>

          <Tabs defaultValue="vc" className="mt-8 gap-0">
            <TabsList
              variant="line"
              className="grid h-auto w-full grid-cols-1 gap-0 border border-[#3a3a3a] p-0 sm:grid-cols-3"
              aria-label="Finance career families"
            >
              {(Object.keys(familyMeta) as GuideFamily[]).map((family) => (
                <TabsTrigger
                  key={family}
                  value={family}
                  className="h-14 justify-between rounded-none border-b border-[#3a3a3a] px-4 font-mono text-[10px] uppercase tracking-[0.07em] text-[#8f8c86] after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[#2b7fff] hover:text-[#eee] data-active:bg-[#1f1f1f] data-active:text-[#eee] sm:border-r sm:border-b-0 sm:last:border-r-0"
                >
                  <span>{familyMeta[family].label}</span>
                  <span className="text-[#65625e]">
                    {familyMeta[family].count}
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

      <section className="border-b border-[#3a3a3a] bg-[#181818]">
        <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-16">
            <div>
              <p className="section-kicker">04 · Starting points</p>
              <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-[-0.035em] text-[#eee]">
                Pedigree changes the route—not whether a route exists.
              </h2>
            </div>
            <div className="border-t border-[#3a3a3a]">
              {profileRoutes.map((route, index) => (
                <article
                  key={route.profile}
                  className="grid gap-3 border-b border-[#3a3a3a] py-5 md:grid-cols-[42px_210px_1fr_1fr] md:gap-5"
                >
                  <span className="font-mono text-[10px] text-[#77736e]">
                    0{index + 1}
                  </span>
                  <h3 className="text-sm font-medium leading-6 text-[#eee]">
                    {route.profile}
                  </h3>
                  <div>
                    <p className="detail-label">First move</p>
                    <p className="mt-2 text-sm leading-6 text-[#aaa7a0]">
                      {route.directMove}
                    </p>
                  </div>
                  <div>
                    <p className="detail-label">What must be proved</p>
                    <p className="mt-2 text-sm leading-6 text-[#aaa7a0]">
                      {route.proofGap}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#3a3a3a] bg-[#111]">
        <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-16">
            <div>
              <p className="section-kicker">05 · Operating plan</p>
              <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-[-0.035em] text-[#eee]">
                Ninety days to proof. Up to three years to reposition.
              </h2>
              <p className="mt-5 text-sm leading-6 text-[#8f8c86]">
                The exact duration varies. The sequence should not: focus,
                skill, proof, first door, measured reps, lateral.
              </p>
            </div>
            <ol className="border-t border-[#3a3a3a]">
              {operatingPlan.map((step, index) => (
                <li
                  key={step.period}
                  className="grid gap-3 border-b border-[#3a3a3a] py-5 sm:grid-cols-[50px_120px_180px_1fr] sm:items-start"
                >
                  <span className="grid size-7 place-items-center border border-[#484848] font-mono text-[10px] text-[#76aaff]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.07em] text-[#77736e]">
                    {step.period}
                  </p>
                  <h3 className="text-sm font-medium leading-6 text-[#eee]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-6 text-[#aaa7a0]">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-[#3a3a3a] bg-[#181818]">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8 lg:py-16">
          <div className="md:col-span-3">
            <p className="section-kicker">Non-negotiables</p>
            <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] text-[#eee]">
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
              className="border border-[#3a3a3a] bg-[#1f1f1f] p-5 sm:p-6"
            >
              <div className="text-[#76aaff]">{item.icon}</div>
              <h3 className="mt-8 font-display text-2xl tracking-[-0.025em] text-[#eee]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#aaa7a0]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="sources" className="scroll-mt-6 bg-[#111]">
        <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-[#76aaff]">
                <BadgeCheck className="size-4" />
                <p className="section-kicker !text-[#9fbcf1]">
                  Evidence ledger
                </p>
              </div>
              <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-[-0.035em] text-[#eee]">
                Inspect the evidence yourself.
              </h2>
              <p className="mt-5 text-sm leading-6 text-[#8f8c86]">
                Direct programme pages, regulations and company-attributable
                hiring evidence. Checked 09 September 2026; current roles and
                rules can change.
              </p>
            </div>

            <div className="grid gap-px border border-[#3a3a3a] bg-[#3a3a3a] md:grid-cols-2">
              {guideSources.map((source) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-[220px] flex-col bg-[#181818] p-5 transition-colors hover:bg-[#1f1f1f] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#76aaff]">
                      {source.id} · {source.sourceType}
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-[#77736e] transition-colors group-hover:text-[#eee]" />
                  </div>
                  <p className="mt-7 text-xs text-[#8f8c86]">
                    {source.organization}
                  </p>
                  <h3 className="mt-1 text-base font-medium leading-6 text-[#eee]">
                    {source.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-[#9d9a94]">
                    {source.supports}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#3a3a3a] bg-[#181818]">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div>
            <p className="font-display text-2xl tracking-[-0.025em] text-[#eee]">
              Now use the opportunity index.
            </p>
            <p className="mt-2 text-sm leading-6 text-[#8f8c86]">
              Filter live, publicly accessible roles by track, candidate stage
              and work mode.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex h-10 w-fit items-center gap-2 bg-[#2b7fff] px-4 text-sm font-medium text-white transition-colors hover:bg-[#4a91ff]"
          >
            Browse opportunities <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#3a3a3a] bg-[#111]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-4 py-7 text-sm text-[#7e7b76] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Open Ledger · independent opportunity research</p>
          <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.07em]">
            <a href="#grades" className="hover:text-[#eee]">
              Grades
            </a>
            <a href="#credentials" className="hover:text-[#eee]">
              Credentials
            </a>
            <a href="#lanes" className="hover:text-[#eee]">
              Career paths
            </a>
            <a href="#sources" className="hover:text-[#eee]">
              Sources
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
