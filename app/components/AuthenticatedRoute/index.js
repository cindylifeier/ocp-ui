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
import makeSelectLoginPage from '../../containers/LoginPage/selectors';
import { removeToken, retrieveToken } from '../../utils/tokenService';
import { isTokenExpired } from '../../utils/auth';

export const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  class Authentication extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
      super(props);
      this.handleRender = this.handleRender.bind(this);
    }

    handleRender(props) {
      let isAuthenticated = this.props.auth.isAuthenticated;
      if (isTokenExpired(retrieveToken())) {
        isAuthenticated = false;
        removeToken();
      }
      return isAuthenticated ?
        <Component {...props} /> :
        <Redirect
          to={{
            pathname: LOGIN_URL,
            state: { from: props.location },
          }}
        />;
    }

    render() {
      return (
        <Route {...rest} render={this.handleRender} />
      );
    }
  }

  Authentication.propTypes = {
    auth: PropTypes.object.isRequired,
  };

  AuthenticatedRoute.propTypes = {
    component: PropTypes.any,
  };

  const mapStateToProps = createStructuredSelector({
    auth: makeSelectLoginPage(),
  });

  const AuthenticationContainer = connect(mapStateToProps)(Authentication);
  return <AuthenticationContainer />;
};
