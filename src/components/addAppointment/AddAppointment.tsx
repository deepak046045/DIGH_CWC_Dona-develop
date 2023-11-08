'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import { AppointmentTypes } from '@/shared/enums/AppointmentTypes';
import { AddAppointmentFormFields } from '@/shared/enums/AddAppointmentFormFields';
import { TimePicker } from '@/components/timePicker/TimePicker';
import {
  LdsButton,
  LdsCheckbox,
  LdsCheckboxGroup,
  LdsDatepicker,
  LdsRadio,
  LdsRadioGroup,
  LdsSelect,
  LdsTextField,
  LdsValidationError,
  useLdsModal,
} from '@elilillyco/ux-lds-react';
import { LdsDatePickerStartOfWeekDays } from '@/models/ldsTypes/LdsDatePickerStartOfWeekDays';
import { AddAppointmentForm } from '@/models/AddAppointmentForm';
import { AddAppointmentValidationSchema } from '@/forms/addAppointmentForm/AddAppointmentValidation';
import { AddAppointmentInitValues } from '@/forms/addAppointmentForm/AddAppointmentInitValues';
import { copyTexts } from '@/constants/copyTexts';
import { AppointmentTypeSelectOptions } from '@/forms/addAppointmentForm/AppointmentTypeSelectOptions';
import { DatePickerEngTranslation } from '@/forms/addAppointmentForm/DatePickerEngTranslation';
import { NavigationOptions } from '@/models/NavigationOptions';
import { isUserFirstInfusionTypeAppointment } from '@/utils/isUserFirstInfusionTypeAppointment';
import layout from '@/scss/themes/layout.module.scss';
import buttons from '@/scss/themes/buttons.module.scss';
import { LdsModalType } from '@/models/LdsModal';
import { AddCarePartnerForm } from '@/forms/addCarePartnerForm/AddCarePartnerForm';
import { CarePartner } from '@/models/CarePartner';
import { UserContext } from '@/context/UserContextProvider';
import { AppointmentType } from '@/models/AppointmentType';
import styles from './AddAppointment.module.scss';
import { AddCarePartnerModal } from '../addCarePartnerModal/AddCarePartnerModal';

