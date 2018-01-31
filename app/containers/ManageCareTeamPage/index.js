/**
 *
 * ManageCareTeamPage
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
import makeSelectManageCareTeamPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ManageCareTeam from '../../components/ManageCareTeam';

export class ManageCareTeamPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Manage CareTeam</title>
          <meta name="description" content="Manage CareTeam page of Omnibus Care Plan application" />
        </Helmet>
        <ManageCareTeam />
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
