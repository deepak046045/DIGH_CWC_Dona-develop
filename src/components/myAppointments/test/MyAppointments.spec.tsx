import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserContext } from '@/context/UserContextProvider';
import { AppointmentTypes } from '@/shared/enums/AppointmentTypes';
import { copyTexts } from '@/constants/copyTexts';
import { useRouter } from 'next/navigation';
import { MyAppointments } from '../MyAppointments';
import { NavigationOptions } from '@/models/NavigationOptions';

jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('MyAppointments', () => {
  it('should render page when logged in', () => {
    const { container } = render(<MyAppointments />);

    expect(container).toMatchSnapshot();
  });

  describe('When clicking new appointment button', () => {
    it('should redirect to add appointments screen', () => {
      const pushMock = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        query: {},
        push: pushMock,
      });
      render(<MyAppointments />);

      const addAppointmentButton = screen.getByText(
        copyTexts.MyAppointments.buttons.newAppointment
      );
      fireEvent.click(addAppointmentButton);

      expect(pushMock).toHaveBeenCalledWith(
        NavigationOptions.AddAppointment.path
      );
    });
  });

  describe('Delete appointment', () => {
    it('should open delete modal when delete appointment button clicked', () => {
      const { container } = render(<MyAppointments />);

      expect(container.querySelector('.open')).not.toBeInTheDocument();

      const deleteButton = screen.getAllByTestId(
        'delete-appointment-button'
      )[0];
      fireEvent.click(deleteButton);

      expect(container.querySelector('.open')).toBeInTheDocument();
    });

    it('should delete when deletion confirmed in modal', () => {
      const { container } = render(<MyAppointments />);

      const deleteButton = screen.getAllByTestId(
        'delete-appointment-button'
      )[0];
      fireEvent.click(deleteButton);

      const yesButton = screen.getByTestId('yes-btn');
      fireEvent.click(yesButton);

      expect(container.querySelector('.open')).not.toBeInTheDocument();

      // Should add an alert
      const renderedAlerts = container.querySelectorAll('#alert_message');
      expect(renderedAlerts.length).toBe(1);
    });

    it('should not delete when deletion not confirmed in modal', () => {
      const { container } = render(<MyAppointments />);

      const deleteButton = screen.getAllByTestId(
        'delete-appointment-button'
      )[0];
      fireEvent.click(deleteButton);

      const cancelButton = screen.getByTestId('cancel-btn');
      fireEvent.click(cancelButton);

      expect(container.querySelector('.open')).not.toBeInTheDocument();
    });
  });

  describe('View all switch', () => {
    it('should render all appointments when on and only upcoming appointments when off', () => {
      const mockValue = {
        appointments: [
          {
            id: '1',
            date: new Date('2060-04-21T14:30:00.000Z'),
            address: '11700 N. Meridian Street, Carmel, IN 46032',
            type: {
              name: copyTexts.MyAppointments.appointmentTypes[
                AppointmentTypes.INFUSION
              ],
              count: 2,
            },
            carePartners: ['Henry', 'Charlotte'],
          },
          {
            id: '5',
            date: new Date('2021-09-10T15:30:00.000Z'),
            address: '11700 N. Meridian Street,Carmel, IN 46032',
            type: {
              name: copyTexts.MyAppointments.appointmentTypes[
                AppointmentTypes.GENERAL_DOCTOR
              ],
            },
            carePartners: ['Dr. Bretz'],
          },
        ],
      };

      const { container } = render(
        <UserContext.Provider value={mockValue}>
          <MyAppointments />
        </UserContext.Provider>
      );

      let renderedAppointments = screen.getAllByTestId('appointment-row');
      expect(renderedAppointments.length).toBe(
        mockValue.appointments.length - 1
      );

      const viewAllSwitch = screen.getByTestId('view-all-switch');
      fireEvent.click(viewAllSwitch);

      renderedAppointments = screen.getAllByTestId('appointment-row');
      expect(renderedAppointments.length).toBe(mockValue.appointments.length);
      expect(container).toMatchSnapshot();
    });

    it('should render all appointments when view all link clicked', () => {
      const mockValue = {
        appointments: [
          {
            id: '5',
            date: new Date('2023-09-10T15:30:00.000Z'),
            address: '11700 N. Meridian Street,Carmel, IN 46032',
            type: {
              name: copyTexts.MyAppointments.appointmentTypes[
                AppointmentTypes.GENERAL_DOCTOR
              ],
            },
            carePartners: ['Dr. Bretz'],
          },
        ],
      };

      const { container } = render(
        <UserContext.Provider value={mockValue}>
          <MyAppointments />
        </UserContext.Provider>
      );

      let renderedAppointments = screen.queryAllByTestId('appointment-row');
      expect(renderedAppointments.length).toBe(0);

      const viewAllLink = screen.getByTestId('view-all-link');
      fireEvent.click(viewAllLink);

      renderedAppointments = screen.getAllByTestId('appointment-row');
      expect(renderedAppointments.length).toBe(mockValue.appointments.length);
      expect(container).toMatchSnapshot();
    });
  });

  describe('No Appointments', () => {
    it('should render message when no upcoming appointments but some past appointments', () => {
      const mockValue = {
        appointments: [
          {
            id: '5',
            date: new Date('2023-09-10T15:30:00.000Z'),
            address: '11700 N. Meridian Street,Carmel, IN 46032',
            type: {
              name: copyTexts.MyAppointments.appointmentTypes[
                AppointmentTypes.GENERAL_DOCTOR
              ],
            },
            carePartners: ['Dr. Bretz'],
          },
        ],
      };

      const { container } = render(
        <UserContext.Provider value={mockValue}>
          <MyAppointments />
        </UserContext.Provider>
      );

      expect(container).toMatchSnapshot();
    });

    it('should render message when no appointments', () => {
      const mockValue = {
        appointments: [],
      };

      const { container } = render(
        <UserContext.Provider value={mockValue}>
          <MyAppointments />
        </UserContext.Provider>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
