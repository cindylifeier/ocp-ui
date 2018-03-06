/**
 *
 * AddMultipleAddresses
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { teal500, white } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';

import FormSubtitle from 'components/FormSubtitle';
import AddAddressesButton from 'components/AddMultipleAddresses/AddAddressesButton';
import AddMultipleAddressForm from 'components/AddMultipleAddresses/AddMultipleAddressForm';
import messages from './messages';

class AddMultipleAddresses extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAddressesDialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isAddressesDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({ isAddressesDialogOpen: false });
  }

  // TODO: remove button color
  render() {
    const { onAddAddress, uspsStates } = this.props;
    return (
      <div>
        <FormSubtitle subtitleMargin="1vh 0 0 0">
          <FormattedMessage {...messages.header} />
        </FormSubtitle>
        <AddAddressesButton
          backgroundColor={teal500}
          labelColor={white}
          onClick={this.handleOpenDialog}
          label={<FormattedMessage {...messages.addAddressesButton} />}
        />
        <Dialog
          title="Add Addresses"
          modal={false}
          open={this.state.isAddressesDialogOpen}
          onRequestClose={this.handleCloseDialog}
        >
          <AddMultipleAddressForm
            onAddAddress={onAddAddress}
            uspsStates={uspsStates}
            handleCloseDialog={this.handleCloseDialog}
          />
        </Dialog>
      </div>
    );
  }
}

AddMultipleAddresses.propTypes = {
  onAddAddress: PropTypes.func,
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
};

export default AddMultipleAddresses;
