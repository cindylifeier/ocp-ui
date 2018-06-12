/*
 *
 * Coverages actions
 *
 */
import {
  SAVE_COVERAGE,
  GET_SUBSCRIBER_OPTIONS,
  GET_SUBSCRIBER_OPTIONS_SUCCESS,
} from './constants';

export function getSaveCoverageAction(coverageData, handleSubmitting) {
  return {
    type: SAVE_COVERAGE,
    coverageData,
    handleSubmitting,
  };
}

export function getSubscriberOptions(patientId) {
  return {
    type: GET_SUBSCRIBER_OPTIONS,
    patientId,
  };
}


export function getSubscriberOptionsSuccess(subscriberOptions) {
  return {
    type: GET_SUBSCRIBER_OPTIONS_SUCCESS,
    subscriberOptions,
  };
}
