'use client';

import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { Opportunity } from '@/lib/research-data';
import { useInView } from '@/components/ledger-motion';

const C = {
  sage: '#52634d',
  sageMid: '#8fa284',
  sageLight: '#c9d3bd',
  clay: '#b8643f',
  butter: '#d9b24c',
  ink: '#352a22',
  muted: '#766c60',
  line: '#ded7ca',
};
const TRACK_COLORS: Record<string, string> = {
  'Venture & private markets': C.sage,
  'Finance & valuation': C.sageMid,
  'Banking & markets': C.clay,
  'Public policy & finance': C.butter,
  Returnship: C.ink,
};
const TRACK_LABEL: Record<string, string> = {
  'Venture & private markets': 'VC & private capital',
  'Banking & markets': 'Banking & markets',
  'Finance & valuation': 'Finance & valuation',
  'Public policy & finance': 'Public finance',
  Returnship: 'Returnships',
};

function city(location: string) {
  const l = location.toLowerCase();
  if (l.includes('mumbai') || l.includes('lower parel')) return 'Mumbai';
  if (l.includes('gurugram') || l.includes('gurgaon')) return 'Gurugram';
  if (l.includes('bengaluru') || l.includes('bangalore')) return 'Bengaluru';
  if (l.includes('delhi') || l.includes('noida')) return 'Delhi NCR';
  if (l.includes('pune')) return 'Pune';
  if (l.includes('hyderabad')) return 'Hyderabad';
  return 'Elsewhere';
}

const tooltipStyle = {
  background: '#fffcf6',
  border: '1px solid #ded7ca',
  borderRadius: 10,
  fontSize: 12,
  color: '#352a22',
  boxShadow: '0 12px 30px -16px rgba(53,42,34,.35)',
};

function Panel({
  kicker,
  title,
  note,
  className,
  children,
}: {
  kicker: string;
  title: string;
  note?: string;
  className?: string;
  children: (seen: boolean) => React.ReactNode;
}) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={'board-panel reveal ' + (className ?? '')}>
      <p className="eyebrow">{kicker}</p>
      <h3>{title}</h3>
      {note ? <p className="board-note">{note}</p> : null}
      <div className="board-body">{children(seen)}</div>
    </div>
  );
}

