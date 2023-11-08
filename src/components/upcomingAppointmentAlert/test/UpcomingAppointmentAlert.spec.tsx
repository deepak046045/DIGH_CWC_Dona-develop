import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationOptions } from '@/models/NavigationOptions';
import {
  UserContextProvider,
  UserContext,
} from '@/context/UserContextProvider';
import React from 'react';
import { AppointmentTypes } from '@/shared/enums/AppointmentTypes';
import '@testing-library/jest-dom';
import { sessionStorageKeys } from '../../../constants/sessionStorageKeys';
import {
  getSessionStorageItem,
  setSessionStorageItem,
} from '../../../utils/sessionStorage';
import { UpcomingAppointmentAlert } from '../UpcomingAppointmentAlert';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));
jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));

describe('UpcomingAppointmentAlert Component', () => {
  it('should show upcoming appointment alert banner for 14 days from now', () => {
    const mockValue = {
      isLoggedIn: true,
      appointments: [
        {
          id: '1',
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          address: '11700 N. Meridian Street, Carmel, IN 46032',
          type: {
            name: AppointmentTypes.INFUSION,
            count: 2,
          },
          carePartners: ['Henry', 'Charlotte'],
        },
      ],
      setIsLoggedIn: jest.fn(),
      setActiveView: jest.fn(),
      setUpcomingAppointmentAlert: jest.fn(),
    };

    const { container } = render(
      <UserContext.Provider value={mockValue}>
        <UpcomingAppointmentAlert />
      </UserContext.Provider>
    );

    expect(
      container.querySelector('#upcoming-appointment-alert')
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should show upcoming appointment alert banner for 1 day from now', () => {
    const mockValue = {
      isLoggedIn: true,
      appointments: [
        {
          id: '1',
          date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          address: '11700 N. Meridian Street, Carmel, IN 46032',
          type: {
            name: AppointmentTypes.INFUSION,
            count: 2,
          },
          carePartners: ['Henry', 'Charlotte'],
        },
      ],
      setIsLoggedIn: jest.fn(),
      setActiveView: jest.fn(),
      setUpcomingAppointmentAlert: jest.fn(),
    };

    const { container } = render(
      <UserContext.Provider value={mockValue}>
        <UpcomingAppointmentAlert />
      </UserContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should not show upcoming appointment alert banner if session store confirms that its already been dismissed', () => {
    setSessionStorageItem(
      sessionStorageKeys.IsUpcomingAppointmentAlertDismissed,
      true
    );
    const mockValue = {
      isLoggedIn: true,
    };
    const { container } = render(
      <UserContextProvider value={mockValue}>
        <UpcomingAppointmentAlert />
      </UserContextProvider>
    );

    expect(container.querySelector('#upcoming-appointment-alert')).toBeNull();
    window.sessionStorage.clear();
  });

  it('should not show upcoming appointment alert banner if no upcoming appointments', () => {
    const mockValue = {
      appointments: [],
      isLoggedIn: true,
      setIsLoggedIn: jest.fn(),
      setActiveView: jest.fn(),
      setUpcomingAppointmentAlert: jest.fn(),
    };

    const { container } = render(
      <UserContext.Provider value={mockValue}>
        <UpcomingAppointmentAlert />
      </UserContext.Provider>
    );

    expect(container.querySelector('#upcoming-appointment-alert')).toBeNull();
  });

  it('should show specific banner if next appointment is today', () => {
    const mockValue = {
      isLoggedIn: true,
      appointments: [
        {
          id: '1',
          date: new Date(Date.now() + 1 * 60 * 60 * 1000),
        },
      ],
      setIsLoggedIn: jest.fn(),
      setActiveView: jest.fn(),
      setUpcomingAppointmentAlert: jest.fn(),
    };

    const { container } = render(
      <UserContext.Provider value={mockValue}>
        <UpcomingAppointmentAlert />
      </UserContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should dismiss banner and set sessionStorage when close clicked', () => {
    const mockValue = {
      isLoggedIn: true,
      appointments: [
        {
          id: '1',
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      ],
      setIsLoggedIn: jest.fn(),
      setActiveView: jest.fn(),
      setUpcomingAppointmentAlert: jest.fn(),
    };

    const { container } = render(
      <UserContext.Provider value={mockValue}>
        <UpcomingAppointmentAlert />
      </UserContext.Provider>
    );

    const closeButton = screen.getByTestId(
      'dismiss-upcoming-appointment-banner'
    );
    fireEvent.click(closeButton);

    expect(container.querySelector('#upcoming-appointment-alert')).toBeNull();
    expect(
      getSessionStorageItem(
        sessionStorageKeys.IsUpcomingAppointmentAlertDismissed
      )
    ).toEqual(true);
  });

  it('should navigate to myAppointments when view appointments banner link clicked', () => {
    window.sessionStorage.clear();
    const mockSetActiveView = jest.fn();
    const mockValue = {
      isLoggedIn: true,
      appointments: [
        {
          id: '1',
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          address: '11700 N. Meridian Street, Carmel, IN 46032',
          type: {
            name: AppointmentTypes.INFUSION,
            count: 2,
          },
          carePartners: ['Henry', 'Charlotte'],
        },
      ],
      setIsLoggedIn: jest.fn(),
      setActiveView: mockSetActiveView,
      setUpcomingAppointmentAlert: jest.fn(),
    };

    render(
      <UserContext.Provider value={mockValue}>
        <UpcomingAppointmentAlert />
      </UserContext.Provider>
    );

    const viewAppointmentsLink = screen.getByTestId(
      'view-appointments-banner-link'
    );
    fireEvent.click(viewAppointmentsLink);

    expect(mockSetActiveView).toHaveBeenCalledWith(
      NavigationOptions.MyAppointments
    );
  });
});
