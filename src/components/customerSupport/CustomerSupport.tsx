'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import { LdsButton, LdsHorizontalRule } from '@elilillyco/ux-lds-react';
import layout from '@/scss/themes/layout.module.scss';
import buttons from '@/scss/themes/buttons.module.scss';
import { UserContext } from '@/context/UserContextProvider';
import styles from './CustomerSupport.module.scss';

export default function CustomerSupport() {
  const { isLoggedIn } = useContext(UserContext);

  const customerSupportSection: JSX.Element[] = [];

  if (!isLoggedIn) {
    customerSupportSection.push(
      <div className={`${styles.background}`}>
        <div
          className={`${styles.customerSupportSignUpSection} ${layout.gutter}`}
        >
          <div className={styles.customerSupportSignUpSectionHeader}>
            Let us assist you on your journey. Sign up on this website to
          </div>
          <div className={styles.customerSupportSignUpSectionIconGroup}>
            <div className={styles.customerSupportSignUpSectionIcon}>
              <Image
                src="/icons/circle-calendar-icon.svg"
                alt="CalendarIcon"
                width="60"
                height="60"
              />
              <div className={styles.customerSupportSignUpSectionText}>
                Personalize a calendar of your appointments
              </div>
            </div>
            <div className={styles.customerSupportSignUpSectionIcon}>
              <Image
                src="/icons/care-partners-icon.svg"
                alt="CarePartnersIcon"
                width="60"
                height="60"
              />
              <div className={styles.customerSupportSignUpSectionText}>
                Assign care partners to assist you along your journey
              </div>
            </div>
            <div className={styles.customerSupportSignUpSectionIcon}>
              <Image
                src="/icons/appointment-reminders-icon.svg"
                alt="AppointmentRemindersIcon"
                width="60"
                height="60"
              />
              <div className={styles.customerSupportSignUpSectionText}>
                Set up appointment reminders for you and your care partners
              </div>
            </div>
          </div>
          <LdsButton
            classes={`${buttons.primary}`}
            data-testid="sign-up-button"
          >
            Sign up now
          </LdsButton>
        </div>
      </div>
    );
  }

  customerSupportSection.push(
    <div className={`${styles.customerSupportSection} ${layout.gutter}`}>
      <div className={styles.customerSupportSectionLeft}>
        <div className={styles.customerSupportSectionLeftHeaderText}>
          Talk to a human
        </div>
        <div className={styles.customerSupportHorizontalRule}>
          <LdsHorizontalRule />
        </div>
        <div className={styles.customerSupportSectionLeftSubheaderText}>
          If you have other questions about your medication, please contact us!
        </div>
      </div>
      <div className={styles.customerSupportSectionRight}>
        <div className={styles.customerSupportSectionPhone}>
          <Image
            src="/icons/phone-icon.svg"
            alt="PhoneIcon"
            width="35"
            height="37"
          />
          <div className={styles.customerSupportSectionPhoneText}>
            1-844-825-8966
          </div>
        </div>
        <div className={styles.customerSupportSectionHours}>
          <Image
            src="/icons/purple-hours-icon.svg"
            alt="HoursIcon"
            width="35"
            height="35"
          />
          <div className={styles.customerSupportSectionHoursText}>
            Mon - Fri | 8:00 AM - 10:00 PM Eastern
          </div>
        </div>
      </div>
    </div>
  );

  return customerSupportSection;
}
