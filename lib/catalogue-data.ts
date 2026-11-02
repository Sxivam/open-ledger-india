import { research, type Opportunity } from './research-data';
import scholarships from './deep-scholarships.json';
import programmes from './deep-programmes.json';
import openings from './deep-openings.json';
import {
  opportunityKinds,
  type FinanceRoute,
  type OpportunityKind,
} from './catalogue-rules';

const candidateMap: Record<string, string> = {
  Student: 'Student',
  'CA pathway': 'CA / CMA / CS',
  'Fresher / 0–1 yr': 'Graduate',
  'Early career': 'Early career',
  'Experienced / specialist': 'Experienced',
  Returner: 'Returner',
  'Not stated': 'Eligibility not stated',
};
export const catalogueCheckedAt = '2026-11-02';
function kindFor(item: Opportunity): OpportunityKind {
  if (/returnship/i.test(item.type)) return 'Returnship';
  if (/apprentic/i.test(item.type)) return 'Apprenticeship';
  if (/industrial|CA.*train/i.test(item.type)) return 'Industrial training';
  if (/fellow/i.test(item.type)) return 'Fellowship';
  if (/internship/i.test(item.type)) return 'Internship';
  if (/programme|program/i.test(item.type)) return 'Graduate programme';
  return item.candidateGroup === 'Experienced / specialist'
    ? 'Experienced role'
    : 'Entry-level role';
}
function tracksFor(item: Opportunity): string[] {
  const text = (item.track + ' ' + item.opportunity).toLowerCase();
  if (/investment banking|capital markets|m&a/.test(text))
    return ['Investment banking'];
  if (/venture|private|secondaries|investments|fund operations/.test(text))
    return ['VC & private capital'];
  if (
    /government|public|central bank|competition policy|policy research/.test(
      text,
    )
  )
    return ['Public finance'];
  if (/accounting|audit|tax|controllership/.test(text))
    return ['Accounting & tax'];
  if (/valuation|research/.test(text)) return ['Investment research'];
  if (/risk|actuar/.test(text)) return ['Risk & actuarial'];
  if (/bank|markets|settlement|trade|mutual fund/.test(text))
    return ['Banking & markets'];
  return ['Corporate finance'];
}
const originalRoutes: FinanceRoute[] = research.opportunities.map((item) => ({
  id: item.id,
  org: item.org,
  title: item.opportunity,
  kind: kindFor(item),
  country: 'India',
  location: item.location,
  format: item.modeGroup,
  careerTracks: tracksFor(item),
  audience: (item.candidateGroups ?? [item.candidateGroup]).map(
    (group) => candidateMap[group] ?? group,
  ),
  status: item.deadlineKind === 'rolling' ? 'rolling' : 'open',
  deadline: item.deadline,
  deadlineAt: item.deadlineAt,
  benefit: item.comp,
  duration: item.duration,
  eligibility: item.eligibility + ' ' + item.experience,
  description: item.work,
  applicationSteps: item.applyMethod,
  sourceUrl: item.sourceUrl,
  applyUrl: item.applyUrl,
  evidence: item.evidence,
  sourceDate: item.sourceDate,
  sourceDateText: item.sourceDateText,
  checkedAt: item.lastVerifiedAt ?? research.verifiedAt,
  caveat: item.caveat,
  sourceType: item.sourceType,
  deadlineNote: item.deadlineNote,
  firstVerifiedAt: item.firstVerifiedAt,
  reopened: research.refresh.reopenedIds.includes(item.id),
}));

export const deepBatches = [scholarships, programmes, openings];
const researchedRoutes = deepBatches
  .flatMap((batch) => batch.records as unknown as FinanceRoute[])
  .map((item) => ({
    ...item,
    format: [
      'On-site',
      'In person',
      'On campus, full-time doctoral research',
      'Full-time research',
    ].includes(item.format)
      ? 'In person'
      : ['Remote', 'Self-paced online'].includes(item.format)
        ? 'Remote / online'
        : item.format === 'Not specified'
          ? 'Not stated'
          : item.kind === 'Scholarship'
            ? 'Scholarship application'
            : item.format,
    firstVerifiedAt: catalogueCheckedAt,
  }));
export const catalogue: FinanceRoute[] = [
  ...originalRoutes.map((item) => ({
    ...item,
    format: item.format === 'Remote' ? 'Remote / online' : item.format,
  })),
  ...researchedRoutes,
];
const ids = new Set<string>();
for (const item of catalogue) {
  if (item.country !== 'India')
    throw new Error('India-only catalogue: ' + item.id);
  if (ids.has(item.id)) throw new Error('Duplicate catalogue id: ' + item.id);
  if (!opportunityKinds.includes(item.kind))
    throw new Error('Unknown opportunity type: ' + item.id);
  ids.add(item.id);
}
export const careerFields = [
  ...new Set(catalogue.flatMap((item) => item.careerTracks)),
].sort();
export const catalogueFormats = [
  ...new Set(catalogue.map((item) => item.format)),
].sort();
