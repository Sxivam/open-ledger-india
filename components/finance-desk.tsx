'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  CircleCheck,
  GraduationCap,
  Landmark,
  MapPin,
  Search,
  Share2,
  SlidersHorizontal,
  Trophy,
  X,
} from 'lucide-react';
import { LedgerHeader, LedgerFooter, WisprSection } from './ledger-brand';
import { WisprGate } from './wispr-gate';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import {
  catalogue,
  catalogueCheckedAt,
  catalogueFormats,
  careerFields,
} from '@/lib/catalogue-data';
import {
  audiences,
  dateLabel,
  defaultCatalogueFilters,
  filterCatalogue,
  isAvailable,
  lanes,
  opportunityKinds,
  routeLane,
  statusOnDate,
  timingLabel,
  type CatalogueFilters,
  type FinanceRoute,
} from '@/lib/catalogue-rules';
import './finance-desk.css';

const kindLabels: Record<string, string> = {
  Internship: 'Internships',
  Apprenticeship: 'Apprenticeships',
  'Industrial training': 'CA industrial training',
  'Graduate programme': 'Graduate programmes',
  'Entry-level role': 'Early-career roles',
  'Experienced role': 'Experienced roles',
  Returnship: 'Returnships',
  Scholarship: 'Scholarships & fee aid',
  Fellowship: 'Fellowships & research',
  Competition: 'Competitions',
  'Learning programme': 'Free learning & simulations',
};
const laneIcons = [Landmark, BriefcaseBusiness, GraduationCap, Trophy];
const availabilities = ['Open now', 'Upcoming & watchlist', 'All researched'];
const filterKeys = Object.keys(
  defaultCatalogueFilters,
) as (keyof CatalogueFilters)[];
const options: Record<string, readonly string[]> = {
  lane: lanes,
  kind: ['All types', ...opportunityKinds],
  audience: ['Everyone', ...audiences],
  track: ['All fields', ...careerFields],
  format: ['Any format', ...catalogueFormats],
  availability: availabilities,
  sort: ['deadline', 'newest', 'organization'],
};

function readFilters(params: URLSearchParams): CatalogueFilters {
  const value = { ...defaultCatalogueFilters };
  for (const key of filterKeys) {
    const incoming = params.get(key);
    if (key === 'savedOnly') value.savedOnly = incoming === 'true';
    else if (incoming && (key === 'query' || options[key]?.includes(incoming)))
      value[key] = incoming;
  }
  return value;
}
function routeLabel(item: FinanceRoute, today: string, now?: number) {
  const status = statusOnDate(item, today, now);
  if (status === 'closed') return 'Application window closed';
  if (status === 'upcoming') return 'Upcoming';
  if (status === 'watchlist') return 'Watchlist · not confirmed open';
  if (item.kind === 'Learning programme') return 'Learning · not employment';
  return status === 'rolling' ? 'Ongoing route' : 'Open when checked';
}

