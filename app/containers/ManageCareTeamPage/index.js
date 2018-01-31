/**
 *
 * ManageCareTeamPage
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
import makeSelectManageCareTeamPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class ManageCareTeamPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>ManageCareTeamPage</title>
          <meta name="description" content="Description of ManageCareTeamPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ManageCareTeamPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managecareteampage: makeSelectManageCareTeamPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageCareTeamPage', reducer });
const withSaga = injectSaga({ key: 'manageCareTeamPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageCareTeamPage);
