import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { MainNav } from '@/components/main-nav';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 w-full bg-background ">
      <div className="container flex  items-center space-x-4 py-9 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
      </div>
    </header>
  );
}
