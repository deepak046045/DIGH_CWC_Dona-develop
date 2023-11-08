import { isUserFirstInfusionTypeAppointment } from '../isUserFirstInfusionTypeAppointment';

describe('isUserFirstInfusionTypeAppointment', () => {
  it('should return true if infusionCount equals 0', () => {
    expect(isUserFirstInfusionTypeAppointment(0)).toEqual(true);
  });

  it('should return false if infusionCount does not equal 0', () => {
    expect(isUserFirstInfusionTypeAppointment(1)).toEqual(false);
  });
});
