import { render } from '@testing-library/react';
import React from 'react';
import MyTreatmentPlanPage from '../page';
import '@testing-library/jest-dom';

jest.mock('crypto', () => ({ randomUUID: () => '123456789' }));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('MyTreatmentPlan Page', () => {
  it('should render page', () => {
    const { container } = render(<MyTreatmentPlanPage />);
    expect(container).toMatchSnapshot();
  });
});
