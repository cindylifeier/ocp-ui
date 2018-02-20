/**
 *
 * Authorization
 *
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { LOGIN_URL } from '../App/constants';
import { isTokenExpired, removeToken, retrieveToken } from '../../utils/tokenService';
import makeSelectAuth from '../App/authSelectors';

function Authorization(props) {
  let isAuthenticated = props.auth.isAuthenticated;
  if (isTokenExpired(retrieveToken())) {
    isAuthenticated = false;
    removeToken();
  }
  return (
    isAuthenticated ?
      // child component will be rendered here
      (props.children) :
      (<Redirect
        to={{
          pathname: LOGIN_URL,
          state: { from: props.location },
        }}
      />)
  );
}

Authorization.propTypes = {
  children: PropTypes.any,
  auth: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

const withConnect = connect(mapStateToProps)(Authorization);
export default withConnect;
