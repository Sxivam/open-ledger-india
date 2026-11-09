export const opportunityKinds = [
  'Internship',
  'Apprenticeship',
  'Industrial training',
  'Graduate programme',
  'Entry-level role',
  'Experienced role',
  'Returnship',
  'Scholarship',
  'Fellowship',
  'Competition',
  'Learning programme',
] as const;
export type OpportunityKind = (typeof opportunityKinds)[number];
export type RouteStatus =
  | 'open'
  | 'rolling'
  | 'upcoming'
  | 'watchlist'
  | 'closed';
export type FinanceRoute = {
  id: string;
  org: string;
  title: string;
  kind: OpportunityKind;
  goal?: 'Fund your studies';
  country: 'India';
  location: string;
  format: string;
  careerTracks: string[];
  audience: string[];
  status: RouteStatus;
  deadline: string | null;
  deadlineAt?: string;
  opensOn?: string | null;
  benefit: string;
  duration: string;
  eligibility: string;
  description: string;
  applicationSteps: string;
  sourceUrl: string;
  applyUrl: string;
  evidence: string;
  sourceDate: string | null;
  checkedAt: string;
  caveat: string;
  sourceType?: string;
  sourceDateText?: string | null;
  deadlineNote?: string;
  firstVerifiedAt?: string;
  reopened?: boolean;
};
export const audiences = [
  'Student',
  'Graduate',
  'CA / CMA / CS',
  'Early career',
  'Experienced',
  'Returner',
  'Educator',
  'Anyone',
];
export const lanes = [
  'All opportunities',
  'Work & train',
  'Fund your studies',
  'Learn & compete',
] as const;
export type CatalogueFilters = {
  query: string;
  lane: string;
  kind: string;
  audience: string;
  track: string;
  format: string;
  availability: string;
  sort: string;
  savedOnly: boolean;
  addedSince: string;
};
export const defaultCatalogueFilters: CatalogueFilters = {
  query: '',
  lane: 'All opportunities',
  kind: 'All types',
  audience: 'Everyone',
  track: 'All fields',
  format: 'Any format',
  availability: 'Open now',
  sort: 'deadline',
  savedOnly: false,
  addedSince: '',
};
export function routeLane(item: FinanceRoute) {
  if (item.goal === 'Fund your studies' || item.kind === 'Scholarship')
    return 'Fund your studies';
  if (item.kind === 'Competition' || item.kind === 'Learning programme')
    return 'Learn & compete';
  return 'Work & train';
}
export function statusOnDate(
  item: FinanceRoute,
  today: string,
  now?: number,
): RouteStatus {
  if (item.status === 'watchlist' || item.status === 'closed')
    return item.status;
  if (item.deadlineAt && now !== undefined) {
    if (new Date(item.deadlineAt).getTime() < now) return 'closed';
  } else {
    const indiaDeadline = item.deadlineAt
      ? new Intl.DateTimeFormat('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          timeZone: 'Asia/Kolkata',
        }).format(new Date(item.deadlineAt))
      : item.deadline;
    if (indiaDeadline && indiaDeadline < today) return 'closed';
  }
  if (item.opensOn && item.opensOn > today) return 'upcoming';
  if (item.status === 'upcoming')
    return item.opensOn && item.opensOn <= today ? 'open' : 'upcoming';
  return item.status;
}
export function isAvailable(item: FinanceRoute, today: string, now?: number) {
  return ['open', 'rolling'].includes(statusOnDate(item, today, now));
}
export function filterCatalogue(
  records: FinanceRoute[],
  filters: CatalogueFilters,
  today: string,
  saved: string[] = [],
  now?: number,
) {
  const words = filters.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return records
    .filter((item) => {
      const status = statusOnDate(item, today, now);
      const searchable = [
        item.org,
        item.title,
        item.kind,
        item.location,
        item.format,
        ...item.careerTracks,
        ...item.audience,
        item.eligibility,
      ]
        .join(' ')
        .toLowerCase();
      return (
        status !== 'closed' &&
        words.every((word) => searchable.includes(word)) &&
        (filters.lane === 'All opportunities' ||
          routeLane(item) === filters.lane) &&
        (filters.kind === 'All types' || item.kind === filters.kind) &&
        (filters.audience === 'Everyone' ||
          item.audience.includes(filters.audience) ||
          item.audience.includes('Anyone')) &&
        (filters.track === 'All fields' ||
          item.careerTracks.includes(filters.track)) &&
        (filters.format === 'Any format' || item.format === filters.format) &&
        (filters.availability === 'All researched' ||
          (filters.availability === 'Open now'
            ? isAvailable(item, today, now)
            : ['upcoming', 'watchlist'].includes(status))) &&
        (!filters.savedOnly || saved.includes(item.id)) &&
        (!filters.addedSince ||
          Boolean(
            item.firstVerifiedAt && item.firstVerifiedAt >= filters.addedSince,
          ))
      );
    })
    .sort((a, b) => {
      if (filters.sort === 'organization') return a.org.localeCompare(b.org);
      if (filters.sort === 'newest')
        return (
          (b.firstVerifiedAt ?? b.checkedAt).localeCompare(
            a.firstVerifiedAt ?? a.checkedAt,
          ) ||
          (b.sourceDate ?? '').localeCompare(a.sourceDate ?? '') ||
          a.org.localeCompare(b.org)
        );
      return (
        Number(!isAvailable(a, today, now)) -
          Number(!isAvailable(b, today, now)) ||
        (a.deadline ?? '9999-12-31').localeCompare(
          b.deadline ?? '9999-12-31',
        ) ||
        a.org.localeCompare(b.org)
      );
    });
}
export function dateLabel(date: string | null, year = false) {
  if (!date) return 'Not published';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    ...(year ? { year: 'numeric' } : {}),
    timeZone: 'Asia/Kolkata',
  }).format(new Date(date + 'T12:00:00+05:30'));
}
export function timingLabel(item: FinanceRoute, today: string, now?: number) {
  const status = statusOnDate(item, today, now);
  if (status === 'closed') return 'Window closed';
  if (status === 'watchlist') return 'Check next intake';
  if (status === 'upcoming')
    return item.opensOn
      ? 'Opens ' +
          dateLabel(
            item.opensOn,
            item.opensOn.slice(0, 4) !== today.slice(0, 4),
          )
      : 'Upcoming window';
  if (item.deadlineAt)
    return (
      new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        ...(item.deadlineAt.slice(0, 4) !== today.slice(0, 4)
          ? { year: 'numeric' as const }
          : {}),
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        timeZone: 'Asia/Kolkata',
      }).format(new Date(item.deadlineAt)) + ' IST'
    );
  if (item.deadline === today) return 'Closes today';
  if (item.deadline)
    return (
      'By ' +
      dateLabel(item.deadline, item.deadline.slice(0, 4) !== today.slice(0, 4))
    );
  if (item.kind === 'Learning programme') return 'Self-paced';
  return status === 'rolling' ? 'Ongoing applications' : 'No deadline stated';
}
