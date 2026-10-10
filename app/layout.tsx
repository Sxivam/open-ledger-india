import type { Metadata, Viewport } from 'next';
import { Fira_Code, Inter, Libre_Baskerville } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
  variable: '--font-libre-baskerville',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Open Ledger · Finance Opportunities in India · Shivam Meet',
  description:
    'Shivam Meet’s researched opportunity desk for venture capital, private equity, banking and finance careers in India. Explore current applications and a realistic guide to getting in.',
  metadataBase: new URL('https://open-ledger-india.vercel.app'),
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Open Ledger · Your next move in finance',
    description:
      'Current finance opportunities in India, researched by Shivam Meet. Original sources. Clear requirements. Realistic routes in.',
    url: 'https://open-ledger-india.vercel.app',
    siteName: 'Open Ledger by Shivam Meet',
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f5f2e9',
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
      className={`${inter.variable} ${libreBaskerville.variable} ${firaCode.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
