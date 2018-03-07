import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';
import MenuItem from 'material-ui/MenuItem';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import AddAddressesErrorText from './AddAddressesErrorText';
import messages from './messages';

function AddedAddressTable(props) {
  const tableColumns = 'repeat(6, 1fr) 80px';
  const {
    errors,
    addresses,
    arrayHelpers,
    handleEditAddress,
  } = props;
  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns}>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderAddress1} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderAddress2} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderCity} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderState} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderPostalCode} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderCountry} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {errors && errors.addresses &&
        <AddAddressesErrorText>{errors.addresses}</AddAddressesErrorText>
        }
        {addresses && addresses.map((address, index) => {
          const { line1, line2, city, stateCode, postalCode, countryCode } = address;
          return (
            <TableRow key={uniqueId()} columns={tableColumns}>
              <TableRowColumn>{line1}</TableRowColumn>
              <TableRowColumn>{line2}</TableRowColumn>
              <TableRowColumn>{city}</TableRowColumn>
              <TableRowColumn>{stateCode}</TableRowColumn>
              <TableRowColumn>{postalCode}</TableRowColumn>
              <TableRowColumn>{countryCode}</TableRowColumn>
              <TableRowColumn>
                <NavigationStyledIconMenu>
                  <MenuItem
                    primaryText={<FormattedMessage {...messages.addedAddressTable.tableActionEdit} />}
                    onClick={() => handleEditAddress(index, address)}
                  />
                  <MenuItem
                    primaryText={<FormattedMessage {...messages.addedAddressTable.tableActionRemove} />}
                    onClick={() => arrayHelpers.remove(index)}
                  />
                </NavigationStyledIconMenu>
              </TableRowColumn>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}

AddedAddressTable.propTypes = {
  errors: PropTypes.object,
  arrayHelpers: PropTypes.object,
  handleEditAddress: PropTypes.func,
  addresses: PropTypes.arrayOf(PropTypes.shape({
    line1: PropTypes.string,
    line2: PropTypes.string,
    city: PropTypes.string,
    postalCode: PropTypes.string,
    stateCode: PropTypes.string,
    countryCode: PropTypes.string,
  })),
};

export default AddedAddressTable;
