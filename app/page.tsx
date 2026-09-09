'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  Check,
  ChevronRight,
  MapPin,
  Search,
  X,
} from 'lucide-react';
import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import research from '@/lib/research.json';
import { cn } from '@/lib/utils';

type Opportunity = (typeof research.opportunities)[number];

const verifiedAt = research.verifiedAt;
const urgentUndatedOrder = ['VC-02', 'VC-05', 'MK-01'];

const categoryOrder = [
  'Venture & private markets',
  'Banking & markets',
  'Finance & valuation',
  'Public policy & finance',
  'Returnship',
] as const;

const candidateOrder = [
  'Student',
  'CA pathway',
  'Fresher / 0–1 yr',
  'Early career',
  'Experienced / specialist',
  'Returner',
] as const;

const modeOrder = [
  'All modes',
  'In person',
  'Hybrid',
  'Remote',
  'Not stated',
] as const;
const sortOrder = ['deadline', 'newest', 'organization'] as const;

type FilterState = {
  query: string;
  category: string;
  candidate: string;
  mode: string;
  sort: string;
};

function parseIndiaDate(date: string) {
  return new Date(`${date}T12:00:00+05:30`);
}

function formatDate(date: string | null) {
  if (!date) return 'No fixed date';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(parseIndiaDate(date));
}

function daysFromVerification(date: string | null) {
  if (!date) return null;
  const day = 86_400_000;
  return Math.round(
    (parseIndiaDate(date).getTime() - parseIndiaDate(verifiedAt).getTime()) /
      day,
  );
}

function deadlineLabel(item: Opportunity) {
  const days = daysFromVerification(item.deadline);
  if (days === 0) return 'Closes today';
  if (days === 1) return '1 day left';
  if (days !== null && days > 1 && days <= 14) return `${days} days left`;
  if (item.deadline) return formatDate(item.deadline);
  if (item.deadlineKind === 'relative') return 'Apply immediately';
  if (item.deadlineKind === 'rolling') return 'Rolling / immediate';
  return 'No date stated';
}

function deadlineTone(item: Opportunity) {
  const days = daysFromVerification(item.deadline);
  if (days !== null && days <= 7) return 'text-[#76aaff]';
  if (item.deadlineKind === 'relative') return 'text-[#76aaff]';
  return 'text-[#eee]';
}

function sourceDateLabel(item: Opportunity) {
  if (item.sourceDate) return formatDate(item.sourceDate);
  return item.sourceDateText ?? 'Date not published';
}

function isExternal(url: string) {
  return url.startsWith('http');
}

function filterAndSortOpportunities(filters: FilterState) {
  const normalizedQuery = filters.query.trim().toLowerCase();
  const result = research.opportunities.filter((item) => {
    const searchable = [
      item.org,
      item.opportunity,
      item.track,
      item.type,
      item.location,
      item.eligibility,
    ]
      .join(' ')
      .toLowerCase();

    return (
      (!normalizedQuery || searchable.includes(normalizedQuery)) &&
      (filters.category === 'All tracks' ||
        item.category === filters.category) &&
      (filters.candidate === 'All candidates' ||
        item.candidateGroup === filters.candidate) &&
      (filters.mode === 'All modes' || item.modeGroup === filters.mode)
    );
  });

  return result.sort((a, b) => {
    if (filters.sort === 'organization') return a.org.localeCompare(b.org);
    if (filters.sort === 'newest') {
      return (b.sourceDate ?? '').localeCompare(a.sourceDate ?? '');
    }
    const aDate = a.deadline ?? '9999-12-31';
    const bDate = b.deadline ?? '9999-12-31';
    if (aDate !== bDate) return aDate.localeCompare(bDate);
    const aUrgent = urgentUndatedOrder.indexOf(a.id);
    const bUrgent = urgentUndatedOrder.indexOf(b.id);
    if (aUrgent >= 0 || bUrgent >= 0) {
      return (aUrgent < 0 ? 99 : aUrgent) - (bUrgent < 0 ? 99 : bUrgent);
    }
    return a.org.localeCompare(b.org);
  });
}

