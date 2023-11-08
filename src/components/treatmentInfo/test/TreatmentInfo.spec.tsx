import React from 'react';
import { render } from '@testing-library/react';
import TreatmentInfo from '../TreatmentInfo';

describe('TreatmentInfo', () => {
  it('should render page', () => {
    const { container } = render(<TreatmentInfo />);

    expect(container).toMatchSnapshot();
  });
});
