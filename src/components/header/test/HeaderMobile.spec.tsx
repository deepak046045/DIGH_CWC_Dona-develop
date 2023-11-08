import { fireEvent, render, screen } from '@testing-library/react';
import {
  NavigationOptions,
  ungatedNavigationOptions,
} from '@/models/NavigationOptions';
import React from 'react';
import HeaderMobile from '../HeaderMobile';
import '@testing-library/jest-dom';

describe('Header Mobile Component', () => {
  it('should render header mobile', () => {
    const { container } = render(
      <HeaderMobile
        activeView={ungatedNavigationOptions[0]}
        isLoggedIn={false}
        signIn={() => {}}
        signOut={() => {}}
        handleNavigation={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  describe('when menu button clicked', () => {
    it('should open menu', () => {
      render(
        <HeaderMobile
          activeView={ungatedNavigationOptions[0]}
          isLoggedIn={false}
          signIn={() => {}}
          signOut={() => {}}
          handleNavigation={() => {}}
        />
      );
      const menuButton = screen.getByTestId('mobile-menu-button');
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();

      fireEvent.click(menuButton);

      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    });

    it('should toggle document overflow styling', () => {
      render(
        <HeaderMobile
          activeView={ungatedNavigationOptions[0]}
          isLoggedIn={false}
          signIn={() => {}}
          signOut={() => {}}
          handleNavigation={() => {}}
        />
      );
      const menuButton = screen.getByTestId('mobile-menu-button');

      // Open
      fireEvent.click(menuButton);
      expect(document.body.style.overflow).toBe('hidden');

      // Closed
      fireEvent.click(menuButton);
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('when navigation button clicked', () => {
    it('should call setActiveView', () => {
      const mockHandleNavigation = jest.fn();
      render(
        <HeaderMobile
          activeView={ungatedNavigationOptions[0]}
          isLoggedIn={false}
          signIn={() => {}}
          signOut={() => {}}
          handleNavigation={mockHandleNavigation}
        />
      );

      const menuButton = screen.getByTestId('mobile-menu-button');
      fireEvent.click(menuButton);

      const secondButton = screen.getByText(ungatedNavigationOptions[1].title);

      fireEvent.click(secondButton);

      expect(mockHandleNavigation).toHaveBeenCalledWith(
        ungatedNavigationOptions[1]
      );
    });
  });

  describe('when my profile button clicked', () => {
    it('should call handleNavigation', () => {
      const mockHandleNavigation = jest.fn();
      render(
        <HeaderMobile
          activeView={ungatedNavigationOptions[0]}
          isLoggedIn
          signIn={() => {}}
          signOut={() => {}}
          handleNavigation={mockHandleNavigation}
        />
      );

      const menuButton = screen.getByTestId('mobile-menu-button');
      fireEvent.click(menuButton);

      const myProfileButton = screen.getByText(
        NavigationOptions.MyProfile.title
      );

      fireEvent.click(myProfileButton);

      expect(mockHandleNavigation).toHaveBeenCalledWith(
        NavigationOptions.MyProfile
      );
    });

    it('should have correct class and icon', () => {
      const mockHandleNavigation = jest.fn();
      render(
        <HeaderMobile
          activeView={NavigationOptions.MyProfile}
          isLoggedIn
          signIn={() => {}}
          signOut={() => {}}
          handleNavigation={mockHandleNavigation}
        />
      );

      const menuButton = screen.getByTestId('mobile-menu-button');
      fireEvent.click(menuButton);

      const myProfileButton = screen.getByText(
        NavigationOptions.MyProfile.title
      );
      const myProfileButtonIcon: HTMLImageElement =
        screen.getByAltText('ProfileIcon');

      expect(myProfileButton).toHaveClass('myProfileButtonActive');
      expect(myProfileButtonIcon.src).toContain(
        '/icons/profile-active-icon.svg'
      );
    });
  });
});
