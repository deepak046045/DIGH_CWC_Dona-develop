import { render } from '@testing-library/react';
import React from 'react';
import AddAppointmentPage from '../page';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));
jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));

describe('AddAppointments Page', () => {
  it('should render page', () => {
    const { container } = render(<AddAppointmentPage />);
    expect(container).toMatchSnapshot();
  });
});
