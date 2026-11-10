import type { Pathway } from './guide-data';
import { blueprints } from './pathway-blueprints';

export type StepState = 'todo' | 'doing' | 'done';
export type RoadmapStep = {
  id: string;
  title: string;
  detail: string;
  tasks: string[];
  kind: 'core' | 'route' | 'optional' | 'context';
  label: string;
  eligibility?: string;
};
export type PathProgress = {
  route: string;
  states: Record<string, StepState>;
  checks: Record<string, number[]>;
};
export type ProgressBook = Record<string, PathProgress>;
export const progressKey = 'open-ledger-pathways-v1';
export const familyNames = {
  vc: 'Venture capital',
  pe: 'Private capital',
  finance: 'Finance',
};

export function roadmapSteps(path: Pathway): RoadmapStep[] {
  const blueprint = blueprints[path.id];
  return [
    {
      id: 'eligibility',
      title: 'Check your starting point',
      detail: path.academicSignal,
      tasks: [
        'Read the degree, graduation-year and experience criteria of three relevant India vacancies.',
        'Record any explicit marks, exam or training-stage requirements; do not substitute a general internet cutoff.',
        'Choose an entry route you can actually apply to and identify any missing requirement.',
      ],
      kind: 'context',
      label: 'Before you begin',
    },
    {
      id: 'foundation',
      ...blueprint.foundation,
      kind: 'core',
      label: '01 · Learn the work',
    },
    {
      id: 'practice',
      ...blueprint.practice,
      kind: 'core',
      label: '02 · Build your proof',
    },
    ...blueprint.routes.map((route) => ({
      ...route,
      id: 'route-' + route.id,
      kind: 'route' as const,
      label: '03 · An alternative entry route',
    })),
    {
      id: 'milestone',
      ...blueprint.milestone,
      kind: 'core',
      label: '04 · Build relevant evidence',
    },
    {
      id: 'interview',
      title: 'Defend your work in an interview',
      detail: path.hiringTest,
      tasks: [
        'Practise the assessment described here using your own work, with every assumption visible.',
        'Ask someone to challenge your analysis; revise the weakest part and record the change.',
        'Prepare examples of a mistake, a trade-off and a decision you would make differently.',
      ],
      kind: 'core',
      label: '05 · Test your readiness',
    },
    {
      id: 'credentials',
      title: 'Choose credentials deliberately',
      detail: path.usefulCredentials,
      tasks: [
        'Separate a legally or employer-required qualification from a preferred credential.',
        'Check eligibility, cost and experience requirements on the official programme page.',
        'Study only what addresses your chosen role; turn the learning into a work sample.',
      ],
      kind: 'optional',
      label: 'Role-dependent · not a universal gate',
    },
  ];
}
export function activeSteps(path: Pathway, route: string) {
  return roadmapSteps(path).filter(
    (step) => step.kind === 'core' || step.id === 'route-' + route,
  );
}
export function defaultProgress(pathId: string): PathProgress {
  return { route: blueprints[pathId].routes[0].id, states: {}, checks: {} };
}
export function readProgress(
  raw: string | null,
  paths: Pathway[],
): ProgressBook {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))
      return {};
    const clean: ProgressBook = {};
    for (const path of paths) {
      const entry = (parsed as Record<string, unknown>)[path.id];
      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) continue;
      const saved = entry as Partial<PathProgress>;
      const result = defaultProgress(path.id);
      if (blueprints[path.id].routes.some((route) => route.id === saved.route))
        result.route = saved.route!;
      for (const step of roadmapSteps(path)) {
        const state = saved.states?.[step.id];
        if (['todo', 'doing', 'done'].includes(state ?? ''))
          result.states[step.id] = state!;
        const checks = saved.checks?.[step.id];
        if (Array.isArray(checks))
          result.checks[step.id] = [
            ...new Set(
              checks.filter(
                (index) =>
                  Number.isInteger(index) &&
                  index >= 0 &&
                  index < step.tasks.length,
              ),
            ),
          ];
      }
      clean[path.id] = result;
    }
    return clean;
  } catch {
    return {};
  }
}
export function readPathLocation(search: string, paths: Pathway[]) {
  const params = new URLSearchParams(search);
  const path = paths.find((item) => item.id === params.get('path')) ?? paths[0];
  const route = blueprints[path.id].routes.find(
    (item) => item.id === params.get('route'),
  )?.id;
  const step =
    roadmapSteps(path).find((item) => item.id === params.get('step'))?.id ??
    null;
  return { path, route, step };
}
