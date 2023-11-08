'use client';

import React, { useContext } from 'react';
import { LdsButton, LdsImage } from '@elilillyco/ux-lds-react';
import { UserContext } from '@/context/UserContextProvider';
import layout from '@/scss/themes/layout.module.scss';
import typography from '@/scss/themes/typography.module.scss';
import buttons from '@/scss/themes/buttons.module.scss';
import { copyTexts } from '@/constants/copyTexts';
import styles from './WelcomeSection.module.scss';

export default function WelcomeSection() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <div className={`${styles.background}`}>
      <div className={`${styles.welcomeSection} ${layout.gutter}`}>
        <div className={styles.image_wrapper}>
          <LdsImage
            className={styles.image}
            src="/images/elderly-group-smiling.png"
            alt="ElderlyGroupSmiling"
          />
        </div>
        <div className={styles.welcomeSectionRightSide}>
          <div
            className={`${styles.welcomeSectionHeaderText} ${typography.themeTypographyH1}`}
          >
            {!isLoggedIn
              ? copyTexts.WelcomeSection.welcomeHeaderTextUngated
              : copyTexts.WelcomeSection.welcomeHeaderTextGated}
          </div>
          <div className={`${styles.welcomeSectionSubHeaderText}`}>
            {!isLoggedIn
              ? copyTexts.WelcomeSection.welcomeSubHeaderTextUngated
              : copyTexts.WelcomeSection.welcomeSubHeaderTextGated}
          </div>
          {!isLoggedIn && (
            <LdsButton
              data-testid="sign-up-button"
              classes={`${buttons.primary}`}
            >
              Sign up now
            </LdsButton>
          )}
        </div>
      </div>
    </div>
  );
}
