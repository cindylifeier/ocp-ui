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
import CustomErrorText from 'components/CustomErrorText';
import messages from './messages';

function AddedAddressesTable(props) {
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
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressesTable.tableHeaderAddress1} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressesTable.tableHeaderAddress2} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressesTable.tableHeaderCity} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressesTable.tableHeaderState} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressesTable.tableHeaderPostalCode} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressesTable.tableHeaderCountry} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressesTable.tableHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {errors && errors.addresses &&
        <CustomErrorText>{errors.addresses}</CustomErrorText>
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
                    primaryText={<FormattedMessage {...messages.addedAddressesTable.tableActionEdit} />}
                    onClick={() => handleEditAddress(index, address)}
                  />
                  <MenuItem
                    primaryText={<FormattedMessage {...messages.addedAddressesTable.tableActionRemove} />}
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

AddedAddressesTable.propTypes = {
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

export default AddedAddressesTable;
