'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  Check,
  ChevronRight,
  CircleCheck,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  LedgerFooter,
  LedgerHeader,
  WisprSection,
} from '@/components/ledger-brand';
import { research, type Opportunity } from '@/lib/research-data';
import { cn } from '@/lib/utils';

const previousUpdate = research.previousVerifiedAt;
const reopenedIds = new Set(research.refresh.reopenedIds);
const categories = [
  'Venture & private markets',
  'Banking & markets',
  'Finance & valuation',
  'Public policy & finance',
  'Returnship',
];
const categoryNames: Record<string, string> = {
  'Venture & private markets': 'VC & private capital',
  'Banking & markets': 'Banking & markets',
  'Finance & valuation': 'Finance & valuation',
  'Public policy & finance': 'Public finance',
  Returnship: 'Returnships',
};
const candidates = [
  'Student',
  'CA pathway',
  'Fresher / 0–1 yr',
  'Early career',
  'Experienced / specialist',
  'Returner',
  'Not stated',
];
const modes = ['In person', 'Hybrid', 'Remote', 'Not stated'];
type Filters = {
  query: string;
  category: string;
  candidate: string;
  mode: string;
  sort: string;
  newOnly: boolean;
};
const defaultFilters: Filters = {
  query: '',
  category: 'All tracks',
  candidate: 'All candidates',
  mode: 'All modes',
  sort: 'deadline',
  newOnly: false,
};

function formatDate(date: string | null, year = false) {
  if (!date) return 'No fixed date';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    ...(year ? { year: 'numeric' } : {}),
    timeZone: 'Asia/Kolkata',
  }).format(new Date(date + 'T12:00:00+05:30'));
}
function indiaToday() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}
function isNew(item: Opportunity) {
  return (
    reopenedIds.has(item.id) ||
    Boolean(item.firstVerifiedAt && item.firstVerifiedAt > previousUpdate)
  );
}
function daysUntil(date: string | null, today: string) {
  if (!date) return null;
  return Math.round(
    (new Date(date + 'T12:00:00+05:30').getTime() -
      new Date(today + 'T12:00:00+05:30').getTime()) /
      86400000,
  );
}
function timing(item: Opportunity, today: string) {
  const days = daysUntil(item.deadline, today);
  if (days === 0) return 'Closes today';
  if (days === 1) return '1 day left';
  if (days !== null && days > 1 && days <= 14) return days + ' days left';
  if (item.deadline) return formatDate(item.deadline);
  if (item.deadlineKind === 'relative') return 'Apply soon';
  if (item.deadlineKind === 'rolling') return 'Rolling';
  return 'No date stated';
}
function openOnDate(item: Opportunity, today: string, now: number | null) {
  if (item.deadlineAt && now !== null)
    return new Date(item.deadlineAt).getTime() >= now;
  return !item.deadline || item.deadline >= today;
}
function sortRecords(records: Opportunity[], sort: string) {
  return [...records].sort((a, b) => {
    if (sort === 'organization') return a.org.localeCompare(b.org);
    if (sort === 'newest')
      return (b.sourceDate ?? b.firstVerifiedAt ?? '').localeCompare(
        a.sourceDate ?? a.firstVerifiedAt ?? '',
      );
    return (
      (a.deadline ?? '9999-12-31').localeCompare(b.deadline ?? '9999-12-31') ||
      Number(isNew(b)) - Number(isNew(a)) ||
      a.org.localeCompare(b.org)
    );
  });
}
function matchRecords(records: Opportunity[], filters: Filters) {
  const query = filters.query.trim().toLowerCase();
  return sortRecords(
    records.filter(
      (item) =>
        (!query ||
          [
            item.org,
            item.opportunity,
            item.track,
            item.location,
            item.eligibility,
            item.type,
          ]
            .join(' ')
            .toLowerCase()
            .includes(query)) &&
        (filters.category === 'All tracks' ||
          item.category === filters.category) &&
        (filters.candidate === 'All candidates' ||
          item.candidateGroup === filters.candidate ||
          item.candidateGroups?.includes(filters.candidate)) &&
        (filters.mode === 'All modes' || item.modeGroup === filters.mode) &&
        (!filters.newOnly || isNew(item)),
    ),
    filters.sort,
  );
}

