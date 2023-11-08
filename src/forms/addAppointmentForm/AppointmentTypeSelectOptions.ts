import { AppointmentTypes } from '@/shared/enums/AppointmentTypes';
import { copyTexts } from '@/constants/copyTexts';

export const AppointmentTypeSelectOptions = [
  { value: '', label: '' },
  {
    value: AppointmentTypes.INFUSION,
    label:
      copyTexts.AddAppointment.selectOptionLabels[AppointmentTypes.INFUSION],
  },
  {
    value: AppointmentTypes.SAFETY_MRI,
    label:
      copyTexts.AddAppointment.selectOptionLabels[AppointmentTypes.SAFETY_MRI],
  },
  {
    value: AppointmentTypes.NEUROLOGIST,
    label:
      copyTexts.AddAppointment.selectOptionLabels[AppointmentTypes.NEUROLOGIST],
  },
  {
    value: AppointmentTypes.GENERAL_DOCTOR,
    label:
      copyTexts.AddAppointment.selectOptionLabels[
        AppointmentTypes.GENERAL_DOCTOR
      ],
  },
];
