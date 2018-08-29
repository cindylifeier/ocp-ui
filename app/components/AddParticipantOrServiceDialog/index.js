/**
 *
 * AddParticipantOrServiceDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DialogContent, DialogTitle } from 'material-ui-next';

import StyledDialog from 'components/StyledDialog';
import AddParticipantOrServiceForm from './AddParticipantOrServiceForm';
import messages from './messages';


class AddParticipantOrServiceDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {
      open,
      handleDialogClose,
      healthcareServices,
      handleSelectLocation,
      handleSelectPractitioner,
      locations,
      practitioners,
      careTeams,
      appointmentParticipantRequired,
      handleAddParticipant,
    } = this.props;

    const addParticipantOrServiceProps = {
      handleDialogClose,
      healthcareServices,
      handleSelectLocation,
      handleSelectPractitioner,
      locations,
      careTeams,
      practitioners,
      appointmentParticipantRequired,
      handleAddParticipant,
    };

    return (
      <StyledDialog maxWidth="md" fullWidth open={open}>
        <DialogTitle>
          <FormattedMessage {...messages.addParticipantOrServiceDialogTitle} />
        </DialogTitle>
        <DialogContent>
          <AddParticipantOrServiceForm {...addParticipantOrServiceProps} />
        </DialogContent>
      </StyledDialog>
    );
  }
}

AddParticipantOrServiceDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  handleAddParticipant: PropTypes.func.isRequired,
  healthcareServices: PropTypes.array,
  handleSelectLocation: PropTypes.func.isRequired,
  handleSelectPractitioner: PropTypes.func.isRequired,
  locations: PropTypes.array,
  practitioners: PropTypes.array,
  appointmentParticipantRequired: PropTypes.array,
  careTeams: PropTypes.array,
};

export default AddParticipantOrServiceDialog;
