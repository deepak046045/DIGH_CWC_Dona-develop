import { render } from '@testing-library/react';
import React from 'react';
import WhatToExpectPage from '../page';
import '@testing-library/jest-dom';

jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));

describe('WhatToExpect Page', () => {
  it('should render page', () => {
    const { container } = render(<WhatToExpectPage />);
    expect(container).toMatchSnapshot();
  });
});
