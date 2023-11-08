import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { NavigationOptions } from '@/models/NavigationOptions';
import { AddAppointmentConfirmationModal } from '../AddAppointmentConfirmationModal';

jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('AddAppointmentConfirmationModal', () => {
  it('should render', () => {
    const { container } = render(
      <AddAppointmentConfirmationModal
        isModalOpen
        setIsModalOpen={() => {}}
        handleAddNewAppointment={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should redirect to my appointments when view all appointments clicked', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: pushMock,
    });

    render(
      <AddAppointmentConfirmationModal
        isModalOpen
        setIsModalOpen={() => {}}
        handleAddNewAppointment={() => {}}
      />
    );

    const viewAppointmentsButton = screen.getByTestId('view-appointments-btn');
    fireEvent.click(viewAppointmentsButton);

    expect(pushMock).toHaveBeenCalledWith(
      NavigationOptions.MyAppointments.path
    );
  });

  it('should redirect to my appointments when close clicked', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: pushMock,
    });

    render(
      <AddAppointmentConfirmationModal
        isModalOpen
        setIsModalOpen={() => {}}
        handleAddNewAppointment={() => {}}
      />
    );

    const closeButton = screen.getByTestId(
      'add-appointment-confirmation-x-button'
    );
    fireEvent.click(closeButton);

    expect(pushMock).toHaveBeenCalledWith(
      NavigationOptions.MyAppointments.path
    );
  });
});
