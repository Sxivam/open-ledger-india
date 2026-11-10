import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: 'custom',
});
try {
  const { pathways, guideSources } =
    await server.ssrLoadModule('/lib/guide-data.ts');
  const { blueprints } = await server.ssrLoadModule(
    '/lib/pathway-blueprints.ts',
  );
  const {
    roadmapSteps,
    activeSteps,
    readProgress,
    readPathLocation,
    defaultProgress,
  } = await server.ssrLoadModule('/lib/pathway-model.ts');
  const { careerFields } = await server.ssrLoadModule('/lib/catalogue-data.ts');
  const sourceIds = new Set(guideSources.map((source) => source.id));
  assert.deepEqual(
    Object.keys(blueprints).sort(),
    pathways.map((path) => path.id).sort(),
  );
  for (const path of pathways) {
    const blueprint = blueprints[path.id];
    assert.ok(
      careerFields.includes(blueprint.opportunityTrack),
      path.id + ': invalid opportunity link',
    );
    assert.ok(
      path.sources.every((id) => sourceIds.has(id)),
      path.id + ': missing source',
    );
    const steps = roadmapSteps(path);
    assert.equal(
      new Set(steps.map((step) => step.id)).size,
      steps.length,
      path.id + ': duplicate steps',
    );
    assert.equal(
      new Set(blueprint.routes.map((route) => route.id)).size,
      blueprint.routes.length,
      path.id + ': duplicate branches',
    );
    for (const step of steps) {
      assert.ok(
        step.title && step.detail && step.tasks.length >= 3,
        path.id + ': incomplete actions',
      );
    }
    for (const route of blueprint.routes) {
      const chosen = activeSteps(path, route.id);
      assert.equal(
        chosen.length,
        5,
        path.id + ': exactly five preparation steps',
      );
      assert.equal(
        chosen.filter((step) => step.kind === 'route').length,
        1,
        'Only selected alternative counts',
      );
      assert.ok(chosen.some((step) => step.id === 'route-' + route.id));
      assert.ok(
        chosen.every((step) => !['context', 'optional'].includes(step.kind)),
        'Qualifications are not universal prerequisites',
      );
    }
    assert.doesNotMatch(
      path.academicSignal,
      /\b[789](?:\.\d+)?\+|top \d+|\d+–\d+%/,
      'No invented universal academic bands',
    );
    assert.ok(
      path.roadmap.every((stage) => !/[0-9].*months/i.test(stage.period)),
      'No fixed career-transition clock',
    );
  }
  const path = pathways[0],
    nodes = roadmapSteps(path),
    route = blueprints[path.id].routes[1];
  const restored = readProgress(
    JSON.stringify({
      [path.id]: {
        route: route.id,
        states: {
          foundation: 'done',
          practice: 'doing',
          bad: 'done',
          credentials: 'skip',
        },
        checks: { foundation: [0, 0, 2, 100, -1, '1'], bad: [0] },
      },
      fake: { route: 'x' },
    }),
    pathways,
  );
  assert.deepEqual(restored[path.id], {
    route: route.id,
    states: { foundation: 'done', practice: 'doing' },
    checks: { foundation: [0, 2] },
  });
  assert.deepEqual(readProgress('{broken', pathways), {});
  assert.deepEqual(readProgress('[]', pathways), {});
  assert.deepEqual(readProgress(null, pathways), {});
  assert.equal(
    readProgress(
      JSON.stringify({
        [path.id]: { route: 'invalid', states: null, checks: null },
      }),
      pathways,
    )[path.id].route,
    defaultProgress(path.id).route,
  );
  const location = readPathLocation(
    `?path=${path.id}&route=${route.id}&step=route-${route.id}`,
    pathways,
  );
  assert.equal(location.path.id, path.id);
  assert.equal(location.route, route.id);
  assert.equal(location.step, 'route-' + route.id);
  const badLocation = readPathLocation(
    '?path=invalid&route=invalid&step=invalid',
    pathways,
  );
  assert.equal(badLocation.path.id, path.id);
  assert.equal(badLocation.route, undefined);
  assert.equal(badLocation.step, null);
  console.log(
    JSON.stringify(
      {
        pathways: pathways.length,
        alternativeRoutes: Object.values(blueprints).reduce(
          (n, b) => n + b.routes.length,
          0,
        ),
        sourceReferences: guideSources.length,
        checks:
          'Schema, source links, alternative counting, malformed storage and deep links passed',
      },
      null,
      2,
    ),
  );
} finally {
  await server.close();
}
