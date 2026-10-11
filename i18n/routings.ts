import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
});

// Lightweight navigation helpers wrapping Next.js router
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);