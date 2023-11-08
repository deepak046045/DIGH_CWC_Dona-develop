import React, { useEffect, useRef, useState } from 'react';
import {
  LdsModal,
  LdsButton,
  LdsTextField,
  LdsValidationError,
  LdsIcon,
  LdsAlert,
} from '@elilillyco/ux-lds-react';
import modal from '@/scss/themes/modal.module.scss';
import buttons from '@/scss/themes/buttons.module.scss';
import { copyTexts } from '@/constants/copyTexts';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import {
  AddCarePartnerForm,
  AddCarePartnerInitValues,
} from '@/forms/addCarePartnerForm/AddCarePartnerForm';
import { AddCarePartnerValidationSchema } from '@/forms/addCarePartnerForm/AddCarePartnerFormValidation';
import styles from './AddCarePartnerModal.module.scss';

type AddCarePartnerModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  onSubmit: (values: AddCarePartnerForm) => void;
};

export function AddCarePartnerModal({
  isModalOpen,
  setIsModalOpen,
  onSubmit,
}: AddCarePartnerModalProps) {
  const formikRef = useRef<FormikProps<AddCarePartnerForm>>(null);
  const [isConfirmClose, setIsConfirmClose] = useState(false);

  const handleCloseModal = () => {
    if (formikRef.current?.dirty && !isConfirmClose) {
      setIsConfirmClose(true);
    } else {
      setIsModalOpen(false);
      setIsConfirmClose(false);
    }
  };

  const formSubmit = (
    values: AddCarePartnerForm,
    { setSubmitting }: FormikHelpers<AddCarePartnerForm>
  ) => {
    onSubmit(values);
    setIsConfirmClose(false);
    setSubmitting(false);
  };

  useEffect(() => {
    if (isModalOpen && formikRef.current) {
      formikRef.current.resetForm();
    }
  }, [isModalOpen]);

  return (
    <div className={`${modal.primary} ${styles.modal}`}>
      <LdsModal
        modalId="addCarePartnerModal"
        open={isModalOpen}
        setModalOpen={setIsModalOpen}
        persistent
      >
        {isConfirmClose ? (
          <div
            className={styles.notSavedAlert}
            data-testid="care-partner-close-warning"
          >
            <LdsAlert level="warning" inline>
              <div className={styles.notSavedAlertContent}>
                <div>
                  <strong>
                    {copyTexts.AddCarePartnerModal.notSavedWarning}
                  </strong>
                  &nbsp;{copyTexts.AddCarePartnerModal.allDetailsLost}
                </div>
                <LdsButton
                  classes={`${buttons.secondary} ${styles.closeAnywayButton}`}
                  onClick={handleCloseModal}
                  data-testid="care-partner-close-anyway-btn"
                >
                  {copyTexts.AddCarePartnerModal.closeAnywayButton}
                </LdsButton>
              </div>
            </LdsAlert>
          </div>
        ) : (
          <div className={styles.closeModalButtonWrapper}>
            <LdsButton
              onClick={handleCloseModal}
              clearDefaultClasses
              className={styles.closeModalButton}
            >
              <LdsIcon name="X" className={styles.closeIcon} />
            </LdsButton>
          </div>
        )}
        <h2 className={modal.modalTitle}>
          {copyTexts.AddCarePartnerModal.title}
        </h2>
        <Formik
          innerRef={formikRef}
          initialValues={AddCarePartnerInitValues}
          validationSchema={AddCarePartnerValidationSchema}
          onSubmit={formSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formContent}>
                <div>
                  <LdsTextField
                    id="name"
                    label={copyTexts.AddCarePartnerModal.name}
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name && touched.name}
                  />
                  {errors.name && touched.name && (
                    <LdsValidationError id="errName">
                      {errors.name}
                    </LdsValidationError>
                  )}
                </div>
                <div>
                  <LdsTextField
                    id="emailAddress"
                    label={copyTexts.AddCarePartnerModal.email}
                    name="emailAddress"
                    value={values.emailAddress}
                    onChange={handleChange}
                    error={errors.emailAddress && touched.emailAddress}
                  />
                  {errors.emailAddress && touched.emailAddress && (
                    <LdsValidationError id="errEmailAddress">
                      {errors.emailAddress}
                    </LdsValidationError>
                  )}
                </div>
              </div>
              <div className={modal.modalActions}>
                <LdsButton
                  classes={`${buttons.secondary}`}
                  onClick={handleCloseModal}
                >
                  {copyTexts.AddCarePartnerModal.cancelButton}
                </LdsButton>
                <LdsButton
                  type="submit"
                  classes={`${buttons.primary}`}
                  data-testid="add-care-partner-save-button"
                >
                  {copyTexts.AddCarePartnerModal.saveButton}
                </LdsButton>
              </div>
            </form>
          )}
        </Formik>
      </LdsModal>
    </div>
  );
}