function RouteDetails({
  item,
  today,
  now,
  saved,
  onSave,
  onClose,
}: {
  item: FinanceRoute | null;
  today: string;
  now?: number;
  saved: boolean;
  onSave: () => void;
  onClose: () => void;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  return (
    <Sheet open={Boolean(item)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        initialFocus={titleRef}
        className="opportunity-sheet w-[min(620px,96vw)] gap-0 border-[var(--line)] bg-[var(--paper)] p-0 text-[var(--ink)] sm:max-w-[620px]"
      >
        {item ? (
          <>
            <SheetHeader className="record-sheet-header">
              <p className="eyebrow">{item.kind} / India</p>
              <p className="sheet-firm">{item.org}</p>
              <SheetTitle
                ref={titleRef}
                tabIndex={-1}
                className="font-display text-[30px] font-normal leading-[1.2] text-[var(--ink)] outline-none"
              >
                {item.title}
              </SheetTitle>
              <SheetDescription className="mt-3 text-[var(--muted-ink)]">
                {item.location} · {item.format}
              </SheetDescription>
              <span
                className={
                  'desk-status ' +
                  (isAvailable(item, today, now) ? 'is-open' : 'is-upcoming')
                }
              >
                {routeLabel(item, today, now)}
              </span>
            </SheetHeader>
            <div className="record-sheet-body">
              <dl className="record-facts">
                <div>
                  <dt>Application timing</dt>
                  <dd>{timingLabel(item, today, now)}</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd>{item.duration}</dd>
                </div>
                <div className="desk-benefit-fact">
                  <dt>
                    {item.kind === 'Scholarship'
                      ? 'Funding / remaining fee'
                      : 'Pay, benefit or cost'}
                  </dt>
                  <dd>{item.benefit}</dd>
                </div>
              </dl>
              {item.deadlineNote ? (
                <p className="timing-note">{item.deadlineNote}</p>
              ) : null}
              {[
                ['Who can apply', item.eligibility],
                [
                  item.kind === 'Scholarship'
                    ? 'What the support covers'
                    : 'What you will do',
                  item.description,
                ],
                ['Your next step', item.applicationSteps],
                ['What we verified', item.evidence],
              ].map(([label, text]) => (
                <section className="detail-section" key={label}>
                  <h3 className="eyebrow">{label}</h3>
                  <p>{text}</p>
                </section>
              ))}
              {item.caveat ? (
                <section className="verification-note">
                  <h3 className="eyebrow">Before you commit</h3>
                  <p>{item.caveat}</p>
                </section>
              ) : null}
              <section className="source-record">
                <p className="eyebrow">The research trail</p>
                <p>
                  {item.sourceType ??
                    'Official provider or attributable listing'}
                </p>
                <small>
                  Checked {dateLabel(item.checkedAt, true)} · India time
                  <br />
                  {item.sourceDate
                    ? 'Published ' + dateLabel(item.sourceDate, true)
                    : (item.sourceDateText ?? 'Publication date not stated')}
                </small>
                <a
                  className="text-link"
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the original source <ArrowUpRight size={14} />
                </a>
              </section>
            </div>
            <SheetFooter className="record-sheet-footer">
              <a
                className="ledger-button"
                href={item.applyUrl}
                target={item.applyUrl.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                {isAvailable(item, today, now)
                  ? item.kind === 'Learning programme'
                    ? 'Open learning programme'
                    : 'Open application route'
                  : 'Check programme details'}{' '}
                <ArrowUpRight size={15} />
              </a>
              <button
                type="button"
                className="desk-save-detail"
                onClick={onSave}
                aria-pressed={saved}
              >
                <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
                {saved ? 'Saved to shortlist' : 'Save to shortlist'}
              </button>
            </SheetFooter>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

export function FinanceDesk() {
  const [today, setToday] = useState(catalogueCheckedAt);
  const [now, setNow] = useState<number>();
  const [filters, setFilters] = useState<CatalogueFilters>(
    defaultCatalogueFilters,
  );
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<FinanceRoute | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [moreFilters, setMoreFilters] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  useEffect(() => {
    const tick = () => {
      setNow(Date.now());
      setToday(
        new Intl.DateTimeFormat('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          timeZone: 'Asia/Kolkata',
        }).format(new Date()),
      );
    };
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      setFilters(readFilters(params));
      setVisibleCount(12);
      setSelected(
        catalogue.find((item) => item.id === params.get('record')) ?? null,
      );
    };
    const frame = requestAnimationFrame(() => {
      tick();
      restore();
      try {
        const stored: unknown = JSON.parse(
          localStorage.getItem('open-ledger-shortlist') ?? '[]',
        );
        if (Array.isArray(stored))
          setSaved(
            stored.filter(
              (id): id is string =>
                typeof id === 'string' &&
                catalogue.some((item) => item.id === id),
            ),
          );
      } catch {
        /* Storage is optional. */
      }
      setReady(true);
    });
    const timer = window.setInterval(tick, 60_000);
    window.addEventListener('popstate', restore);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(timer);
      window.removeEventListener('popstate', restore);
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem('open-ledger-shortlist', JSON.stringify(saved));
    } catch {
      /* Keep the shortlist for this visit. */
    }
  }, [saved, ready]);
  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    for (const key of filterKeys) {
      if (filters[key] === defaultCatalogueFilters[key])
        url.searchParams.delete(key);
      else url.searchParams.set(key, String(filters[key]));
    }
    if (selected) url.searchParams.set('record', selected.id);
    else url.searchParams.delete('record');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  }, [filters, selected, ready]);
  const available = useMemo(
    () => catalogue.filter((item) => isAvailable(item, today, now)),
    [today, now],
  );
  const planned = useMemo(
    () =>
      catalogue.filter((item) =>
        ['upcoming', 'watchlist'].includes(statusOnDate(item, today, now)),
      ),
    [today, now],
  );
  const filtered = useMemo(
    () => filterCatalogue(catalogue, filters, today, saved, now),
    [filters, today, saved, now],
  );
  const deadlineDesk = useMemo(
    () =>
      available
        .filter((item) => item.deadline)
        .sort((a, b) => a.deadline!.localeCompare(b.deadline!))
        .slice(0, 3),
    [available],
  );
  const nextWindow = planned
    .filter(
      (item) => item.opensOn && statusOnDate(item, today, now) === 'upcoming',
    )
    .sort((a, b) => a.opensOn!.localeCompare(b.opensOn!))[0];
  const sourceCount = new Set(catalogue.map((item) => item.sourceUrl)).size;
  const activeSavedCount = catalogue.filter(
    (item) =>
      saved.includes(item.id) && statusOnDate(item, today, now) !== 'closed',
  ).length;
  const narrowed = filterKeys.some(
    (key) => filters[key] !== defaultCatalogueFilters[key],
  );
  const activeTags = filterKeys.filter(
    (key) => filters[key] !== defaultCatalogueFilters[key] && key !== 'sort',
  );
  function updateFilters(patch: Partial<CatalogueFilters>, jump = false) {
    setFilters((previous) => ({ ...previous, ...patch }));
    setVisibleCount(12);
    setShareMessage('');
    if (jump)
      document
        .getElementById('opportunities')
        ?.scrollIntoView({ behavior: 'smooth' });
  }
  function resetFilters() {
    setFilters({ ...defaultCatalogueFilters });
    setVisibleCount(12);
  }
  function save(id: string) {
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((entry) => entry !== id)
        : [...previous, id],
    );
  }
  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage('Link copied');
    } catch {
      setShareMessage('Copy the URL from your address bar');
    }
  }
  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const afterPaint = () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    async function register() {
      if (!context) return;
      await context.registerTool(
        {
          name: 'set_opportunity_filters',
          title: 'Explore India finance opportunities',
          description:
            'Filter the visible catalogue by opportunity type, work/study/learning goal, audience, finance field, format, status or search.',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string' },
              ...Object.fromEntries(
                Object.entries(options).map(([key, values]) => [
                  key,
                  { type: 'string', enum: values },
                ]),
              ),
            },
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          async execute(input: unknown) {
            if (!input || typeof input !== 'object' || Array.isArray(input))
              throw new Error('Provide a filter object.');
            const next = { ...defaultCatalogueFilters };
            for (const [key, value] of Object.entries(input)) {
              if (
                key === 'savedOnly' ||
                !filterKeys.includes(key as keyof CatalogueFilters) ||
                typeof value !== 'string' ||
                (key !== 'query' && !options[key]?.includes(value))
              )
                throw new Error('Unknown filter: ' + key);
              Object.assign(next, { [key]: value });
            }
            setFilters(next);
            setVisibleCount(12);
            await afterPaint();
            const matches = filterCatalogue(catalogue, next, today, [], now);
            return {
              count: matches.length,
              records: matches.map((item) => ({
                id: item.id,
                title: item.title,
                kind: item.kind,
                status: statusOnDate(item, today, now),
              })),
            };
          },
        },
        { signal: lifecycle.signal },
      );
      await context.registerTool(
        {
          name: 'open_opportunity_record',
          title: 'Read opportunity requirements and sources',
          description:
            'Open an India finance record with its status, eligibility, benefits and original source. Does not submit an application.',
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
            const item = catalogue.find(
              (entry) =>
                entry.id === id && statusOnDate(entry, today, now) !== 'closed',
            );
            if (!item) throw new Error('No current record for this ID.');
            setSelected(item);
            await afterPaint();
            return {
              id: item.id,
              country: item.country,
              title: item.title,
              kind: item.kind,
              status: statusOnDate(item, today, now),
              source: item.sourceUrl,
            };
          },
        },
        { signal: lifecycle.signal },
      );
    }
    void register().catch((error) => {
      if (!lifecycle.signal.aborted)
        console.warn('Catalogue tools unavailable.', error);
    });
    return () => lifecycle.abort();
  }, [today, now]);

  return (
    <div className="finance-desk">
      <LedgerHeader />
      <main id="main">
        <section className="desk-masthead">
          <div className="ledger-container desk-edition">
            <span>
              <i /> INDIA OPPORTUNITY INTELLIGENCE
            </span>
            <span>
              RESEARCH EDITION /{' '}
              {dateLabel(catalogueCheckedAt, true).toUpperCase()}
            </span>
          </div>
          <div className="ledger-container desk-hero-grid">
            <div className="desk-hero-copy">
              <p className="eyebrow">Open Ledger / By Shivam Meet</p>
              <h1>
                Your future in finance.
                <br />
                <em>Find your opening.</em>
              </h1>
              <p>
                From your first internship to funding your CFA. Discover finance
                careers, scholarships and practical experience in India—with the
                details that matter before you apply.
              </p>
              <div className="hero-actions">
                <a className="ledger-button" href="#opportunities">
                  Explore opportunities <ArrowDown size={16} />
                </a>
                <Link className="desk-guide-link" href="/guide">
                  How to break in <ArrowUpRight size={15} />
                </Link>
              </div>
              <div className="desk-trust">
                <CircleCheck size={14} />
                <span>Original sources</span>
                <span>India only</span>
                <span>Clear eligibility</span>
              </div>
            </div>
            <aside className="desk-brief" aria-label="Opportunity desk brief">
              <div className="desk-brief-top">
                <span>THE OPPORTUNITY DESK</span>
                <span>IN / 01</span>
              </div>
              <div className="desk-big-number">
                <strong>{available.length}</strong>
                <span>
                  routes available now
                  <br />
                  <small>Work · funding · learning</small>
                </span>
              </div>
              <div
                className="desk-allocation"
                aria-label="Current opportunity coverage"
              >
                {lanes.slice(1).map((lane) => {
                  const count = available.filter(
                    (item) => routeLane(item) === lane,
                  ).length;
                  return (
                    <button
                      key={lane}
                      type="button"
                      onClick={() =>
                        updateFilters(
                          { ...defaultCatalogueFilters, lane },
                          true,
                        )
                      }
                    >
                      <span>{lane}</span>
                      <i>
                        <b
                          style={{
                            width:
                              (available.length
                                ? (count / available.length) * 100
                                : 0) + '%',
                          }}
                        />
                      </i>
                      <strong>{count}</strong>
                      <ArrowUpRight size={13} />
                    </button>
                  );
                })}
              </div>
              <div className="desk-brief-bottom">
                <span>
                  {
                    opportunityKinds.filter((kind) =>
                      catalogue.some((item) => item.kind === kind),
                    ).length
                  }{' '}
                  opportunity types
                </span>
                <span>{planned.length} upcoming / watchlist</span>
              </div>
            </aside>
          </div>
          <nav
            className="ledger-container desk-lane-nav"
            aria-label="Explore by goal"
          >
            {lanes.map((lane, index) => {
              const Icon = laneIcons[index];
              return (
                <a
                  key={lane}
                  href="#opportunities"
                  onClick={() =>
                    updateFilters({ ...defaultCatalogueFilters, lane })
                  }
                >
                  <Icon size={17} />
                  <span>{lane}</span>
                  <ArrowUpRight size={13} />
                </a>
              );
            })}
          </nav>
        </section>
        <section className="ledger-container desk-start">
          <p>
            <span className="eyebrow">START WITH YOU</span>A few useful starting
            points.
          </p>
          <div>
            {[
              'Student',
              'Graduate',
              'CA / CMA / CS',
              'Early career',
              'Returner',
            ].map((audience) => (
              <button
                key={audience}
                type="button"
                onClick={() =>
                  updateFilters({ ...defaultCatalogueFilters, audience }, true)
                }
              >
                {audience}
                <ArrowUpRight size={12} />
              </button>
            ))}
          </div>
        </section>
        {nextWindow ? (
          <div className="ledger-container desk-next-window">
            <CalendarDays size={19} />
            <p>
              <strong>
                Coming up: {nextWindow.org} · {nextWindow.title}
              </strong>
              <span>
                {timingLabel(nextWindow, today, now)}. Check the eligibility and
                prepare before the window opens.
              </span>
            </p>
            <button type="button" onClick={() => setSelected(nextWindow)}>
              See details <ArrowRight size={15} />
            </button>
          </div>
        ) : null}
        <section
          id="opportunities"
          className="ledger-container desk-explorer"
          aria-labelledby="explorer-title"
        >
          <div className="desk-section-heading">
            <div>
              <p className="eyebrow">The full ledger</p>
              <h2 id="explorer-title">
                One desk. <em>More ways in.</em>
              </h2>
            </div>
            <p>
              Choose the opportunity. Check your fit.
              <br />
              Go straight to the source.
            </p>
          </div>
          <fieldset className="desk-tabs" aria-label="Opportunity goal">
            {lanes.map((lane) => (
              <button
                key={lane}
                type="button"
                aria-pressed={filters.lane === lane}
                onClick={() => updateFilters({ lane, kind: 'All types' })}
              >
                {lane}
                <span>
                  {
                    available.filter(
                      (item) =>
                        lane === 'All opportunities' ||
                        routeLane(item) === lane,
                    ).length
                  }
                </span>
              </button>
            ))}
          </fieldset>
          <div className="desk-explorer-grid">
            <aside className="desk-type-nav" aria-label="Opportunity types">
              <p className="eyebrow">OPPORTUNITY TYPE</p>
              <button
                type="button"
                aria-pressed={filters.kind === 'All types'}
                onClick={() => updateFilters({ kind: 'All types' })}
              >
                All types{' '}
                <span>
                  {
                    available.filter(
                      (item) =>
                        filters.lane === 'All opportunities' ||
                        routeLane(item) === filters.lane,
                    ).length
                  }
                </span>
              </button>
              {opportunityKinds
                .filter(
                  (kind) =>
                    filters.lane === 'All opportunities' ||
                    catalogue.some(
                      (item) =>
                        item.kind === kind && routeLane(item) === filters.lane,
                    ),
                )
                .map((kind) => (
                  <button
                    type="button"
                    key={kind}
                    aria-pressed={filters.kind === kind}
                    onClick={() => updateFilters({ kind })}
                  >
                    {kindLabels[kind]}
                    <span>
                      {
                        available.filter(
                          (item) =>
                            item.kind === kind &&
                            (filters.lane === 'All opportunities' ||
                              routeLane(item) === filters.lane),
                        ).length
                      }
                    </span>
                  </button>
                ))}
              <div className="desk-sidebar-note">
                <CircleCheck size={17} />
                <strong>Know what you’re opening.</strong>
                <p>
                  Jobs, funding and learning have different outcomes. Every
                  record says which it is.
                </p>
                <a href="#methodology">
                  Our research standards <ArrowUpRight size={12} />
                </a>
              </div>
            </aside>
            <div className="desk-results">
              <div className="desk-filter-box">
                <div className="desk-search-row">
                  <label className="desk-search">
                    <Search size={18} />
                    <span className="sr-only">Search opportunities</span>
                    <input
                      placeholder="Search finance, CFA, a firm or a city…"
                      value={filters.query}
                      onChange={(event) =>
                        updateFilters({ query: event.target.value })
                      }
                    />
                    {filters.query ? (
                      <button
                        type="button"
                        aria-label="Clear search"
                        onClick={() => updateFilters({ query: '' })}
                      >
                        <X size={15} />
                      </button>
                    ) : null}
                  </label>
                  <button
                    className="desk-more-filters"
                    type="button"
                    aria-expanded={moreFilters}
                    aria-controls="desk-extra-filters"
                    onClick={() => setMoreFilters(!moreFilters)}
                  >
                    <SlidersHorizontal size={16} />
                    Filters
                    {filters.track !== 'All fields' ||
                    filters.format !== 'Any format' ? (
                      <i />
                    ) : null}
                  </button>
                </div>
                <div className="desk-filter-selects">
                  <label className="desk-mobile-type">
                    <span>Opportunity type</span>
                    <select
                      aria-label="Filter by opportunity type"
                      value={filters.kind}
                      onChange={(event) =>
                        updateFilters({
                          kind: event.target.value,
                          lane: 'All opportunities',
                        })
                      }
                    >
                      <option>All types</option>
                      {opportunityKinds.map((kind) => (
                        <option key={kind} value={kind}>
                          {kindLabels[kind]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>I am a</span>
                    <select
                      aria-label="Filter by candidate type"
                      value={filters.audience}
                      onChange={(event) =>
                        updateFilters({ audience: event.target.value })
                      }
                    >
                      {['Everyone', ...audiences].map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Application status</span>
                    <select
                      aria-label="Filter by application status"
                      value={filters.availability}
                      onChange={(event) =>
                        updateFilters({ availability: event.target.value })
                      }
                    >
                      {availabilities.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Sort by</span>
                    <select
                      aria-label="Sort opportunities"
                      value={filters.sort}
                      onChange={(event) =>
                        updateFilters({ sort: event.target.value })
                      }
                    >
                      <option value="deadline">Closing soonest</option>
                      <option value="newest">Recently researched</option>
                      <option value="organization">Organisation A–Z</option>
                    </select>
                  </label>
                </div>
                {moreFilters ? (
                  <div id="desk-extra-filters" className="desk-extra-filters">
                    <label>
                      <span>Finance field</span>
                      <select
                        aria-label="Filter by finance field"
                        value={filters.track}
                        onChange={(event) =>
                          updateFilters({ track: event.target.value })
                        }
                      >
                        {['All fields', ...careerFields].map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>Work / learning format</span>
                      <select
                        aria-label="Filter by format"
                        value={filters.format}
                        onChange={(event) =>
                          updateFilters({ format: event.target.value })
                        }
                      >
                        {['Any format', ...catalogueFormats].map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                ) : null}
              </div>
              <div className="desk-results-toolbar">
                <output aria-live="polite">
                  <strong>{filtered.length}</strong>{' '}
                  {filters.availability === 'Open now'
                    ? 'available now'
                    : 'matching routes'}
                  {filters.kind !== 'All types'
                    ? ' · ' + kindLabels[filters.kind]
                    : ''}
                </output>
                <div>
                  <button
                    type="button"
                    aria-pressed={filters.savedOnly}
                    onClick={() =>
                      updateFilters({ savedOnly: !filters.savedOnly })
                    }
                  >
                    <Bookmark
                      size={14}
                      fill={filters.savedOnly ? 'currentColor' : 'none'}
                    />{' '}
                    Shortlist <span>{activeSavedCount}</span>
                  </button>
                  <button
                    type="button"
                    onClick={share}
                    aria-label="Copy a link to these filters"
                  >
                    <Share2 size={14} />
                    <span className="desk-share-label">Share view</span>
                  </button>
                </div>
              </div>
              {shareMessage ? (
                <output className="desk-feedback">{shareMessage}</output>
              ) : null}
              {narrowed ? (
                <div className="desk-filter-tags">
                  {activeTags.map((key) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() =>
                        updateFilters({ [key]: defaultCatalogueFilters[key] })
                      }
                      aria-label={
                        'Remove filter ' +
                        (key === 'savedOnly' ? 'shortlist' : filters[key])
                      }
                    >
                      {key === 'savedOnly' ? 'Shortlist' : filters[key]}{' '}
                      <X size={11} />
                    </button>
                  ))}
                  <button
                    type="button"
                    className="desk-clear"
                    onClick={resetFilters}
                  >
                    Reset all
                  </button>
                </div>
              ) : null}
              {filters.availability !== 'Open now' ? (
                <p className="desk-status-explainer">
                  Upcoming has an announced window. Watchlist means we could not
                  confirm a current intake. Neither is counted as open today.
                </p>
              ) : null}
              <div className="opportunity-list desk-opportunity-list">
                {filtered.slice(0, visibleCount).map((item) => (
                  <article
                    className={
                      'desk-route ' +
                      (isAvailable(item, today, now)
                        ? ''
                        : 'desk-route-planned')
                    }
                    key={item.id}
                    data-record-id={item.id}
                  >
                    <div className="desk-route-top">
                      <span className="desk-kind">{item.kind}</span>
                      <span
                        className={
                          'desk-status ' +
                          (isAvailable(item, today, now)
                            ? 'is-open'
                            : 'is-upcoming')
                        }
                      >
                        {routeLabel(item, today, now)}
                      </span>
                      <button
                        type="button"
                        className="desk-bookmark"
                        aria-label={
                          (saved.includes(item.id) ? 'Unsave ' : 'Save ') +
                          item.title +
                          ' at ' +
                          item.org
                        }
                        aria-pressed={saved.includes(item.id)}
                        onClick={() => save(item.id)}
                      >
                        <Bookmark
                          size={17}
                          fill={
                            saved.includes(item.id) ? 'currentColor' : 'none'
                          }
                        />
                      </button>
                    </div>
                    <div className="desk-route-heading">
                      <div>
                        <p className="desk-org">{item.org}</p>
                        <h3>
                          <button
                            type="button"
                            onClick={() => setSelected(item)}
                          >
                            {item.title}
                          </button>
                        </h3>
                      </div>
                      <span className="desk-timing">
                        <CalendarDays size={13} />
                        {timingLabel(item, today, now)}
                      </span>
                    </div>
                    <div className="desk-route-meta">
                      <span>
                        <MapPin size={13} />
                        {item.location}
                      </span>
                      <span>{item.format}</span>
                      <span>{item.audience.join(' / ')}</span>
                    </div>
                    <p className="desk-route-summary">{item.description}</p>
                    <div className="desk-route-bottom">
                      <p>
                        <span>
                          {item.kind === 'Scholarship'
                            ? 'FUNDING / FEE'
                            : item.kind === 'Learning programme'
                              ? 'LEARNING COST'
                              : 'PAY / BENEFIT'}
                        </span>
                        {item.benefit}
                      </p>
                      <button
                        type="button"
                        className="desk-details-button"
                        onClick={() => setSelected(item)}
                      >
                        Check eligibility <ArrowUpRight size={15} />
                      </button>
                    </div>
                    <div className="desk-route-source">
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Original source <ArrowUpRight size={11} />
                      </a>
                      <span>Checked {dateLabel(item.checkedAt)}</span>
                    </div>
                  </article>
                ))}
                {!filtered.length ? (
                  <div className="desk-empty">
                    <Search size={25} />
                    <h3>
                      {filters.savedOnly
                        ? 'Your shortlist is waiting.'
                        : 'No exact match yet.'}
                    </h3>
                    <p>
                      {filters.savedOnly
                        ? 'Save a record with its bookmark, then return here. Your shortlist stays on this device.'
                        : 'Try fewer filters, another finance field or check upcoming windows.'}
                    </p>
                    <button
                      type="button"
                      className="ledger-button"
                      onClick={resetFilters}
                    >
                      Explore all opportunities <ArrowRight size={15} />
                    </button>
                  </div>
                ) : null}
              </div>
              {visibleCount < filtered.length ? (
                <button
                  type="button"
                  className="desk-load-more"
                  onClick={() => setVisibleCount((count) => count + 12)}
                >
                  Show {Math.min(12, filtered.length - visibleCount)} more
                  opportunities <ChevronDown size={16} />
                  <small>
                    {visibleCount} of {filtered.length} shown
                  </small>
                </button>
              ) : null}
              <p className="desk-endnote">
                Checked {dateLabel(catalogueCheckedAt, true)}. Openings may
                close after checking. Confirm the original source before
                applying. Shortlists are saved on this device.
              </p>
            </div>
          </div>
        </section>
        <section className="desk-deadlines">
          <div className="ledger-container">
            <div className="desk-section-heading">
              <div>
                <p className="eyebrow">The deadline desk</p>
                <h2>
                  Worth your attention. <em>Soon.</em>
                </h2>
              </div>
              <CalendarDays size={27} />
            </div>
            <div className="desk-deadline-grid">
              {deadlineDesk.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelected(item)}
                >
                  <span>
                    {timingLabel(item, today, now)}
                    <ArrowUpRight size={16} />
                  </span>
                  <small>
                    {item.kind} / {item.org}
                  </small>
                  <strong>{item.title}</strong>
                  <p>{item.location}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="ledger-container desk-guide">
          <div>
            <p className="eyebrow">The India break-in guide</p>
            <h2>
              A listing opens a door.
              <br />
              <em>A plan gets you through.</em>
            </h2>
            <p>
              Grades, certifications, realistic entry routes and the proof of
              work that matters in VC, private equity and finance.
            </p>
            <Link className="ledger-button" href="/guide">
              Build your route into finance <ArrowRight size={15} />
            </Link>
          </div>
          <ol>
            <li>
              <span>01</span>
              <p>
                <strong>Choose the work.</strong>Understand investing, deals,
                markets, risk and corporate finance.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                <strong>Know the entry requirements.</strong>Separate published
                criteria from common hiring preferences.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                <strong>Make your application concrete.</strong>A model, sector
                memo or research note beats a vague statement of interest.
              </p>
            </li>
          </ol>
        </section>
        <WisprSection />
        <section id="methodology" className="ledger-container desk-methodology">
          <div className="desk-section-heading">
            <div>
              <p className="eyebrow">A researched collection</p>
              <h2>
                Read the evidence.
                <br />
                <em>Then make your move.</em>
              </h2>
            </div>
            <p>
              {sourceCount} source links across the current collection.
              <br />
              Research checked {dateLabel(catalogueCheckedAt, true)}.
            </p>
          </div>
          <div className="standards-grid">
            {[
              [
                '01',
                'India is the scope',
                'Work and in-person programmes are based in India. Global online scholarships and learning are included only where candidates in India can participate.',
              ],
              [
                '02',
                'Every type is labelled',
                'A scholarship may reduce an exam fee rather than pay cash. A simulation is practice, not an internship or an offer of employment. Benefits and costs stay visible.',
              ],
              [
                '03',
                'Eligibility comes first',
                'Degree, experience, CA stage, residence and institution nomination requirements are recorded. Public information does not mean unrestricted eligibility.',
              ],
              [
                '04',
                'Windows stay honest',
                'Known expired deadlines leave the results. Future windows and unconfirmed intakes sit in Upcoming & watchlist. Undated roles remain a checked snapshot.',
              ],
            ].map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <p className="desk-research-limit">
            We research across employers, professional bodies, regulators and
            programme providers. This collection cannot guarantee every vacancy
            in the market or a successful application. Original sources control
            the final terms.
          </p>
        </section>
        <WisprGate count={available.length} />
      </main>
      <LedgerFooter />
      <RouteDetails
        item={selected}
        today={today}
        now={now}
        saved={selected ? saved.includes(selected.id) : false}
        onSave={() => selected && save(selected.id)}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