function validateFilterInput(input: unknown): FilterState {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error('Filters must be an object.');
  }

  const candidate = input as Record<string, unknown>;
  const readString = (key: string, fallback: string) => {
    const value = candidate[key];
    if (value === undefined) return fallback;
    if (typeof value !== 'string') throw new Error(`${key} must be a string.`);
    return value;
  };
  const filters = {
    query: readString('query', ''),
    category: readString('category', 'All tracks'),
    candidate: readString('candidate', 'All candidates'),
    mode: readString('mode', 'All modes'),
    sort: readString('sort', 'deadline'),
  };

  if (!['All tracks', ...categoryOrder].includes(filters.category as never)) {
    throw new Error('Unknown category filter.');
  }
  if (
    !['All candidates', ...candidateOrder].includes(filters.candidate as never)
  ) {
    throw new Error('Unknown candidate filter.');
  }
  if (!modeOrder.includes(filters.mode as (typeof modeOrder)[number])) {
    throw new Error('Unknown work-mode filter.');
  }
  if (!sortOrder.includes(filters.sort as (typeof sortOrder)[number])) {
    throw new Error('Unknown sort order.');
  }

  return filters;
}

function OpportunitySheet({
  item,
  onClose,
}: {
  item: Opportunity | null;
  onClose: () => void;
}) {
  return (
    <Sheet open={Boolean(item)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="opportunity-sheet w-[min(540px,94vw)] border-[#3a3a3a] bg-[#181818] p-0 text-[#eee] shadow-none sm:max-w-[540px]"
      >
        {item ? (
          <>
            <SheetHeader className="border-b border-[#3a3a3a] px-5 py-5 pr-14 sm:px-7 sm:py-7">
              <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#a4a19b]">
                <span className="rounded-[4px] border border-[#3a3a3a] bg-[#1f1f1f] px-2 py-1">
                  {item.id}
                </span>
                <span>{item.statusLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{item.sourceTier}</span>
              </div>
              <SheetTitle className="font-display text-[28px] font-normal leading-[1.12] tracking-[-0.025em] text-[#eee] sm:text-[34px]">
                {item.opportunity}
              </SheetTitle>
              <SheetDescription className="mt-2 text-base text-[#a4a19b]">
                {item.org} · {item.location}
              </SheetDescription>
            </SheetHeader>

            <div className="overflow-y-auto px-5 pb-8 sm:px-7">
              <dl className="grid grid-cols-2 border-b border-[#3a3a3a] py-5 text-sm">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a4a19b]">
                    Deadline
                  </dt>
                  <dd className={cn('mt-1.5', deadlineTone(item))}>
                    {deadlineLabel(item)}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a4a19b]">
                    Format
                  </dt>
                  <dd className="mt-1.5 text-[#eee]">{item.mode}</dd>
                </div>
              </dl>

              <div className="space-y-7 py-6">
                <DetailBlock label="Who can apply" text={item.eligibility} />
                <DetailBlock label="Experience" text={item.experience} />
                <DetailBlock label="What you would do" text={item.work} />
                <DetailBlock label="Duration" text={item.duration} />
                <DetailBlock label="Compensation" text={item.comp} />
                <DetailBlock label="How to apply" text={item.applyMethod} />
                <DetailBlock label="Open evidence" text={item.evidence} />

                <section>
                  <p className="detail-label">Verification note</p>
                  <div className="mt-2 border-l-2 border-[#2b7fff] bg-[#1f1f1f] px-4 py-3 text-sm leading-6 text-[#c9c7c2]">
                    {item.caveat}
                  </div>
                </section>

                <section className="border-t border-[#3a3a3a] pt-5">
                  <p className="detail-label">Source record</p>
                  <div className="mt-2 flex items-start justify-between gap-4 text-sm">
                    <div>
                      <p className="text-[#eee]">{item.sourceType}</p>
                      <p className="mt-1 text-[#a4a19b]">
                        Published {sourceDateLabel(item)} · checked 09 Sep 2026
                      </p>
                    </div>
                    <a
                      className="inline-flex shrink-0 items-center gap-1 text-[#76aaff] underline-offset-4 hover:underline"
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </section>
              </div>
            </div>

            <SheetFooter className="border-t border-[#3a3a3a] bg-[#111] p-4 sm:flex-row sm:px-7">
              <a
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'h-10 flex-1 rounded-[4px] bg-[#2b7fff] px-4 text-white hover:bg-[#2472e7]',
                )}
                href={item.applyUrl}
                target={isExternal(item.applyUrl) ? '_blank' : undefined}
                rel={isExternal(item.applyUrl) ? 'noreferrer' : undefined}
              >
                {item.applyUrl.startsWith('mailto:')
                  ? 'Email to apply'
                  : 'Open application'}
                <ArrowUpRight className="size-4" />
              </a>
              <a
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'h-10 rounded-[4px] border-[#3a3a3a] bg-transparent px-4 text-[#eee] hover:bg-[#262626]',
                )}
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                Verify source
              </a>
            </SheetFooter>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function DetailBlock({ label, text }: { label: string; text: string }) {
  return (
    <section>
      <p className="detail-label">{label}</p>
      <p className="mt-2 text-[15px] leading-6 text-[#d5d3ce]">{text}</p>
    </section>
  );
}

