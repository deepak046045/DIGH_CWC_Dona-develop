import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { copyTexts } from '@/constants/copyTexts';
import { AddCarePartnerModal } from '../AddCarePartnerModal';
import '@testing-library/jest-dom';

jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('AddCarePartnerModal', () => {
  it('should render', () => {
    const { container } = render(
      <AddCarePartnerModal
        isModalOpen
        setIsModalOpen={() => {}}
        onSubmit={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should prompt user when attempting to close modal with unsaved changes', () => {
    render(
      <AddCarePartnerModal
        isModalOpen
        setIsModalOpen={() => {}}
        onSubmit={() => {}}
      />
    );

    const nameInput = screen.getByLabelText(copyTexts.AddCarePartnerModal.name);

    fireEvent.change(nameInput, { target: { value: '123' } });

    expect(screen.queryByTestId('care-partner-close-warning')).toBeNull();

    const cancelButton = screen.getByText(
      copyTexts.AddCarePartnerModal.cancelButton
    );
    fireEvent.click(cancelButton);

    expect(screen.queryByTestId('care-partner-close-warning')).not.toBeNull();
  });

  it('should allow user to close after prompting about unsaved changes', () => {
    const setIsOpenOpenMock = jest.fn();
    render(
      <AddCarePartnerModal
        isModalOpen
        setIsModalOpen={setIsOpenOpenMock}
        onSubmit={() => {}}
      />
    );

    const nameInput = screen.getByLabelText(copyTexts.AddCarePartnerModal.name);

    fireEvent.change(nameInput, { target: { value: 'test' } });

    const cancelButton = screen.getByText(
      copyTexts.AddCarePartnerModal.cancelButton
    );
    fireEvent.click(cancelButton);

    const closeAnywaybutton = screen.getByText(
      copyTexts.AddCarePartnerModal.closeAnywayButton
    );
    fireEvent.click(closeAnywaybutton);

    expect(setIsOpenOpenMock).toHaveBeenCalledWith(false);
  });

  it('should call onSubmit when user clicks save', async () => {
    const onSubmitMock = jest.fn();
    render(
      <AddCarePartnerModal
        isModalOpen
        setIsModalOpen={() => {}}
        onSubmit={onSubmitMock}
      />
    );

    const nameInput = screen.getByLabelText(copyTexts.AddCarePartnerModal.name);
    fireEvent.change(nameInput, { target: { value: 'Mark' } });

    const emailInput = screen.getByLabelText(
      copyTexts.AddCarePartnerModal.email
    );
    fireEvent.change(emailInput, { target: { value: 'mark.smith@gmail.com' } });

    const saveButton = screen.getByText(
      copyTexts.AddCarePartnerModal.saveButton
    );
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        emailAddress: 'mark.smith@gmail.com',
        name: 'Mark',
      });
    });
  });

  it('should render errors when save clicked with empty inputs', async () => {
    const { container } = render(
      <AddCarePartnerModal
        isModalOpen
        setIsModalOpen={() => {}}
        onSubmit={() => {}}
      />
    );

    const emailInput = screen.getByLabelText(
      copyTexts.AddCarePartnerModal.email
    );
    fireEvent.change(emailInput, { target: { value: 'mark' } });

    const saveButton = screen.getByText(
      copyTexts.AddCarePartnerModal.saveButton
    );
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(
        screen.queryByText(
          copyTexts.AddCarePartnerModal.formValidation.invalidEmail
        )
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          copyTexts.AddCarePartnerModal.formValidation.requiredField
        )
      ).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});
