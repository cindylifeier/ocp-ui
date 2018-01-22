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
import { IDENTIFIERSYSTEMS, LOCATIONTYPE, TELECOMSYSTEM, TELECOMUSE, USPSSTATES } from '../App/constants';


export class PatientCreateEdit extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props.uspsStates);
    console.log(this.props.locationTypes);
    console.log(this.props.telecomSystems);
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <br /><br />
        <RaisedButton onClick={this.props.getLookups1} label="Load Data1" ></RaisedButton>
        <br /><br />
        <RaisedButton onClick={this.props.getLookups2} label="Load Data2" ></RaisedButton>
      </div>
    );
  }
}

PatientCreateEdit.propTypes = {
  getLookups1: PropTypes.func.isRequired,
  getLookups2: PropTypes.func.isRequired,
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
    getLookups1: () => dispatch(getPatientLookupsAction([USPSSTATES, LOCATIONTYPE, TELECOMSYSTEM])),
    getLookups2: () => dispatch(getPatientLookupsAction([IDENTIFIERSYSTEMS, TELECOMSYSTEM, TELECOMUSE])),
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
