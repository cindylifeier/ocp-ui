/**
 *
 * ManageRelatedPersonPage
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
import makeSelectManageRelatedPersonPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class ManageRelatedPersonPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Manage Related Person</title>
          <meta name="description" content="Description of ManageRelatedPersonPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ManageRelatedPersonPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managerelatedpersonpage: makeSelectManageRelatedPersonPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageRelatedPersonPage', reducer });
const withSaga = injectSaga({ key: 'manageRelatedPersonPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageRelatedPersonPage);
