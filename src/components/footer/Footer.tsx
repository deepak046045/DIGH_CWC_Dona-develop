'use client';

import {
  LdsIsi,
  LdsFooter,
  LdsButton,
  LdsLink,
} from '@elilillyco/ux-lds-react';
import React from 'react';
import buttons from '@/scss/themes/buttons.module.scss';
import layout from '@/scss/themes/layout.module.scss';
import styles from './Footer.module.scss';
import { copyTexts } from '../../constants/copyTexts';

export default function Footer() {
  function buildISIComponent(): JSX.Element {
    return (
      <LdsIsi
        isiHeading="Important Safety Information"
        indicationHeading="Indication(s)"
        warningBlockHeading="Warnings "
        warningBlockParagraph="This is the warning block paragraph content"
        warningBlockContent={
          <>
            <p>This is content for the warning block</p>
            <ul>
              <li>
                Ipsum dolor sit amet consectetur adipiscing elit pellentesque
                habitant.
              </li>
              <li>
                Sociis natoque penatibus et magnis dis parturient montes
                nascetur.
              </li>
              <li>Proin fermentum leo vel orci porta non pulvinar.</li>
            </ul>
          </>
        }
        defaultContent={
          <>
            <div className="content-block">
              <h4>This is content for the default content block</h4>
              <p>
                Sociis natoque penatibus et magnis dis parturient montes
                nascetur.
              </p>
            </div>
            <div className="content-block">
              <p>
                Sociis natoque penatibus et magnis dis parturient montes
                nascetur.
              </p>
            </div>
          </>
        }
        indicationsContent={
          <div className="content-block">
            <p>
              Important Facts About BRAND<sup>®</sup> (PRO-nun-CI-a-tion). It
              is also known as pharmaceutical.
            </p>
            <p>
              Brand is a prescription medicine for people with the following
              indications; it is used to produce pharmaceutical effects.
            </p>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et.
              </li>
              <li>
                Dolore magna aliqua. Ut enim ad minim veniam, exercitation
                ullamco laboris nisi. Sapien pellentesque habitant morbi
                tristique senectus. Maecenas volutpat blandit aliquam etiam erat
                velit scelerisque in. Laoreet suspendisse interdum consectetur
                libero id faucibus nisl tincidunt. Nulla facilisi cras fermentum
                odio. Non quam lacus suspendisse faucibus interdum posuere. Arcu
                odio ut sem nulla. Vel quam elementum pulvinar etiam non quam.
              </li>
              <li>
                Sit amet nisl purus in mollis nunc sed id. Eget arcu dictum
                varius duis at consectetur. Rhoncus aenean vel elit scelerisque
                mauris. Urna nec tincidunt praesent semper feugiat nibh sed
                pulvinar. Tincidunt id aliquet risus feugiat in. Ut sem nulla
                pharetra diam. Pellentesque elit ullamcorper dignissim cras
                tincidunt lobortis feugiat. Mattis rhoncus urna neque viverra
                justo. Varius vel pharetra vel turpis nunc.
              </li>
              <li>
                Augue lacus viverra vitae congue eu. Tincidunt arcu non sodales
                neque. Pellentesque dignissim enim sit amet venenatis. Donec ac
                odio tempor orci dapibus ultrices.
              </li>
            </ul>
          </div>
        }
        hiddenIsiPanelExpandText="Important Safety Information and Indication or Indications. Select to Expand."
        hiddenIsiPanelCollapseText="Important Safety Information and Indication or Indications. Select to Collapse."
        hiddenIsiContentCollapseText="Important Safety Information. Select to Collapse."
        hiddenIsiContentExpandText="Important Safety Information. Select to Expand."
        hiddenIsiIndicationsCollapseText="Indication or Indications. Select to Collapse."
        hiddenIsiIndicationsExpandText="Indication or Indications. Select to Expand"
      />
    );
  }

  function buildFooterComponent(): JSX.Element {
    return (
      <div className={styles.footer}>
        <div className={layout.gutter}>
          <LdsFooter>
            <LdsFooter.LegalInfo>
              <div className={styles.legalInfo}>
                <p className={styles.white}>
                  This site is intended for US residents ages 18 and older.
                  <br />
                  [Brand Name]™ is a registered trademark owned or licensed by
                  Eli Lilly and Company, its subsidiaries, or affiliates.
                  <br />
                  XX-XX-XX-XXXX MM/YYYY{' '}
                  <LdsLink
                    className={styles.white}
                    href="https://www.lillyhub.com/legal/lillyusa/english/copyright.html"
                  >
                    ©Lilly USA, LLC 2023. All rights reserved.
                  </LdsLink>
                </p>
                <div className={`${styles.white} ${styles.desktopSupportInfo}`}>
                  <strong>Questions? Call [Brand Name]™</strong>
                  <br />
                  [Brand Customer Support Number]
                  <br />
                  [Brand Operating Hours]
                </div>
              </div>
            </LdsFooter.LegalInfo>
            <LdsFooter.PrimaryLinks>
              <div className={styles.mobileButton}>
                <LdsFooter.PrimaryLinks.Item>
                  <LdsButton classes={`${buttons.primary}`}>
                    {copyTexts.Footer.saveToDeviceHomeButton}
                  </LdsButton>
                </LdsFooter.PrimaryLinks.Item>
              </div>
              <LdsFooter.PrimaryLinks.Item>
                <LdsLink className={styles.white} href="#">
                  {copyTexts.Footer.primaryLinks.prescribingInformation}
                </LdsLink>
              </LdsFooter.PrimaryLinks.Item>
              <LdsFooter.PrimaryLinks.Item>
                <LdsLink className={styles.white} href="#">
                  {copyTexts.Footer.primaryLinks.medicationGuide}
                </LdsLink>
              </LdsFooter.PrimaryLinks.Item>
            </LdsFooter.PrimaryLinks>
            <LdsFooter.GlobalLinks>
              <LdsLink
                className={styles.white}
                href="https://www.lillyhub.com/legal/lillyusa/english/privacy.html"
              >
                {copyTexts.Footer.globalLinks.privacyPolicy}
              </LdsLink>
              <LdsLink
                className={styles.white}
                href="https://www.lillyhub.com/legal/lillyusa/english/termsofuse.html"
              >
                {copyTexts.Footer.globalLinks.termsOfUse}
              </LdsLink>
              <LdsLink
                className={styles.white}
                href="https://www.lillyhub.com/ux/lillyusa/english/accessibility.html"
              >
                {copyTexts.Footer.globalLinks.accessibilityStatement}
              </LdsLink>
            </LdsFooter.GlobalLinks>
            <LdsFooter.SupportInfo>
              <div className={`${styles.supportInfo}`}>
                <LdsButton
                  classes={`${buttons.primary} ${styles.desktopButton}`}
                >
                  {copyTexts.Footer.saveToDeviceHomeButton}
                </LdsButton>
                <div className={`${styles.white} ${styles.mobileSupportInfo}`}>
                  <strong>Questions? Call [Brand Name]™</strong>
                  <br />
                  [Brand Customer Support Number]
                  <br />
                  [Brand Operating Hours]
                </div>
              </div>
            </LdsFooter.SupportInfo>
            <LdsFooter.SocialMedia classes={`${styles.socialMedia}`} />
            <LdsFooter.LogoOverride>
              <LdsLink href="https://www.lilly.com/">
                <img src="/images/lilly-logo-white.svg" alt="lilly-logo" />
              </LdsLink>
            </LdsFooter.LogoOverride>
          </LdsFooter>
        </div>
      </div>
    );
  }

  return (
    <div>
      {buildISIComponent()}
      {buildFooterComponent()}
    </div>
  );
}
