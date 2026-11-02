import type { Metadata, Viewport } from 'next';
import { Fira_Code, Inter, Newsreader } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const newsreader = Newsreader({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Open Ledger · Finance Careers, Scholarships & Internships in India',
  description:
    'Explore finance internships, apprenticeships, scholarships, fellowships, competitions and early-career roles in India. Researched by Shivam Meet, with original sources, eligibility and deadlines.',
  metadataBase: new URL('https://open-ledger-india.vercel.app'),
  icons: { icon: '/favicon.svg', apple: '/shivam.jpg' },
  openGraph: {
    title: 'Open Ledger · Your next move in finance',
    description:
      'Find your route into finance in India: internships, apprenticeships, scholarships, research, competitions and free learning. Original sources and clear eligibility, curated by Shivam Meet.',
    url: 'https://open-ledger-india.vercel.app',
    siteName: 'Open Ledger by Shivam Meet',
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f6f2e9',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${firaCode.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
