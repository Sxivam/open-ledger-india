import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { writeFileSync } from 'node:fs';
import {
  audiences,
  opportunityKinds,
  defaultCatalogueFilters,
  filterCatalogue,
  statusOnDate,
} from '../lib/catalogue-rules.ts';

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});
try {
  const { catalogue, preRefreshCatalogue, refreshBatches, catalogueCheckedAt } =
    await server.ssrLoadModule('/lib/catalogue-data.ts');
  assert.equal(catalogueCheckedAt, '2026-11-09');
  const audited = refreshBatches.flatMap((batch) => batch.auditedIds);
  const removed = refreshBatches.flatMap((batch) => batch.removals);
  const additions = refreshBatches.flatMap((batch) => batch.records);
  assert.equal(
    new Set(audited).size,
    audited.length,
    'Duplicate audit ownership',
  );
  assert.deepEqual(
    [...audited].sort(),
    preRefreshCatalogue.map((item) => item.id).sort(),
    'Every previous listing must be covered by this audit',
  );
  assert.equal(
    new Set(catalogue.map((item) => item.id)).size,
    catalogue.length,
  );
  for (const batch of refreshBatches) {
    assert.equal(batch.checkedAt, catalogueCheckedAt);
    assert.deepEqual(
      [
        ...Object.keys(batch.updates),
        ...batch.removals.map((item) => item.id),
      ].sort(),
      [...batch.auditedIds].sort(),
      'Each audit must update or explicitly remove its assigned record',
    );
  }
  for (const item of removed) {
    assert.ok(item.reason && item.sourceUrl, 'Removal needs evidence');
    assert.ok(!catalogue.some((entry) => entry.id === item.id));
  }
  for (const item of catalogue) {
    assert.equal(item.country, 'India', item.id);
    assert.ok(opportunityKinds.includes(item.kind), item.id);
    assert.notEqual(statusOnDate(item, catalogueCheckedAt), 'closed', item.id);
    assert.ok(item.checkedAt <= catalogueCheckedAt, item.id);
    const previous = preRefreshCatalogue.find((entry) => entry.id === item.id);
    if (previous)
      assert.equal(
        item.firstVerifiedAt,
        previous.firstVerifiedAt,
        'Rechecks must not look like new additions',
      );
  }
  for (const item of additions) {
    for (const field of [
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
      'sourceUrl',
      'applyUrl',
      'evidence',
      'caveat',
    ])
      assert.ok(
        typeof item[field] === 'string' && item[field].trim(),
        item.id + ': ' + field,
      );
    assert.equal(item.checkedAt, catalogueCheckedAt);
    assert.ok(item.careerTracks.length && item.audience.length, item.id);
    assert.ok(
      item.audience.every((entry) => audiences.includes(entry)),
      item.id,
    );
    assert.match(item.sourceUrl, /^https:\/\//);
    assert.match(item.applyUrl, /^(https:\/\/|mailto:)/);
    assert.ok(
      [
        'In person',
        'Hybrid',
        'Remote / online',
        'Not stated',
        'Institution-led',
        'Scholarship application',
      ].includes(item.format),
      item.id + ': format',
    );
    assert.doesNotMatch(
      item.location,
      /Bangladesh|Pakistan|Nepal|Sri Lanka|Bhutan|Maldives/i,
      item.id,
    );
    for (const field of ['sourceDate', 'deadline', 'opensOn'])
      if (item[field])
        assert.match(
          item[field],
          /^\d{4}-\d{2}-\d{2}$/,
          item.id + ': ' + field,
        );
    if (item.sourceDate)
      assert.ok(item.sourceDate <= catalogueCheckedAt, item.id);
  }
  const newResults = filterCatalogue(
    catalogue,
    {
      ...defaultCatalogueFilters,
      addedSince: catalogueCheckedAt,
      sort: 'newest',
    },
    catalogueCheckedAt,
  );
  assert.deepEqual(
    newResults.map((item) => item.id).sort(),
    additions
      .filter((item) =>
        ['open', 'rolling'].includes(statusOnDate(item, catalogueCheckedAt)),
      )
      .map((item) => item.id)
      .sort(),
  );
  const privateSources = additions.map((item) => item.sourceUrl);
  assert.equal(
    new Set(privateSources).size,
    privateSources.length,
    'Duplicate source in additions',
  );
  const summary = {
    checkedAt: catalogueCheckedAt,
    previousAudited: audited.length,
    added: additions.length,
    removed: removed.length,
    total: catalogue.length,
    available: filterCatalogue(
      catalogue,
      defaultCatalogueFilters,
      catalogueCheckedAt,
    ).length,
    watchlist: catalogue.filter((item) =>
      ['watchlist', 'upcoming'].includes(
        statusOnDate(item, catalogueCheckedAt),
      ),
    ).length,
    exclusions: refreshBatches.flatMap((batch) => batch.exclusions).length,
    sourceAndDiscoveryChecks: 'passed',
  };
  writeFileSync(
    '/tmp/open-ledger-nov9-final.json',
    JSON.stringify(catalogue, null, 2),
  );
  writeFileSync(
    '/tmp/open-ledger-nov9-summary.json',
    JSON.stringify(summary, null, 2),
  );
  console.log(JSON.stringify(summary, null, 2));
} finally {
  await server.close();
}
