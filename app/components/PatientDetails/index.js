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
import PatientDetailsGrid from 'components/PatientDetails/PatientDetailsGrid';
import PatientDetailsCell from 'components/PatientDetails/PatientDetailsCell';
import DetailsPanelGrid from 'components/PatientDetails/DetailsPanelGrid';
import H3 from 'components/H3';
import { mapToPatientAddress, mapToPatientName, mapToPatientPhone } from 'utils/PatientUtils';
import { WHITE_SPACE } from 'containers/App/constants';

function PatientDetails(props) {
  const { selectedPatient } = props;
  return (
    <div>
      <PatientDetailsGrid columns={1}>
        <PatientDetailsCell>
          <Grid
            columns={'40px 1fr'}
            areas={['avatar patientDetails']}
          >
            <Cell area="avatar"><Avatar src={patientAvatar} /></Cell>
            <Cell area="patientDetails">
              <Grid columns={4}>
                <Cell width={4}>
                  <H3>{mapToPatientName(selectedPatient)}</H3>
                </Cell>
                <Cell>ID{WHITE_SPACE}<strong>{selectedPatient.id}</strong></Cell>
                <Cell>Gender{WHITE_SPACE}<strong>{upperFirst(selectedPatient.genderCode)}</strong></Cell>
                <Cell>DOB{WHITE_SPACE}<strong>{selectedPatient.birthDate}</strong></Cell>
                <Cell>Care Coordinator{WHITE_SPACE}<strong>Lee Coordinator(hard-coded)</strong></Cell>
              </Grid>
            </Cell>
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
