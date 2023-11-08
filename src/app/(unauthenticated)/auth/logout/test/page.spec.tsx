import { render } from '@testing-library/react';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Logout from '../page';
import '@testing-library/jest-dom';

jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as jest.Mock;

const pushMock = jest.fn();

describe('Logout Page', () => {
  it('should render when unauthenticated', () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: {},
      status: 'unauthenticated',
    });
    const { container } = render(<Logout />);
    expect(container).toMatchSnapshot();
  });

  it('should render when authenticated', () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: {},
      status: 'authenticated',
    });
    (signOut as jest.Mock).mockResolvedValueOnce(true);
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: pushMock,
    });
    const { container } = render(<Logout />);
    expect(container).toMatchSnapshot();
  });
});
