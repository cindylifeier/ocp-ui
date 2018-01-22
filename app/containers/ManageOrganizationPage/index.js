/**
 *
 * ManageOrganizationPage
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
import makeSelectManageOrganizationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class ManageOrganizationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>ManageOrganizationPage</title>
          <meta name="description" content="Description of ManageOrganizationPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ManageOrganizationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageorganizationpage: makeSelectManageOrganizationPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageOrganizationPage', reducer });
const withSaga = injectSaga({ key: 'manageOrganizationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageOrganizationPage);
