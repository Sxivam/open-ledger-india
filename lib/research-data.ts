import baseResearch from './research.json';
import privateMarketAdditions from './research-private-additions.json';
import publicFinanceAdditions from './research-public-additions.json';
import refresh from './research-refresh.json';
import privateAudit from './october-private-audit.json';
import financeAudit from './october-finance-audit.json';
import bankingAudit from './october-banking-audit.json';
import novemberPrivateAudit from './november-private-audit.json';
import novemberFinanceAudit from './november-finance-audit.json';
import novemberBankingAudit from './november-banking-audit.json';
import regionalResearch from './november-regional-additions.json';

export type Opportunity = {
  id: string;
  priority: string;
  org: string;
  opportunity: string;
  track: string;
  type: string;
  location: string;
  country?: string;
  mode: string;
  deadline: string | null;
  deadlineAt?: string;
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
  sourceDateText?: string | null;
  sourceUrl: string;
  applyUrl: string;
  caveat: string;
  category: string;
  candidateGroup: string;
  candidateGroups?: string[];
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
  lastVerifiedAt?: string;
};

const removedIds = new Set<string>(refresh.removedIds);
const updates = refresh.updates as Record<string, Partial<Opportunity>>;

const previousOpportunities = [
  ...baseResearch.opportunities
    .filter((item) => !removedIds.has(item.id))
    .map((item) => ({ ...item, ...updates[item.id] })),
  ...publicFinanceAdditions,
  ...privateMarketAdditions,
  ...refresh.additions,
] as unknown as Opportunity[];

type Audit = {
  verifiedAt: string;
  verifiedIds: string[];
  removals: Array<{ id: string; reason: string; sourceUrl: string }>;
  updates: Record<string, Partial<Opportunity>>;
  additions: Opportunity[];
  exclusions: Array<{
    title: string;
    reason: string;
    detail: string;
    url: string;
  }>;
  resourceUpdates?: Record<string, Partial<Opportunity>>;
  promoteResourceIds?: string[];
  reopenedIds?: string[];
};

const audits = [privateAudit, financeAudit, bankingAudit] as unknown as Audit[];
const verifiedAt = '2026-10-10';
const currentRemovedIds = new Set(
  audits.flatMap((audit) => audit.removals.map((item) => item.id)),
);
const verifiedIds = new Set(audits.flatMap((audit) => audit.verifiedIds));
const currentUpdates = Object.assign(
  {},
  ...audits.map((audit) => audit.updates),
) as Record<string, Partial<Opportunity>>;
const unaudited = previousOpportunities.filter(
  (item) => !verifiedIds.has(item.id) && !currentRemovedIds.has(item.id),
);
if (unaudited.length)
  throw new Error(
    'Refresh is missing an audit for: ' +
      unaudited.map((item) => item.id).join(', '),
  );

const previousResources = [
  ...baseResearch.resources,
  ...refresh.upcomingResources,
] as unknown as Opportunity[];
const resourceUpdates = Object.assign(
  {},
  ...audits.map((audit) => audit.resourceUpdates ?? {}),
) as Record<string, Partial<Opportunity>>;
const promoteResourceIds = new Set(
  audits.flatMap((audit) => audit.promoteResourceIds ?? []),
);
const updatedResources = previousResources.map((item) => ({
  ...item,
  ...resourceUpdates[item.id],
}));

const opportunities = [
  ...previousOpportunities
    .filter((item) => !currentRemovedIds.has(item.id))
    .map((item) => ({
      ...item,
      ...currentUpdates[item.id],
      lastVerifiedAt: verifiedAt,
    })),
  ...audits.flatMap((audit) => audit.additions),
  ...updatedResources.filter((item) => promoteResourceIds.has(item.id)),
].filter((item) => !item.deadline || item.deadline >= verifiedAt);

const clearExclusionTitles = new Set<string>(refresh.clearExclusionTitles);
const exclusions = [
  ...baseResearch.exclusions.filter(
    ([title]) => !clearExclusionTitles.has(title),
  ),
  ...refresh.exclusions,
  ...audits.flatMap((audit) =>
    audit.exclusions.map((item) => [
      item.title,
      item.reason,
      item.detail,
      item.url,
    ]),
  ),
  ...audits.flatMap((audit) =>
    audit.removals.map((item) => {
      const previous = previousOpportunities.find(
        (record) => record.id === item.id,
      );
      return [
        previous ? previous.org + ' — ' + previous.opportunity : item.id,
        'Removed in October refresh',
        item.reason,
        item.sourceUrl,
      ];
    }),
  ),
] as string[][];

