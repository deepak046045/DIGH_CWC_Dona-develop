import React from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContextProvider';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import MyProfile from '../MyProfile';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));
jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));

describe('My Profile Component', () => {
  it('should render my profile view', () => {
    const { container } = render(<MyProfile />);
    expect(container).toMatchSnapshot();
  });
});

describe('when delete account link is clicked', () => {
  it('confirmation modal should be opened', () => {
    render(<MyProfile />);
    const deleteAccountBtn = screen.getByText('Delete Account');
    fireEvent.click(deleteAccountBtn);
    const modalTitle = screen.getByText('Your account will be deleted');
    expect(modalTitle).toBeTruthy();
  });
});

describe('when delete confirmation modal cancel button clicked', () => {
  it('should close the confirmation modal', async () => {
    const { container } = render(<MyProfile />);

    const deleteAccountBtn = screen.getByText('Delete Account');
    expect(container.querySelector('.open')).not.toBeInTheDocument();

    fireEvent.click(deleteAccountBtn);
    expect(container.querySelector('.open')).toBeInTheDocument();

    const cancelBtn = screen.getByTestId('cancel-btn');
    fireEvent.click(cancelBtn);

    await waitFor(() =>
      expect(container.querySelector('.open')).not.toBeInTheDocument()
    );
  });
});

describe('when delete confirmation modal yes button clicked', () => {
  it('should close the confirmation modal and redirect to the home page', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: pushMock,
    });
    const { container } = render(<MyProfile />);
    const deleteAccountBtn = screen.getByText('Delete Account');
    expect(container.querySelector('.open')).not.toBeInTheDocument();

    fireEvent.click(deleteAccountBtn);
    expect(container.querySelector('.open')).toBeInTheDocument();

    const yesBtn = screen.getByText('Yes, delete');
    fireEvent.click(yesBtn);

    await waitFor(() => {
      expect(container.querySelector('.open')).not.toBeInTheDocument();
      expect(pushMock).toBeCalledWith('/');
    });
  });
});

describe('when isLoggedIn swaps to false', () => {
  it('should push "/" to the router', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    const { rerender } = render(
      <UserContext.Provider value={{ isLoggedIn: true }}>
        <MyProfile />
      </UserContext.Provider>
    );

    act(() => {
      rerender(
        <UserContext.Provider value={{ isLoggedIn: false }}>
          <MyProfile />
        </UserContext.Provider>
      );
    });

    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
