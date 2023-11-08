'use client';

import React, { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { LdsLoadingSpinner } from '@elilillyco/ux-lds-react';
import { Environment } from '@/utils/environment';

export default function Login() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    signIn('azure-ad', {
      callbackUrl: Environment.get('appBaseUrl'),
    });
  }, []);

  return (
    <div>
      <h1 className="h1">Redirecting to login...</h1>
      <LdsLoadingSpinner />
    </div>
  );
}
