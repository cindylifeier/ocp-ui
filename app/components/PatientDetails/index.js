/**
 *
 * PatientDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Cell, Grid } from 'styled-css-grid';
import Avatar from 'material-ui/Avatar';
import Flag from 'material-ui/svg-icons/content/flag';
import upperFirst from 'lodash/upperFirst';

import patientAvatar from 'images/patient-avatar.png';
import { MANAGE_PATIENT_URL, WHITE_SPACE } from 'containers/App/constants';
import PatientDetailsGrid from 'components/PatientDetails/PatientDetailsGrid';
import PatientDetailsCell from 'components/PatientDetails/PatientDetailsCell';
import DetailsPanelGrid from 'components/PatientDetails/DetailsPanelGrid';
import PatientBasicInfoCell from 'components/PatientDetails/PatientBasicInfoCell';
import H3 from 'components/H3';
import { mapToPatientAddress, mapToPatientName, mapToPatientPhone } from 'utils/PatientUtils';

function PatientDetails(props) {
  const { patient } = props;
  return (
    <div>
      <PatientDetailsGrid columns={1}>
        <PatientDetailsCell>
          <Grid
            columns={'55px repeat(4, 1fr)'}
            flow="column"
          >
            <PatientBasicInfoCell height={2}><Avatar size={55} src={patientAvatar} /></PatientBasicInfoCell>
            <PatientBasicInfoCell width={4} height={1}>
              <H3>{mapToPatientName(patient)}</H3>
            </PatientBasicInfoCell>
            <PatientBasicInfoCell height={1}>
              ID{WHITE_SPACE}<strong>{patient.id}</strong>
            </PatientBasicInfoCell>
            <PatientBasicInfoCell height={1}>
              Gender{WHITE_SPACE}<strong>{upperFirst(patient.genderCode)}</strong>
            </PatientBasicInfoCell>
            <PatientBasicInfoCell height={1}>
              DOB{WHITE_SPACE}<strong>{patient.birthDate}</strong></PatientBasicInfoCell>
            <PatientBasicInfoCell height={1}>
              Care Coordinator{WHITE_SPACE}<strong>Lee Coordinator(hard-coded)</strong>
            </PatientBasicInfoCell>
          </Grid>
        </PatientDetailsCell>
        <PatientDetailsCell>
          <DetailsPanelGrid columns={'repeat(4, 1fr) 100px '}>
            <Cell>Address{WHITE_SPACE}<strong>{mapToPatientAddress(patient)}</strong></Cell>
            <Cell>Contact{WHITE_SPACE}<strong>{mapToPatientPhone(patient)}</strong></Cell>
            <Cell>Diagnosis{WHITE_SPACE}<strong>Severe Depression(hard-coded)</strong></Cell>
            <Cell><strong>Known Allergies(hard-coded)</strong></Cell>
            <Cell><Link to={`${MANAGE_PATIENT_URL}/${patient.id}`} ><Flag /><strong>Advisory</strong></Link></Cell>
          </DetailsPanelGrid>
        </PatientDetailsCell>
      </PatientDetailsGrid>
    </div>
  );
}

PatientDetails.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
};

export default PatientDetails;
