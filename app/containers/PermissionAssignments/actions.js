/*
 *
 * PermissionAssignments actions
 *
 */

import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  INITIALIZE_PERMISSION_ASSIGNMENT,
  GET_GROUPS,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_ERROR,
  ASSIGN_USER_ROLE,
  ASSIGN_USER_ROLE_ERROR,
  ASSIGN_USER_ROLE_SUCCESS,
} from './constants';

export function initializePermissionAssignment() {
  return {
    type: INITIALIZE_PERMISSION_ASSIGNMENT,
  };
}

export function getUsers() {
  return {
    type: GET_USERS,
  };
}

export function getUsersSuccess(users) {
  return {
    type: GET_USERS_SUCCESS,
    users,
  };
}

export function getUsersError(error) {
  return {
    type: GET_USERS_ERROR,
    error,
  };
}

export function getGroups() {
  return {
    type: GET_GROUPS,
  };
}

export function getGroupsSuccess(groups) {
  return {
    type: GET_GROUPS_SUCCESS,
    groups,
  };
}

export function getGroupsError(error) {
  return {
    type: GET_GROUPS_ERROR,
    error,
  };
}

export function assignUserRole(userId, groupId, handleSubmitting) {
  return {
    type: ASSIGN_USER_ROLE,
    userId,
    groupId,
    handleSubmitting,
  };
}

export function assignUserRoleSuccess(userId, groupId) {
  return {
    type: ASSIGN_USER_ROLE_SUCCESS,
    userId,
    groupId,
  };
}

export function assignUserRoleError(error) {
  return {
    type: ASSIGN_USER_ROLE_ERROR,
    error,
  };
}
