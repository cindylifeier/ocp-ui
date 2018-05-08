/*
 *
 * SmartContextInitializerPage actions
 *
 */

import { POST_CONTEXT, POST_CONTEXT_ERROR, POST_CONTEXT_SUCCESS } from './constants';

export function postContext(launchId, context) {
  return {
    type: POST_CONTEXT,
    launchId,
    context,
  };
}

export function postContextSuccess(response) {
  return {
    type: POST_CONTEXT_SUCCESS,
    response,
  };
}

export function postContextError(error) {
  return {
    type: POST_CONTEXT_ERROR,
    error,
  };
}
