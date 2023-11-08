import { render } from '@testing-library/react';
import React from 'react';
import Login from '../page';
import '@testing-library/jest-dom';

jest.mock('next-auth/react');

describe('Login Page', () => {
  it('should render page', () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });
});
