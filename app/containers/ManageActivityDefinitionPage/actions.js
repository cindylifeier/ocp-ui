/*
 *
 * ManageActivityDefinitionPage actions
 *
 */

import {
  CREATE_ACTIVITY_DEFINITION, CREATE_ACTIVITY_DEFINITION_ERROR, CREATE_ACTIVITY_DEFINITION_SUCCESS,
} from './constants';


export function createActivityDefinition(activityDefinitionFormData, handleSubmitting) {
  return {
    type: CREATE_ACTIVITY_DEFINITION,
    activityDefinitionFormData,
    handleSubmitting,
  };
}

export function createActivityDefinitionError(error) {
  return {
    type: CREATE_ACTIVITY_DEFINITION_ERROR,
    error,
  };
}


export function createActivityDefinitionSuccess(respone) {
  return {
    type: CREATE_ACTIVITY_DEFINITION_SUCCESS,
    respone,
  };
}
