/**
 *
 * AddMultipleContacts
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import { DialogTitle } from 'material-ui-next/Dialog';
import teal from 'material-ui-next/colors/teal';

import FormSubtitle from 'components/FormSubtitle';
import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import StyledDialog from 'components/StyledDialog';
import messages from './messages';


class AddMultipleContacts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ dialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      dialogOpen: false,
    });
  }

  render() {
    return (
      <div>
        <FormSubtitle margin="1vh 0 0 0">
          <FormattedMessage {...messages.header} />
        </FormSubtitle>
        <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
          <StyledAddCircleIcon color={teal['500']} />
          <FormattedMessage {...messages.addContactsButton} />
        </AddNewItemButton>
        <FieldArray
          name="contacts"
          render={() => (
            <div>
              <StyledDialog open={this.state.dialogOpen}>
                <DialogTitle>
                  <FormattedMessage {...messages.title} />
                </DialogTitle>
              </StyledDialog>
            </div>
          )}
        />
      </div>
    );
  }
}

AddMultipleContacts.propTypes = {};

export default AddMultipleContacts;
