/**
 *
 * PatientDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import Avatar from 'material-ui/Avatar';

import patientAvatar from 'images/patient-avatar.png';
import PatientDetailsGrid from 'components/PatientDetails/PatientDetailsGrid';
import PatientDetailsCell from 'components/PatientDetails/PatientDetailsCell';
import DetailsPanelGrid from 'components/PatientDetails/DetailsPanelGrid';

function PatientDetails(props) {
  return (
    <div>
      {console.log(props.selectedPatient)}
      <PatientDetailsGrid columns={1}>
        <PatientDetailsCell>
          <Grid
            columns={'40px 1fr'}
            areas={['avatar patientDetails']}
          >
            <Cell area="avatar"><Avatar src={patientAvatar} /></Cell>
            <Cell area="patientDetails">
              <Grid columns={4}>
                <Cell width={4}>Seymour Patients (Mr)</Cell>
                <Cell>ID</Cell>
                <Cell>Gender</Cell>
                <Cell>DOB</Cell>
                <Cell>Care Coordinator</Cell>
              </Grid>
            </Cell>
          </Grid>
        </PatientDetailsCell>
        <PatientDetailsCell>
          <DetailsPanelGrid columns={4}>
            <Cell>
              Address:
            </Cell>
            <Cell>
              Contact:
            </Cell>
            <Cell>
              Diagnosis:
            </Cell>
            <Cell>
              Known Allergies
            </Cell>
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
