/**
 *
 * AuthenticatedRoute
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { LOGIN_URL } from '../../containers/App/constants';
import makeSelectAuth from '../../containers/App/authSelectors';
import { isTokenExpired, removeToken, retrieveToken } from '../../utils/tokenService';

export const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  function Authentication(props) {
    let isAuthenticated = props.auth.isAuthenticated;
    if (isTokenExpired(retrieveToken())) {
      isAuthenticated = false;
      removeToken();
    }

    return (
      <Route
        {...rest}
        render={(routeProps) =>
          isAuthenticated ?
            <Component {...routeProps} /> :
            <Redirect
              to={{
                pathname: LOGIN_URL,
                state: { from: routeProps.location },
              }}
            />
        }
      />
    );
  }

  Authentication.propTypes = {
    auth: PropTypes.object.isRequired,
  };

  AuthenticatedRoute.propTypes = {
    component: PropTypes.any,
  };

  const mapStateToProps = createStructuredSelector({
    auth: makeSelectAuth(),
  });

  const AuthenticationContainer = connect(mapStateToProps)(Authentication);
  return <AuthenticationContainer />;
};
