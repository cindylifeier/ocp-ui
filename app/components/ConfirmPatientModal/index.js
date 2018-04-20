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
import Close from '@material-ui/icons/Close';
import Avatar from 'material-ui/Avatar';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import { Cell, Grid } from 'styled-css-grid';

import { mapToPatientName, mapToPatientPhone } from 'utils/PatientUtils';
import defaultPatientAvatarImage from 'images/patient-avatar.png';
import { PATIENTS_URL, WHITE_SPACE } from 'containers/App/constants';
import StyledDialog from 'components/StyledDialog';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledIconButton from 'components/StyledIconButton';
import StyledTooltip from 'components/StyledTooltip';
import HorizontalAlignment from 'components/HorizontalAlignment';
import PatientModalCell from './PatientModalCell';
import messages from './messages';

function ConfirmPatientModal(props) {
  const { patient, isPatientModalOpen, onPatientModalClose } = props;
  return (
    <div>
      <StyledDialog
        open={isPatientModalOpen}
        fullWidth
      >
        <DialogTitle>
          <HorizontalAlignment position={'end'}>
            <StyledTooltip title="Close">
              <StyledIconButton onClick={onPatientModalClose}>
                <Close />
              </StyledIconButton>
            </StyledTooltip>
          </HorizontalAlignment>
        </DialogTitle>
        <DialogContent>
          <Grid columns={1} alignContent="space-between">
            <Cell center><Avatar size={80} src={defaultPatientAvatarImage} /></Cell>
            <PatientModalCell center>
              Name{WHITE_SPACE}<strong>{mapToPatientName(patient)}</strong>
            </PatientModalCell>
            <PatientModalCell center>
              DOB{WHITE_SPACE}<strong>{patient.birthDate}</strong>
            </PatientModalCell>
            <PatientModalCell center>
              Gender{WHITE_SPACE}<strong>{upperFirst(patient.genderCode)}</strong>
            </PatientModalCell>
            <PatientModalCell center>
              ID{WHITE_SPACE}<strong>{patient.id}</strong>
            </PatientModalCell>
            <PatientModalCell center>
              Phone{WHITE_SPACE}<strong>{mapToPatientPhone(patient)}</strong>
            </PatientModalCell>
            <Cell center>
              <StyledRaisedButton
                onClick={onPatientModalClose}
                component={Link}
                to={`${PATIENTS_URL}/${patient.id}`}
              >
                <FormattedMessage {...messages.continueButton} />
              </StyledRaisedButton>
            </Cell>
          </Grid>
        </DialogContent>
      </StyledDialog>
    </div>
  );
}

ConfirmPatientModal.propTypes = {
  isPatientModalOpen: PropTypes.bool.isRequired,
  onPatientModalClose: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
    birthDate: PropTypes.string,
    genderCode: PropTypes.string,
  }).isRequired,
};

export default ConfirmPatientModal;
