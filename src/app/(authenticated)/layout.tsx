'use client';

import { useEffect } from 'react';

import { defineLdsComponents } from '@elilillyco/ux-lds';
import '@elilillyco/ux-lds-react/src/css/index.css';

// next/font is disable if we don't use the Next.js Compiler
// import { Inter } from 'next/font/google';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

import styles from '@/app/(authenticated)/layout.module.scss';
import globalStyles from '@/scss/global.module.scss';

import { Header } from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

import { UserContextProvider } from '@/context/UserContextProvider';
import { SessionProvider } from 'next-auth/react';

// const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    defineLdsComponents();
  }, []);
  return (
    <html lang="en" className={globalStyles.root}>
      <body className={`${styles.noMargin} ${styles.container}`}>
        <SessionProvider>
          <UserContextProvider>
            <Header />
            {children}
            <Footer />
          </UserContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
