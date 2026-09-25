import baseResearch from './research.json';
import privateMarketAdditions from './research-private-additions.json';
import publicFinanceAdditions from './research-public-additions.json';
import refresh from './research-refresh.json';

export type Opportunity = {
  id: string;
  priority: string;
  org: string;
  opportunity: string;
  track: string;
  type: string;
  location: string;
  mode: string;
  deadline: string | null;
  deadlineNote: string;
  timingOverride?: string;
  duration: string;
  comp: string;
  eligibility: string;
  experience: string;
  work: string;
  applyMethod: string;
  evidence: string;
  sourceType: string;
  sourceDate: string | null;
  sourceDateText?: string;
  sourceUrl: string;
  applyUrl: string;
  caveat: string;
  category: string;
  candidateGroup: string;
  modeGroup: string;
  recordKind: string;
  status: string;
  statusLabel: string;
  deadlineKind: string;
  deadlineTimeZone: string;
  deadlineConfidence: string;
  sourceTier: string;
  featured: boolean;
  firstVerifiedAt?: string;
};

const removedIds = new Set<string>(refresh.removedIds);
const updates = refresh.updates as Record<string, Partial<Opportunity>>;

const opportunities = [
  ...baseResearch.opportunities
    .filter((item) => !removedIds.has(item.id))
    .map((item) => ({ ...item, ...updates[item.id] })),
  ...publicFinanceAdditions,
  ...privateMarketAdditions,
  ...refresh.additions,
] as unknown as Opportunity[];

const clearExclusionTitles = new Set<string>(refresh.clearExclusionTitles);
const exclusions = [
  ...baseResearch.exclusions.filter(
    ([title]) => !clearExclusionTitles.has(title),
  ),
  ...refresh.exclusions,
] as string[][];

const resources = [
  ...baseResearch.resources,
  ...refresh.upcomingResources,
] as unknown as Opportunity[];

export const research = {
  ...baseResearch,
  verifiedAt: refresh.verifiedAt,
  opportunities,
  resources,
  exclusions,
  refresh,
};
