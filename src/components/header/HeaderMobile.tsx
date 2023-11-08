'use client';

import Image from 'next/image';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { LdsButton, LdsIcon } from '@elilillyco/ux-lds-react';
import mockUserData from '@/mocks/mockUserData.json';
import {
  NavigationOptions,
  NavigationOption,
  gatedNavigationOptions,
  ungatedNavigationOptions,
} from '@/models/NavigationOptions';
import buttons from '@/scss/themes/buttons.module.scss';
import styles from './HeaderMobile.module.scss';
import headerSharedStyles from './HeaderShared.module.scss';

type HeaderMobileProps = {
  activeView: NavigationOption;
  isLoggedIn: boolean;
  signIn: () => void;
  signOut: () => void;
  handleNavigation: (arg0: NavigationOption) => void;
};

export default function HeaderMobile({
  activeView,
  isLoggedIn,
  signIn,
  signOut,
  handleNavigation,
}: HeaderMobileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  function buildNavigationButton(
    navigationOption: NavigationOption
  ): JSX.Element {
    return (
      <Button
        key={navigationOption.title}
        variant="contained"
        onClick={() => handleNavigation(navigationOption)}
        fullWidth
        className={
          activeView === navigationOption
            ? styles.navigationButtonActive
            : styles.navigationButton
        }
      >
        {navigationOption.title}
      </Button>
    );
  }

  function buildSignInUpSection(): JSX.Element {
    if (isLoggedIn) {
      return (
        <div className={styles.signInOutSection}>
          <Button
            onClick={() => handleNavigation(NavigationOptions.MyProfile)}
            className={
              activeView === NavigationOptions.MyProfile
                ? headerSharedStyles.myProfileButtonActive
                : headerSharedStyles.myProfileButton
            }
            data-testid="my-profile-button"
          >
            <Image
              src={
                activeView === NavigationOptions.MyProfile
                  ? '/icons/profile-active-icon.svg'
                  : '/icons/profile-icon.svg'
              }
              alt="ProfileIcon"
              width="35"
              height="35"
            />
            {NavigationOptions.MyProfile.title}
          </Button>
          <LdsButton onClick={signOut} classes={`${buttons.primary}`}>
            Sign out
          </LdsButton>
        </div>
      );
    }

    return (
      <div className={styles.signInOutSection}>
        <LdsButton onClick={signIn} classes={`${buttons.secondary}`}>
          Sign in
        </LdsButton>
        <LdsButton classes={`${buttons.primary}`}>Sign up</LdsButton>
      </div>
    );
  }

  function buildNavigationButtonSelection(): JSX.Element {
    if (isLoggedIn) {
      return (
        <div className={`${styles.grayBar} ${styles.buttons}`}>
          {gatedNavigationOptions.map((navigationOption) =>
            buildNavigationButton(navigationOption)
          )}
        </div>
      );
    }

    return (
      <div className={`${styles.grayBar} ${styles.buttons}`}>
        {ungatedNavigationOptions.map((navigationOption) =>
          buildNavigationButton(navigationOption)
        )}
      </div>
    );
  }

  function buildMenu(): JSX.Element {
    return (
      <div className={styles.menuContainer} data-testid="mobile-menu">
        <div className={styles.menu}>{buildNavigationButtonSelection()}</div>
        {buildSignInUpSection()}
      </div>
    );
  }

  function buildMenuButton(): JSX.Element {
    if (isMenuOpen) {
      return (
        <Button onClick={toggleMenuOpen} data-testid="mobile-menu-button">
          <div className={styles.closeMenuButton}>
            Close
            <LdsIcon className={styles.closeIcon} name="X" />
          </div>
        </Button>
      );
    }

    return (
      <Button onClick={toggleMenuOpen} data-testid="mobile-menu-button">
        <Image
          src="/icons/menu-hamburger-icon.svg"
          alt="MenuHamburgerIcon"
          width="31"
          height="44"
        />
      </Button>
    );
  }

  return (
    <div className={headerSharedStyles.background}>
      <div className={headerSharedStyles.whiteBar}>
        <Image
          src="/images/kisunla-logo.svg"
          alt="Kisunla Logo"
          width={152}
          height={59}
          priority
        />
        <div className={styles.topRightControls}>
          {isLoggedIn && (
            <div className={headerSharedStyles.userWelcome}>
              Hi {mockUserData.firstName}
            </div>
          )}
          {buildMenuButton()}
        </div>
      </div>
      {isMenuOpen && buildMenu()}
    </div>
  );
}
