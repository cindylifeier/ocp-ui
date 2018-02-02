/**
 *
 * ManageLocationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import find from 'lodash/find';
import merge from 'lodash/merge';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import Divider from 'material-ui/Divider';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectSaveLocationError } from './selectors';
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
import { createLocation, updateLocation } from './actions';
import { makeSelectLocations, makeSelectOrganization } from '../Locations/selectors';
import messages from './messages';
import styles from './styles.css';

export class ManageLocationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSaveLocation = this.handleSaveLocation.bind(this);
  }
  componentWillMount() {
    this.props.getLookups();
  }
  handleSaveLocation(location) {
    const logicalId = this.props.match.params.id;
    if (logicalId && location) {
      const mergedLocation = merge(location, { logicalId });
      this.props.updateLocation(mergedLocation, this.props.organization.id);
    } else {
      this.props.createLocation(location, this.props.organization.id);
    }
  }
  render() {
    const logicalId = this.props.match.params.id;
    const location = find(this.props.locations, { logicalId });
    const {
      error,
      uspsStates,
      locationPhysicalTypes,
      locationStatuses,
      telecomSystems,
      telecomUses,
      addressUses,
      identifierSystems,
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
      <div className={styles.wrapper}>
        <Helmet>
          <title>ManageLocationPage</title>
          <meta name="description" content="Manage Location Page" />
        </Helmet>
        <div className={styles.header}>
          {logicalId ? <FormattedMessage {...messages.editHeader} />
            : <FormattedMessage {...messages.createHeader} />}
        </div>
        <Divider />
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
  createLocation: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  locationPhysicalTypes: PropTypes.array,
  locationStatuses: PropTypes.array,
  telecomSystems: PropTypes.array,
  telecomUses: PropTypes.array,
  locations: PropTypes.array,
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
  locations: makeSelectLocations(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([USPSSTATES, LOCATIONSTATUS, LOCATIONPHYSICALTYPE, ADDRESSUSE, TELECOMSYSTEM, TELECOMUSE, LOCATIONIDENTIFIERSYSTEM])),
    createLocation: (location, organizationId) => dispatch(createLocation(location, organizationId)),
    updateLocation: (location, organizationId) => dispatch(updateLocation(location, organizationId)),
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
