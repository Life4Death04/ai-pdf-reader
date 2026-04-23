import { createNavigation } from 'next-intl/navigation';
import { locales } from './config';
import { useLocale as useLocaleIntl } from 'next-intl';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
});

export const useLocale = useLocaleIntl;