export default function AddAppointment() {
  const router = useRouter();
  const { carePartners, setCarePartners } = useContext(UserContext);
  const { appointments, setAppointments } = useContext(UserContext);

  const knownInfusionAppointmentsCount = 0;

  const isUserFirstInfusionAppointment = isUserFirstInfusionTypeAppointment(
    knownInfusionAppointmentsCount
  );

  const selectInputHandler = async (
    data: { label: string; value: string },
    fieldName: string,
    setFieldValue: FormikHelpers<AddAppointmentForm>['setFieldValue']
  ) => {
    await setFieldValue(fieldName, data.value, false);
  };

  const datePickerChangeHandler = async (
    data: string | React.SyntheticEvent,
    fieldName: string,
    setFieldValue: FormikHelpers<AddAppointmentForm>['setFieldValue']
  ) => {
    if (typeof data !== 'string' && data.target) {
      await setFieldValue(fieldName, data.target.value);
      return;
    }
    await setFieldValue(fieldName, data);
  };

  const {
    isModalOpen: isAddCarePartnerModalOpen,
    setIsModalOpen: setIsAddCarePartnerModalOpen,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  } = useLdsModal() as LdsModalType;

  const combineDateAndTime = (date: string, time: number) => {
    const scheduleDate = new Date(date);
    const [hoursStr, minutesStr] = time.toString().split('.');
    const hours = parseInt(hoursStr, 10);
    const minutes = minutesStr ? parseInt(minutesStr.padEnd(2, '0'), 10) : 0;
    scheduleDate.setHours(hours, minutes, 0, 0);
    return scheduleDate;
  };

  const formik = useFormik({
    initialValues: AddAppointmentInitValues,
    validationSchema: AddAppointmentValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      const combinedDate = combineDateAndTime(
        formik.values[AddAppointmentFormFields.SCHEDULE_DATE],
        formik.values[AddAppointmentFormFields.SCHEDULE_TIME]
      );

      const formCarePartners = formik.values[
        AddAppointmentFormFields.CARE_PARTNERS
      ]
        .map((id) => carePartners.find((carePartner) => carePartner.id === id))
        .filter((carePartner): carePartner is CarePartner => !!carePartner);

      const newAppointment = {
        id: `${appointments.length + 1}`,
        date: combinedDate,
        address: formik.values[AddAppointmentFormFields.ADDRESS],
        type: {
          name: formik.values[AddAppointmentFormFields.APPOINTMENT_TYPE],
          count: +formik.values[AddAppointmentFormFields.INFUSION_NUMBER],
        } as AppointmentType,
        carePartners: formCarePartners,
      };
      setAppointments([...appointments, newAppointment]);

      router.push('/addAppointmentFormModal');
    },
  });

  const cancelButtonHandler = () => {
    router.push(NavigationOptions.MyAppointments.path);
  };

  const handleAddCarePartnerSubmit = async (values: AddCarePartnerForm) => {
    const newCarePartner: CarePartner = {
      id: `${carePartners.length + 1}`,
      name: values.name,
      email: values.emailAddress,
    };
    setCarePartners([...carePartners, newCarePartner]);
    await formik.setFieldValue(AddAppointmentFormFields.CARE_PARTNERS, [
      ...formik.values[AddAppointmentFormFields.CARE_PARTNERS],
      newCarePartner.id,
    ]);
    setIsAddCarePartnerModalOpen(false);
  };

  return (
    <section className={`${styles.AddAppointment} ${layout.gutter__form}`}>
      <h1 className={styles.AddAppointment__title}>
        {copyTexts.AddAppointment.title}
      </h1>
      <p className={styles.AddAppointment__text}>
        {copyTexts.AddAppointment.subtitle}
      </p>
      <FormikProvider value={formik}>
        <Form
          data-testid="add-appointment-form"
          onSubmit={(ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault();
            ev.stopPropagation();
          }}
        >
          <div className={styles.AddAppointment__form_select_input}>
            <LdsSelect
              id={`${AddAppointmentFormFields.APPOINTMENT_TYPE}-select`}
              label={copyTexts.AddAppointment.labels.appointmentType}
              name={AddAppointmentFormFields.APPOINTMENT_TYPE}
              options={AppointmentTypeSelectOptions}
              value={formik.values[AddAppointmentFormFields.APPOINTMENT_TYPE]}
              error={
                formik.touched[AddAppointmentFormFields.APPOINTMENT_TYPE] &&
                !!formik.errors[AddAppointmentFormFields.APPOINTMENT_TYPE]
              }
              ariaDescribedBy={`${AddAppointmentFormFields.APPOINTMENT_TYPE}-select-error`}
              onChange={async (data: { label: string; value: string }) =>
                selectInputHandler(
                  data,
                  AddAppointmentFormFields.APPOINTMENT_TYPE,
                  formik.setFieldValue
                )
              }
            />
            {formik.touched[AddAppointmentFormFields.APPOINTMENT_TYPE] &&
            !!formik.errors[AddAppointmentFormFields.APPOINTMENT_TYPE] ? (
              <LdsValidationError
                id={`${AddAppointmentFormFields.APPOINTMENT_TYPE}-select-error`}
              >
                {formik.errors[AddAppointmentFormFields.APPOINTMENT_TYPE]}
              </LdsValidationError>
            ) : null}
          </div>
          <LdsRadioGroup
            label={copyTexts.AddAppointment.labels.appointmentType}
          >
            <div className={styles.AddAppointment__form_radio_inputs_landscape}>
              {formik.touched[AddAppointmentFormFields.APPOINTMENT_TYPE] &&
              !!formik.errors[AddAppointmentFormFields.APPOINTMENT_TYPE] ? (
                <div
                  className={
                    styles.AddAppointment__form_radio_inputs_landscape_error
                  }
                >
                  <LdsValidationError
                    id={`${AddAppointmentFormFields.APPOINTMENT_TYPE}-error`}
                  >
                    {formik.errors[AddAppointmentFormFields.APPOINTMENT_TYPE]}
                  </LdsValidationError>
                </div>
              ) : null}
              {Object.values(AppointmentTypes).map(
                (appointmentType: AppointmentTypes) => (
                  <LdsRadio
                    id={`${appointmentType}-radio-id`}
                    key={`${appointmentType}-radio-key`}
                    label={
                      copyTexts.AddAppointment.selectOptionLabels[
                        appointmentType
                      ]
                    }
                    name={AddAppointmentFormFields.APPOINTMENT_TYPE}
                    value={appointmentType}
                    error={
                      formik.touched[
                        AddAppointmentFormFields.APPOINTMENT_TYPE
                      ] &&
                      !!formik.errors[AddAppointmentFormFields.APPOINTMENT_TYPE]
                    }
                    defaultChecked={
                      formik.values[
                        AddAppointmentFormFields.APPOINTMENT_TYPE
                      ] === appointmentType
                    }
                    onChange={formik.handleChange}
                  />
                )
              )}
            </div>
          </LdsRadioGroup>
          {isUserFirstInfusionAppointment &&
          formik.values[AddAppointmentFormFields.APPOINTMENT_TYPE] ===
            AppointmentTypes.INFUSION ? (
            <div
              className={`${styles.AddAppointment__form_text_input} ${styles.AddAppointment__form_text_input_third}`}
            >
              <LdsTextField
                id={`${AddAppointmentFormFields.INFUSION_NUMBER}-id`}
                name={AddAppointmentFormFields.INFUSION_NUMBER}
                value={formik.values[AddAppointmentFormFields.INFUSION_NUMBER]}
                label={copyTexts.AddAppointment.labels.infusionNumber}
                onChange={formik.handleChange}
              />
            </div>
          ) : null}
          <div className={styles.AddAppointment__form_text_input}>
            <LdsTextField
              id={`${AddAppointmentFormFields.ADDRESS}-id`}
              name={AddAppointmentFormFields.ADDRESS}
              label={copyTexts.AddAppointment.labels.address}
              value={formik.values[AddAppointmentFormFields.ADDRESS]}
              ariaDescribedBy={`${AddAppointmentFormFields.ADDRESS}-error`}
              error={
                formik.touched[AddAppointmentFormFields.ADDRESS] &&
                !!formik.errors[AddAppointmentFormFields.ADDRESS]
              }
              onChange={formik.handleChange}
            />
            {formik.touched[AddAppointmentFormFields.ADDRESS] &&
            !!formik.errors[AddAppointmentFormFields.ADDRESS] ? (
              <LdsValidationError
                id={`${AddAppointmentFormFields.ADDRESS}-error`}
              >
                {formik.errors[AddAppointmentFormFields.ADDRESS]}
              </LdsValidationError>
            ) : null}
          </div>
          <div className={styles.AddAppointment__form_schedule}>
            <div
              className={`${styles.AddAppointment__form_schedule_date_picker} ${
                formik.touched[AddAppointmentFormFields.SCHEDULE_DATE] &&
                !!formik.errors[AddAppointmentFormFields.SCHEDULE_DATE]
                  ? styles.error
                  : ''
              }`}
            >
              <LdsDatepicker
                id={`${AddAppointmentFormFields.SCHEDULE_DATE}-id`}
                label={copyTexts.AddAppointment.labels.date}
                hint={copyTexts.AddAppointment.hints.date}
                startOfWeek={LdsDatePickerStartOfWeekDays.SUNDAY}
                defaultValue={
                  formik.values[AddAppointmentFormFields.SCHEDULE_DATE]
                }
                error={
                  formik.touched[AddAppointmentFormFields.SCHEDULE_DATE] &&
                  !!formik.errors[AddAppointmentFormFields.SCHEDULE_DATE]
                }
                onChange={async (data: string | React.SyntheticEvent) =>
                  datePickerChangeHandler(
                    data,
                    AddAppointmentFormFields.SCHEDULE_DATE,
                    formik.setFieldValue
                  )
                }
                min={new Date().toISOString().slice(0, 10)}
                max=""
                translation={DatePickerEngTranslation}
              />
              {formik.touched[AddAppointmentFormFields.SCHEDULE_DATE] &&
              !!formik.errors[AddAppointmentFormFields.SCHEDULE_DATE] ? (
                <LdsValidationError
                  id={`${AddAppointmentFormFields.SCHEDULE_DATE}-error`}
                >
                  {formik.errors[AddAppointmentFormFields.SCHEDULE_DATE]}
                </LdsValidationError>
              ) : null}
            </div>
            <div className={styles.AddAppointment__form_schedule_time_picker}>
              <TimePicker
                name={AddAppointmentFormFields.SCHEDULE_TIME}
                label={copyTexts.AddAppointment.labels.time}
                hint={copyTexts.AddAppointment.hints.time}
                value={formik.values[AddAppointmentFormFields.SCHEDULE_TIME]}
                error={
                  formik.touched[AddAppointmentFormFields.SCHEDULE_TIME] &&
                  !!formik.errors[AddAppointmentFormFields.SCHEDULE_TIME]
                }
                handleInputChange={async (data) => {
                  await formik.setFieldValue(
                    AddAppointmentFormFields.SCHEDULE_TIME,
                    data,
                    false
                  );
                }}
              />
              {formik.touched[AddAppointmentFormFields.SCHEDULE_TIME] &&
              !!formik.errors[AddAppointmentFormFields.SCHEDULE_TIME] ? (
                <LdsValidationError
                  id={`${AddAppointmentFormFields.SCHEDULE_TIME}-error`}
                >
                  {formik.errors[AddAppointmentFormFields.SCHEDULE_TIME]}
                </LdsValidationError>
              ) : null}
            </div>
          </div>
          <LdsCheckboxGroup
            class
            label={copyTexts.AddAppointment.labels.carePartners}
          >
            <div className={styles.AddAppointment__form_checkbox_group}>
              {carePartners
                .sort((a, b) =>
                  a.name.localeCompare(b.name, undefined, { numeric: true })
                )
                .map((carePartner) => (
                  <div
                    key={`${AddAppointmentFormFields.CARE_PARTNERS}-${carePartner.id}`}
                    className={styles.AddAppointment__form_checkbox_group_check}
                  >
                    <LdsCheckbox
                      label={carePartner.name}
                      name={AddAppointmentFormFields.CARE_PARTNERS}
                      value={carePartner.id}
                      defaultChecked={formik.values[
                        AddAppointmentFormFields.CARE_PARTNERS
                      ].includes(carePartner.id)}
                      onChange={formik.handleChange}
                    />
                  </div>
                ))}
              <LdsButton
                clearDefaultClasses
                classes={styles.AddAppointment__form_checkbox_group_add_btn}
                type="button"
                onClick={() => setIsAddCarePartnerModalOpen(true)}
                data-testid="add-care-partner-button"
              >
                <Image
                  className={
                    styles.AddAppointment__form_checkbox_group_add_btn_icon
                  }
                  src="/icons/heart-icon-orange.svg"
                  alt="heart icon"
                  width="24"
                  height="24"
                />
                <span
                  className={
                    styles.AddAppointment__form_checkbox_group_add_btn_text
                  }
                >
                  {copyTexts.AddAppointment.addCarePartnerBtn}
                </span>
              </LdsButton>
            </div>
          </LdsCheckboxGroup>
          <div className={styles.AddAppointment__form_buttons_wrapper}>
            <LdsButton
              id="mySubmitId"
              data-testid="add-appointment-button"
              classes={`${buttons.primary} ${styles.AddAppointment__form_buttons}`}
              type="submit"
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              {copyTexts.AddAppointment.saveBtn}
            </LdsButton>
            <LdsButton
              classes={`${buttons.secondary} ${styles.AddAppointment__form_buttons}`}
              type="button"
              onClick={cancelButtonHandler}
              data-testid="add-appointment-form-cancel-button"
            >
              {copyTexts.AddAppointment.cancelBtn}
            </LdsButton>
          </div>
        </Form>
      </FormikProvider>
      <AddCarePartnerModal
        isModalOpen={isAddCarePartnerModalOpen}
        setIsModalOpen={setIsAddCarePartnerModalOpen}
        onSubmit={handleAddCarePartnerSubmit}
      />
    </section>
  );
}
