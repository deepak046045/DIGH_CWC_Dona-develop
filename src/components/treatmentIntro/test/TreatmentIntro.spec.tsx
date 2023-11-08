import React from 'react';
import { UserContext } from '@/context/UserContextProvider';
import { fireEvent, render, screen } from '@testing-library/react';
import TreatmentIntro from '../TreatmentIntro';
import { useRouter } from 'next/navigation';
import { NavigationOptions } from '@/models/NavigationOptions';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('TreatmentIntro', () => {
  it('should render page when logged in', () => {
    const mockValue = {
      isLoggedIn: true,
    };

    const { container } = render(
      <UserContext.Provider value={mockValue}>
        <TreatmentIntro />
      </UserContext.Provider>
    );

    expect(screen.queryByTestId('add-appointment-button')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render the page when not logged in', () => {
    const mockValue = {
      isLoggedIn: false,
    };

    const { container } = render(
      <UserContext.Provider value={mockValue}>
        <TreatmentIntro />
      </UserContext.Provider>
    );
    expect(
      screen.queryByTestId('add-appointment-button')
    ).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render page when logged in', () => {
    const setActiveViewMock = jest.fn();
    const pushMock = jest.fn();

    const mockValue = {
      isLoggedIn: true,
      setActiveView: setActiveViewMock,
    };
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: pushMock,
    });

    render(
      <UserContext.Provider value={mockValue}>
        <TreatmentIntro />
      </UserContext.Provider>
    );

    const addAppointmentButton = screen.getByTestId('add-appointment-button');
    fireEvent.click(addAppointmentButton);

    expect(pushMock).toHaveBeenCalledWith(
      NavigationOptions.AddAppointment.path
    );
    expect(setActiveViewMock).toHaveBeenCalledWith(
      NavigationOptions.MyAppointments
    );
  });
});
