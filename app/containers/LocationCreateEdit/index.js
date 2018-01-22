/**
 *
 * LocationCreateEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLocationCreateEdit from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getLookationLookupsAction } from '../App/actions';
import { ADDRESSTYPE, LOCATIONSTATUS, LOCATIONTYPE, USPSSTATES } from '../App/constants';
import {
  makeSelectAddressTypes, makeSelectLocationStatuses, makeSelectLocationTypes,
  makeSelectUspsStates,
} from '../App/selectors';

export class LocationCreateEdit extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

LocationCreateEdit.propTypes = {
  getLookups: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  locationTypes: PropTypes.array,
  locationStatuses: PropTypes.array,
  addressTypes: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  locationcreateedit: makeSelectLocationCreateEdit(),
  uspsStates: makeSelectUspsStates(),
  locationTypes: makeSelectLocationTypes(),
  locationStatuses: makeSelectLocationStatuses(),
  addressTypes: makeSelectAddressTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookationLookupsAction([USPSSTATES, LOCATIONSTATUS, LOCATIONTYPE, ADDRESSTYPE])),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'locationCreateEdit', reducer });
const withSaga = injectSaga({ key: 'locationCreateEdit', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LocationCreateEdit);
