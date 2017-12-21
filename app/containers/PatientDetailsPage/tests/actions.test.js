
import {
  loadPatient,
} from '../actions';
import {
  LOAD_PATIENT,
} from '../constants';

describe('PatientDetailsPage actions', () => {
  describe('Load Patient Action', () => {
    it('has a type of LOAD_PATIENT', () => {
      const expected = {
        type: LOAD_PATIENT,
      };
      expect(loadPatient()).toEqual(expected);
    });
  });
});
