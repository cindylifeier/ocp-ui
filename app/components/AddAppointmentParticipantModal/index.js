/**
 *
 * AddAppointmentParticipantModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next';

import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledDialog from 'components/StyledDialog';
import AddParticipantForm from './AddParticipantForm';
import messages from './messages';


class AddAppointmentParticipantModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      editingParticipant: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditParticipant = this.handleEditParticipant.bind(this);
  }

  handleOpenDialog() {
    this.setState({ dialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      dialogOpen: false,
      editingParticipant: null,
    });
  }

  handleEditParticipant(index, participant) {
    this.setState((prevState) => ({
      dialogOpen: !prevState.dialogOpen,
      editingParticipant: { index, participant },
    }));
  }

  render() {
    const { healthcareServices, locations, participantAttendance, practitioners } = this.props;
    return (
      <div>
        <StyledRaisedButton onClick={this.handleOpenDialog}>
          <FormattedMessage {...messages.addParticipantBtn} />
        </StyledRaisedButton>
        <FieldArray
          name="participants"
          render={(arrayHelpers) => (
            <div>
              <StyledDialog maxWidth="md" fullWidth open={this.state.dialogOpen}>
                <DialogTitle>
                  <FormattedMessage {...messages.dialogTitle} />
                </DialogTitle>
                <DialogContent>
                  <AddParticipantForm
                    arrayHelpers={arrayHelpers}
                    onCloseDialog={this.handleCloseDialog}
                    locations={locations}
                    healthcareServices={healthcareServices}
                    practitioners={practitioners}
                    participantAttendance={participantAttendance}
                  />
                </DialogContent>
              </StyledDialog>
            </div>
          )}
        />
      </div>
    );
  }
}

AddAppointmentParticipantModal.propTypes = {
  healthcareServices: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  practitioners: PropTypes.array.isRequired,
  participantAttendance: PropTypes.array.isRequired,
};

export default AddAppointmentParticipantModal;
