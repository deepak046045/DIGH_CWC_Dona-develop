import { AddAppointmentFormFields } from '@/shared/enums/AddAppointmentFormFields';
import { AppointmentTypes } from '@/shared/enums/AppointmentTypes';

export type AddAppointmentForm = {
  [AddAppointmentFormFields.APPOINTMENT_TYPE]: AppointmentTypes | '';
  [AddAppointmentFormFields.INFUSION_NUMBER]: string;
  [AddAppointmentFormFields.ADDRESS]: string;
  [AddAppointmentFormFields.SCHEDULE_DATE]: string;
  [AddAppointmentFormFields.SCHEDULE_TIME]: number;
  [AddAppointmentFormFields.CARE_PARTNERS]: string[];
};
