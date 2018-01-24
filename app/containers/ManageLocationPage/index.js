/**
 *
 * ManageLocationPage
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
import makeSelectManageLocationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getLookupsAction } from '../App/actions';
import {
  ADDRESSTYPE, LOCATIONIDENTIFIERSYSTEM, LOCATIONSTATUS, LOCATIONPHYSICALTYPE, TELECOMSYSTEM,
  USPSSTATES, ADDRESSUSE,
} from '../App/constants';
import {
  makeSelectAddressTypes, makeSelectLocationStatuses, makeSelectLocationPhysicalTypes,
  makeSelectIdentifierSystems,
  makeSelectTelecomSystems,
  makeSelectUspsStates, makeSelectAddressUses,
} from '../App/selectors';
import ManageLocation from '../../components/ManageLocation';


export class ManageLocationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleCreateLocation = this.handleCreateLocation.bind(this);
  }
  componentWillMount() {
    this.props.getLookups();
  }
  handleCreateLocation() {
    this.props.createLocation();
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>ManageLocationPage</title>
          <meta name="description" content="Manage Location Page" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <br />
        <br />
        <p><FormattedMessage {...messages.organizatoinNameLabel} /></p>
        <ManageLocation
          {...this.props}
          onCreateLocation={this.handleCreateLocation}
        >
        </ManageLocation>
      </div>
    );
  }
}

ManageLocationPage.propTypes = {
  createLocation: PropTypes.func.isRequired,
  getLookups: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managelocationpage: makeSelectManageLocationPage(),
  uspsStates: makeSelectUspsStates(),
  locationPhysicalTypes: makeSelectLocationPhysicalTypes(),
  locationStatuses: makeSelectLocationStatuses(),
  addressTypes: makeSelectAddressTypes(),
  telecomSystems: makeSelectTelecomSystems(),
  addressUses: makeSelectAddressUses(),
  identifierSystems: makeSelectIdentifierSystems(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([USPSSTATES, LOCATIONSTATUS, LOCATIONPHYSICALTYPE, ADDRESSTYPE, ADDRESSUSE, TELECOMSYSTEM, LOCATIONIDENTIFIERSYSTEM])),
    createLocation: () => dispatch(getLookupsAction([USPSSTATES, LOCATIONPHYSICALTYPE, TELECOMSYSTEM, LOCATIONIDENTIFIERSYSTEM])),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageLocationPage', reducer });
const withSaga = injectSaga({ key: 'manageLocationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageLocationPage);
