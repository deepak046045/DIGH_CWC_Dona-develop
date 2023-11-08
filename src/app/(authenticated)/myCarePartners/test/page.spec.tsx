import { render } from '@testing-library/react';
import React from 'react';
import MyCarePartnersPage from '../page';
import '@testing-library/jest-dom';

jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));

describe('MyCarePartners Page', () => {
  it('should render page', () => {
    const { container } = render(<MyCarePartnersPage />);
    expect(container).toMatchSnapshot();
  });
});
