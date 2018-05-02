/**
 *
 * AddMultipleAddresses
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dialog from 'material-ui/Dialog';
import { FieldArray } from 'formik';

import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledIconButton from 'components/StyledIconButton';
import AddCircle from '@material-ui/icons/es/AddCircle';
import teal from 'material-ui-next/colors/teal';
import FormSubtitle from 'components/FormSubtitle';
import AddMultipleAddressesForm from './AddMultipleAddressesForm';
import AddedAddressesTable from './AddedAddressesTable';
import messages from './messages';

class AddMultipleAddresses extends React.Component {
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
    this.setState({
      isAddressesDialogOpen: false,
      editingAddress: null,
    });
  }

  handleEditAddress(index, address) {
    this.setState((prevState) => ({
      isAddressesDialogOpen: !prevState.isAddressesDialogOpen,
      editingAddress: { index, address },
    }));
  }

  render() {
    const { uspsStates, errors, addresses } = this.props;
    const addedAddressesTableProps = {
      errors,
      addresses,
    };
    return (
      <div>
        <div>
          <FormSubtitle margin="1vh 0 0 0">
            <FormattedMessage {...messages.header} />
          </FormSubtitle>
          <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
            <StyledIconButton size="x-small" svgIconSize="medium" disableIconHover>
              <AddCircle color={teal['500']} />
            </StyledIconButton>
            <FormattedMessage {...messages.addAddressesButton} />
          </AddNewItemButton>
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
                  <AddMultipleAddressesForm
                    initialValues={this.state.editingAddress}
                    onAddAddress={arrayHelpers.push}
                    onRemoveAddress={arrayHelpers.remove}
                    uspsStates={uspsStates}
                    handleCloseDialog={this.handleCloseDialog}
                  />
                </Dialog>
                <AddedAddressesTable
                  handleEditAddress={this.handleEditAddress}
                  arrayHelpers={arrayHelpers}
                  {...addedAddressesTableProps}
                />
              </div>
            )}
          />
        </div>
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
  addresses: PropTypes.arrayOf(PropTypes.shape({
    line1: PropTypes.string,
    line2: PropTypes.string,
    city: PropTypes.string,
    postalCode: PropTypes.string,
    stateCode: PropTypes.string,
    countryCode: PropTypes.string,
  })),
};

export default AddMultipleAddresses;
