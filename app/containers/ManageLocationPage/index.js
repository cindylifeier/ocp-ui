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
import { makeSelectSaveLocationError } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getLookupsAction } from '../App/actions';
import {
  ADDRESSTYPE, LOCATIONIDENTIFIERSYSTEM, LOCATIONSTATUS, LOCATIONPHYSICALTYPE, TELECOMSYSTEM,
  USPSSTATES, ADDRESSUSE, TELECOMUSE,
} from '../App/constants';
import {
  makeSelectAddressTypes, makeSelectLocationStatuses, makeSelectLocationPhysicalTypes,
  makeSelectTelecomSystems,
  makeSelectUspsStates, makeSelectAddressUses, makeSelectTelecomUses, makeSelectLocationIdentifierSystems,
} from '../App/selectors';
import ManageLocation from '../../components/ManageLocation/index';
import { createLocation } from './actions';


export class ManageLocationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      organizationId: 902,
      locationId: 0,
    };
    this.handleCreateLocation = this.handleCreateLocation.bind(this);
  }
  componentWillMount() {
    this.props.getLookups();
  }
  handleCreateLocation(location) {
    console.log(location);
    this.props.createLocation(location, this.state.organizationId);
  }
  render() {
    const {
      error,
      uspsStates,
      locationPhysicalTypes,
      locationStatuses,
      addressTypes,
      telecomSystems,
      telecomUses,
      addressUses,
      identifierSystems } = this.props;
    const localProps = {
      error,
      uspsStates,
      locationPhysicalTypes,
      locationStatuses,
      addressTypes,
      telecomSystems,
      telecomUses,
      addressUses,
      identifierSystems,
    };

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
          {...localProps}
          onSave={this.handleCreateLocation}
        >
        </ManageLocation>
      </div>
    );
  }
}

ManageLocationPage.propTypes = {
  getLookups: PropTypes.func.isRequired,
  createLocation: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  locationPhysicalTypes: PropTypes.array,
  locationStatuses: PropTypes.array,
  addressTypes: PropTypes.array,
  telecomSystems: PropTypes.array,
  telecomUses: PropTypes.array,
  addressUses: PropTypes.array,
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
  addressTypes: makeSelectAddressTypes(),
  telecomSystems: makeSelectTelecomSystems(),
  telecomUses: makeSelectTelecomUses(),
  addressUses: makeSelectAddressUses(),
  identifierSystems: makeSelectLocationIdentifierSystems(),
  error: makeSelectSaveLocationError(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([USPSSTATES, LOCATIONSTATUS, LOCATIONPHYSICALTYPE, ADDRESSTYPE, ADDRESSUSE, TELECOMSYSTEM, TELECOMUSE, LOCATIONIDENTIFIERSYSTEM])),
    createLocation: (location, organizationId) => dispatch(createLocation(location, organizationId)),
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
