import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { NavigationOptions } from '@/models/NavigationOptions';
import AddAppointmentFormModalPage from '../page';

jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('AddAppointmentFormModal Page', () => {
  it('should render page', () => {
    const { container } = render(<AddAppointmentFormModalPage />);
    expect(container).toMatchSnapshot();
  });

  it('should redirect to add appointments when add more appointments clicked', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: pushMock,
    });

    render(<AddAppointmentFormModalPage />);

    const addNewAppointmentButton = screen.getByTestId(
      'add-new-appointment-btn'
    );
    fireEvent.click(addNewAppointmentButton);

    expect(pushMock).toHaveBeenCalledWith(
      NavigationOptions.AddAppointment.path
    );
  });
});
