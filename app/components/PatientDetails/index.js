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
import Flag from '@material-ui/icons/Flag';
import upperFirst from 'lodash/upperFirst';

import patientAvatar from 'images/patient-avatar.png';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import { CARE_COORDINATOR_ROLE_CODE, MANAGE_PATIENT_URL, WHITE_SPACE } from 'containers/App/constants';
import PatientDetailsGrid from 'components/PatientDetails/PatientDetailsGrid';
import PatientDetailsCell from 'components/PatientDetails/PatientDetailsCell';
import DetailsPanelGrid from 'components/PatientDetails/DetailsPanelGrid';
import PatientBasicInfoCell from 'components/PatientDetails/PatientBasicInfoCell';
import H3 from 'components/H3';
import PatientBasicInfoGrid from 'components/PatientDetails/PatientBasicInfoGrid';

function PatientDetails(props) {
  const { patient } = props;
  const flattenPatient = props.flattenPatientData(patient);
  const { id, name, addresses, phones, birthDate, genderCode, flags } = flattenPatient;
  return (
    <div>
      <PatientDetailsGrid columns={1}>
        <PatientDetailsCell>
          <Grid
            columns={'55px 1fr'}
            flow="column"
          >
            <PatientBasicInfoCell height={2}><Avatar size={55} src={patientAvatar} /></PatientBasicInfoCell>
            <PatientBasicInfoGrid
              columns={'repeat(4, 1fr)'}
              flow="row"
              alignContent="start"
            >
              <PatientBasicInfoCell width={4}>
                <H3>{name}</H3>
              </PatientBasicInfoCell>
              <PatientBasicInfoCell>
                ID{WHITE_SPACE}<strong>{id}</strong>
              </PatientBasicInfoCell>
              <PatientBasicInfoCell>
                Gender{WHITE_SPACE}<strong>{upperFirst(genderCode)}</strong>
              </PatientBasicInfoCell>
              <PatientBasicInfoCell>
                DOB{WHITE_SPACE}<strong>{birthDate}</strong></PatientBasicInfoCell>
            </PatientBasicInfoGrid>
          </Grid>
        </PatientDetailsCell>
        <PatientDetailsCell>
          <DetailsPanelGrid columns={'55px repeat(2, 1fr) 100px'}>
            <Cell />
            <Cell>Address{WHITE_SPACE}<strong>{addresses}</strong></Cell>
            <Cell>Contact{WHITE_SPACE}<strong>{phones}</strong></Cell>
            {flags.length > 0 &&
            <ShowHideWrapper allowedRoles={CARE_COORDINATOR_ROLE_CODE}>
              <Cell>
                <Link to={`${MANAGE_PATIENT_URL}/${id}`}>
                  <Flag />
                  <strong>Advisory</strong>
                </Link>
              </Cell>
            </ShowHideWrapper>
            }
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
  flattenPatientData: PropTypes.func.isRequired,
};

export default PatientDetails;
