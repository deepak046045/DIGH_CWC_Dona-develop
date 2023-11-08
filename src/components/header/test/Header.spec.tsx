import { fireEvent, render, screen } from '@testing-library/react';
import { ungatedNavigationOptions } from '@/models/NavigationOptions';
import { UserContextProvider } from '@/context/UserContextProvider';
import React from 'react';
import { Header } from '../Header';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));
jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));

describe('Header Component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    });
  });

  it('should render desktop view', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  describe('window resizing', () => {
    it('should render mobile view', () => {
      window.innerWidth = 500;
      const { container } = render(<Header />);
      expect(container).toMatchSnapshot();
    });

    it('should handle resize and show mobile view when window size changes', () => {
      const { getByTestId, queryByTestId } = render(<Header />);
      expect(queryByTestId('mobile-menu-button')).not.toBeInTheDocument();
      window.innerWidth = 500;
      fireEvent(window, new Event('resize'));
      expect(getByTestId('mobile-menu-button')).toBeInTheDocument();
    });
  });

  describe('when a navigation button is clicked', () => {
    it('should swap active status', () => {
      render(
        <UserContextProvider>
          <Header />
        </UserContextProvider>
      );
      const firstNavigationButton = screen.getByText(
        ungatedNavigationOptions[0].title
      );
      const secondNavigationButton = screen.getByText(
        ungatedNavigationOptions[1].title
      );

      expect(firstNavigationButton).toHaveClass('navigationButtonActive');
      expect(secondNavigationButton).toHaveClass('navigationButton');

      fireEvent.click(secondNavigationButton);

      expect(firstNavigationButton).toHaveClass('navigationButton');
      expect(secondNavigationButton).toHaveClass('navigationButtonActive');
    });
  });

  describe('when clicking the sign in button', () => {
    it('should sign user in', () => {
      const { queryByTestId } = render(
        <UserContextProvider>
          <Header />
        </UserContextProvider>
      );
      const signInButton = screen.getByText('Sign in');
      expect(queryByTestId('sign-out-button')).not.toBeInTheDocument();

      fireEvent.click(signInButton);

      expect(queryByTestId('sign-out-button')).toBeInTheDocument();
    });
  });

  describe('when clicking the sign out button', () => {
    it('should sign user out', () => {
      const { queryByTestId } = render(
        <UserContextProvider>
          <Header />
        </UserContextProvider>
      );
      const signInButton = screen.getByText('Sign in');
      fireEvent.click(signInButton);

      const signOutButton = screen.getByText('Sign out');
      expect(queryByTestId('sign-in-button')).not.toBeInTheDocument();

      fireEvent.click(signOutButton);

      expect(queryByTestId('sign-in-button')).toBeInTheDocument();
    });
  });

  describe('when clicking the my profile button', () => {
    it('should set profile to active state', () => {
      render(
        <UserContextProvider>
          <Header />
        </UserContextProvider>
      );
      const signInButton = screen.getByText('Sign in');
      fireEvent.click(signInButton);

      const myProfileButton = screen.getByText('My profile');

      expect(myProfileButton).not.toHaveClass('myProfileButtonActive');

      fireEvent.click(myProfileButton);

      expect(myProfileButton).toHaveClass('myProfileButtonActive');
    });
  });
});
