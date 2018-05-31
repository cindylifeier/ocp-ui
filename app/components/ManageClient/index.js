/**
 *
 * ManageClient
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import teal from 'material-ui-next/colors/teal';
import { FormattedMessage } from 'react-intl';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledDialog from 'components/StyledDialog';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import ManageClientForm from './ManageClientForm';
import messages from './messages';

// import styled from 'styled-components';

class ManageClient extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      isClientDialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isClientDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isClientDialogOpen: false,
    });
  }

  render() {
    const {
      onSaveClient,
    } = this.props;

    return (
      <div>
        <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
          <StyledAddCircleIcon color={teal['500']} />
          <FormattedMessage {...messages.addClient} />
        </AddNewItemButton>
        <StyledDialog
          open={this.state.isClientDialogOpen}
          onClose={this.handleCloseDialog}
          fullWidth
        >
          <DialogTitle>
            <FormattedMessage {...messages.dialogHeader} />
          </DialogTitle>
          <DialogContent>
            <ManageClientForm
              handleCloseDialog={this.handleCloseDialog}
              onSaveClient={onSaveClient}
            />
          </DialogContent>
        </StyledDialog>
      </div>
    );
  }
}

ManageClient.propTypes = {
  onSaveClient: PropTypes.func,
};

export default ManageClient;
