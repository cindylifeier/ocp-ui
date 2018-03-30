/**
 *
 * ShowingByRoleWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { createStructuredSelector } from 'reselect';
import {
  CARE_COORDINATOR_ROLE_VALUE,
  CARE_MANAGER_ROLE_VALUE,
  OCP_ADMIN_ROLE_VALUE,
  PATIENT_ROLE_VALUE,
} from 'containers/App/constants';

const roles = [OCP_ADMIN_ROLE_VALUE, CARE_MANAGER_ROLE_VALUE, CARE_COORDINATOR_ROLE_VALUE, PATIENT_ROLE_VALUE];

export function ShowingByRoleWrapper(props) {
  const { showingForRoles, children, user: { role } } = props;
  const isShow = showingForRoles.includes(role);
  return (
    <div>
      {isShow ?
        <div>{children}</div>
        : undefined
      }
    </div>
  );
}

ShowingByRoleWrapper.propTypes = {
  showingForRoles: PropTypes.arrayOf(
    PropTypes.oneOf(roles).isRequired,
  ).isRequired,
  children: PropTypes.node,
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
};


const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(ShowingByRoleWrapper);
