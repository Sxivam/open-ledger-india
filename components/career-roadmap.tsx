'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Circle,
  CircleCheck,
  Compass,
  Download,
  GitBranch,
  List,
  Map,
  RotateCcw,
  Search,
  Share2,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { pathways, guideSources, type Pathway } from '@/lib/guide-data';
import { blueprints } from '@/lib/pathway-blueprints';
import {
  activeSteps,
  defaultProgress,
  familyNames,
  progressKey,
  readPathLocation,
  readProgress,
  roadmapSteps,
  type PathProgress,
  type ProgressBook,
  type RoadmapStep,
  type StepState,
} from '@/lib/pathway-model';
import './career-roadmap.css';

const stateLabels: Record<StepState, string> = {
  todo: 'Not started',
  doing: 'In progress',
  done: 'Complete',
};

function StepButton({
  step,
  state,
  onOpen,
  variant = '',
}: {
  step: RoadmapStep;
  state: StepState;
  onOpen: () => void;
  variant?: string;
}) {
  return (
    <button
      type="button"
      className={`rp-node ${variant} rp-state-${state}`}
      onClick={onOpen}
      aria-label={`${step.title} — ${stateLabels[state]}. Open step`}
    >
      <span className="rp-node-meta">
        {step.label}
        {state === 'done' ? (
          <CircleCheck size={16} />
        ) : state === 'doing' ? (
          <span className="rp-doing-dot" />
        ) : (
          <ArrowUpRight size={14} />
        )}
      </span>
      <strong>{step.title}</strong>
      <span className="rp-node-state">
        {stateLabels[state]}{' '}
        <span>
          View actions <ArrowRight size={11} />
        </span>
      </span>
    </button>
  );
}

