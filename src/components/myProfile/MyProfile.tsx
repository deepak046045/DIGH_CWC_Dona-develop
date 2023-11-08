'use client';

import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import formatPhoneNumber from '@/utils/formatPhoneNumber';
import { useRouter } from 'next/navigation';
import {
  LdsButton,
  LdsModal,
  useLdsModal,
  LdsHorizontalRule,
} from '@elilillyco/ux-lds-react';
import modal from '@/scss/themes/modal.module.scss';
import buttons from '@/scss/themes/buttons.module.scss';
import { UserContext } from '@/context/UserContextProvider';
import mockUserData from '@/mocks/mockUserData.json';
import { ungatedNavigationOptions } from '@/models/NavigationOptions';
import { LdsModalType } from '@/models/LdsModal';
import styles from './MyProfile.module.scss';

export default function MyProfile() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { isModalOpen, setIsModalOpen } = useLdsModal() as LdsModalType;

  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn, setActiveView, setAlert } =
    useContext(UserContext);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    setIsModalOpen(false);
    setIsLoggedIn(false);
    setActiveView(ungatedNavigationOptions[0]);
    setAlert({
      isOpen: true,
      message: 'Your account has been successfully deleted.',
      level: 'success',
    });
    router.push('/');
  };
  const handleShowDialogBox = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>My profile</div>
      <div className={styles.mainContainer}>
        <div className={styles.profileIconContainer}>
          <Image
            src="/icons/profile-icon.svg"
            alt="ProfileIcon"
            width="29"
            height="29"
          />
          <div
            className={styles.profileIconDescription}
          >{`${mockUserData.firstName} ${mockUserData.lastName}`}</div>
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.detailsHeader}>FIRST NAME</div>
          <div className={styles.detailsValue}>{mockUserData.firstName}</div>
          <LdsHorizontalRule color="#ADB3B8" />
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.detailsHeader}>LAST NAME</div>
          <div className={styles.detailsValue}>{mockUserData.lastName}</div>
          <LdsHorizontalRule color="#ADB3B8" />
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.detailsHeader}>DATE OF BIRTH</div>
          <div className={styles.detailsValue}>{mockUserData.dateOfBirth}</div>
          <LdsHorizontalRule color="#ADB3B8" />
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.detailsHeader}>EMAIL ADDRESS</div>
          <div className={styles.detailsValue}>{mockUserData.email}</div>
          <LdsHorizontalRule color="#ADB3B8" />
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.detailsHeader}>MOBILE PHONE NUMBER</div>
          <div className={styles.detailsValue}>
            {formatPhoneNumber(mockUserData.mobilePhoneNumber)}
          </div>
          <LdsHorizontalRule color="#ADB3B8" />
        </div>
        <div className={styles.deleteContainer}>
          <LdsButton
            clearDefaultClasses
            classes={styles.deleteIconButton}
            onClick={handleShowDialogBox}
          >
            <Image
              src="/icons/delete-icon.svg"
              alt="DeleteIcon"
              width="19"
              height="19"
            />
            <div className={styles.deleteButtonLink}>Delete Account</div>
          </LdsButton>
          <div className={styles.deleteDescription}>
            Deleting your account only unregisters you from [sitename]. It does
            not affect your infusions. To stop taking Kisunla, talk to your
            doctor.
          </div>
        </div>
      </div>

      <div className={`${modal.primary}`}>
        <LdsModal
          modalId="confirmation-modal"
          open={isModalOpen}
          setModalOpen={setIsModalOpen}
        >
          <h2 className={modal.modalTitle}>Your account will be deleted</h2>
          <p className={modal.modalContent}>
            You and your care partners will lose access to your treatment plan,
            appointments and appointment reminders.
          </p>
          <div className={modal.modalActions}>
            <LdsButton
              classes={`${buttons.secondary}`}
              onClick={handleCancel}
              data-testid="cancel-btn"
            >
              Cancel
            </LdsButton>
            <LdsButton
              classes={`${buttons.primary}`}
              onClick={handleDelete}
              data-testid="yes-btn"
            >
              Yes, delete
            </LdsButton>
          </div>
        </LdsModal>
      </div>
    </div>
  );
}
