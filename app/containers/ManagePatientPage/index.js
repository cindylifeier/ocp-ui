/**
 *
 * ManagePatientPage
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
import makeSelectManagePatientPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class ManagePatientPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>ManagePatientPage</title>
          <meta name="description" content="Description of ManagePatientPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ManagePatientPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managepatientpage: makeSelectManagePatientPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'managePatientPage', reducer });
const withSaga = injectSaga({ key: 'managePatientPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagePatientPage);
