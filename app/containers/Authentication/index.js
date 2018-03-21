/**
 *
 * Authentication
 *
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { isTokenExpired, removeToken, retrieveToken } from 'utils/tokenService';
import { getLinkUrlByRole } from 'containers/App/helpers';
import makeSelectAuth from 'containers/App/authSelectors';
import { LOGIN_URL } from 'containers/App/constants';
import PrivateLayout from 'components/PrivateLayout';
import { makeSelectUser } from 'containers/App/contextSelectors';

export function Authentication(props) {
  let isAuthenticated = props.auth.isAuthenticated;
  if (isTokenExpired(retrieveToken())) {
    isAuthenticated = false;
    removeToken();
  }
  const user = props.user;
  return (
    isAuthenticated && user ?
      // child component will be rendered here
      <PrivateLayout
        user={user}
        getLinkUrlByRole={getLinkUrlByRole}
      >
        {props.children}
      </PrivateLayout> :
      <div>
        {removeToken()}
        <Redirect
          to={{
            pathname: LOGIN_URL,
            state: { from: props.location },
          }}
        />
      </div>
  );
}

Authentication.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }),
  user: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.object,
    search: PropTypes.string,
    hash: PropTypes.string,
    key: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(Authentication);
