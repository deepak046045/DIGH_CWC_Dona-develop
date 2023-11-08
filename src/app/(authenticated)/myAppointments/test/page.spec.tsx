import { render } from '@testing-library/react';
import React from 'react';
import MyAppointmentsPage from '../page';
import '@testing-library/jest-dom';

jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('MyAppointments Page', () => {
  it('should render page', () => {
    const { container } = render(<MyAppointmentsPage />);
    expect(container).toMatchSnapshot();
  });
});
