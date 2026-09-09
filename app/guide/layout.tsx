import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'India Finance Break-in Guide — Open Ledger',
  description:
    'A realistic, evidence-backed guide to grades, credentials and entry routes for venture capital, private equity and finance careers in India.',
};

export default function GuideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
