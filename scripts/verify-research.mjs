import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (name) =>
  JSON.parse(readFileSync(new URL('../lib/' + name, import.meta.url), 'utf8'));
const base = read('research.json');
const previous = read('research-refresh.json');
const audits = [
  'october-private-audit.json',
  'october-finance-audit.json',
  'october-banking-audit.json',
].map(read);
const verifiedAt = '2026-10-10';
const previousRemoved = new Set(previous.removedIds);
const oldRecords = [
  ...base.opportunities
    .filter((item) => !previousRemoved.has(item.id))
    .map((item) => ({ ...item, ...previous.updates[item.id] })),
  ...read('research-public-additions.json'),
  ...read('research-private-additions.json'),
  ...previous.additions,
];
const oldResources = [...base.resources, ...previous.upcomingResources];
const retained = audits.flatMap((audit) => audit.verifiedIds);
const removed = audits.flatMap((audit) =>
  audit.removals.map((item) => item.id),
);
const additions = audits.flatMap((audit) => audit.additions);
const promoted = audits.flatMap((audit) => audit.promoteResourceIds ?? []);
const allAudited = [...retained, ...removed];
assert.equal(
  new Set(allAudited).size,
  allAudited.length,
  'Existing audit IDs overlap',
);
assert.deepEqual(
  [...allAudited].sort(),
  oldRecords.map((item) => item.id).sort(),
  'Every previous live listing must be retained or removed',
);
assert.equal(
  new Set(additions.map((item) => item.id)).size,
  additions.length,
  'Duplicate additions',
);
const oldIds = new Set(oldRecords.map((item) => item.id));
const categories = new Set([
  'Venture & private markets',
  'Banking & markets',
  'Finance & valuation',
  'Public policy & finance',
  'Returnship',
]);
const candidates = new Set([
  'Student',
  'CA pathway',
  'Fresher / 0–1 yr',
  'Early career',
  'Experienced / specialist',
  'Returner',
  'Not stated',
]);
const modes = new Set(['In person', 'Hybrid', 'Remote', 'Not stated']);
const required = [
  'id',
  'org',
  'opportunity',
  'track',
  'type',
  'location',
  'mode',
  'deadline',
  'deadlineNote',
  'duration',
  'comp',
  'eligibility',
  'experience',
  'work',
  'applyMethod',
  'evidence',
  'sourceType',
  'sourceDate',
  'sourceUrl',
  'applyUrl',
  'caveat',
  'category',
  'candidateGroup',
  'modeGroup',
  'recordKind',
  'status',
  'statusLabel',
  'deadlineKind',
  'deadlineTimeZone',
  'deadlineConfidence',
  'sourceTier',
  'featured',
  'firstVerifiedAt',
  'lastVerifiedAt',
];
for (const audit of audits) {
  assert.equal(audit.verifiedAt, verifiedAt);
  for (const id of Object.keys(audit.updates))
    assert.ok(audit.verifiedIds.includes(id), id + ': update must be retained');
  for (const removal of audit.removals)
    assert.ok(removal.reason && /^https?:\/\//.test(removal.sourceUrl));
  for (const exclusion of audit.exclusions)
    assert.ok(
      exclusion.title &&
        exclusion.reason &&
        exclusion.detail &&
        /^https?:\/\//.test(exclusion.url),
    );
}
for (const item of additions) {
  for (const key of required)
    assert.ok(Object.hasOwn(item, key), item.id + ': missing ' + key);
  assert.ok(!oldIds.has(item.id), item.id + ': already in previous ledger');
  assert.ok(categories.has(item.category), item.id + ': unknown track');
  assert.ok(
    candidates.has(item.candidateGroup),
    item.id + ': unknown candidate',
  );
  assert.ok(modes.has(item.modeGroup), item.id + ': unknown work mode');
  assert.equal(item.firstVerifiedAt, verifiedAt);
  assert.equal(item.lastVerifiedAt, verifiedAt);
  assert.ok(
    !item.deadline || item.deadline >= verifiedAt,
    item.id + ': expired addition',
  );
  assert.ok(
    !item.sourceDate || item.sourceDate > previous.verifiedAt,
    item.id + ': source predates refresh',
  );
  assert.ok(
    /^https?:\/\//.test(item.sourceUrl),
    item.id + ': invalid source URL',
  );
  assert.ok(
    /^(https?:\/\/|mailto:)/.test(item.applyUrl),
    item.id + ': invalid application URL',
  );
  if (item.deadlineAt)
    assert.ok(
      Number.isFinite(Date.parse(item.deadlineAt)),
      item.id + ': invalid exact deadline',
    );
}
for (const id of promoted) {
  assert.ok(
    oldResources.some((item) => item.id === id),
    id + ': unknown resource',
  );
  assert.ok(
    audits.some(
      (audit) => audit.resourceUpdates?.[id]?.status === 'programme_open',
    ),
    id + ': reopened window must be verified',
  );
}
const updates = Object.assign({}, ...audits.map((audit) => audit.updates));
const resourceUpdates = Object.assign(
  {},
  ...audits.map((audit) => audit.resourceUpdates ?? {}),
);
const live = [
  ...oldRecords
    .filter((item) => retained.includes(item.id))
    .map((item) => ({ ...item, ...updates[item.id] })),
  ...additions,
  ...oldResources
    .filter((item) => promoted.includes(item.id))
    .map((item) => ({ ...item, ...resourceUpdates[item.id] })),
];
assert.equal(
  new Set(live.map((item) => item.id)).size,
  live.length,
  'Duplicate live IDs',
);
assert.ok(
  live.every((item) => !item.deadline || item.deadline >= verifiedAt),
  'Expired dated listing remains active',
);
console.log(
  JSON.stringify(
    {
      verifiedAt,
      previousListings: oldRecords.length,
      retained: retained.length,
      removed: removed.length,
      additions: additions.length,
      reopenedWindows: promoted.length,
      live: live.length,
      dated: live.filter((item) => item.deadline).length,
      discoveryResources: oldResources.length - promoted.length,
    },
    null,
    2,
  ),
);
