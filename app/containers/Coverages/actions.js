/*
 *
 * Coverages actions
 *
 */
import {
  SAVE_COVERAGE,
  GET_SUBSCRIBER_OPTIONS,
  GET_SUBSCRIBER_OPTIONS_SUCCESS,
  GET_COVERAGE,
  GET_COVERAGE_SUCCESS,
  GET_COVERAGE_ERROR,
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

export function getCoverageAction(pageNumber) {
  return {
    type: GET_COVERAGE,
    pageNumber,
  };
}

export function getCoverageSuccess(coverages) {
  return {
    type: GET_COVERAGE_SUCCESS,
    coverages,
  };
}


export function getCoverageError(error) {
  return {
    type: GET_COVERAGE_ERROR,
    error,
  };
}
