import React from 'react';
import { UserContext } from '@/context/UserContextProvider';
import { render, screen } from '@testing-library/react';
import TreatmentDownload from '../TreatmentDownload';

describe('TreatmentDownload', () => {
  it('should render page when logged in', () => {
    const mockValue = {
      isLoggedIn: true,
    };

    const { container } = render(
      <UserContext.Provider value={mockValue}>
        <TreatmentDownload />
      </UserContext.Provider>
    );

    expect(screen.queryByTestId('print-button')).toBeInTheDocument();
    expect(screen.queryByTestId('download-button')).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render the page when not logged in', () => {
    const mockValue = {
      isLoggedIn: false,
    };

    const { container } = render(
      <UserContext.Provider value={mockValue}>
        <TreatmentDownload />
      </UserContext.Provider>
    );
    expect(screen.queryByTestId('print-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('download-button')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
