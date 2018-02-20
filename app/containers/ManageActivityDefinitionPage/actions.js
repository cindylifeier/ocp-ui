/*
 *
 * ManageActivityDefinitionPage actions
 *
 */

import {
  POST_ACTIVITY_DEFINITION, POST_ACTIVITY_DEFINITION_ERROR, POST_ACTIVITY_DEFINITION_SUCCESS,
} from './constants';


export function createActivityDefinition(activityDefinitionFormData, handleSubmitting) {
  return {
    type: POST_ACTIVITY_DEFINITION,
    activityDefinitionFormData,
    handleSubmitting,
  };
}

export function createActivityDefinitionError(error) {
  return {
    type: POST_ACTIVITY_DEFINITION_ERROR,
    error,
  };
}


export function createActivityDefinitionSuccess(respone) {
  return {
    type: POST_ACTIVITY_DEFINITION_SUCCESS,
    respone,
  };
}
