import { AppointmentType } from './AppointmentType';
import { CarePartner } from './CarePartner';

export type Appointment = {
  id: string;
  date: Date;
  address: string;
  type: AppointmentType;
  carePartners: CarePartner[];
};
