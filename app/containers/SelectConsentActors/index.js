/**
 *
 * SelectConsentActors
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSelectConsentActors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class SelectConsentActors extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>SelectConsentActors</title>
          <meta name="description" content="Description of SelectConsentActors" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

SelectConsentActors.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectconsentactors: makeSelectSelectConsentActors(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'selectConsentActors', reducer });
const withSaga = injectSaga({ key: 'selectConsentActors', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SelectConsentActors);
