'use client';

import Image from 'next/image';
import { Button, Divider } from '@mui/material';
import { LdsButton, LdsSticky } from '@elilillyco/ux-lds-react';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContextProvider';
import mockUserData from '@/mocks/mockUserData.json';
import HeaderMobile from '@/components/header/HeaderMobile';
import buttons from '@/scss/themes/buttons.module.scss';
import layout from '@/scss/themes/layout.module.scss';
import {
  NavigationOptions,
  NavigationOption,
  gatedNavigationOptions,
  ungatedNavigationOptions,
} from '@/models/NavigationOptions';
import { copyTexts } from '@/constants/copyTexts';
import headerSharedStyles from './HeaderShared.module.scss';
import headerStyles from './Header.module.scss';

export function Header() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { isLoggedIn, setIsLoggedIn, activeView, setActiveView } =
    useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    setIsMobile(window.innerWidth <= 767);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const signIn = (): void => {
    setIsLoggedIn(true);
    setActiveView(gatedNavigationOptions[0]);
  };

  const signOut = (): void => {
    setIsLoggedIn(false);
    setActiveView(ungatedNavigationOptions[0]);
    router.push('/');
  };

  const handleNavigation = (navigationOption: NavigationOption) => {
    setActiveView(navigationOption);
    router.push(navigationOption.path);
  };

  function buildNavigationButton(
    navigationOption: NavigationOption
  ): JSX.Element {
    return (
      <Button
        key={navigationOption.title}
        variant="contained"
        onClick={() => handleNavigation(navigationOption)}
        className={
          activeView === navigationOption
            ? headerStyles.navigationButtonActive
            : headerStyles.navigationButton
        }
      >
        {navigationOption.title}
      </Button>
    );
  }

  function buildNavigationButtonSelection(): JSX.Element {
    if (isLoggedIn) {
      return (
        <div className={`${headerStyles.grayBar} ${headerStyles.buttons}`}>
          {gatedNavigationOptions.map((navigationOption) =>
            buildNavigationButton(navigationOption)
          )}
        </div>
      );
    }

    return (
      <div className={`${headerStyles.grayBar} ${headerStyles.buttons}`}>
        {ungatedNavigationOptions.map((navigationOption) =>
          buildNavigationButton(navigationOption)
        )}
      </div>
    );
  }

  function buildSignInUpSection(): JSX.Element {
    if (isLoggedIn) {
      return (
        <div className={`${headerStyles.buttons}`}>
          <div className={headerSharedStyles.userWelcome}>
            Hi {mockUserData.firstName}
          </div>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className={headerStyles.buttonDivider}
          />
          <Button
            onClick={() => handleNavigation(NavigationOptions.MyProfile)}
            className={
              activeView === NavigationOptions.MyProfile
                ? headerSharedStyles.myProfileButtonActive
                : headerSharedStyles.myProfileButton
            }
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
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className={headerStyles.buttonDivider}
          />
          <LdsButton
            onClick={signOut}
            data-testid="sign-out-button"
            classes={`${buttons.primary}`}
          >
            {copyTexts.Header.signOut}
          </LdsButton>
        </div>
      );
    }

    return (
      <div className={headerStyles.buttons}>
        <LdsButton
          onClick={signIn}
          data-testid="sign-in-button"
          classes={`${buttons.secondary}`}
        >
          {copyTexts.Header.signIn}
        </LdsButton>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          className={headerStyles.buttonDivider}
        />
        <LdsButton classes={`${buttons.primary}`}>
          {copyTexts.Header.signUp}
        </LdsButton>
      </div>
    );
  }

  return (
    <LdsSticky>
      {isMobile ? (
        <HeaderMobile
          isLoggedIn={isLoggedIn}
          signIn={signIn}
          signOut={signOut}
          activeView={activeView}
          handleNavigation={handleNavigation}
        />
      ) : (
        <div className={headerSharedStyles.background}>
          <div className={`${headerSharedStyles.whiteBar} ${layout.gutter}`}>
            <Image
              src="/images/kisunla-logo.svg"
              alt="Kisunla Logo"
              width={297}
              height={98}
              priority
            />
            {buildSignInUpSection()}
          </div>
          {buildNavigationButtonSelection()}
        </div>
      )}
    </LdsSticky>
  );
}
