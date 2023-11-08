import { object, string, array, number } from 'yup';
import { AddAppointmentFormFields } from '@/shared/enums/AddAppointmentFormFields';
import { copyTexts } from '@/constants/copyTexts';

export const AddAppointmentValidationSchema = object().shape({
  [AddAppointmentFormFields.APPOINTMENT_TYPE]: string().required(
    copyTexts.AddAppointment.formErrors.appointmentType
  ),
  [AddAppointmentFormFields.INFUSION_NUMBER]: string(),
  [AddAppointmentFormFields.ADDRESS]: string()
    .required(copyTexts.AddAppointment.formErrors.fieldRequired)
    .max(150, copyTexts.AddAppointment.formErrors.addressExceedLimit),
  [AddAppointmentFormFields.SCHEDULE_DATE]: string()
    .required(copyTexts.AddAppointment.formErrors.invalidDate)
    .matches(
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
      copyTexts.AddAppointment.formErrors.invalidDate
    ),
  [AddAppointmentFormFields.SCHEDULE_TIME]: number()
    .required(copyTexts.AddAppointment.formErrors.invalidTime)
    .notOneOf([-1], copyTexts.AddAppointment.formErrors.invalidTime),
  [AddAppointmentFormFields.CARE_PARTNERS]: array().of(string()),
});
