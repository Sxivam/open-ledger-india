'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Copy, Mic2 } from 'lucide-react';

export const wisprUrl =
  'https://wisprflow.ai/?promo_code=SHIVAMEETSWISPR&months=3';

export function FlowMark() {
  return (
    <span className="flow-mark" aria-hidden="true">
      {[9, 17, 24, 13, 20].map((height, index) => (
        <i key={index} style={{ height }} />
      ))}
    </span>
  );
}

export function LedgerHeader({ guide = false }: { guide?: boolean }) {
  return (
    <header className="ledger-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <nav className="ledger-container header-inner" aria-label="Primary">
        <Link
          href="/"
          className="brand-lockup"
          aria-label="Shivam Meet — Open Ledger home"
        >
          {/* oxlint-disable-next-line next/no-img-element -- tiny static avatar */}
          <img
            className="brand-photo"
            src="/shivam.jpg"
            alt=""
            width={44}
            height={44}
          />
          <span>
            <strong>Shivam Meet</strong>
            <em>Open Ledger</em>
          </span>
        </Link>
        <div className="header-links">
          <Link href="/#opportunities">Opportunities</Link>
          <Link
            className={guide ? 'active' : ''}
            aria-current={guide ? 'page' : undefined}
            href="/guide"
          >
            The break-in guide
          </Link>
          <a
            className="header-method"
            href={guide ? '#sources' : '#methodology'}
          >
            {guide ? 'Sources' : 'Our standards'}
          </a>
        </div>
        <a
          className="flow-header-link"
          href={wisprUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FlowMark />
          <span>Wispr Flow</span>
          <span className="flow-divider" />
          <span>3 months free</span>
          <ArrowUpRight size={13} />
        </a>
      </nav>
    </header>
  );
}

const examples = [
  {
    name: 'Investment thesis',
    said: 'Okay, so the company grew revenue twenty percent, but actually the cash conversion got worse. I want to understand receivables, customer concentration and whether growth needs more working capital.',
    written:
      'Revenue grew 20%, while cash conversion deteriorated. Investigate receivables, customer concentration and the working capital required to sustain growth.',
    use: 'Talk through your first reading of a company. Then verify every number against the filings.',
  },
  {
    name: 'Application email',
    said: 'Hi, I read your team’s work on Indian logistics. I mapped fifteen companies and built a unit economics model. I’d love to help with sector research. Can I share the memo, actually the two-page memo?',
    written:
      'Hi, I read your team’s work on Indian logistics. I mapped 15 companies and built a unit economics model. I would love to help with sector research. May I share my two-page memo?',
    use: 'Speak a specific opener and a clear contribution. Review the final message before sending.',
  },
  {
    name: 'Interview practice',
    said: 'My base case is that margins improve, but um the downside is customer churn. Wait, the key thing to check first is retention by cohort, before I assume pricing power.',
    written:
      'My base case assumes improving margins. The downside risk is customer churn. I would examine cohort retention before assuming pricing power.',
    use: 'Rehearse your reasoning out loud. Turn it into notes you can explain in your own words.',
  },
];

export function WisprSection() {
  const [example, setExample] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const current = examples[example];

  async function copyExample() {
    try {
      await navigator.clipboard.writeText(current.written);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <section id="wispr" className="wispr-section">
      <div className="ledger-container wispr-grid">
        <div>
          <p className="eyebrow wispr-eyebrow">
            <FlowMark /> A tool from my workflow
          </p>
          <h2 className="editorial-heading">
            Think out loud.
            <br />
            <em>Write with clarity.</em>
          </h2>
          <p className="section-description">
            A good finance application starts with a clear point of view. Use
            Wispr Flow to turn your spoken thinking into research notes, a
            focused email or interview practice.
          </p>
          <div className="wispr-offer">
            <span className="offer-months">
              3<small>months</small>
            </span>
            <div>
              <h3>Wispr Flow Pro, free.</h3>
              <p>
                My code <code>SHIVAMEETSWISPR</code> is included in the link.
              </p>
            </div>
          </div>
          <a
            className="ledger-button light-button"
            href={wisprUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Claim 3 free months <ArrowUpRight size={16} />
          </a>
          <p className="offer-terms">
            Redeem on Wispr Flow. Eligibility and plan terms apply.
          </p>
        </div>
        <div className="dictation-demo">
          <div className="demo-top">
            <span>
              <Mic2 size={14} /> The analyst’s notebook
            </span>
            <span>Illustrative example</span>
          </div>
          <div
            className="demo-tabs"
            role="tablist"
            aria-label="Wispr Flow examples"
          >
            {examples.map((item, index) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                id={`flow-tab-${index}`}
                aria-controls="flow-panel"
                aria-selected={example === index}
                tabIndex={example === index ? 0 : -1}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                onKeyDown={(event) => {
                  const next =
                    event.key === 'ArrowRight'
                      ? (index + 1) % examples.length
                      : event.key === 'ArrowLeft'
                        ? (index + examples.length - 1) % examples.length
                        : event.key === 'Home'
                          ? 0
                          : event.key === 'End'
                            ? examples.length - 1
                            : null;
                  if (next === null) return;
                  event.preventDefault();
                  setExample(next);
                  setCopied(false);
                  setCopyError(false);
                  tabs.current[next]?.focus();
                }}
                onClick={() => {
                  setExample(index);
                  setCopied(false);
                  setCopyError(false);
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div
            id="flow-panel"
            role="tabpanel"
            aria-labelledby={`flow-tab-${example}`}
          >
            <div className="demo-spoken">
              <p className="eyebrow">What you say</p>
              <p>“{current.said}”</p>
            </div>
            <div className="demo-written">
              <p className="eyebrow">
                <FlowMark /> What you mean to write
              </p>
              <p>{current.written}</p>
            </div>
          </div>
          <div className="demo-bottom">
            <p>{current.use}</p>
            <button type="button" className="text-button" onClick={copyExample}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy example'}
            </button>
          </div>
          {copyError ? (
            <output className="copy-error">
              Select the example above to copy it manually.
            </output>
          ) : null}
          <output className="sr-only" aria-live="polite">
            {copied ? 'Example copied to clipboard.' : ''}
          </output>
        </div>
      </div>
    </section>
  );
}

export function LedgerFooter() {
  return (
    <footer className="ledger-footer">
      <div className="ledger-container">
        <div className="footer-top">
          <div>
            <Link className="footer-brand" href="/">
              Open Ledger<span>by Shivam Meet</span>
            </Link>
            <p>
              Clearer routes into finance.
              <br />
              Better evidence for your next move.
            </p>
            <div className="footer-creator">
              {/* oxlint-disable-next-line next/no-img-element -- tiny static avatar */}
              <img src="/shivam.jpg" alt="Shivam Meet" width={52} height={52} />
              <span>
                <strong>Shivam Meet</strong>
                <small>131K+ on Instagram · Rank 1 on Unstop · 25+ case comp wins</small>
              </span>
            </div>
          </div>
          <div>
            <p className="eyebrow">The ledger</p>
            <Link href="/#opportunities">Find an opportunity</Link>
            <Link href="/guide">The India break-in guide</Link>
            <a href={wisprUrl} target="_blank" rel="noopener noreferrer">
              Wispr Flow · 3 months free <ArrowUpRight size={12} />
            </a>
          </div>
          <div>
            <p className="eyebrow">More from Shivam</p>
            <a
              href="https://shivam-internship-method.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Internship Method <ArrowUpRight size={12} />
            </a>
            <a
              href="https://shivam-research-library.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Research Library <ArrowUpRight size={12} />
            </a>
            <a
              href="https://shivammeet.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Case Comp Playbook <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Shivam Meet · Open to explore. Free to share.</p>
          <a
            href="https://www.instagram.com/meet_.shivam/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stay in touch <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
