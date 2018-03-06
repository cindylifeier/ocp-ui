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
import { FieldArray } from 'formik';

import FormSubtitle from 'components/FormSubtitle';
import AddAddressesButton from 'components/AddMultipleAddresses/AddAddressesButton';
import AddMultipleAddressForm from 'components/AddMultipleAddresses/AddMultipleAddressForm';
import AddedAddressTable from 'components/AddMultipleAddresses/AddedAddressTable';
import messages from './messages';

class AddMultipleAddresses extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAddressesDialogOpen: false,
      editingAddress: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditAddress = this.handleEditAddress.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isAddressesDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({ isAddressesDialogOpen: false });
  }

  handleEditAddress(index, address) {
    this.setState((prevState) => ({
      isAddressesDialogOpen: !prevState.isAddressesDialogOpen,
      editingAddress: { index, address },
    }));
  }

  // TODO: remove button color
  render() {
    const { uspsStates, errors, values } = this.props;
    const addedAddressTableProps = {
      errors,
      values,
    };
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
        <FieldArray
          name="addresses"
          render={(arrayHelpers) => (
            <div>
              <Dialog
                title="Add Addresses"
                modal={false}
                open={this.state.isAddressesDialogOpen}
                onRequestClose={this.handleCloseDialog}
              >
                <AddMultipleAddressForm
                  initialValues={this.state.editingAddress}
                  onAddAddress={arrayHelpers.push}
                  onRemoveAddress={arrayHelpers.remove}
                  uspsStates={uspsStates}
                  handleCloseDialog={this.handleCloseDialog}
                />
              </Dialog>
              <AddedAddressTable {...addedAddressTableProps} />
            </div>
          )}
        />
      </div>
    );
  }
}

AddMultipleAddresses.propTypes = {
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  errors: PropTypes.object,
  values: PropTypes.object,
};

export default AddMultipleAddresses;
