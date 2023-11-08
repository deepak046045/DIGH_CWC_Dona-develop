'use client';

import React, { useContext } from 'react';
import { LdsButton } from '@elilillyco/ux-lds-react';
import { UserContext } from '@/context/UserContextProvider';
import { copyTexts } from '@/constants/copyTexts';
import layout from '@/scss/themes/layout.module.scss';
import { useRouter } from 'next/navigation';
import { NavigationOptions } from '@/models/NavigationOptions';
import treatmentIntro from './treatmentIntro.module.scss';

export default function TreatmentIntro() {
  const router = useRouter();
  const { isLoggedIn, setActiveView } = useContext(UserContext);

  return (
    <div className={`${treatmentIntro.TreatmentIntro} ${layout.gutter}`}>
      <h2 className={treatmentIntro.TreatmentIntro__title}>
        {isLoggedIn
          ? copyTexts.TreatmentIntro.titleGated
          : copyTexts.TreatmentIntro.titleUngated}
      </h2>
      <p className={treatmentIntro.TreatmentIntro__subtitle}>
        {copyTexts.TreatmentIntro.subtitleUngated}
      </p>
      <div className={treatmentIntro.TreatmentIntro__wrapper}>
        <p className={treatmentIntro.TreatmentIntro__text}>
          {copyTexts.TreatmentIntro.textUngated}
        </p>
        {isLoggedIn ? (
          <LdsButton
            data-testid="add-appointment-button"
            classes={`${treatmentIntro['TreatmentIntro__appointment-btn']}`}
            onClick={() => {
              router.push(NavigationOptions.AddAppointment.path);
              setActiveView(NavigationOptions.MyAppointments);
            }}
          >
            {copyTexts.TreatmentIntro.addApointmentBtnGated}
          </LdsButton>
        ) : null}
      </div>
    </div>
  );
}
