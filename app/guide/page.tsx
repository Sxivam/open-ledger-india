'use client';

import { ArrowUpRight } from 'lucide-react';
import { CareerRoadmap } from '@/components/career-roadmap';
import {
  LedgerFooter,
  LedgerHeader,
  WisprSection,
} from '@/components/ledger-brand';
import { WisprGate } from '@/components/wispr-gate';
import { credentials, guideSources } from '@/lib/guide-data';

function SourceLinks({ ids }: { ids: string[] }) {
  return (
    <div className="rp-inline-sources">
      {guideSources
        .filter((source) => ids.includes(source.id))
        .map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            title={source.title}
          >
            {source.organization} ↗
          </a>
        ))}
    </div>
  );
}

export default function BreakInGuidePage() {
  return (
    <>
      <LedgerHeader guide />
      <main id="main" className="guide-main">
        <CareerRoadmap />
        <section id="grades" className="rp-container rp-reference">
          <div className="rp-reference-head">
            <div>
              <p className="rp-eyebrow">The eligibility desk / 01</p>
              <h2>
                Check the rule.
                <br />
                <em>Then choose your route.</em>
              </h2>
            </div>
            <p>
              There is no single percentage, CGPA or certificate that qualifies
              you for all of Indian finance. A strong academic record can help;
              only the actual programme or employer can define its cutoff.
            </p>
          </div>
          <div className="rp-grade-cards">
            <article>
              <span>01 / Published requirements</span>
              <h3>Read the exact vacancy</h3>
              <p>
                Check the degree, graduation year, marks, attempt limits, work
                experience and CA training stage. A requirement on one
                internship is not a rule for the entire industry.
              </p>
              <SourceLinks ids={['S01', 'S11', 'S12']} />
            </article>
            <article>
              <span>02 / Academic context</span>
              <h3>Keep grades in context</h3>
              <p>
                Use your university’s official conversion method when requested.
                CGPA does not translate to the same percentage or class rank
                everywhere. MBA admissions may consider earlier academic
                performance too.
              </p>
              <SourceLinks ids={['S19', 'S20']} />
            </article>
            <article>
              <span>03 / An alternative door</span>
              <h3>Build verifiable work</h3>
              <p>
                If you miss a hard cutoff, find another eligible role. Use
                relevant projects, supervised work and specific skills to
                strengthen your case where the employer has discretion. A
                project is not a substitute for a mandatory qualification.
              </p>
              <SourceLinks ids={['S15', 'S21']} />
            </article>
          </div>
        </section>
        <section id="credentials" className="rp-container rp-reference">
          <div className="rp-reference-head">
            <div>
              <p className="rp-eyebrow">The qualification desk / 02</p>
              <h2>
                One relevant credential.
                <br />
                <em>Work you can defend.</em>
              </h2>
            </div>
            <p>
              Choose the work first. Then distinguish required qualifications,
              useful study and optional signals. Passing an exam is not always
              the same as earning a designation or being authorised to practise.
            </p>
          </div>
          <div className="rp-credential-grid">
            {credentials.map((credential) => (
              <details key={credential.name}>
                <summary>
                  {credential.name}
                  <span>{credential.verdict}</span>
                </summary>
                <p>
                  <strong>Useful for:</strong> {credential.bestFor}
                </p>
                <p>
                  <strong>What it cannot replace:</strong>{' '}
                  {credential.notEnough}
                </p>
                <p>{credential.decision}</p>
                <SourceLinks ids={credential.sources} />
              </details>
            ))}
          </div>
        </section>
        <section id="sources" className="rp-container rp-reference">
          <div className="rp-reference-head">
            <div>
              <p className="rp-eyebrow">Sources & method / 03</p>
              <h2>
                Know what is evidence.
                <br />
                <em>Know what is guidance.</em>
              </h2>
            </div>
            <p>
              The maps are editorial career guidance, not prescribed hiring
              sequences. Original sources establish qualification rules and
              examples of employer expectations. Current openings live in the
              opportunity ledger.
            </p>
          </div>
          <div className="rp-source-list">
            {guideSources.map((source) => (
              <details key={source.id}>
                <summary>
                  {source.organization} · {source.title}
                  <span>{source.sourceType}</span>
                </summary>
                <p>{source.supports}</p>
                <a href={source.url} target="_blank" rel="noreferrer">
                  Read original source <ArrowUpRight size={13} />
                </a>
              </details>
            ))}
          </div>
          <p className="rp-method-note">
            Pathway structure and qualification guidance reviewed 10 November
            2026. Hiring references are examples and may be historical; their
            dates remain stated where known. Progress tracks your own
            preparation, not employability. Interaction study:{' '}
            <a href="https://roadmap.sh/" target="_blank" rel="noreferrer">
              roadmap.sh
            </a>{' '}
            — connected steps, alternative branches and details on demand,
            adapted for Indian finance.
          </p>
        </section>
        <WisprSection />
      </main>
      <LedgerFooter />
      <WisprGate />
    </>
  );
}
