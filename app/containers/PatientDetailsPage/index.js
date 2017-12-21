/**
 *
 * PatientDetailsPage
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
import { makeSelectPatient, makeSelectPatientId } from './selectors';
import reducer from './reducer';
import saga from './saga';
import PatientRecord from '../../components/PatientRecord';
import { loadPatient } from './actions';

export class PatientDetailsPage extends React.Component { // eslint-disable-line react/prefer-stateless-
  componentWillMount() {
    const { match } = this.props;
    this.props.loadPatient(match.params.id);
  }

  render() {
    const { patient } = this.props;
    return (
      <div>
        <Helmet>
          <title>PatientDetailsPage</title>
          <meta name="description" content="Description of PatientDetailsPage" />
        </Helmet>
        {patient && patient.data && <PatientRecord patient={patient.data} />}
      </div>
    );
  }
}

PatientDetailsPage.propTypes = {
  loadPatient: PropTypes.func.isRequired,
  patient: PropTypes.object,
  match: PropTypes.shape({
    data: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
  patientId: makeSelectPatientId(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPatient: (patientId) => dispatch(loadPatient(patientId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'patientDetailsPage', reducer });
const withSaga = injectSaga({ key: 'patientDetailsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PatientDetailsPage);
