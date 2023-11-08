import { AddAppointmentFormFields } from '@/shared/enums/AddAppointmentFormFields';
import { AddAppointmentForm } from '@/models/AddAppointmentForm';

export const AddAppointmentInitValues: AddAppointmentForm = {
  [AddAppointmentFormFields.APPOINTMENT_TYPE]: '',
  [AddAppointmentFormFields.INFUSION_NUMBER]: '',
  [AddAppointmentFormFields.ADDRESS]: '',
  [AddAppointmentFormFields.SCHEDULE_DATE]: '',
  [AddAppointmentFormFields.SCHEDULE_TIME]: -1,
  [AddAppointmentFormFields.CARE_PARTNERS]: [],
};
