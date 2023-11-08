'use client';

import React, { useContext } from 'react';
import { LdsAlert } from '@elilillyco/ux-lds-react';
import TreatmentMapPage from '@/app/(authenticated)/treatmentMap/page';
import alertStyles from '@/scss/themes/alert.module.scss';
import { UserContext } from '@/context/UserContextProvider';

export default function Home() {
  const { alert } = useContext(UserContext);
  return (
    <>
      <div className={`${alertStyles.primary}`}>
        {alert.isOpen && (
          <LdsAlert id="alert_message" level={alert.level} dismissible>
            <div className={`${alertStyles.message}`}>{alert.message}</div>
          </LdsAlert>
        )}
      </div>
      <TreatmentMapPage />
    </>
  );
}
