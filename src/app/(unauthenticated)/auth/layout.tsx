'use client';

import { useEffect } from 'react';

import { defineLdsComponents } from '@elilillyco/ux-lds';
import '@elilillyco/ux-lds-react/src/css/index.css';

import globalStyles from '@/scss/global.module.scss';
import authStyles from '@/app/(unauthenticated)/auth/auth.module.scss';

import { SessionProvider } from 'next-auth/react';

export default function MyApp({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    defineLdsComponents();
  }, []);
  return (
    <html lang="en" className={globalStyles.root}>
      <body className={`${authStyles.authContainer}`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
