'use client';

import React, { useContext, useEffect, useState } from 'react';
import { LdsButton, LdsIcon, LdsLink } from '@elilillyco/ux-lds-react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContextProvider';
import { AlertType } from '@/models/AlertType';
import { copyTexts } from '@/constants/copyTexts';
import { sessionStorageKeys } from '@/constants/sessionStorageKeys';
import alertStyles from '@/scss/themes/alert.module.scss';
import { NavigationOptions } from '@/models/NavigationOptions';
import {
  removeSessionStorageItem,
  setSessionStorageItem,
} from '@/utils/sessionStorage';
import { getUpcomingAppointmentAlertMessage } from '@/utils/upcomingAppointmentAlert';
import styles from './UpcomingAppointmentAlert.module.scss';

export function UpcomingAppointmentAlert() {
  const { isLoggedIn, appointments, setActiveView } = useContext(UserContext);
  const [alert, setAlert] = useState<AlertType>({
    isOpen: false,
    message: '',
    level: 'info',
  });

  const router = useRouter();

  function setUpcomingAppointmentAlert(): void {
    const message = getUpcomingAppointmentAlertMessage(appointments);

    if (message) {
      setAlert({
        isOpen: true,
        message,
        level: 'info',
      });
    }
  }

  const handleAlertClose = () => {
    setAlert({ ...alert, isOpen: false });
    setSessionStorageItem(
      sessionStorageKeys.IsUpcomingAppointmentAlertDismissed,
      true
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      setUpcomingAppointmentAlert();
    } else {
      removeSessionStorageItem(
        sessionStorageKeys.IsUpcomingAppointmentAlertDismissed
      );
      setAlert({ ...alert, isOpen: false });
    }
  }, [isLoggedIn, appointments]);

  return (
    <div id="test" className={`${alertStyles.primary}`}>
      {alert.isOpen && (
        <div
          id="upcoming-appointment-alert"
          role="alert"
          aria-live="polite"
          className="lds-alert info"
        >
          <div className="lds-alert-message">
            <LdsButton
              data-testid="dismiss-upcoming-appointment-banner"
              clearDefaultClasses
              classes="lds-button-base lds-alert-button"
              onClick={handleAlertClose}
            >
              <LdsIcon
                className={styles.closeIconWhite}
                label="close"
                name="X"
                inline
              />
            </LdsButton>
            <div className={styles.alert}>
              <div className={styles.infoIcon}>
                <LdsIcon
                  classes="lds-alert-icon info"
                  label="info"
                  name="InfoFill"
                />
              </div>
              <span className={styles.alertContent}>
                {alert.message}&nbsp;
                <LdsLink
                  data-testid="view-appointments-banner-link"
                  classes={styles.upcomingAppointmentAlertLink}
                  onClick={() => {
                    router.push(NavigationOptions.MyAppointments.path);
                    setActiveView(NavigationOptions.MyAppointments);
                  }}
                >
                  {copyTexts.Header.viewAppointments}
                </LdsLink>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
