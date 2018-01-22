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
import { getOrganizationLookupsAction } from '../App/actions';
import { LOCATIONTYPE, TELECOMSYSTEM, USPSSTATES } from '../App/constants';
import { makeSelectLocationTypes, makeSelectTelecomSystems, makeSelectUspsStates } from '../App/selectors';

export class ManageOrganizationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.getLookups();
  }
  render() {
    const { uspsStates, locationTypes, telecomSystems } = this.props;
    console.log(uspsStates);
    console.log(locationTypes);
    console.log(telecomSystems);
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
  getLookups: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  locationTypes: PropTypes.array,
  telecomSystems: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  manageorganizationpage: makeSelectManageOrganizationPage(),
  uspsStates: makeSelectUspsStates(),
  locationTypes: makeSelectLocationTypes(),
  telecomSystems: makeSelectTelecomSystems(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getOrganizationLookupsAction([USPSSTATES, LOCATIONTYPE, TELECOMSYSTEM])),
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
