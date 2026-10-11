'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../../i18n/routings';
import { ArrowRight, LanguagesIcon } from 'lucide-react';
import { Button } from './reusables/Button';


export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'fr' : 'en';
    // Re-routes to the same page with the new locale prefix
    router.replace(pathname, { locale: nextLocale });
  };

  return (
      <Button
          label= {locale === 'en' ? 'FR' : 'EN'}
          icon={<LanguagesIcon />}
          onClick={toggleLanguage}
          className="w-min max-w-xs"
          color='ink'
        />
    
  );
}