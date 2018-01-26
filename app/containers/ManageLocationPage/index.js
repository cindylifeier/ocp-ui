/**
 *
 * ManageLocationPage
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
import { makeSelectLocation, makeSelectSaveLocationError } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getLookupsAction } from '../App/actions';
import {
  LOCATIONIDENTIFIERSYSTEM, LOCATIONSTATUS, LOCATIONPHYSICALTYPE, TELECOMSYSTEM,
  USPSSTATES, ADDRESSUSE, TELECOMUSE,
} from '../App/constants';
import {
  makeSelectLocationStatuses, makeSelectLocationPhysicalTypes,
  makeSelectTelecomSystems,
  makeSelectUspsStates, makeSelectAddressUses, makeSelectTelecomUses, makeSelectLocationIdentifierSystems,
} from '../App/selectors';
import ManageLocation from '../../components/ManageLocation/index';
import { createLocation, getLocation, updateLocation } from './actions';
import { makeSelectOrganization } from '../Locations/selectors';


export class ManageLocationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      locationId: 0,
    };
    this.handleSaveLocation = this.handleSaveLocation.bind(this);
  }
  componentWillMount() {
    const { match: { params } } = this.props;
    if (params.id) {
      const locationId = params.id;
      this.setState({ locationId });
      // get Location by id
      this.props.getLocation(locationId);
    }
    this.props.getLookups();
  }
  handleSaveLocation(location) {
    // console.log(location);
    if (this.state.locationId && location) {
      this.props.updateLocation(location, this.props.organization.id);
    } else {
      this.props.createLocation(location, this.props.organization.id);
    }
  }
  render() {
    const {
      error,
      uspsStates,
      locationPhysicalTypes,
      locationStatuses,
      telecomSystems,
      telecomUses,
      addressUses,
      identifierSystems,
      location,
      organization } = this.props;
    const localProps = {
      error,
      uspsStates,
      locationPhysicalTypes,
      locationStatuses,
      telecomSystems,
      telecomUses,
      addressUses,
      identifierSystems,
      location,
      organization,
    };

    return (
      <div>
        <Helmet>
          <title>ManageLocationPage</title>
          <meta name="description" content="Manage Location Page" />
        </Helmet>
        <ManageLocation
          {...localProps}
          onSave={this.handleSaveLocation}
        >
        </ManageLocation>
      </div>
    );
  }
}

ManageLocationPage.propTypes = {
  match: PropTypes.object,
  getLookups: PropTypes.func.isRequired,
  getLocation: PropTypes.func.isRequired,
  createLocation: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  locationPhysicalTypes: PropTypes.array,
  locationStatuses: PropTypes.array,
  telecomSystems: PropTypes.array,
  telecomUses: PropTypes.array,
  location: PropTypes.object,
  addressUses: PropTypes.array,
  organization: PropTypes.object,
  identifierSystems: PropTypes.array,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  locationPhysicalTypes: makeSelectLocationPhysicalTypes(),
  locationStatuses: makeSelectLocationStatuses(),
  telecomSystems: makeSelectTelecomSystems(),
  organization: makeSelectOrganization(),
  telecomUses: makeSelectTelecomUses(),
  addressUses: makeSelectAddressUses(),
  identifierSystems: makeSelectLocationIdentifierSystems(),
  error: makeSelectSaveLocationError(),
  location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([USPSSTATES, LOCATIONSTATUS, LOCATIONPHYSICALTYPE, ADDRESSUSE, TELECOMSYSTEM, TELECOMUSE, LOCATIONIDENTIFIERSYSTEM])),
    createLocation: (location, organizationId) => dispatch(createLocation(location, organizationId)),
    updateLocation: (location, organizationId) => dispatch(updateLocation(location, organizationId)),
    getLocation: (locationId) => dispatch(getLocation(locationId)),
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
