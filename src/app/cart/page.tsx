import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { CartView } from '@/components/store';
import { storeClientConfig } from '@/lib/commerce';

export const metadata: Metadata = {
  title: 'Your cart',
  robots: { index: false, follow: true },
  alternates: { canonical: '/cart' },
};

export default function Page() {
  return (
    <section className="section">
      <div className="container-x">
        <h1 className="tt-display mb-10">Your cart</h1>
        <CartView client={storeClientConfig()} locale={siteConfig.locale} />
      </div>
    </section>
  );
}
