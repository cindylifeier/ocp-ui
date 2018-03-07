/**
 *
 * PatientDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import Avatar from 'material-ui/Avatar';
import upperFirst from 'lodash/upperFirst';

import patientAvatar from 'images/patient-avatar.png';
import { WHITE_SPACE } from 'containers/App/constants';
import PatientDetailsGrid from 'components/PatientDetails/PatientDetailsGrid';
import PatientDetailsCell from 'components/PatientDetails/PatientDetailsCell';
import DetailsPanelGrid from 'components/PatientDetails/DetailsPanelGrid';
import PatientBasicInfoCell from 'components/PatientDetails/PatientBasicInfoCell';
import H3 from 'components/H3';
import { mapToPatientAddress, mapToPatientName, mapToPatientPhone } from 'utils/PatientUtils';

function PatientDetails(props) {
  const { selectedPatient } = props;
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
              <H3>{mapToPatientName(selectedPatient)}</H3>
            </PatientBasicInfoCell>
            <PatientBasicInfoCell height={1}>
              ID{WHITE_SPACE}<strong>{selectedPatient.id}</strong>
            </PatientBasicInfoCell>
            <PatientBasicInfoCell height={1}>
              Gender{WHITE_SPACE}<strong>{upperFirst(selectedPatient.genderCode)}</strong>
            </PatientBasicInfoCell>
            <PatientBasicInfoCell height={1}>
              DOB{WHITE_SPACE}<strong>{selectedPatient.birthDate}</strong></PatientBasicInfoCell>
            <PatientBasicInfoCell height={1}>
              Care Coordinator{WHITE_SPACE}<strong>Lee Coordinator(hard-coded)</strong>
            </PatientBasicInfoCell>
          </Grid>
        </PatientDetailsCell>
        <PatientDetailsCell>
          <DetailsPanelGrid columns={4}>
            <Cell>Address{WHITE_SPACE}<strong>{mapToPatientAddress(selectedPatient)}</strong></Cell>
            <Cell>Contact{WHITE_SPACE}<strong>{mapToPatientPhone(selectedPatient)}</strong></Cell>
            <Cell>Diagnosis{WHITE_SPACE}<strong>Severe Depression(hard-coded)</strong></Cell>
            <Cell><strong>Known Allergies(hard-coded)</strong></Cell>
          </DetailsPanelGrid>
        </PatientDetailsCell>
      </PatientDetailsGrid>
    </div>
  );
}

PatientDetails.propTypes = {
  selectedPatient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
};

export default PatientDetails;
