import React from 'react';
import { render } from '@testing-library/react';
import TreatmentMapList from '../TreatmentMapList';

describe('TreatmentMapList', () => {
  it('should render page', () => {
    const { container } = render(<TreatmentMapList />);

    expect(container).toMatchSnapshot();
  });
});
