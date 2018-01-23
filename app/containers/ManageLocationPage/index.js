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
import { RaisedButton } from 'material-ui';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectManageLocationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getLookupsAction } from '../App/actions';
import {
  ADDRESSTYPE, IDENTIFIERSYSTEM, LOCATIONSTATUS, LOCATIONTYPE, TELECOMSYSTEM,
  USPSSTATES,
} from '../App/constants';
import {
  makeSelectAddressTypes, makeSelectLocationStatuses, makeSelectLocationTypes,
  makeSelectUspsStates,
} from '../App/selectors';


export class ManageLocationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.getLookups();
  }
  render() {
    const { uspsStates, locationTypes, locationStatuses, addressTypes } = this.props;
    console.log(uspsStates);
    console.log(locationTypes);
    console.log(locationStatuses);
    console.log(addressTypes);
    return (
      <div>
        <Helmet>
          <title>ManageLocationPage</title>
          <meta name="description" content="Manage Location Page" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <br />
        <br />
        <RaisedButton onClick={this.props.getLookups1} label="Get Lookups" ></RaisedButton>
      </div>
    );
  }
}

ManageLocationPage.propTypes = {
  getLookups: PropTypes.func.isRequired,
  getLookups1: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  locationTypes: PropTypes.array,
  locationStatuses: PropTypes.array,
  addressTypes: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  managelocationpage: makeSelectManageLocationPage(),
  uspsStates: makeSelectUspsStates(),
  locationTypes: makeSelectLocationTypes(),
  locationStatuses: makeSelectLocationStatuses(),
  addressTypes: makeSelectAddressTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([USPSSTATES, LOCATIONSTATUS, LOCATIONTYPE, ADDRESSTYPE])),
    getLookups1: () => dispatch(getLookupsAction([USPSSTATES, LOCATIONTYPE, TELECOMSYSTEM, IDENTIFIERSYSTEM])),
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
