import formatPhoneNumber from '../formatPhoneNumber';

describe('formatPhoneNumber', () => {
  it('should format a valid phone number', () => {
    const phoneNumber = ' 1234567890';
    const response = formatPhoneNumber(phoneNumber);
    expect(response).toEqual('(123) 456-7890');
  });
  it('should return null if phone number is not valid', () => {
    const phoneNumber = ' 123456789';
    const response = formatPhoneNumber(phoneNumber);
    expect(response).toEqual(null);
  });
});
