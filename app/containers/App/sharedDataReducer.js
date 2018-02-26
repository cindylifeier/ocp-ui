import { fromJS } from 'immutable';
import { GET_PATIENT_SUCCESS } from './constants';

// The initial state of the lookup
const initialState = fromJS({
  selectedPatient: {},
});

function sharedDataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT_SUCCESS:
      return state.setIn(['selectedPatient'], fromJS(action.patient));
    default:
      return state;
  }
}

export default sharedDataReducer;
