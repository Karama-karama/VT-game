import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routings';
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, static files (_next, images, etc.)
  matcher: ['/', '/(fr|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};