import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import CustomErrorText from 'components/CustomErrorText';
import StyledText from 'components/StyledText';
import { combineAddress, combineTelecoms } from './helpers';
import messages from './messages';

function AddedContactsTable(props) {
  const tableColumns = 'repeat(4, 1fr) 80px';
  const {
    contacts,
    errors,
    arrayHelpers,
    onEditContact,
  } = props;

  return (
    <Table>
      <TableHeader columns={tableColumns}>
        <TableHeaderColumn><FormattedMessage {...messages.addedContactsTable.tableHeaderName} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedContactsTable.tableHeaderPurpose} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedContactsTable.tableHeaderTelecoms} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedContactsTable.tableHeaderAddress} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedContactsTable.tableHeaderAction} /></TableHeaderColumn>
      </TableHeader>
      {errors && errors.contacts &&
      <CustomErrorText>{errors.contacts}</CustomErrorText>
      }
      {contacts && contacts.map((contact, index) => {
        const { name, purpose, email, phone, line1, line2, city, state, postalCode, countryCode } = contact;
        const telecoms = combineTelecoms(email, phone);
        const address = combineAddress(line1, line2, city, state, postalCode, countryCode);
        const menuItems = [{
          primaryText: <FormattedMessage {...messages.addedContactsTable.tableActionEdit} />,
          onClick: () => onEditContact(index, contact),
        }, {
          primaryText: <FormattedMessage {...messages.addedContactsTable.tableActionRemove} />,
          onClick: () => arrayHelpers.remove(index),
        }];
        return (
          <TableRow key={uniqueId()} columns={tableColumns}>
            <TableRowColumn>{name}</TableRowColumn>
            <TableRowColumn>{purpose}</TableRowColumn>
            <TableRowColumn>
              <StyledText>{telecoms}</StyledText>
            </TableRowColumn>
            <TableRowColumn>
              <StyledText>{address}</StyledText>
            </TableRowColumn>
            <TableRowColumn>
              <NavigationIconMenu menuItems={menuItems} />
            </TableRowColumn>
          </TableRow>
        );
      })}
    </Table>
  );
}

AddedContactsTable.propTypes = {
  errors: PropTypes.object,
  arrayHelpers: PropTypes.object,
  onEditContact: PropTypes.func,
  contacts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    purpose: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    line1: PropTypes.string,
    line2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
    countryCode: PropTypes.string,
  })),
};

export default AddedContactsTable;
