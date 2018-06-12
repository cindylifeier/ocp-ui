/*
 *
 * Coverages reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_SUBSCRIBER_OPTIONS_SUCCESS,
} from './constants';

const initialState = fromJS({
  subscriptionOptions: [],
});

function coveragesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUBSCRIBER_OPTIONS_SUCCESS:
      return state
        .set('subscriptionOptions', fromJS((action.subscriberOptions) || []));
    default:
      return state;
  }
}

export default coveragesReducer;
