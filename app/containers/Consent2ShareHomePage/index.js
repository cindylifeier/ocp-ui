/**
 *
 * Consent2ShareHomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Consent2ShareHome from 'components/Consent2ShareHome';
import makeSelectConsent2ShareHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';


// Todo: will separate out current code base
export class Consent2ShareHomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Consent2Share</title>
          <meta name="description" content="Patient Summary page of Consent2Share Smart On Fhir" />
        </Helmet>
        <Consent2ShareHome />
      </div>
    );
  }
}

Consent2ShareHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  consent2ShareHomePage: makeSelectConsent2ShareHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'consent2ShareHomePage', reducer });
const withSaga = injectSaga({ key: 'consent2ShareHomePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Consent2ShareHomePage);
