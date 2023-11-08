import { render } from '@testing-library/react';
import React from 'react';
import { UserContext } from '@/context/UserContextProvider';
import Home from '../page';
import '@testing-library/jest-dom';

jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('Home Page', () => {
  it('should render page', () => {
    const { container } = render(<Home />);

    expect(container.querySelector('#alert_message')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render page with alert', () => {
    const mockValue = {
      alert: { isOpen: true, level: 'info', message: 'this is an alert' },
    };

    const { container } = render(
      <UserContext.Provider value={mockValue}>
        <Home />
      </UserContext.Provider>
    );

    expect(container.querySelector('#alert_message')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