function DeadlineCard({
  item,
  order,
  onSelect,
}: {
  item: Opportunity;
  order: number;
  onSelect: (item: Opportunity) => void;
}) {
  return (
    <article className="group grid min-h-[168px] grid-rows-[auto_1fr_auto] border border-[#3a3a3a] bg-[#1f1f1f] p-4 transition-colors hover:bg-[#242424] sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a4a19b]">
          0{order} / Apply first
        </span>
        <span className="size-2 bg-[#2b7fff]" aria-hidden="true" />
      </div>
      <div className="py-5">
        <p className="text-sm text-[#a4a19b]">{item.org}</p>
        <h3 className="mt-1.5 max-w-[30ch] text-[17px] font-medium leading-6 text-[#eee]">
          {item.opportunity}
        </h3>
      </div>
      <div className="flex items-end justify-between gap-3 border-t border-[#3a3a3a] pt-3">
        <div>
          <p className={cn('font-mono text-xs', deadlineTone(item))}>
            {deadlineLabel(item)}
          </p>
          <p className="mt-1 text-xs text-[#7e7b76]">{item.location}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-[4px] px-2 text-[#eee] hover:bg-[#323232]"
          onClick={() => onSelect(item)}
          aria-label={`View ${item.opportunity} at ${item.org}`}
        >
          Review <ChevronRight />
        </Button>
      </div>
    </article>
  );
}

function OpportunityCard({
  item,
  onSelect,
}: {
  item: Opportunity;
  onSelect: (item: Opportunity) => void;
}) {
  return (
    <article className="border border-[#3a3a3a] bg-[#1f1f1f] p-4">
      <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.07em] text-[#a4a19b]">
        <span>{item.id}</span>
        <span className={deadlineTone(item)}>{deadlineLabel(item)}</span>
      </div>
      <p className="mt-5 text-sm text-[#a4a19b]">{item.org}</p>
      <h3 className="mt-1 text-lg font-medium leading-6 text-[#eee]">
        {item.opportunity}
      </h3>
      <div className="mt-5 grid grid-cols-2 gap-4 border-y border-[#3a3a3a] py-3 text-sm">
        <div>
          <p className="detail-label">Track</p>
          <p className="mt-1 text-[#c9c7c2]">{item.track}</p>
        </div>
        <div>
          <p className="detail-label">Location</p>
          <p className="mt-1 text-[#c9c7c2]">{item.location}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        className="mt-3 w-full justify-between rounded-[4px] px-0 text-[#eee] hover:bg-transparent hover:text-[#76aaff]"
        onClick={() => onSelect(item)}
      >
        Review evidence and eligibility <ChevronRight />
      </Button>
    </article>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All tracks');
  const [candidate, setCandidate] = useState('All candidates');
  const [mode, setMode] = useState('All modes');
  const [sort, setSort] = useState('deadline');
  const [selected, setSelected] = useState<Opportunity | null>(null);

  const exactUrgent = useMemo(
    () =>
      [...research.opportunities]
        .filter((item) => item.deadline)
        .sort((a, b) => (a.deadline ?? '').localeCompare(b.deadline ?? ''))
        .slice(0, 3),
    [],
  );

  const filtered = useMemo(() => {
    return filterAndSortOpportunities({
      query,
      category,
      candidate,
      mode,
      sort,
    });
  }, [candidate, category, mode, query, sort]);

  const hasFilters =
    Boolean(query) ||
    category !== 'All tracks' ||
    candidate !== 'All candidates' ||
    mode !== 'All modes';

  function clearFilters() {
    setQuery('');
    setCategory('All tracks');
    setCandidate('All candidates');
    setMode('All modes');
  }

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;

    const lifecycle = new AbortController();
    const nextPaint = () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    const register = async () => {
      await context.registerTool(
        {
          name: 'set_opportunity_filters',
          title: 'Filter finance opportunities',
          description:
            'Set the same search, category, candidate, work-mode and sort controls visible on the Open Ledger page, then return matching record IDs.',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string' },
              category: {
                type: 'string',
                enum: ['All tracks', ...categoryOrder],
              },
              candidate: {
                type: 'string',
                enum: ['All candidates', ...candidateOrder],
              },
              mode: { type: 'string', enum: modeOrder },
              sort: { type: 'string', enum: sortOrder },
            },
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          async execute(input: unknown) {
            const filters = validateFilterInput(input);
            const matches = filterAndSortOpportunities(filters);
            setQuery(filters.query);
            setCategory(filters.category);
            setCandidate(filters.candidate);
            setMode(filters.mode);
            setSort(filters.sort);
            await nextPaint();
            return {
              count: matches.length,
              recordIds: matches.slice(0, 20).map((item) => item.id),
              truncated: matches.length > 20,
            };
          },
        },
        { signal: lifecycle.signal },
      );

      await context.registerTool(
        {
          name: 'open_opportunity_record',
          title: 'Open opportunity record',
          description:
            'Open the visible evidence and eligibility drawer for one Open Ledger record ID.',
          inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          async execute(input: unknown) {
            if (!input || typeof input !== 'object' || Array.isArray(input)) {
              throw new Error('Input must be an object containing an id.');
            }
            const id = (input as Record<string, unknown>).id;
            if (typeof id !== 'string') throw new Error('id must be a string.');
            const item = research.opportunities.find(
              (record) => record.id === id,
            );
            if (!item)
              throw new Error(`No opportunity record found for ${id}.`);
            setSelected(item);
            await nextPaint();
            return {
              id: item.id,
              organization: item.org,
              opportunity: item.opportunity,
              status: item.status,
              deadline: item.deadline,
            };
          },
        },
        { signal: lifecycle.signal },
      );
    };

    void register().catch((error) => {
      console.warn('[WebMCP] Tool registration failed.', error);
    });

    return () => lifecycle.abort();
  }, []);

  return (
    <main className="min-h-screen bg-[#181818] text-[#eee]">
      <header className="border-b border-[#3a3a3a] bg-[#111]">
        <nav
          className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Primary"
        >
          <a href="#top" className="flex min-w-0 items-center gap-3">
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
          </a>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.07em] text-[#a4a19b] sm:gap-6">
            <Link
              href="/guide"
              className="border border-[#484848] bg-[#1f1f1f] px-2.5 py-2 text-[#eee] transition-colors hover:bg-[#262626]"
            >
              Break-in guide
            </Link>
            <span className="hidden md:inline">
              {research.opportunities.length} verified
            </span>
            <a
              href="#methodology"
              className="hidden underline-offset-4 hover:text-[#eee] hover:underline sm:inline"
            >
              Method
            </a>
          </div>
        </nav>
      </header>

      <section
        id="top"
        className="relative isolate overflow-hidden border-b border-[#3a3a3a] bg-[#181818]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[88%] w-full opacity-45"
        >
          <path
            d="M0 244 L148 202 L280 224 L430 138 L548 198 L704 82 L828 178 L962 126 L1090 204 L1230 152 L1440 214"
            fill="none"
            stroke="#323232"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 258 H1440"
            fill="none"
            stroke="#3a3a3a"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M296 252 V266"
            stroke="#2b7fff"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <text
            x="306"
            y="270"
            fill="#76aaff"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1"
          >
            TODAY
          </text>
        </svg>

        <div className="mx-auto grid max-w-[1240px] gap-7 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16 lg:px-8 lg:py-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#76aaff]">
              Source-backed · India · 09 Sep 2026
            </p>
            <h1 className="mt-5 max-w-[860px] font-display text-[clamp(2.55rem,6vw,5.25rem)] font-normal leading-[0.98] tracking-[-0.045em] text-[#f1f0ed]">
              India’s open finance opportunities, verified.
            </h1>
          </div>
          <div className="self-end border-l border-[#3a3a3a] pl-5 lg:mb-1 lg:pl-7">
            <p className="max-w-[38ch] text-base leading-7 text-[#b6b3ad]">
              A clean, public index of venture capital, banking, investing,
              valuation and early-career finance applications—each tied to a
              source you can inspect.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.07em] text-[#7e7b76]">
              Public access, not eligibility-free
            </p>
            <Link
              href="/guide"
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-[#9fbcf1] underline-offset-4 hover:underline"
            >
              See the realistic India break-in guide
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[#3a3a3a] bg-[#111]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          <Metric value="34" label="Opportunities" />
          <Metric value="10" label="Exact dates" />
          <Metric value="1" label="Remote route" />
          <Metric value="28" label="Ruled out" />
        </div>
      </section>

      <section className="border-b border-[#3a3a3a] bg-[#181818]">
        <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Deadline desk</p>
              <h2 className="mt-2 font-display text-2xl font-normal text-[#eee] sm:text-3xl">
                Apply first
              </h2>
            </div>
            <p className="hidden max-w-[48ch] text-right text-sm leading-6 text-[#7e7b76] md:block">
              Exact-date openings are ordered from the India verification date.
              Recheck every source before submitting.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {exactUrgent.map((item, index) => (
              <DeadlineCard
                key={item.id}
                item={item}
                order={index + 1}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="opportunities" className="bg-[#181818]">
        <div className="mx-auto max-w-[1240px] px-4 py-9 sm:px-6 lg:px-8 lg:py-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Full ledger</p>
              <h2 className="mt-2 font-display text-3xl font-normal tracking-[-0.02em] text-[#eee] sm:text-4xl">
                All verified opportunities
              </h2>
            </div>
            <p className="font-mono text-xs text-[#a4a19b]" aria-live="polite">
              {filtered.length.toString().padStart(2, '0')} /{' '}
              {research.opportunities.length} records
            </p>
          </div>

          <div className="sticky top-0 z-20 -mx-4 border-y border-[#3a3a3a] bg-[#181818]/95 px-4 py-3 backdrop-blur-sm sm:mx-0 sm:border sm:p-3">
            <div className="grid gap-2 md:grid-cols-[minmax(230px,1.4fr)_repeat(4,minmax(130px,.75fr))_auto]">
              <div className="relative block">
                <span className="sr-only">Search opportunities</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-[#7e7b76]" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label="Search opportunities"
                  placeholder="Search firm, role, city…"
                  className="h-10 rounded-[4px] border-[#3a3a3a] bg-[#111] pl-9 text-base text-[#eee] placeholder:text-[#6f6c67] focus-visible:border-[#2b7fff] focus-visible:ring-[#2b7fff]/25 md:text-sm"
                />
              </div>

              <NativeSelect
                aria-label="Filter by track"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full"
              >
                <NativeSelectOption>All tracks</NativeSelectOption>
                {categoryOrder.map((item) => (
                  <NativeSelectOption key={item}>{item}</NativeSelectOption>
                ))}
              </NativeSelect>

              <NativeSelect
                aria-label="Filter by candidate type"
                value={candidate}
                onChange={(event) => setCandidate(event.target.value)}
                className="w-full"
              >
                <NativeSelectOption>All candidates</NativeSelectOption>
                {candidateOrder.map((item) => (
                  <NativeSelectOption key={item}>{item}</NativeSelectOption>
                ))}
              </NativeSelect>

              <NativeSelect
                aria-label="Filter by work mode"
                value={mode}
                onChange={(event) => setMode(event.target.value)}
                className="w-full"
              >
                <NativeSelectOption>All modes</NativeSelectOption>
                {modeOrder.slice(1).map((item) => (
                  <NativeSelectOption key={item}>{item}</NativeSelectOption>
                ))}
              </NativeSelect>

              <NativeSelect
                aria-label="Sort opportunities"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="w-full"
              >
                <NativeSelectOption value="deadline">
                  Deadline first
                </NativeSelectOption>
                <NativeSelectOption value="newest">
                  Newest source
                </NativeSelectOption>
                <NativeSelectOption value="organization">
                  Organization A–Z
                </NativeSelectOption>
              </NativeSelect>

              <Button
                variant="outline"
                size="lg"
                disabled={!hasFilters}
                onClick={clearFilters}
                className="h-10 rounded-[4px] border-[#3a3a3a] bg-transparent px-3 text-[#a4a19b] hover:bg-[#262626] hover:text-[#eee]"
              >
                <X /> Reset
              </Button>
            </div>
          </div>

          {filtered.length ? (
            <>
              <div className="mt-5 hidden border border-[#3a3a3a] md:block">
                <Table className="table-fixed">
                  <TableHeader className="bg-[#323232] [&_tr]:border-[#4a4a4a]">
                    <TableRow className="hover:bg-[#323232]">
                      <TableHead className="w-[31%] px-4 font-mono text-[11px] uppercase tracking-[0.07em] text-[#c9c7c2]">
                        Firm / opportunity
                      </TableHead>
                      <TableHead className="w-[17%] px-4 font-mono text-[11px] uppercase tracking-[0.07em] text-[#c9c7c2]">
                        Track
                      </TableHead>
                      <TableHead className="w-[16%] px-4 font-mono text-[11px] uppercase tracking-[0.07em] text-[#c9c7c2]">
                        Location
                      </TableHead>
                      <TableHead className="w-[15%] px-4 font-mono text-[11px] uppercase tracking-[0.07em] text-[#c9c7c2]">
                        Candidate
                      </TableHead>
                      <TableHead className="w-[13%] px-4 font-mono text-[11px] uppercase tracking-[0.07em] text-[#c9c7c2]">
                        Deadline
                      </TableHead>
                      <TableHead className="w-[8%] px-4 text-right font-mono text-[11px] uppercase tracking-[0.07em] text-[#c9c7c2]">
                        Record
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((item) => (
                      <TableRow
                        key={item.id}
                        className="border-[#3a3a3a] bg-[#1f1f1f] hover:bg-[#262626]"
                      >
                        <TableCell className="whitespace-normal px-4 py-4">
                          <p className="text-xs text-[#8e8b85]">
                            {item.org} · {item.statusLabel}
                          </p>
                          <p className="mt-1 line-clamp-2 text-[15px] font-medium leading-5 text-[#eee]">
                            {item.opportunity}
                          </p>
                        </TableCell>
                        <TableCell className="whitespace-normal px-4 py-4 text-sm leading-5 text-[#bbb8b2]">
                          {item.track}
                        </TableCell>
                        <TableCell className="whitespace-normal px-4 py-4 text-sm leading-5 text-[#bbb8b2]">
                          {item.location}
                          <span className="mt-1 block text-xs text-[#7e7b76]">
                            {item.modeGroup}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-normal px-4 py-4 text-sm leading-5 text-[#bbb8b2]">
                          {item.candidateGroup}
                        </TableCell>
                        <TableCell className="whitespace-normal px-4 py-4">
                          <span
                            className={cn(
                              'font-mono text-xs',
                              deadlineTone(item),
                            )}
                          >
                            {deadlineLabel(item)}
                          </span>
                          {item.deadline ? (
                            <span className="mt-1 block text-xs text-[#7e7b76]">
                              {formatDate(item.deadline)}
                            </span>
                          ) : null}
                        </TableCell>
                        <TableCell className="px-3 py-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-[4px] text-[#a4a19b] hover:bg-[#323232] hover:text-[#eee]"
                            onClick={() => setSelected(item)}
                            aria-label={`View ${item.opportunity} at ${item.org}`}
                          >
                            <ChevronRight />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-5 grid gap-3 md:hidden">
                {filtered.map((item) => (
                  <OpportunityCard
                    key={item.id}
                    item={item}
                    onSelect={setSelected}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-5 grid min-h-[280px] place-items-center border border-[#3a3a3a] bg-[#1f1f1f] p-8 text-center">
              <div>
                <Search className="mx-auto size-5 text-[#7e7b76]" />
                <h3 className="mt-4 text-lg font-medium">
                  No matching records
                </h3>
                <p className="mt-2 text-sm text-[#a4a19b]">
                  Try a broader search or clear the filters.
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-5 rounded-[4px] border-[#3a3a3a] bg-transparent hover:bg-[#262626]"
                >
                  Clear filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-[#3a3a3a] bg-[#111]">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.3fr_.7fr] lg:px-8">
          <div>
            <p className="section-kicker">Separate discovery route</p>
            <h2 className="mt-2 font-display text-3xl font-normal text-[#eee]">
              One portal worth monitoring
            </h2>
            <p className="mt-3 max-w-[66ch] text-[15px] leading-6 text-[#a4a19b]">
              This is intentionally not counted among the 34 opportunities: the
              portal is accessible, but no specific finance role was verified
              within it.
            </p>
          </div>
          {research.resources.map((resource) => (
            <a
              key={resource.id}
              href={resource.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="group border border-[#3a3a3a] bg-[#1f1f1f] p-5 transition-colors hover:bg-[#262626]"
            >
              <div className="flex items-start justify-between gap-4">
                <BookOpen className="size-5 text-[#76aaff]" />
                <ArrowUpRight className="size-4 text-[#7e7b76] transition-colors group-hover:text-[#eee]" />
              </div>
              <p className="mt-8 text-xs text-[#a4a19b]">{resource.org}</p>
              <h3 className="mt-1 text-lg font-medium leading-6 text-[#eee]">
                {resource.opportunity}
              </h3>
            </a>
          ))}
        </div>
      </section>

      <section
        id="methodology"
        className="border-t border-[#3a3a3a] bg-[#181818]"
      >
        <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8 lg:py-16">
          <div>
            <p className="section-kicker">Methodology</p>
            <h2 className="mt-2 font-display text-3xl font-normal text-[#eee]">
              What “verified” means here
            </h2>
          </div>
          <MethodItem
            icon={<Check className="size-4" />}
            number="01"
            title="Accessible route"
            text="The public could reach a role, programme page, attributable hiring post or functioning application route without a campus nomination or private referral."
          />
          <MethodItem
            icon={<CalendarClock className="size-4" />}
            number="02"
            title="Time-stamped evidence"
            text="Every record carries its source type, available publication date, open-evidence note and a verification date of 09 September 2026 in Asia/Kolkata."
          />
          <div className="md:col-start-2">
            <MethodItem
              icon={<MapPin className="size-4" />}
              number="03"
              title="India in scope"
              text="Roles are India-based or explicitly remote from India. Eligibility still varies by degree, graduation year, experience, CA stage and relocation ability."
            />
          </div>
          <MethodItem
            icon={<X className="size-4" />}
            number="04"
            title="Exclusions recorded"
            text={`${research.exclusions.length} stale, filled, campus-only, unverifiable or out-of-scope routes were removed. Open status can change after verification—always recheck.`}
          />
        </div>
      </section>

      <footer className="border-t border-[#3a3a3a] bg-[#111]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-4 py-7 text-sm text-[#7e7b76] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Open Ledger · independent opportunity research</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.07em]">
            Last verified 09 Sep 2026 · Asia/Kolkata
          </p>
        </div>
      </footer>

      <OpportunitySheet item={selected} onClose={() => setSelected(null)} />
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-r border-[#3a3a3a] px-4 py-4 first:border-l sm:px-5">
      <p className="font-display text-3xl font-normal tracking-[-0.03em] text-[#eee]">
        {value}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#7e7b76]">
        {label}
      </p>
    </div>
  );
}

function MethodItem({
  icon,
  number,
  title,
  text,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="border-t border-[#3a3a3a] pt-4">
      <div className="flex items-center justify-between text-[#76aaff]">
        {icon}
        <span className="font-mono text-[11px]">{number}</span>
      </div>
      <h3 className="mt-6 text-base font-medium text-[#eee]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#a4a19b]">{text}</p>
    </article>
  );
}