function StepDetails({
  path,
  step,
  progress,
  onState,
  onCheck,
  onRoute,
  onClose,
}: {
  path: Pathway;
  step: RoadmapStep | null;
  progress: PathProgress;
  onState: (state: StepState) => void;
  onCheck: (index: number) => void;
  onRoute: (id: string) => void;
  onClose: () => void;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sourceIds =
    step?.id === 'credentials'
      ? [...new Set([...path.sources, 'S06', 'S07', 'S11'])]
      : path.sources;
  const sources = guideSources.filter((source) =>
    sourceIds.includes(source.id),
  );
  const selectedRoute = step?.id === 'route-' + progress.route;
  return (
    <Sheet open={Boolean(step)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        initialFocus={titleRef}
        className="rp-sheet gap-0 p-0"
      >
        {step ? (
          <>
            <SheetHeader className="rp-sheet-head">
              <p className="rp-eyebrow">
                {path.shortLabel} /{' '}
                {step.kind === 'optional'
                  ? 'Role-dependent'
                  : step.kind === 'route'
                    ? 'Entry route'
                    : 'Your roadmap'}
              </p>
              <SheetTitle
                ref={titleRef}
                tabIndex={-1}
                className="rp-sheet-title"
              >
                {step.title}
              </SheetTitle>
              <SheetDescription className="rp-sheet-description">
                {step.detail}
              </SheetDescription>
            </SheetHeader>
            <div className="rp-sheet-body">
              {step.kind === 'route' ? (
                <div className="rp-route-decision">
                  <p className="rp-eyebrow">Who this route suits</p>
                  <p>{step.eligibility}</p>
                  <button
                    className="rp-primary"
                    type="button"
                    onClick={() => onRoute(step.id.slice(6))}
                  >
                    {selectedRoute ? (
                      <Check size={16} />
                    ) : (
                      <GitBranch size={16} />
                    )}{' '}
                    {selectedRoute
                      ? 'Your selected route'
                      : 'Use this entry route'}
                  </button>
                  <small>
                    You only need one entry route. Other branches stay available
                    to compare.
                  </small>
                </div>
              ) : null}
              <h3>Put it into practice</h3>
              <p className="rp-small">
                Suggested actions. Check them off as you work.
              </p>
              <div className="rp-task-list">
                {step.tasks.map((task, index) => (
                  <label key={task}>
                    <input
                      type="checkbox"
                      checked={(progress.checks[step.id] ?? []).includes(index)}
                      onChange={() => onCheck(index)}
                    />
                    <span>{task}</span>
                  </label>
                ))}
              </div>
              {step.id === 'practice' ? (
                <div className="rp-proof">
                  <span className="rp-eyebrow">A concrete output</span>
                  <p>{path.proof}</p>
                </div>
              ) : null}
              {step.kind !== 'context' ? (
                <>
                  <h3>Your progress on this step</h3>
                  <fieldset
                    className="rp-state-picker"
                    aria-label="Step progress"
                  >
                    {(['todo', 'doing', 'done'] as StepState[]).map((state) => (
                      <button
                        type="button"
                        key={state}
                        aria-pressed={
                          (progress.states[step.id] ?? 'todo') === state
                        }
                        onClick={() => onState(state)}
                      >
                        {state === 'done' ? (
                          <Check size={14} />
                        ) : state === 'doing' ? (
                          <Circle size={14} />
                        ) : null}
                        {stateLabels[state]}
                      </button>
                    ))}
                  </fieldset>
                  <p className="rp-small">
                    Self-assessed progress, not a qualification or a hiring
                    guarantee.
                  </p>
                </>
              ) : null}
              <details className="rp-step-sources">
                <summary>
                  Sources & hiring examples <span>{sources.length}</span>
                </summary>
                <p className="rp-small">
                  The actions above are editorial practice suggestions. These
                  sources describe qualifications, programmes or employer
                  expectations; a hiring example may no longer be open.
                </p>
                {sources.map((source) => (
                  <a
                    href={source.url}
                    key={source.id}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <strong>
                      {source.organization}
                      <ArrowUpRight size={13} />
                    </strong>
                    <span>{source.title}</span>
                  </a>
                ))}
              </details>
              <div className="rp-reality">
                <span className="rp-eyebrow">
                  Keep the destination in perspective
                </span>
                <p>{path.hardTruth}</p>
              </div>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

export function CareerRoadmap() {
  const [pathId, setPathId] = useState(pathways[0].id);
  const [family, setFamily] = useState('all');
  const [query, setQuery] = useState('');
  const [book, setBook] = useState<ProgressBook>({});
  const [stepId, setStepId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const storageFailed = useRef(false);
  const [view, setView] = useState<'map' | 'list'>('map');
  const [message, setMessage] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const path = pathways.find((entry) => entry.id === pathId) ?? pathways[0];
  const blueprint = blueprints[path.id];
  const progress = book[path.id] ?? defaultProgress(path.id);
  const steps = roadmapSteps(path);
  const coreSteps = activeSteps(path, progress.route);
  const done = coreSteps.filter(
    (step) => progress.states[step.id] === 'done',
  ).length;
  const currentStep = steps.find((step) => step.id === stepId) ?? null;
  const selectedRoute = blueprint.routes.find(
    (route) => route.id === progress.route,
  )!;
  const matches = pathways.filter(
    (item) =>
      (family === 'all' || item.family === family) &&
      `${item.title} ${item.fit} ${item.shortLabel}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    // Read browser-only state after hydration.
    const frame = requestAnimationFrame(() => {
      let saved: ProgressBook = {};
      try {
        saved = readProgress(localStorage.getItem(progressKey), pathways);
      } catch {
        storageFailed.current = true;
        setStorageAvailable(false);
      }
      const location = readPathLocation(window.location.search, pathways);
      if (location.route)
        saved[location.path.id] = {
          ...(saved[location.path.id] ?? defaultProgress(location.path.id)),
          route: location.route,
        };
      setBook(saved);
      setPathId(location.path.id);
      setStepId(location.step);
      setReady(true);
    });
    function restore() {
      const next = readPathLocation(window.location.search, pathways);
      setPathId(next.path.id);
      setStepId(next.step);
      setFamily('all');
      setQuery('');
      if (next.route)
        setBook((previous) => ({
          ...previous,
          [next.path.id]: {
            ...(previous[next.path.id] ?? defaultProgress(next.path.id)),
            route: next.route!,
          },
        }));
    }
    function syncProgress(event: StorageEvent) {
      if (storageFailed.current) return;
      if (event.storageArea === localStorage && event.key === progressKey)
        setBook(readProgress(event.newValue, pathways));
    }
    window.addEventListener('popstate', restore);
    window.addEventListener('storage', syncProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('popstate', restore);
      window.removeEventListener('storage', syncProgress);
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    url.searchParams.set('path', path.id);
    url.searchParams.set('route', progress.route);
    if (stepId) url.searchParams.set('step', stepId);
    else url.searchParams.delete('step');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  }, [path.id, progress.route, stepId, ready]);

  function patchProgress(patch: Partial<PathProgress>, replaceTasks = false) {
    // Merge against the latest saved book so another tab's work is preserved.
    let latest = book;
    try {
      if (!storageFailed.current)
        latest = readProgress(localStorage.getItem(progressKey), pathways);
    } catch {
      storageFailed.current = true;
      setStorageAvailable(false);
    }
    const previous = latest[path.id] ?? defaultProgress(path.id);
    const next = {
      ...latest,
      [path.id]: {
        ...previous,
        route: progress.route,
        ...patch,
        states: replaceTasks ? {} : { ...previous.states, ...patch.states },
        checks: replaceTasks ? {} : { ...previous.checks, ...patch.checks },
      },
    };
    setBook(next);
    try {
      if (!storageFailed.current)
        localStorage.setItem(progressKey, JSON.stringify(next));
    } catch {
      storageFailed.current = true;
      setStorageAvailable(false);
    }
  }
  function selectPath(id: string) {
    if (id !== path.id) {
      const url = new URL(window.location.href);
      url.searchParams.set('path', id);
      url.searchParams.delete('step');
      url.searchParams.delete('route');
      url.hash = 'lanes';
      window.history.pushState(null, '', url.pathname + url.search + url.hash);
    }
    setPathId(id);
    setStepId(null);
    setConfirmReset(false);
    setMessage('');
  }
  function pickFamily(value: string) {
    setFamily(value);
    setQuery('');
    if (value !== 'all' && path.family !== value)
      selectPath(pathways.find((item) => item.family === value)!.id);
  }
  function openStep(id: string) {
    setStepId(id);
    setMessage('');
  }
  function setState(state: StepState) {
    if (currentStep)
      patchProgress({
        states: { [currentStep.id]: state },
      });
  }
  function checkTask(index: number) {
    if (!currentStep) return;
    const checked = progress.checks[currentStep.id] ?? [];
    patchProgress({
      checks: {
        [currentStep.id]: checked.includes(index)
          ? checked.filter((item) => item !== index)
          : [...checked, index],
      },
    });
  }
  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage('Path link copied. Your progress stays private.');
    } catch {
      setMessage('Copy the link from your address bar to share this path.');
    }
  }
  function downloadPlan() {
    const text = [
      `OPEN LEDGER / ${path.title}`,
      `India career pathway · planning guidance`,
      `Entry route: ${selectedRoute.title}`,
      '',
      path.reality,
      'Entry requirements: ' + path.academicSignal,
      'Route eligibility: ' + selectedRoute.eligibility,
      '',
      ...coreSteps.flatMap((step) => [
        step.title,
        step.detail,
        ...step.tasks.map(
          (task, index) =>
            (progress.checks[step.id]?.includes(index) ? '☑ ' : '□ ') + task,
        ),
        '',
      ]),
      'Qualifications: ' + path.usefulCredentials,
      'Reality check: ' + path.hardTruth,
      '',
      'Sources and examples:',
      'Hiring examples may no longer be open. Confirm current requirements with the employer or qualification body.',
      ...guideSources
        .filter((source) => path.sources.includes(source.id))
        .map((source) => `${source.organization}: ${source.url}`),
    ].join('\n');
    const href = URL.createObjectURL(
      new Blob([text], { type: 'text/plain;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = href;
    link.download = `open-ledger-${path.id}-plan.txt`;
    link.click();
    URL.revokeObjectURL(href);
    setMessage('Your selected pathway plan has been downloaded.');
  }
  const renderStep = (id: string, variant = '') => {
    const step = steps.find((item) => item.id === id)!;
    return (
      <StepButton
        step={step}
        state={progress.states[id] ?? 'todo'}
        onOpen={() => openStep(id)}
        variant={variant}
      />
    );
  };

  return (
    <>
      <section className="rp-hero">
        <div className="rp-container rp-hero-grid">
          <div>
            <p className="rp-eyebrow">
              The India finance field guide <span>Edition / 10 Nov 2026</span>
            </p>
            <h1>
              Your next move,
              <br />
              <em>mapped out.</em>
            </h1>
            <p className="rp-hero-copy">
              From a first internship to an investing seat. Explore the skills,
              proof and entry routes behind 14 careers in Indian finance.
            </p>
          </div>
          <aside>
            <div className="rp-mini-map" aria-hidden="true">
              <span>Learn</span>
              <i />
              <span>Build</span>
              <i />
              <span className="rp-mini-branch">Choose your route</span>
              <i />
              <strong>Make your move ↗</strong>
            </div>
            <p>
              A map to work with.
              <br />
              <strong>Not a promise to get hired.</strong>
            </p>
            <a href="#lanes">
              Explore the pathways <ArrowDown size={16} />
            </a>
          </aside>
        </div>
      </section>
      <nav className="rp-subnav rp-container" aria-label="Guide sections">
        <a href="#lanes">
          <GitBranch size={15} />
          Interactive pathways
        </a>
        <a href="#grades">Grades & eligibility</a>
        <a href="#credentials">Credentials</a>
        <a href="#sources">Sources & method</a>
      </nav>
      <section
        id="lanes"
        className="rp-container rp-explorer"
        aria-label="Interactive finance pathways"
      >
        <aside className="rp-picker">
          <p className="rp-eyebrow">
            Choose a destination <span>14</span>
          </p>
          <label className="rp-search">
            <Search size={15} />
            <input
              aria-label="Find a career pathway"
              placeholder="Find a pathway…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <fieldset className="rp-family-filter" aria-label="Career family">
            {[
              ['all', 'All 14'],
              ['vc', 'Venture 3'],
              ['pe', 'Private capital 4'],
              ['finance', 'Finance 7'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={family === value}
                onClick={() => pickFamily(value)}
              >
                {label}
              </button>
            ))}
          </fieldset>
          <nav aria-label="Career pathways">
            {Object.entries(familyNames).map(([key, label]) => {
              const group = matches.filter((item) => item.family === key);
              return group.length ? (
                <div className="rp-path-group" key={key}>
                  <h2>{label}</h2>
                  {group.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-current={path.id === item.id ? 'true' : undefined}
                      onClick={() => selectPath(item.id)}
                    >
                      <span>{item.title}</span>
                      <ChevronRight size={13} />
                    </button>
                  ))}
                </div>
              ) : null;
            })}
            {!matches.length ? (
              <p className="rp-no-paths">
                No matching pathway. Try “research”, “credit” or clear the
                search.
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setFamily('all');
                  }}
                >
                  Show all pathways
                </button>
              </p>
            ) : null}
          </nav>
          <div className="rp-picker-note">
            <Compass size={19} />
            <p>
              Choose by the work you want to do. Similar titles can lead to very
              different careers.
            </p>
          </div>
        </aside>
        <div className="rp-workspace">
          <div className="rp-path-header">
            <p className="rp-eyebrow">
              {familyNames[path.family]} <span>India / career pathway</span>
            </p>
            <h2>{path.title}</h2>
            <p>{path.reality}</p>
            <div className="rp-path-actions">
              <button type="button" onClick={() => openStep('eligibility')}>
                <BookOpen size={15} />
                Entry requirements
              </button>
              <a
                href={`/?track=${encodeURIComponent(blueprint.opportunityTrack)}#opportunities`}
              >
                Explore related openings <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className="rp-progress">
            <div>
              <p>
                <strong>
                  {done} / {coreSteps.length}
                </strong>{' '}
                preparation steps complete
              </p>
              <progress
                className="rp-progress-track"
                aria-label="Preparation progress"
                value={done}
                max={coreSteps.length}
              >
                {done} of {coreSteps.length}
              </progress>
              <small>
                {storageAvailable
                  ? 'Saved on this browser. No account needed.'
                  : 'Storage unavailable. Progress lasts for this visit.'}
              </small>
            </div>
            <button
              className="rp-primary"
              type="button"
              onClick={() =>
                openStep(
                  (
                    coreSteps.find(
                      (step) => progress.states[step.id] !== 'done',
                    ) ?? coreSteps[0]
                  ).id,
                )
              }
            >
              {done === coreSteps.length
                ? 'Review your plan'
                : done
                  ? 'Continue your path'
                  : 'Start your path'}
              <ArrowRight size={15} />
            </button>
          </div>
          <div className="rp-map-toolbar">
            <fieldset aria-label="Pathway view">
              <button
                type="button"
                aria-pressed={view === 'map'}
                onClick={() => setView('map')}
              >
                <Map size={14} />
                Map
              </button>
              <button
                type="button"
                aria-pressed={view === 'list'}
                onClick={() => setView('list')}
              >
                <List size={14} />
                List
              </button>
            </fieldset>
            <div>
              <button type="button" onClick={share}>
                <Share2 size={14} />
                Share
              </button>
              <button type="button" onClick={downloadPlan}>
                <Download size={14} />
                Save plan
              </button>
            </div>
          </div>
          {message ? <output className="rp-feedback">{message}</output> : null}
          <div
            className={`rp-map ${view === 'list' ? 'rp-list-view' : ''}`}
            aria-label={`${path.title} roadmap`}
          >
            <div className="rp-map-legend">
              <span>
                <i />
                Core preparation
              </span>
              <span>
                <i className="optional" />
                Role-dependent
              </span>
              <span>
                <i className="complete" />
                Completed
              </span>
            </div>
            <div className="rp-start">
              <span>You are here</span>
              <p>
                Start with your current skills. Skip ahead only when you can
                show the work.
              </p>
            </div>
            <div className="rp-foundation-row">
              <div className="rp-map-margin-note">
                Click any step
                <br />
                <strong>for actions & evidence.</strong>
              </div>
              {renderStep('foundation')}
              {renderStep('credentials', 'rp-optional')}
            </div>
            <div className="rp-central-row">{renderStep('practice')}</div>
            <div className="rp-branch-section">
              <div className="rp-branch-title">
                <GitBranch size={17} />
                <strong>Choose one entry route</strong>
                <span>Alternatives, not a checklist.</span>
              </div>
              <div className="rp-branches">
                {blueprint.routes.map((route, index) => {
                  const step = steps.find(
                    (item) => item.id === 'route-' + route.id,
                  )!;
                  const chosen = route.id === progress.route;
                  return (
                    <div
                      className={`rp-branch ${chosen ? 'is-chosen' : ''}`}
                      key={route.id}
                    >
                      <button
                        type="button"
                        className="rp-route-node"
                        onClick={() => openStep(step.id)}
                        aria-label={`${route.title}${chosen ? ' — selected route' : ''}. Compare route`}
                      >
                        <span className="rp-node-meta">
                          Route {String.fromCharCode(65 + index)}
                          {chosen ? (
                            <span className="rp-chosen-label">
                              <Check size={11} />
                              Selected
                            </span>
                          ) : (
                            <ArrowUpRight size={13} />
                          )}
                        </span>
                        <strong>{route.title}</strong>
                        <span className="rp-route-fit">
                          {route.eligibility}
                        </span>
                        <span className="rp-node-state">
                          {chosen
                            ? stateLabels[progress.states[step.id] ?? 'todo']
                            : 'Explore this option'}
                          <ArrowRight size={12} />
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="rp-central-row">{renderStep('milestone')}</div>
            <div className="rp-central-row">{renderStep('interview')}</div>
            <div className="rp-destination">
              <span className="rp-eyebrow">Your destination</span>
              <h3>{path.title}</h3>
              <p>{path.hardTruth}</p>
              <a
                href={`/?track=${encodeURIComponent(blueprint.opportunityTrack)}#opportunities`}
              >
                Check opportunities & eligibility <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <div className="rp-map-foot">
            <p>
              <strong>Readiness, not a countdown.</strong> Arrows show a useful
              sequence. Learning and applications can overlap; hiring depends on
              eligibility, evidence and vacancies.
            </p>
            {confirmReset ? (
              <div className="rp-reset-confirm">
                <span>Reset progress for this path?</span>
                <button
                  type="button"
                  onClick={() => {
                    patchProgress({ states: {}, checks: {} }, true);
                    setConfirmReset(false);
                  }}
                >
                  Reset this path
                </button>
                <button type="button" onClick={() => setConfirmReset(false)}>
                  Cancel
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setConfirmReset(true)}>
                <RotateCcw size={12} />
                Reset this path
              </button>
            )}
          </div>
        </div>
      </section>
      <StepDetails
        path={path}
        step={currentStep}
        progress={progress}
        onState={setState}
        onCheck={checkTask}
        onRoute={(id) => patchProgress({ route: id })}
        onClose={() => setStepId(null)}
      />
    </>
  );
}
