'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { LdsLoadingSpinner } from '@elilillyco/ux-lds-react';

export default function Logout() {
  const { status } = useSession();
  if (status === 'authenticated') {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    signOut({
      redirect: false,
    }).then(async () =>
      fetch('/api/auth/globalLogout', {
        method: 'GET',
      })
    );
    return (
      <div className="logout-container">
        <h1>Redirecting to logout...</h1>
        <LdsLoadingSpinner />
      </div>
    );
  }

  return (
    <div className="lds-card">
      <div className="content-container">
        <h1>You have been signed out.</h1>
      </div>
      <div className="h2-container">
        <h2>To continue using this site, you will need to sign in again.</h2>
      </div>
    </div>
  );
}
