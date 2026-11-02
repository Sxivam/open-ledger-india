import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  opportunityKinds,
  audiences,
  defaultCatalogueFilters,
  filterCatalogue,
  statusOnDate,
} from '../lib/catalogue-rules.ts';

const checkedAt = '2026-11-02';
const batches = ['scholarships', 'programmes', 'openings'].map((name) =>
  JSON.parse(
    readFileSync(
      new URL('../lib/deep-' + name + '.json', import.meta.url),
      'utf8',
    ),
  ),
);
const records = batches.flatMap((batch) => batch.records);
const required = [
  'id',
  'org',
  'title',
  'location',
  'format',
  'benefit',
  'duration',
  'eligibility',
  'description',
  'applicationSteps',
  'evidence',
  'caveat',
];
assert.equal(
  new Set(records.map((record) => record.id)).size,
  records.length,
  'Duplicate research IDs',
);
for (const batch of batches) assert.equal(batch.checkedAt, checkedAt);
for (const item of records) {
  assert.equal(item.country, 'India', item.id + ': India eligibility required');
  assert.ok(opportunityKinds.includes(item.kind), item.id + ': unknown type');
  assert.ok(
    ['open', 'rolling', 'upcoming', 'watchlist'].includes(item.status),
    item.id + ': invalid status',
  );
  for (const key of required)
    assert.ok(
      typeof item[key] === 'string' && item[key].trim(),
      item.id + ': missing ' + key,
    );
  assert.ok(
    item.careerTracks.length && item.audience.length,
    item.id + ': missing discovery metadata',
  );
  for (const audience of item.audience)
    assert.ok(audiences.includes(audience), item.id + ': unknown audience');
  assert.equal(item.checkedAt, checkedAt);
  assert.match(item.sourceUrl, /^https:\/\//);
  assert.match(item.applyUrl, /^(https:\/\/|mailto:)/);
  for (const key of ['deadline', 'opensOn', 'sourceDate']) {
    if (item[key])
      assert.match(
        item[key],
        /^\d{4}-\d{2}-\d{2}$/,
        item.id + ': invalid ' + key,
      );
  }
  if (item.deadlineAt)
    assert.ok(
      Number.isFinite(Date.parse(item.deadlineAt)),
      item.id + ': invalid cutoff',
    );
  assert.notEqual(
    statusOnDate(item, checkedAt, Date.parse('2026-11-02T12:00:00+05:30')),
    'closed',
    item.id + ': expired research',
  );
}

// Real regressions: the US cutoff falls on the next Indian calendar day;
// upcoming awards become available only on their published opening date.
const student = records.find(
  (item) =>
    item.org === 'CFA Institute' && /Student Scholarship/.test(item.title),
);
assert.ok(student?.deadlineAt);
assert.equal(
  statusOnDate(student, '2027-07-16', Date.parse(student.deadlineAt) - 1),
  'open',
);
assert.equal(
  statusOnDate(student, '2027-07-16', Date.parse(student.deadlineAt) + 1),
  'closed',
);
const access = records.find((item) => /Access Scholarship/.test(item.title));
assert.ok(access);
assert.equal(statusOnDate(access, '2026-11-02'), 'upcoming');
assert.equal(statusOnDate(access, '2026-11-03'), 'open');
assert.equal(statusOnDate(access, '2026-11-24'), 'closed');
const watchlist = records.find((item) => item.status === 'watchlist');
assert.equal(statusOnDate(watchlist, '2027-01-01'), 'watchlist');
assert.ok(
  !filterCatalogue(records, defaultCatalogueFilters, checkedAt).some((item) =>
    ['upcoming', 'watchlist'].includes(item.status),
  ),
);
assert.ok(
  filterCatalogue(
    records,
    { ...defaultCatalogueFilters, availability: 'Upcoming & watchlist' },
    checkedAt,
  ).every((item) => ['upcoming', 'watchlist'].includes(item.status)),
);
const scholarshipResults = filterCatalogue(
  records,
  { ...defaultCatalogueFilters, lane: 'Fund your studies' },
  checkedAt,
);
assert.ok(
  scholarshipResults.length &&
    scholarshipResults.every(
      (item) =>
        item.kind === 'Scholarship' || item.goal === 'Fund your studies',
    ),
);
const saved = filterCatalogue(
  records,
  { ...defaultCatalogueFilters, savedOnly: true },
  checkedAt,
  [student.id],
);
assert.deepEqual(
  saved.map((item) => item.id),
  [student.id],
);
assert.equal(
  filterCatalogue(
    [student],
    { ...defaultCatalogueFilters, availability: 'All researched' },
    '2027-07-17',
  ).length,
  0,
);
console.log(
  JSON.stringify(
    {
      checkedAt,
      added: records.length,
      available: filterCatalogue(records, defaultCatalogueFilters, checkedAt)
        .length,
      upcomingAndWatchlist: records.filter((item) =>
        ['upcoming', 'watchlist'].includes(item.status),
      ).length,
      exclusions: batches.flatMap((batch) => batch.exclusions).length,
      deadlineAndDiscoveryChecks: 'passed',
    },
    null,
    2,
  ),
);

const datedThenUndated = filterCatalogue(
  records,
  defaultCatalogueFilters,
  checkedAt,
);
const firstUndated = datedThenUndated.findIndex((item) => !item.deadline);
assert.ok(
  datedThenUndated.slice(firstUndated).every((item) => !item.deadline),
  'Undated recruitment must follow dated deadlines',
);
