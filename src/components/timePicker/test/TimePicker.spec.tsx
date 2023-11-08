import { screen, fireEvent, render } from '@testing-library/react';
import { TimePicker } from '../TimePicker';

describe('Time Picker Component', () => {
  it('should render TimePicker component', () => {
    const { container } = render(<TimePicker handleInputChange={() => {}} />);
    expect(container).toMatchSnapshot();
  });
});

describe('When a new time is selected', () => {
  it('should call onChange with selected option', () => {
    const mockHandleChange = jest.fn();
    render(<TimePicker handleInputChange={mockHandleChange} />);
    fireEvent.click(screen.getByText('05:00 AM'));
    expect(mockHandleChange).toBeCalledWith(5);
  });
});
