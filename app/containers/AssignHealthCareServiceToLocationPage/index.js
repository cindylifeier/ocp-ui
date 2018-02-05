/**
 *
 * AssignHealthCareServiceToLocationPage
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
import makeSelectAssignHealthCareServiceToLocationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class AssignHealthCareServiceToLocationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>AssignHealthCareServiceToLocationPage</title>
          <meta name="description" content="Description of AssignHealthCareServiceToLocationPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

AssignHealthCareServiceToLocationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  assignhealthcareservicetolocationpage: makeSelectAssignHealthCareServiceToLocationPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'assignHealthCareServiceToLocationPage', reducer });
const withSaga = injectSaga({ key: 'assignHealthCareServiceToLocationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AssignHealthCareServiceToLocationPage);
