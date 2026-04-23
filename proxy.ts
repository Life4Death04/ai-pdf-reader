import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'always',
});

export const config = {
  matcher: [
    '/((?!api|_next|uploads|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|onnx|json)$).)*',
    '/((?!_next/static|_next/image|favicon.ico).)*',
  ],
};
