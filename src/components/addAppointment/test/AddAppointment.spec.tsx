import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as React from 'react';
import AddAppointment, * as AddAppointmentModule from '@/components/addAppointment/AddAppointment';
import { copyTexts } from '@/constants/copyTexts';
import { useRouter } from 'next/navigation';
import { NavigationOptions } from '@/models/NavigationOptions';
import { UserContext } from '@/context/UserContextProvider';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));
jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));

describe('Add Appointment', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    });
  });

  it('should render page', () => {
    const { container } = render(<AddAppointment />);
    expect(container).toMatchSnapshot();
  });

  it('when changing appointment type select in mobile', () => {
    window.innerWidth = 500;
    const { container } = render(<AddAppointment />);

    const appointmentTypeSelect = screen.getByLabelText(
      copyTexts.AddAppointment.labels.appointmentType
    );
    fireEvent.click(appointmentTypeSelect);

    const dropDownButton = container.querySelectorAll(
      '#appointmentType-select-button'
    )[0];
    fireEvent.click(dropDownButton);
  });

  describe('When cancel button clicked', () => {
    it('should redirect to my appointments page', () => {
      const pushMock = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        query: {},
        push: pushMock,
      });
      render(<AddAppointment />);

      const cancelButton = screen.getByTestId(
        'add-appointment-form-cancel-button'
      );
      fireEvent.click(cancelButton);

      expect(pushMock).toHaveBeenCalledWith(
        NavigationOptions.MyAppointments.path
      );
    });
  });

  describe('Care partners', () => {
    it('when link clicked should open modal', () => {
      const { container } = render(<AddAppointment />);

      const addCarePartnerButton = screen.getByTestId(
        'add-care-partner-button'
      );
      fireEvent.click(addCarePartnerButton);

      expect(container.querySelector('.open')).toBeInTheDocument();
    });

    it('when add care partner form filled and submitted, should add care partner', async () => {
      const setCarePartnersMock = jest.fn();
      const carePartnersMock = [
        { id: '1', name: 'Billy', email: 'billy@test.com' },
      ];
      const mockValue = {
        carePartners: carePartnersMock,
        setCarePartners: setCarePartnersMock,
      };

      render(
        <UserContext.Provider value={mockValue}>
          <AddAppointment />
        </UserContext.Provider>
      );

      const addCarePartnerButton = screen.getByTestId(
        'add-care-partner-button'
      );
      fireEvent.click(addCarePartnerButton);

      const nameInput = screen.getByLabelText(
        copyTexts.AddCarePartnerModal.name
      );
      fireEvent.change(nameInput, { target: { value: 'Mark' } });

      const emailInput = screen.getByLabelText(
        copyTexts.AddCarePartnerModal.email
      );
      fireEvent.change(emailInput, {
        target: { value: 'mark.smith@gmail.com' },
      });

      const saveButton = screen.getByTestId('add-care-partner-save-button');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(setCarePartnersMock).toHaveBeenCalledWith([
          ...carePartnersMock,
          { id: '2', name: 'Mark', email: 'mark.smith@gmail.com' },
        ]);
      });
    });
  });
});
