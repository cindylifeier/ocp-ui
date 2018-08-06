/**
 *
 * AddParticipantOrServiceDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import AddParticipantOrServiceForm from 'components/AddParticipantOrServiceDialog/AddParticipantOrServiceForm';


class AddParticipantOrServiceDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {
      open,
      handleDialogClose,
      healthcareServices,
    } = this.props;

    const addParticipantOrServiceProps = {
      handleDialogClose,
      healthcareServices,
    };

    return (
      <div>
        <Dialog
          modal={false}
          open={open}
          autoScrollBodyContent
        >
          <AddParticipantOrServiceForm {...addParticipantOrServiceProps}></AddParticipantOrServiceForm>
        </Dialog>
      </div>
    );
  }
}

AddParticipantOrServiceDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  healthcareServices: PropTypes.array.isRequired,
};

export default AddParticipantOrServiceDialog;
