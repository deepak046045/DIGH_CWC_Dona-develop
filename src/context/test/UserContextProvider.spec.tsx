import React from 'react';
import { render, act } from '@testing-library/react';
import { ungatedNavigationOptions } from '@/models/NavigationOptions';
import mockAppointments from '@/mocks/mockAppointments';
import { UserContext, UserContextProvider } from '../UserContextProvider';

describe('UserContextProvider', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <UserContextProvider>
        <div>Test</div>
      </UserContextProvider>
    );
    expect(container).toBeTruthy();
  });

  it('provides default values', () => {
    let contextValues;
    render(
      <UserContextProvider>
        <UserContext.Consumer>
          {(values) => {
            contextValues = values;
            return null;
          }}
        </UserContext.Consumer>
      </UserContextProvider>
    );

    expect(contextValues.isLoggedIn).toBe(false);
    expect(contextValues.activeView).toEqual(ungatedNavigationOptions[0]);
    expect(contextValues.alert).toEqual({
      isOpen: false,
      message: '',
      level: '',
    });
    expect(contextValues.appointments).toEqual(mockAppointments);
  });

  it('updates context values when state changes', () => {
    let setContextIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;

    let contextValues;

    function TestConsumer() {
      return (
        <UserContext.Consumer>
          {(values) => {
            setContextIsLoggedIn = values.setIsLoggedIn;

            contextValues = values;
            return null;
          }}
        </UserContext.Consumer>
      );
    }

    const { rerender } = render(
      <UserContextProvider>
        <TestConsumer />
      </UserContextProvider>
    );

    act(() => {
      setContextIsLoggedIn(true);
    });

    rerender(
      <UserContextProvider>
        <TestConsumer />
      </UserContextProvider>
    );

    expect(contextValues.isLoggedIn).toBe(true);
  });
});
