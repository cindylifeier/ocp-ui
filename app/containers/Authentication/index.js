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
import makeSelectAuth from 'containers/App/authSelectors';
import { LOGIN_URL } from 'containers/App/constants';
import PrivateLayout from 'components/PrivateLayout';

export function Authentication(props) {
  let isAuthenticated = props.auth.isAuthenticated;
  if (isTokenExpired(retrieveToken())) {
    isAuthenticated = false;
    removeToken();
  }
  // TODO: Will get context from props
  const context = {
    patient: {
      user_name: 'ocp-test@ocpemail.com',
      user_id: 'f6fdfa6d-ebbf-435a-8236-e6f1c6cb2edc',
      email: 'ocp-test@ocpemail.com',
      name: 'Test User',
    },
  };
  const privateLayoutProps = {
    context,
  };
  return (
    isAuthenticated ?
      // child component will be rendered here
      <PrivateLayout {...privateLayoutProps}>
        {props.children}
      </PrivateLayout> :
      <Redirect
        to={{
          pathname: LOGIN_URL,
          state: { from: props.location },
        }}
      />
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
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(Authentication);
