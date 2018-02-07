import { fromJS } from 'immutable';
import healthcareServicesReducer from '../reducer';
import {
  GET_FILTERED_HEALTHCARE_SERVICES, GET_HEALTHCARE_SERVICES_ERROR, GET_HEALTHCARE_SERVICES_SUCCESS,
  INITIALIZE_HEALTHCARE_SERVICES,
} from '../constants';

describe('healthcareServicesReducer', () => {
  it('returns the initial state', () => {
    const expectInitialState = {
      loading: false,
      error: false,
      data: [],
      organization: null,
      currentPage: 0,
      totalNumberOfPages: 0,
      includeInactive: false,
    };
    expect(healthcareServicesReducer([], { type: INITIALIZE_HEALTHCARE_SERVICES })).toEqual(fromJS(expectInitialState));
  });

  it('returns the get filtered healthcare services state', () => {
    const initialState = fromJS({
      loading: false,
      error: false,
      data: [],
      organization: null,
      currentPage: 0,
      totalNumberOfPages: 0,
      includeInactive: false,
    });
    const action = {
      type: GET_FILTERED_HEALTHCARE_SERVICES,
      currentPage: 1,
      includeInactive: true,
    };
    const expectState = {
      loading: false,
      error: false,
      data: [],
      organization: null,
      currentPage: 1,
      totalNumberOfPages: 0,
      includeInactive: true,
    };
    expect(healthcareServicesReducer(initialState, action)).toEqual(fromJS(expectState));
  });

  it('returns the get heatlthcare services success status', () => {
    const initialState = fromJS({
      loading: false,
      error: false,
      data: [],
      organization: null,
      currentPage: 0,
      totalNumberOfPages: 0,
      includeInactive: false,
    });
    const elements = [{
      logicalId: '1234',
    }];
    const action = {
      type: GET_HEALTHCARE_SERVICES_SUCCESS,
      currentPage: 1,
      includeInactive: true,
      healthcareServices: {
        totalNumberOfPages: 2,
        currentPage: 2,
        elements,
      },
    };
    const expectState = {
      loading: false,
      error: false,
      data: elements,
      organization: null,
      currentPage: 2,
      totalNumberOfPages: 2,
      includeInactive: false,
    };
    expect(healthcareServicesReducer(initialState, action)).toEqual(fromJS(expectState));
  });
  it('returns the get heatlthcare services error status', () => {
    const initialState = fromJS({
      loading: false,
      error: false,
      data: [],
      organization: null,
      currentPage: 0,
      totalNumberOfPages: 0,
      includeInactive: false,
    });
    const error = new Error({
      error: 'error message',
    });
    const action = {
      type: GET_HEALTHCARE_SERVICES_ERROR,
      error,
    };
    const expectState = {
      loading: false,
      error,
      data: [],
      organization: null,
      currentPage: 0,
      totalNumberOfPages: 0,
      includeInactive: false,
    };
    expect(healthcareServicesReducer(initialState, action)).toEqual(fromJS(expectState));
  });
});
