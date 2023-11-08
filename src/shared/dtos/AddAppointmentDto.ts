import { AddAppointmentFormFields } from '@/shared/enums/AddAppointmentFormFields';
import { AppointmentTypes } from '@/shared/enums/AppointmentTypes';

export type AddAppointmentDto = {
  [AddAppointmentFormFields.APPOINTMENT_TYPE]: AppointmentTypes;
};