function RecordSheet({
  item,
  today,
  onClose,
}: {
  item: Opportunity | null;
  today: string;
  onClose: () => void;
}) {
  return (
    <Sheet open={Boolean(item)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="opportunity-sheet w-[min(600px,96vw)] gap-0 border-[var(--line)] bg-[var(--paper)] p-0 text-[var(--ink)] sm:max-w-[600px]"
      >
        {item ? (
          <>
            <SheetHeader className="record-sheet-header">
              <p className="eyebrow">
                {item.id} · {item.sourceTier}
              </p>
              <p className="sheet-firm">{item.org}</p>
              <SheetTitle className="font-display text-[30px] font-normal leading-[1.2] text-[var(--ink)]">
                {item.opportunity}
              </SheetTitle>
              <SheetDescription className="mt-3 text-[var(--muted-ink)]">
                {item.location} · {item.type}
              </SheetDescription>
              <div className="sheet-badges">
                <span className="status-badge">
                  <CircleCheck size={12} /> Open when checked
                </span>
                {isNew(item) ? (
                  <span className="new-badge">
                    {reopenedIds.has(item.id)
                      ? 'Window reopened'
                      : 'Added this update'}
                  </span>
                ) : null}
              </div>
            </SheetHeader>
            <div className="record-sheet-body">
              <dl className="record-facts">
                <div>
                  <dt>Application timing</dt>
                  <dd>{timing(item, today)}</dd>
                </div>
                <div>
                  <dt>Working arrangement</dt>
                  <dd>{item.mode}</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd>{item.duration}</dd>
                </div>
                <div>
                  <dt>Compensation</dt>
                  <dd>{item.comp}</dd>
                </div>
              </dl>
              <p className="timing-note">{item.deadlineNote}</p>
              {[
                ['Who can apply', item.eligibility],
                ['Experience needed', item.experience],
                ['The work', item.work],
                ['How to apply', item.applyMethod],
                ['Evidence of an open route', item.evidence],
              ].map(([label, text]) => (
                <section className="detail-section" key={label}>
                  <h3 className="eyebrow">{label}</h3>
                  <p>{text}</p>
                </section>
              ))}
              {item.caveat ? (
                <section className="verification-note">
                  <h3 className="eyebrow">Read before applying</h3>
                  <p>{item.caveat}</p>
                </section>
              ) : null}
              <section className="source-record">
                <p className="eyebrow">Source record</p>
                <p>{item.sourceType}</p>
                <small>
                  {item.sourceDate ? 'Published: ' : 'Date evidence: '}
                  {item.sourceDate
                    ? formatDate(item.sourceDate, true)
                    : (item.sourceDateText ?? 'Date not published')}
                  <br />
                  Checked{' '}
                  {formatDate(
                    item.lastVerifiedAt ?? research.verifiedAt,
                    true,
                  )}{' '}
                  · India time
                </small>
                <a
                  className="text-link"
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inspect the source <ArrowUpRight size={14} />
                </a>
              </section>
              <a className="drawer-flow-note" href="#wispr" onClick={onClose}>
                Draft a sharper application with Wispr Flow{' '}
                <ArrowRight size={14} />
              </a>
            </div>
            <SheetFooter className="record-sheet-footer">
              <a
                className="ledger-button"
                href={item.applyUrl}
                target={item.applyUrl.startsWith('http') ? '_blank' : undefined}
                rel={
                  item.applyUrl.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
              >
                {item.applyUrl.startsWith('mailto:')
                  ? 'Email to apply'
                  : 'Open application'}
                <ArrowUpRight size={16} />
              </a>
              <a
                className="ledger-button secondary-button"
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify source <ArrowUpRight size={14} />
              </a>
            </SheetFooter>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

export default function Home() {
  const [today, setToday] = useState(research.verifiedAt);
  const [now, setNow] = useState<number | null>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      setToday(indiaToday());
      setNow(Date.now());
    };
    const interval = window.setInterval(updateClock, 60_000);
    // Read browser-only preferences after hydration; never overwrite storage first.
    const frame = requestAnimationFrame(() => {
      updateClock();
      try {
        const stored: unknown = JSON.parse(
          localStorage.getItem('open-ledger-shortlist') ?? '[]',
        );
        if (Array.isArray(stored))
          setSaved(stored.filter((id): id is string => typeof id === 'string'));
      } catch {
        /* The ledger remains usable if local storage is unavailable. */
      }
      setStorageReady(true);
    });
    return () => {
      window.clearInterval(interval);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!storageReady) return;
    try {
      localStorage.setItem('open-ledger-shortlist', JSON.stringify(saved));
    } catch {
      /* Shortlisting still works for this visit. */
    }
  }, [saved, storageReady]);

  const liveRecords = useMemo(
    () => research.opportunities.filter((item) => openOnDate(item, today, now)),
    [today, now],
  );
  const newRecords = useMemo(() => liveRecords.filter(isNew), [liveRecords]);
  const datedCount = liveRecords.filter((item) => item.deadline).length;
  const filtered = useMemo(
    () =>
      matchRecords(
        savedOnly
          ? liveRecords.filter((item) => saved.includes(item.id))
          : liveRecords,
        filters,
      ),
    [liveRecords, filters, saved, savedOnly],
  );
  const deadlineDesk = useMemo(
    () =>
      sortRecords(
        liveRecords.filter((item) => item.deadline),
        'deadline',
      ).slice(0, 3),
    [liveRecords],
  );
  const previewRecords = useMemo(() => {
    const latest = sortRecords(
      newRecords.length ? newRecords : liveRecords,
      'deadline',
    );
    const acrossTracks = [
      'Venture & private markets',
      'Finance & valuation',
      'Banking & markets',
    ]
      .map(
        (category) =>
          latest.find((item) => item.category === category && item.featured) ??
          latest.find((item) => item.category === category),
      )
      .filter((item): item is Opportunity => Boolean(item));
    return acrossTracks.length ? acrossTracks : latest.slice(0, 3);
  }, [newRecords, liveRecords]);
  const activeSaved = saved.filter((id) =>
    liveRecords.some((item) => item.id === id),
  );
  const hasFilters =
    filters.query ||
    filters.category !== 'All tracks' ||
    filters.candidate !== 'All candidates' ||
    filters.mode !== 'All modes' ||
    filters.newOnly ||
    savedOnly;

  function changeFilter<Key extends keyof Filters>(
    key: Key,
    value: Filters[Key],
  ) {
    setFilters((current) => ({ ...current, [key]: value }));
  }
  function toggleSaved(id: string) {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((recordId) => recordId !== id)
        : [...current, id],
    );
  }
  function resetFilters() {
    setFilters(defaultFilters);
    setSavedOnly(false);
  }

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const nextPaint = () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    async function register() {
      if (!context) return;
      await context.registerTool(
        {
          name: 'set_opportunity_filters',
          title: 'Filter finance opportunities',
          description:
            'Set the visible Open Ledger search, category, candidate, work mode, new-only and sort filters.',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string' },
              category: { type: 'string', enum: ['All tracks', ...categories] },
              candidate: {
                type: 'string',
                enum: ['All candidates', ...candidates],
              },
              mode: { type: 'string', enum: ['All modes', ...modes] },
              sort: {
                type: 'string',
                enum: ['deadline', 'newest', 'organization'],
              },
              newOnly: { type: 'boolean' },
            },
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          async execute(input: unknown) {
            if (!input || typeof input !== 'object' || Array.isArray(input))
              throw new Error('Filters must be an object.');
            const values = input as Record<string, unknown>;
            const next = { ...defaultFilters };
            for (const key of [
              'query',
              'category',
              'candidate',
              'mode',
              'sort',
            ] as const) {
              if (values[key] !== undefined) {
                if (typeof values[key] !== 'string')
                  throw new Error(key + ' must be a string.');
                next[key] = values[key] as string;
              }
            }
            if (values.newOnly !== undefined) {
              if (typeof values.newOnly !== 'boolean')
                throw new Error('newOnly must be a boolean.');
              next.newOnly = values.newOnly;
            }
            if (
              !['All tracks', ...categories].includes(next.category) ||
              !['All candidates', ...candidates].includes(next.candidate) ||
              !['All modes', ...modes].includes(next.mode) ||
              !['deadline', 'newest', 'organization'].includes(next.sort)
            )
              throw new Error('Unknown filter option.');
            const matches = matchRecords(liveRecords, next);
            setFilters(next);
            setSavedOnly(false);
            await nextPaint();
            return {
              count: matches.length,
              recordIds: matches.map((item) => item.id),
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
            'Open the source, eligibility and application details of a visible Open Ledger record.',
          inputSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          async execute(input: unknown) {
            const id =
              input && typeof input === 'object'
                ? (input as Record<string, unknown>).id
                : null;
            if (typeof id !== 'string')
              throw new Error('A record id is required.');
            const item = liveRecords.find((record) => record.id === id);
            if (!item) throw new Error('No live opportunity found for ' + id);
            setSelected(item);
            await nextPaint();
            return {
              id,
              organization: item.org,
              opportunity: item.opportunity,
              deadline: item.deadline,
            };
          },
        },
        { signal: lifecycle.signal },
      );
    }
    void register().catch((error) => {
      if (!lifecycle.signal.aborted)
        console.warn('[WebMCP] Registration unavailable.', error);
    });
    return () => lifecycle.abort();
  }, [liveRecords]);

  return (
    <div className="ledger-home">
      <LedgerHeader />
      <main id="main">
        <section className="ledger-hero">
          <div className="ledger-container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="live-dot" /> India’s finance opportunity desk
              </p>
              <h1>
                Your next move
                <br />
                in <em>finance.</em>
              </h1>
              <p>
                Venture capital. Private equity. Banking. The openings worth
                your attention, with the evidence to apply well.
              </p>
              <div className="hero-actions">
                <a className="ledger-button" href="#opportunities">
                  Explore the ledger <ArrowRight size={17} />
                </a>
                <Link className="text-link" href="/guide">
                  Find your entry route <ArrowUpRight size={15} />
                </Link>
              </div>
              <div className="hero-byline">
                <span className="byline-mark">sm.</span>
                <span>
                  Curated by <strong>Shivam Meet</strong>
                  <small>
                    Public applications · Clear eligibility · Original sources
                  </small>
                </span>
              </div>
            </div>
            <div className="hero-ledger">
              <div className="issue-top">
                <span>OPEN LEDGER</span>
                <span>No. 03 / October 2026</span>
              </div>
              <div className="issue-title">
                <span>The opportunity</span>
                <em>brief.</em>
                <p>Checked {formatDate(research.verifiedAt, true)}</p>
              </div>
              <div className="issue-rule" />
              <div className="issue-records">
                {previewRecords.map((item, index) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setSelected(item)}
                  >
                    <span className="issue-index">0{index + 1}</span>
                    <span>
                      <strong>{item.org}</strong>
                      <small>{item.opportunity}</small>
                    </span>
                    <ArrowUpRight size={17} />
                  </button>
                ))}
              </div>
              <div className="issue-bottom">
                <span>
                  <i /> {liveRecords.length} open routes
                </span>
                <span>{newRecords.length} added this edition</span>
              </div>
              <div className="paper-tab">RESEARCHED. READY TO EXPLORE.</div>
            </div>
          </div>
        </section>

        <section className="ledger-stats">
          <div className="ledger-container stats-grid">
            {[
              [liveRecords.length, 'Open opportunities'],
              [newRecords.length, 'Added this update'],
              [datedCount, 'Published deadlines'],
              [categories.length, 'Finance career tracks'],
            ].map(([number, label]) => (
              <div key={label}>
                <strong>{number}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ledger-container update-note">
          <CircleCheck size={18} />
          <p>
            <strong>Refreshed {formatDate(research.verifiedAt, true)}.</strong>{' '}
            New openings since {formatDate(previousUpdate)}, with older listings
            rechecked. Each record includes its source and the conditions that
            matter.
          </p>
          <a href="#methodology">
            How we check <ArrowRight size={13} />
          </a>
        </section>

        {deadlineDesk.length ? (
          <section className="ledger-container deadline-section">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">The deadline desk</p>
                <h2 className="editorial-heading">Make the first move.</h2>
              </div>
              <p>
                Start with the windows closing soonest.
                <br />
                Deadlines follow India time.
              </p>
            </div>
            <div className="deadline-grid">
              {deadlineDesk.map((item, index) => (
                <article key={item.id} className="deadline-card">
                  <div className="deadline-card-top">
                    <span>0{index + 1}</span>
                    <span
                      className={
                        daysUntil(item.deadline, today)! <= 7
                          ? 'deadline-urgent'
                          : ''
                      }
                    >
                      <CalendarDays size={12} />
                      {timing(item, today)}
                    </span>
                  </div>
                  <p className="card-firm">{item.org}</p>
                  <h3>{item.opportunity}</h3>
                  <div className="deadline-card-bottom">
                    <span>
                      {item.candidateGroup}
                      <small>{item.location}</small>
                    </span>
                    <button
                      className="round-arrow"
                      type="button"
                      aria-label={
                        'Review ' + item.opportunity + ' at ' + item.org
                      }
                      onClick={() => setSelected(item)}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section id="opportunities" className="opportunities-section">
          <div className="ledger-container">
            <div className="section-heading-row ledger-heading">
              <div>
                <p className="eyebrow">The full ledger</p>
                <h2 className="editorial-heading">Find your opening.</h2>
              </div>
              <div className="ledger-heading-note">
                <p>
                  Choose the work you want to do. <br />
                  Then check the requirements.
                </p>
                <span>
                  {filtered.length} of {liveRecords.length} opportunities
                </span>
              </div>
            </div>
            <fieldset
              className="track-tabs"
              aria-label="Filter by finance track"
            >
              {['All tracks', ...categories].map((category) => (
                <button
                  type="button"
                  key={category}
                  aria-pressed={filters.category === category}
                  onClick={() => changeFilter('category', category)}
                >
                  {category === 'All tracks'
                    ? 'All opportunities'
                    : categoryNames[category]}
                  <span>
                    {category === 'All tracks'
                      ? liveRecords.length
                      : liveRecords.filter((item) => item.category === category)
                          .length}
                  </span>
                </button>
              ))}
            </fieldset>
            <div className="ledger-filter-panel">
              <div className="filter-main">
                <label className="search-box">
                  <Search size={17} />
                  <span className="sr-only">Search opportunities</span>
                  <input
                    value={filters.query}
                    onChange={(event) =>
                      changeFilter('query', event.target.value)
                    }
                    placeholder="Search a firm, role or city…"
                  />
                </label>
                <label className="filter-select">
                  <span>Candidate</span>
                  <select
                    aria-label="Filter by candidate type"
                    value={filters.candidate}
                    onChange={(event) =>
                      changeFilter('candidate', event.target.value)
                    }
                  >
                    <option>All candidates</option>
                    {candidates.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="filter-select">
                  <span>Format</span>
                  <select
                    aria-label="Filter by work mode"
                    value={filters.mode}
                    onChange={(event) =>
                      changeFilter('mode', event.target.value)
                    }
                  >
                    <option>All modes</option>
                    {modes.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="filter-select">
                  <span>Sort by</span>
                  <select
                    aria-label="Sort opportunities"
                    value={filters.sort}
                    onChange={(event) =>
                      changeFilter('sort', event.target.value)
                    }
                  >
                    <option value="deadline">Closing soonest</option>
                    <option value="newest">Newest source</option>
                    <option value="organization">Firm A–Z</option>
                  </select>
                </label>
              </div>
              <div className="filter-secondary">
                <label className="check-filter">
                  <input
                    type="checkbox"
                    checked={filters.newOnly}
                    onChange={(event) =>
                      changeFilter('newOnly', event.target.checked)
                    }
                  />
                  Added since {formatDate(previousUpdate)}
                  <span>{newRecords.length}</span>
                </label>
                <button
                  className={cn('shortlist-filter', savedOnly && 'selected')}
                  aria-pressed={savedOnly}
                  type="button"
                  onClick={() => setSavedOnly((current) => !current)}
                >
                  <Bookmark size={13} />
                  My shortlist <span>{activeSaved.length}</span>
                </button>
                {hasFilters ? (
                  <button
                    className="reset-filters"
                    type="button"
                    onClick={resetFilters}
                  >
                    <X size={13} />
                    Clear filters
                  </button>
                ) : (
                  <span className="filter-tip">
                    <SlidersHorizontal size={12} />
                    Public access; eligibility varies.
                  </span>
                )}
              </div>
            </div>
            <p className="results-count" aria-live="polite">
              {filtered.length}{' '}
              {filtered.length === 1 ? 'opportunity' : 'opportunities'}
              {filters.newOnly ? ' added in this refresh' : ''}
              {savedOnly ? ' in your shortlist' : ''}
            </p>

            {filtered.length ? (
              <div className="opportunity-list">
                <div className="list-column-head">
                  <span>Firm & opportunity</span>
                  <span>Work & location</span>
                  <span>Who it’s for</span>
                  <span>Timing</span>
                  <span>Details</span>
                </div>
                {filtered.map((item) => (
                  <article className="opportunity-row" key={item.id}>
                    <div className="opportunity-main">
                      <div className="firm-line">
                        <span>{item.org}</span>
                        {isNew(item) ? (
                          <span className="new-badge">
                            {reopenedIds.has(item.id) ? 'Reopened' : 'New'}
                          </span>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        className="opportunity-title"
                        onClick={() => setSelected(item)}
                      >
                        {item.opportunity}
                      </button>
                      <span className="record-type">{item.type}</span>
                    </div>
                    <div className="row-location">
                      <p>{item.track}</p>
                      <span>{item.location}</span>
                      <small>{item.modeGroup}</small>
                    </div>
                    <div className="row-candidate">
                      <span className="candidate-badge">
                        {item.candidateGroup}
                      </span>
                      <small>
                        {item.comp === 'Not stated'
                          ? 'Pay not published'
                          : item.comp}
                      </small>
                    </div>
                    <div className="row-timing">
                      <span
                        className={
                          daysUntil(item.deadline, today) !== null &&
                          daysUntil(item.deadline, today)! <= 7
                            ? 'deadline-urgent'
                            : ''
                        }
                      >
                        {timing(item, today)}
                      </span>
                      {item.deadline &&
                      daysUntil(item.deadline, today)! <= 14 ? (
                        <small>{formatDate(item.deadline, true)}</small>
                      ) : null}
                      <small>{item.sourceTier}</small>
                    </div>
                    <div className="row-actions">
                      <button
                        className={cn(
                          'save-record',
                          saved.includes(item.id) && 'saved',
                        )}
                        type="button"
                        aria-pressed={saved.includes(item.id)}
                        aria-label={
                          (saved.includes(item.id) ? 'Unsave ' : 'Save ') +
                          item.opportunity +
                          ' at ' +
                          item.org
                        }
                        onClick={() => toggleSaved(item.id)}
                      >
                        <Bookmark
                          size={16}
                          fill={
                            saved.includes(item.id) ? 'currentColor' : 'none'
                          }
                        />
                      </button>
                      <button
                        className="record-arrow"
                        type="button"
                        aria-label={
                          'View ' + item.opportunity + ' at ' + item.org
                        }
                        onClick={() => setSelected(item)}
                      >
                        <ChevronRight size={19} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-ledger">
                <Search size={24} />
                <h3>
                  {savedOnly
                    ? 'Your shortlist is ready to build.'
                    : 'No openings match this combination.'}
                </h3>
                <p>
                  {savedOnly
                    ? 'Save an opportunity using the bookmark beside its record.'
                    : 'Try a different track or widen your search.'}
                </p>
                <button
                  className="ledger-button secondary-button"
                  type="button"
                  onClick={resetFilters}
                >
                  See all opportunities <ArrowRight size={14} />
                </button>
              </div>
            )}
            <p className="ledger-bottom-note">
              <Check size={13} /> Sources checked{' '}
              {formatDate(research.verifiedAt, true)}. A listing can close after
              verification; inspect the source before applying.
              <span>Shortlist saved on this device.</span>
            </p>
          </div>
        </section>

        <section className="guide-promo">
          <div className="ledger-container guide-promo-grid">
            <div>
              <p className="eyebrow">The India break-in guide</p>
              <h2 className="editorial-heading">
                An opening is one thing.
                <br />
                <em>A route in is another.</em>
              </h2>
              <p>
                Grades, credentials, feeder roles and realistic timelines.
                Understand how hiring actually works in venture capital, private
                equity and the wider finance market.
              </p>
              <Link className="ledger-button" href="/guide">
                Find your route <ArrowRight size={16} />
              </Link>
            </div>
            <div className="guide-route-preview">
              <div>
                <span>01</span>
                <strong>Choose your lane</strong>
                <small>VC · private capital · finance</small>
              </div>
              <div>
                <span>02</span>
                <strong>Build the right proof</strong>
                <small>A model, memo or sector map</small>
              </div>
              <div>
                <span>03</span>
                <strong>Take the credible first seat</strong>
                <small>Then move on the strength of your work</small>
              </div>
            </div>
          </div>
        </section>

        {research.resources.length ? (
          <section className="ledger-container discovery-section">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">Beyond today’s ledger</p>
                <h2 className="editorial-heading">Keep these on your radar.</h2>
              </div>
              <p>
                Discovery portals and future windows.
                <br />
                Separate from the open opportunity count.
              </p>
            </div>
            <div className="resource-grid">
              {research.resources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="eyebrow">{resource.statusLabel}</span>
                  <ArrowUpRight size={16} />
                  <h3>{resource.org}</h3>
                  <p>{resource.opportunity}</p>
                  <small>{resource.deadlineNote}</small>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <WisprSection />

        <section
          id="methodology"
          className="ledger-container methodology-section"
        >
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Our research standards</p>
              <h2 className="editorial-heading">
                Trust the source.
                <br />
                <em>Read the fine print.</em>
              </h2>
            </div>
            <p>
              This is a curated snapshot, checked on
              <br />
              {formatDate(research.verifiedAt, true)} in India time.
            </p>
          </div>
          <div className="standards-grid">
            {[
              [
                '01',
                'A public route',
                'An employer page, a public programme or a hiring post attributable to the company. A referral or private campus nomination is not required to reach it.',
              ],
              [
                '02',
                'A visible source',
                'Each record shows where it came from, when the available listing was published and what established an open application route. Relative dates and reposts are flagged.',
              ],
              [
                '03',
                'Honest eligibility',
                'Degree, graduation year, CA stage and experience requirements stay visible. An analyst title does not automatically mean a fresher can apply.',
              ],
              [
                '04',
                'Closed means removed',
                'Expired and filled listings leave the active ledger. Recurring programmes enter only during their application window. Dated openings disappear after the published day.',
              ],
            ].map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <LedgerFooter />
      <RecordSheet
        item={selected}
        today={today}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
