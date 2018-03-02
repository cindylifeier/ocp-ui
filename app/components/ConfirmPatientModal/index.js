/**
 *
 * ConfirmPatientModal
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Close from 'material-ui/svg-icons/navigation/close';

import { Cell, Grid } from 'styled-css-grid';
import { PATIENTS_URL } from 'containers/App/constants';
import StyledDialog from 'components/StyledDialog';
import ContinueButton from 'components/ConfirmPatientModal/ContinueButton';
import StyledIconButton from 'components/StyledIconButton';
import messages from './messages';

function ConfirmPatientModal(props) {
  return (
    <div>
      <StyledDialog
        open={props.isPatientModalOpen}
        title={
          <StyledIconButton tooltip="Close" onClick={props.handlePatientModalClose}><Close /></StyledIconButton>
        }
      >
        <Grid
          columns={1}
          alignContent="space-between"
        >
          <Cell center>
          </Cell>
          <Cell center>Name</Cell>
          <Cell center>DOB</Cell>
          <Cell center>Gender</Cell>
          <Cell center>ID</Cell>
          <Cell center>Phone</Cell>
          <Cell center>
            <ContinueButton
              label={<FormattedMessage {...messages.continueButton} />}
              onClick={props.handlePatientModalClose}
              containerElement={<Link to={`${PATIENTS_URL}/${props.patientId}`} />}
            />
          </Cell>
        </Grid>
      </StyledDialog>
    </div>
  );
}

ConfirmPatientModal.propTypes = {
  isPatientModalOpen: PropTypes.bool.isRequired,
  handlePatientModalClose: PropTypes.func.isRequired,
  patientId: PropTypes.string.isRequired,
};

export default ConfirmPatientModal;
