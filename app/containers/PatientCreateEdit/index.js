/**
 *
 * PatientCreateEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { RaisedButton } from 'material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPatientCreateEdit from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectLocationTypes, makeSelectTelecomSystems, makeSelectUspsStates } from '../App/selectors';
import { getPatientLookupsAction } from '../App/actions';
import { LOCATIONTYPE, TELECOMSYSTEM, USPSSTATES } from '../App/constants';


export class PatientCreateEdit extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props.uspsStates);
    console.log(this.props.locationTypes);
    console.log(this.props.telecomSystems);
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <RaisedButton onClick={this.props.getLookups} label="Load Data" ></RaisedButton>
      </div>
    );
  }
}

PatientCreateEdit.propTypes = {
  getLookups: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  locationTypes: PropTypes.array,
  telecomSystems: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  patientcreateedit: makeSelectPatientCreateEdit(),
  uspsStates: makeSelectUspsStates(),
  locationTypes: makeSelectLocationTypes(),
  telecomSystems: makeSelectTelecomSystems(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getPatientLookupsAction([USPSSTATES, LOCATIONTYPE, TELECOMSYSTEM])),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'patientCreateEdit', reducer });
const withSaga = injectSaga({ key: 'patientCreateEdit', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PatientCreateEdit);
