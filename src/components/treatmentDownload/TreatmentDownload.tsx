'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import { UserContext } from '@/context/UserContextProvider';
import { LdsButton, LdsHorizontalRule } from '@elilillyco/ux-lds-react';
import { copyTexts } from '@/constants/copyTexts';
import layout from '@/scss/themes/layout.module.scss';
import treatmentDownload from './treatmentDownload.module.scss';

export default function TreatmentDownload() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <div className={`${treatmentDownload.TreatmentDownload} ${layout.gutter}`}>
      {!isLoggedIn ? (
        <p className={treatmentDownload.TreatmentDownload__text}>
          {copyTexts.TreatmentDownload.reminderUngated}
        </p>
      ) : null}
      <p className={treatmentDownload.TreatmentDownload__text}>
        {isLoggedIn
          ? copyTexts.TreatmentDownload.downloadGated
          : copyTexts.TreatmentDownload.downloadUngated}
        {isLoggedIn ? (
          <LdsButton
            data-testid="print-button"
            classes={`${treatmentDownload['TreatmentDownload__map-download-btn']}`}
          >
            {copyTexts.TreatmentDownload.downloadButtonGated}
            <Image
              src="/icons/printer-icon.svg"
              alt="Printer Icon Download Button"
              width="24"
              height="24"
              className={`${treatmentDownload['TreatmentDownload__map-download-btn-icon']}`}
            />
          </LdsButton>
        ) : (
          <LdsButton
            data-testid="download-button"
            classes={`${treatmentDownload['TreatmentDownload__map-download-btn']}`}
          >
            {copyTexts.TreatmentDownload.downloadButtonUngated}
            <Image
              src="/icons/download-full-icon.svg"
              alt="Download Icon"
              width="19"
              height="19"
              className={`${treatmentDownload['TreatmentDownload__map-download-btn-icon']}`}
            />
          </LdsButton>
        )}
      </p>
      <div className={treatmentDownload.TreatmentDownload__divider}>
        <LdsHorizontalRule />
      </div>
    </div>
  );
}
