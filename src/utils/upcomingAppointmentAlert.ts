import { Appointment } from '@/models/Appointment';
import { differenceInDays, isPast, isToday } from 'date-fns';
import { sessionStorageKeys } from '@/constants/sessionStorageKeys';
import { copyTexts } from '@/constants/copyTexts';
import { getSessionStorageItem } from './sessionStorage';

export const getUpcomingAppointmentAlertMessage = (
  appointments: Appointment[]
): string | undefined => {
  if (
    getSessionStorageItem(
      sessionStorageKeys.IsUpcomingAppointmentAlertDismissed
    ) === true
  ) {
    return undefined;
  }

  const futureAppointments = appointments.filter(
    (appointment) => !isPast(appointment.date)
  );

  if (futureAppointments.length === 0) {
    return undefined;
  }

  futureAppointments.sort((a, b) => a.date.getTime() - b.date.getTime());
  const nextAppointment = futureAppointments[0];

  if (isToday(nextAppointment.date)) {
    return copyTexts.Header.nextAppointmentToday;
  }

  const currentDateWithoutTime = new Date();
  currentDateWithoutTime.setHours(0, 0, 0, 0);

  const nextAppointmentDateWithoutTime = new Date(nextAppointment.date);
  nextAppointmentDateWithoutTime.setHours(0, 0, 0, 0);

  const daysRemaining = differenceInDays(
    nextAppointmentDateWithoutTime,
    currentDateWithoutTime
  );

  const dayWord =
    daysRemaining === 1 ? copyTexts.Header.day : copyTexts.Header.days;
  return `${copyTexts.Header.nextAppointmentIsIn} ${daysRemaining} ${dayWord}.`;
};
