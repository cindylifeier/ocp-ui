/**
 *
 * ConfirmPatientModal
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import upperFirst from 'lodash/upperFirst';
import Close from 'material-ui/svg-icons/navigation/close';
import Avatar from 'material-ui/Avatar';
import { Cell } from 'styled-css-grid';

import { mapToPatientName, mapToPatientPhone } from 'utils/PatientUtils';
import { PATIENTS_URL, WHITE_SPACE } from 'containers/App/constants';
import StyledDialog from 'components/StyledDialog';
import ContinueButton from 'components/ConfirmPatientModal/ContinueButton';
import CloseButton from 'components/ConfirmPatientModal/CloseButton';
import PatientModalGrid from 'components/ConfirmPatientModal/PatientModalGrid';
import PatientModalCell from 'components/ConfirmPatientModal/PatientModalCell';
import patientAvatar from 'images/patient-avatar.png';
import messages from './messages';

function ConfirmPatientModal(props) {
  return (
    <div>
      <StyledDialog
        open={props.isPatientModalOpen}
      >
        <CloseButton tooltip="Close" onClick={props.handlePatientModalClose}><Close /></CloseButton>
        <PatientModalGrid
          columns={1}
          alignContent="space-between"
        >
          <Cell center><Avatar size={80} src={patientAvatar} /></Cell>
          <PatientModalCell center>
            Name{WHITE_SPACE}<strong>{mapToPatientName(props.selectedPatient)}</strong>
          </PatientModalCell>
          <PatientModalCell center>
            DOB{WHITE_SPACE}<strong>{props.selectedPatient.birthDate}</strong>
          </PatientModalCell>
          <PatientModalCell center>
            Gender{WHITE_SPACE}<strong>{upperFirst(props.selectedPatient.genderCode)}</strong>
          </PatientModalCell>
          <PatientModalCell center>
            ID{WHITE_SPACE}<strong>{props.selectedPatient.id}</strong>
          </PatientModalCell>
          <PatientModalCell center>
            Phone{WHITE_SPACE}<strong>{mapToPatientPhone(props.selectedPatient)}</strong>
          </PatientModalCell>
          <Cell center>
            <ContinueButton
              label={<FormattedMessage {...messages.continueButton} />}
              onClick={props.handlePatientModalClose}
              containerElement={<Link to={`${PATIENTS_URL}/${props.selectedPatient.id}`} />}
            />
          </Cell>
        </PatientModalGrid>
      </StyledDialog>
    </div>
  );
}

ConfirmPatientModal.propTypes = {
  isPatientModalOpen: PropTypes.bool.isRequired,
  handlePatientModalClose: PropTypes.func.isRequired,
  selectedPatient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
    birthDate: PropTypes.string,
    genderCode: PropTypes.string,
  }),
};

export default ConfirmPatientModal;
