import { copyTexts } from '@/constants/copyTexts';
import { getUpcomingAppointmentAlertMessage } from '../upcomingAppointmentAlert';
import { getSessionStorageItem } from '../sessionStorage';

jest.mock('../sessionStorage');

describe('getUpcomingAppointmentAlertMessage', () => {
  beforeEach(() => {
    (getSessionStorageItem as jest.Mock).mockClear();
  });

  it('should return undefined if the upcoming appointment alert is dismissed', () => {
    (getSessionStorageItem as jest.Mock).mockReturnValue(true);

    const result = getUpcomingAppointmentAlertMessage([]);
    expect(result).toBeUndefined();
  });

  it('should return undefined if there are no future appointments', () => {
    (getSessionStorageItem as jest.Mock).mockReturnValue(false);

    const pastAppointment = { date: new Date('2022-01-01') };
    const result = getUpcomingAppointmentAlertMessage([pastAppointment]);
    expect(result).toBeUndefined();
  });

  it('should return a message if the next appointment is today', () => {
    (getSessionStorageItem as jest.Mock).mockReturnValue(false);

    const todayAppointment = { date: new Date() };
    const result = getUpcomingAppointmentAlertMessage([todayAppointment]);
    expect(result).toBe(copyTexts.Header.nextAppointmentToday);
  });

  it('should return a message with one day until the next appointment', () => {
    (getSessionStorageItem as jest.Mock).mockReturnValue(false);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowAppointment = { date: tomorrow };
    const result = getUpcomingAppointmentAlertMessage([tomorrowAppointment]);
    expect(result).toBe(
      `${copyTexts.Header.nextAppointmentIsIn} 1 ${copyTexts.Header.day}.`
    );
  });

  it('should return a message with 2 days until the next appointment', () => {
    (getSessionStorageItem as jest.Mock).mockReturnValue(false);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const tomorrowAppointment = { date: tomorrow };
    const result = getUpcomingAppointmentAlertMessage([tomorrowAppointment]);
    expect(result).toBe(
      `${copyTexts.Header.nextAppointmentIsIn} 2 ${copyTexts.Header.days}.`
    );
  });

  it('should sort and pick the nearest future appointment', () => {
    (getSessionStorageItem as jest.Mock).mockReturnValue(false);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const appointments = [{ date: dayAfterTomorrow }, { date: tomorrow }];

    const result = getUpcomingAppointmentAlertMessage(appointments);

    expect(result).toBe(
      `${copyTexts.Header.nextAppointmentIsIn} 1 ${copyTexts.Header.day}.`
    );
  });
});
