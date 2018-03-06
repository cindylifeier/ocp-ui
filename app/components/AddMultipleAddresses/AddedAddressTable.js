import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import StyledMenuItem from 'components/StyledMenuItem';
import messages from './messages';

function AddedAddressTable(props) {
  const {
    errors,
    values,
    arrayHelpers,
    handleEditAddress,
  } = props;
  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderAddress1} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderAddress2} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderCity} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderState} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderPostalCode} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderCountry} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedAddressTable.tableHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {errors && errors.addresses && <span>{errors.addresses}</span>}
        {values.addresses && values.addresses.map((address, index) => {
          const { line1, line2, city, state, postalCode, country } = address;
          return (
            <TableRow key={uniqueId()}>
              <TableRowColumn>{line1}</TableRowColumn>
              <TableRowColumn>{line2}</TableRowColumn>
              <TableRowColumn>{city}</TableRowColumn>
              <TableRowColumn>{state}</TableRowColumn>
              <TableRowColumn>{postalCode}</TableRowColumn>
              <TableRowColumn>{country}</TableRowColumn>
              <TableRowColumn>
                <NavigationStyledIconMenu>
                  <StyledMenuItem
                    primaryText={<FormattedMessage {...messages.addedAddressTable.tableActionEdit} />}
                    onClick={() => handleEditAddress(index, address)}
                  />
                  <StyledMenuItem
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
  values: PropTypes.object,
  arrayHelpers: PropTypes.object,
  handleEditAddress: PropTypes.func,
};

export default AddedAddressTable;
