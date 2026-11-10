import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive India Finance Roadmaps · Open Ledger · Shivam Meet',
  description:
    'Explore 14 interactive career pathways for venture capital, private equity and finance in India. Compare entry routes, build practical proof and track your preparation.',
};

export default function GuideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
