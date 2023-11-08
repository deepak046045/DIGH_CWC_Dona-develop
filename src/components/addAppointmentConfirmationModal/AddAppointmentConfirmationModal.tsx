import React from 'react';
import { LdsModal, LdsButton, LdsIcon } from '@elilillyco/ux-lds-react';
import modal from '@/scss/themes/modal.module.scss';
import buttons from '@/scss/themes/buttons.module.scss';
import { copyTexts } from '@/constants/copyTexts';
import { useRouter } from 'next/navigation';
import { NavigationOptions } from '@/models/NavigationOptions';
import styles from './AddAppointmentConfirmationModal.module.scss';

type AddAppointmentConfirmationModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  handleAddNewAppointment: () => void;
};

export function AddAppointmentConfirmationModal({
  isModalOpen,
  setIsModalOpen,
  handleAddNewAppointment,
}: AddAppointmentConfirmationModalProps) {
  const router = useRouter();

  return (
    <div className={`${modal.primary} ${styles.modal}`}>
      <LdsModal
        modalId="addCarePartnerModal"
        open={isModalOpen}
        setModalOpen={setIsModalOpen}
        persistent
      >
        <div className={styles.closeModalButtonWrapper}>
          <LdsButton
            onClick={() => {
              router.push(NavigationOptions.MyAppointments.path);
            }}
            clearDefaultClasses
            data-testid="add-appointment-confirmation-x-button"
            className={styles.closeModalButton}
          >
            <LdsIcon name="X" className={styles.closeIcon} />
          </LdsButton>
        </div>
        <h2 className={modal.modalTitle}>
          {copyTexts.AddAppointment.confirmationModal.title}
        </h2>
        <div className={modal.modalActions}>
          <LdsButton
            classes={`${buttons.secondary}`}
            onClick={handleAddNewAppointment}
            data-testid="add-new-appointment-btn"
          >
            {copyTexts.AddAppointment.confirmationModal.secondaryButtonLabel}
          </LdsButton>
          <LdsButton
            classes={`${buttons.primary}`}
            onClick={() => {
              router.push(NavigationOptions.MyAppointments.path);
            }}
            data-testid="view-appointments-btn"
          >
            {copyTexts.AddAppointment.confirmationModal.primaryButtonLabel}
          </LdsButton>
        </div>
      </LdsModal>
    </div>
  );
}