export function MarketBoard({
  records,
  today,
}: {
  records: Opportunity[];
  today: string;
}) {
  const tracks = useMemo(() => {
    const counts = new Map<string, number>();
    records.forEach((r) => counts.set(r.category, (counts.get(r.category) ?? 0) + 1));
    return [...counts.entries()]
      .map(([name, value]) => ({
        name,
        label: TRACK_LABEL[name] ?? name,
        value,
        fill: TRACK_COLORS[name] ?? C.muted,
      }))
      .sort((a, b) => b.value - a.value);
  }, [records]);

  const runway = useMemo(() => {
    const start = new Date(today + 'T12:00:00+05:30').getTime();
    const weeks = Array.from({ length: 8 }, (_, i) => ({
      week: i === 0 ? 'This wk' : 'W+' + i,
      closing: 0,
      fill: i < 2 ? C.clay : C.sage,
    }));
    let later = 0;
    records.forEach((r) => {
      if (!r.deadline) return;
      const days = (new Date(r.deadline + 'T12:00:00+05:30').getTime() - start) / 864e5;
      const w = Math.floor(days / 7);
      if (w >= 0 && w < 8) weeks[w].closing += 1;
      else if (w >= 8) later += 1;
    });
    const kinds = {
      dated: records.filter((r) => r.deadline).length,
      rolling: records.filter((r) => !r.deadline && r.deadlineKind === 'rolling').length,
      window: records.filter((r) => !r.deadline && r.deadlineKind === 'recurring_window').length,
      open: 0,
    };
    kinds.open = records.length - kinds.dated - kinds.rolling - kinds.window;
    return { weeks, later, kinds };
  }, [records, today]);

  const who = useMemo(() => {
    const counts = new Map<string, number>();
    records.forEach((r) => {
      const groups = r.candidateGroups?.length ? r.candidateGroups : [r.candidateGroup];
      groups.forEach((g) => counts.set(g, (counts.get(g) ?? 0) + 1));
    });
    return [...counts.entries()]
      .filter(([g]) => g !== 'Not stated')
      .map(([group, value]) => ({ group, value }))
      .sort((a, b) => b.value - a.value);
  }, [records]);

  const cities = useMemo(() => {
    const counts = new Map<string, number>();
    records.forEach((r) => {
      const c = city(r.location);
      counts.set(c, (counts.get(c) ?? 0) + 1);
    });
    const rows = [...counts.entries()].sort((a, b) =>
      a[0] === 'Elsewhere' ? 1 : b[0] === 'Elsewhere' ? -1 : b[1] - a[1],
    );
    const max = Math.max(...rows.map(([, n]) => n));
    return rows.map(([name, n]) => ({ name, n, pct: (n / max) * 100 }));
  }, [records]);

  const total = records.length;

  return (
    <section className="market-board" id="market">
      <div className="ledger-container">
        <div className="section-heading-row reveal">
          <div>
            <p className="eyebrow">
              <span className="live-dot" /> The market board
            </p>
            <h2 className="editorial-heading">
              Read the market <em>before you move.</em>
            </h2>
          </div>
          <p>
            Every chart is drawn from the {total} live records below.{' '}
            <br />
            It updates as listings expire.
          </p>
        </div>

        <div className="board-grid">
          <Panel kicker="Allocation" title="Where the openings are" className="span-tracks">
            {(seen) => (
              <div className="donut-wrap">
                <div className="donut">
                  {seen ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={tracks}
                          dataKey="value"
                          nameKey="label"
                          innerRadius="64%"
                          outerRadius="96%"
                          paddingAngle={2}
                          stroke="#fffcf6"
                          strokeWidth={3}
                          startAngle={90}
                          endAngle={-270}
                          animationDuration={1300}
                        />
                        <Tooltip contentStyle={tooltipStyle} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : null}
                  <div className="donut-center">
                    <strong>{total}</strong>
                    <span>open routes</span>
                  </div>
                </div>
                <ul className="donut-legend">
                  {tracks.map((t, i) => (
                    <li key={t.name} style={{ ['--i' as string]: i }}>
                      <i style={{ background: TRACK_COLORS[t.name] ?? C.muted }} />
                      <span>{t.label}</span>
                      <b>{t.value}</b>
                      <em>{Math.round((t.value / total) * 100)}%</em>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Panel>

          <Panel
            kicker="Deadline runway"
            title="What closes, and when"
            note="Dated listings by week, in India time."
            className="span-runway"
          >
            {(seen) => (
              <>
                <div className="runway-chart">
                  {seen ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={runway.weeks} margin={{ top: 10, right: 4, left: -26, bottom: 0 }}>
                        <XAxis dataKey="week" tickLine={false} axisLine={{ stroke: C.line }} tick={{ fontSize: 11, fill: C.muted }} />
                        <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: C.muted }} />
                        <Tooltip cursor={{ fill: 'rgba(82,99,77,.07)' }} contentStyle={tooltipStyle} formatter={(v) => [v, 'closing']} />
                        <Bar dataKey="closing" radius={[6, 6, 0, 0]} animationDuration={1100} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : null}
                </div>
                <div className="runway-split" aria-label="How applications close">
                  {[
                    ['Exact date', runway.kinds.dated, C.clay],
                    ['Rolling', runway.kinds.rolling, C.sage],
                    ['Annual window', runway.kinds.window, C.butter],
                    ['No date published', runway.kinds.open, C.sageLight],
                  ]
                    .filter(([, n]) => (n as number) > 0)
                    .map(([label, n, color]) => (
                    <span
                      key={label as string}
                      style={{
                        flexGrow: n as number,
                        background: color as string,
                      }}
                      title={label + ': ' + n}
                    />
                  ))}
                </div>
                <ul className="runway-legend">
                  {(
                    [
                      ['Exact date', runway.kinds.dated, C.clay],
                      ['Rolling', runway.kinds.rolling, C.sage],
                      ['Annual window', runway.kinds.window, C.butter],
                      ['No date published', runway.kinds.open, C.sageLight],
                    ] as const
                  )
                    .filter(([, n]) => n > 0)
                    .map(([label, n, color]) => (
                      <li key={label}>
                        <i style={{ background: color }} />
                        {label} <b>{n}</b>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </Panel>

          <Panel kicker="Eligibility" title="Who can apply" note="A role can count for more than one group." className="span-who">
            {(seen) => (
              <div className="who-chart">
                {seen ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={who} layout="vertical" margin={{ top: 0, right: 26, left: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="group" width={136} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: C.ink }} />
                      <Tooltip cursor={{ fill: 'rgba(82,99,77,.07)' }} contentStyle={tooltipStyle} formatter={(v) => [v, 'openings']} />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={14} fill={C.sage} animationDuration={1200} label={{ position: 'right', fontSize: 12, fill: C.muted }} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : null}
              </div>
            )}
          </Panel>

          <Panel kicker="Geography" title="The city desk" note="Where the seat is, when it is published." className="span-city">
            {(seen) => (
              <ul className={'city-bars' + (seen ? ' go' : '')}>
                {cities.map((c, i) => (
                  <li key={c.name} style={{ ['--w' as string]: c.pct + '%', ['--i' as string]: i }}>
                    <span>{c.name}</span>
                    <div><i /></div>
                    <b>{c.n}</b>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </section>
  );
}

/** Ledger size at each refresh, drawn as a market index. */
export function LedgerIndex({
  editions,
}: {
  editions: Array<{ date: string; count: number }>;
}) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const first = editions[0]?.count ?? 0;
  const last = editions[editions.length - 1]?.count ?? 0;
  const change = first ? Math.round(((last - first) / first) * 100) : 0;
  const data = editions.map((e) => ({
    label: new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' }).format(
      new Date(e.date + 'T12:00:00+05:30'),
    ),
    count: e.count,
  }));
  return (
    <div ref={ref} className="ledger-index" aria-label={`Open Ledger index: ${last} open routes, up ${change}% since the first edition`}>
      <div className="index-top">
        <span>OL INDEX</span>
        <span className="index-up">▲ {change}%</span>
      </div>
      <div className="index-value">
        {last}
        <small>routes at last refresh</small>
      </div>
      <div className="index-chart">
        {seen ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 6, right: 6, left: 6, bottom: 0 }}>
              <defs>
                <linearGradient id="olFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f4e7b8" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="#f4e7b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: 'rgba(255,252,246,.55)' }} />
              <YAxis hide domain={['dataMin - 8', 'dataMax + 4']} />
              <Area type="monotone" dataKey="count" stroke="#f4e7b8" strokeWidth={2.5} fill="url(#olFill)" dot={{ r: 3.5, fill: '#f4e7b8', strokeWidth: 0 }} animationDuration={1600} />
            </AreaChart>
          </ResponsiveContainer>
        ) : null}
      </div>
      <p className="index-foot">Ledger size at each refresh</p>
    </div>
  );
}