const resources = updatedResources.filter(
  (item) => !promoteResourceIds.has(item.id),
);

const novemberAudits = [
  novemberPrivateAudit,
  novemberFinanceAudit,
  novemberBankingAudit,
] as unknown as Audit[];
const novemberVerifiedAt = '2026-11-02';
const novemberRemovedIds = new Set(
  novemberAudits.flatMap((audit) => audit.removals.map((item) => item.id)),
);
const novemberVerifiedIds = new Set(
  novemberAudits.flatMap((audit) => audit.verifiedIds),
);
const missingNovemberAudit = opportunities.filter(
  (item) =>
    !novemberRemovedIds.has(item.id) && !novemberVerifiedIds.has(item.id),
);
if (missingNovemberAudit.length)
  throw new Error(
    'November audit missing: ' +
      missingNovemberAudit.map((item) => item.id).join(', '),
  );
const novemberUpdates = Object.assign(
  {},
  ...novemberAudits.map((audit) => audit.updates),
) as Record<string, Partial<Opportunity>>;
const novemberAdditions = [
  ...novemberAudits.flatMap((audit) => audit.additions),
  ...regionalResearch.additions,
] as Opportunity[];
const novemberResourceUpdates = Object.assign(
  {},
  ...novemberAudits.map((audit) => audit.resourceUpdates ?? {}),
) as Record<string, Partial<Opportunity>>;
const novemberPromotions = new Set(
  novemberAudits.flatMap((audit) => audit.promoteResourceIds ?? []),
);
const novemberResources = resources.map((item) => ({
  ...item,
  ...novemberResourceUpdates[item.id],
}));
const novemberOpportunities = [
  ...opportunities
    .filter((item) => novemberVerifiedIds.has(item.id))
    .map((item) => ({
      ...item,
      ...novemberUpdates[item.id],
      lastVerifiedAt: novemberVerifiedAt,
    })),
  ...novemberAdditions,
  ...novemberResources.filter((item) => novemberPromotions.has(item.id)),
]
  .map((item) => ({ ...item, country: item.country ?? 'India' }))
  .filter((item) => !item.deadline || item.deadline >= novemberVerifiedAt);
const novemberReopenedIds = [
  ...new Set([
    ...novemberAudits.flatMap((audit) => audit.reopenedIds ?? []),
    ...novemberPromotions,
  ]),
];
const novemberExclusions = [
  ...novemberAudits.flatMap((audit) => audit.exclusions),
  ...regionalResearch.exclusions,
].map((item) => [item.title, item.reason, item.detail, item.url]);

export const research = {
  ...baseResearch,
  verifiedAt: novemberVerifiedAt,
  previousVerifiedAt: verifiedAt,
  scope:
    'Publicly accessible finance opportunities across India and neighbouring South Asian markets; country-specific eligibility applies.',
  opportunities: novemberOpportunities,
  resources: novemberResources.filter(
    (item) => !novemberPromotions.has(item.id),
  ),
  exclusions: [...exclusions, ...novemberExclusions],
  regionalCoverage: [
    {
      country: 'India',
      summary:
        'Existing Indian listings were re-audited, expired and unverified routes removed, and newly surfaced employer/decision-maker postings added. Programmes are included only within a verified current window.',
      sourceUrls: [] as string[],
    },
    ...regionalResearch.coverage,
  ],
  refresh: {
    verifiedAt: novemberVerifiedAt,
    previousVerifiedAt: verifiedAt,
    removedIds: [...novemberRemovedIds],
    addedIds: novemberAdditions.map((item) => item.id),
    reopenedIds: novemberReopenedIds,
  },
};

/** Size of the open ledger at each published refresh, oldest first. */
export const editions = [
  { date: baseResearch.verifiedAt, count: baseResearch.opportunities.length },
  { date: refresh.verifiedAt, count: previousOpportunities.length },
  { date: verifiedAt, count: opportunities.length },
  { date: novemberVerifiedAt, count: novemberOpportunities.length },
];
