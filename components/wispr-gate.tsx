'use client';

import { useEffect } from 'react';

/*
  Email gate + "Wispr Flow Pro for 3 months FREE" pop-up (the Wispr Gate kit, public/wispr/).
  The kit is plain JS that adds its own elements, so it loads after React has hydrated the page
  and removes itself on unmount (client-side navigation to /guide and back).
  Signups go to /api/unlock (private Vercel Blob store). Export: /api/export?key=<.admin-key.local>.
*/

type WisprGateApi = { destroy?: () => void };

declare global {
  interface Window {
    WISPR_GATE?: Record<string, unknown>;
    WisprGate?: WisprGateApi;
  }
}

const KIT_VERSION = '5';
let mounts = 0; // the newest mount owns the gate

// page="guide": no lock there; Wispr claim links send visitors who have not signed up to the home page gate.
export function WisprGate({
  count = 0,
  page = 'home',
}: {
  count?: number;
  page?: 'home' | 'guide';
}) {
  useEffect(() => {
    const n = count > 0 ? String(count) : 'every';
    const home = page === 'home';
    window.WISPR_GATE = {
      base: '/wispr/',
      gateHref: home ? null : '/',
      lock: home ? '#opportunities' : null,
      peek: '.opportunity-list',
      peekExtra: 560,
      offerAt: home ? '.hero-actions' : null,
      title: 'Unlock the full ledger',
      lede: `Free. Drop your name and email to open all ${n} live opportunities in India and claim Wispr Flow Pro for 3 months FREE.`,
      perks: [
        `All ${n} India-based openings in VC, PE, banking and finance`,
        'Filter by track, work mode and candidate type, with the original source for each',
      ],
      button: 'Unlock the ledger for FREE',
      welcome: [`All ${n} opportunities, unlocked`],
      note: 'Dictate your cover notes and cold emails instead of typing them. It works in every app.',
      skip: 'Open the ledger',
    };

    if (!document.querySelector('link[data-wg-css]')) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = `/wispr/wispr-gate.css?v=${KIT_VERSION}`;
      css.dataset.wgCss = '';
      document.head.appendChild(css);
    }

    const mine = ++mounts;
    let cancelled = false;
    const script = document.createElement('script');
    script.src = `/wispr/wispr-gate.js?v=${KIT_VERSION}`;
    script.async = true;
    script.onload = () => {
      // an old script that finished loading after this view unmounted: clean up, unless a newer mount took over
      if (cancelled && mine === mounts) window.WisprGate?.destroy?.();
    };
    document.body.appendChild(script);

    return () => {
      cancelled = true;
      window.WisprGate?.destroy?.();
      script.remove();
    };
  }, [count, page]);

  return null;
}
