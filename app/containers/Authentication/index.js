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
import makeSelectAuth from '../App/authSelectors';
import { LOGIN_URL } from '../App/constants';
import { isTokenExpired, removeToken, retrieveToken } from '../../utils/tokenService';
import Layout from '../../components/Layout';

function Authentication(props) {
  let isAuthenticated = props.auth.isAuthenticated;
  if (isTokenExpired(retrieveToken())) {
    isAuthenticated = false;
    removeToken();
  }
  return (
    isAuthenticated ?
      // child component will be rendered here
      <Layout>
        {props.children}
      </Layout> :
      <Redirect
        to={{
          pathname: LOGIN_URL,
          state: { from: props.location },
        }}
      />
  );
}

Authentication.propTypes = {
  children: PropTypes.any,
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
