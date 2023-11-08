import React from 'react';
import { UserContext } from '@/context/UserContextProvider';
import { render, screen } from '@testing-library/react';
import CustomerSupport from '../CustomerSupport';

jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));

describe('CustomerSupport', () => {
  it('should render page when logged in', () => {
    const mockValue = {
      isLoggedIn: true,
    };

    const { container } = render(
      <UserContext.Provider value={mockValue}>
        <CustomerSupport />
      </UserContext.Provider>
    );

    expect(screen.queryByTestId('sign-up-button')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render the page when not logged in', () => {
    const mockValue = {
      isLoggedIn: false,
    };

    const { container } = render(
      <UserContext.Provider value={mockValue}>
        <CustomerSupport />
      </UserContext.Provider>
    );

    expect(screen.queryByTestId('sign-up-button')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
