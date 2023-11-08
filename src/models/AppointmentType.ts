import { AppointmentTypes } from '@/shared/enums/AppointmentTypes';

export type AppointmentType = {
  name: AppointmentTypes;
  count?: number;
};

export const APPOINTMENT_ICONS: { [key in AppointmentTypes]: string } = {
  [AppointmentTypes.INFUSION]: '/icons/iv-infusion-icon.svg',
  [AppointmentTypes.GENERAL_DOCTOR]:
    '/icons/general-practicioner-check-in-icon.svg',
  [AppointmentTypes.NEUROLOGIST]: '/icons/neurologist-icon.svg',
  [AppointmentTypes.SAFETY_MRI]: '/icons/safety-mri-icon.svg',
};
