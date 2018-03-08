/**
 *
 * RelatedPersonTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import Link from 'react-router-dom/es/Link';
import MenuItem from 'material-ui/MenuItem';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import { MANAGE_RELATED_PERSON_URL } from 'containers/App/constants';
import messages from './messages';
import { RELATED_PERSON_TABLE_COLUMNS } from './constants';

function RelatedPersonTable({ relatedPersons, selectedPatientId }) {
  return (
    <Table>
      <TableHeader columns={RELATED_PERSON_TABLE_COLUMNS}>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderName} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderRelationship} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
        <TableHeaderColumn />
      </TableHeader>
      {relatedPersons && relatedPersons.map((relatedPerson) => (
        <TableRow key={uniqueId()} columns={RELATED_PERSON_TABLE_COLUMNS}>
          <TableRowColumn>{relatedPerson.firstName} {relatedPerson.lastName}</TableRowColumn>
          <TableRowColumn>{relatedPerson.relationshipValue}</TableRowColumn>
          <TableRowColumn>{relatedPerson.active ?
            <FormattedMessage {...messages.active} /> :
            <FormattedMessage {...messages.inactive} />}
          </TableRowColumn>
          <TableRowColumn>
            <NavigationStyledIconMenu>
              <MenuItem
                primaryText={<FormattedMessage {...messages.edit} />}
                containerElement={<Link
                  to={{
                    pathname: `${MANAGE_RELATED_PERSON_URL}/${relatedPerson.relatedPersonId}`,
                    search: `?patientId=${selectedPatientId}`,
                  }}
                />}
              />
            </NavigationStyledIconMenu>
          </TableRowColumn>
        </TableRow>
      ))
      }
    </Table>
  );
}

RelatedPersonTable.propTypes = {
  relatedPersons: PropTypes.array.isRequired,
  selectedPatientId: PropTypes.string.isRequired,
};

export default RelatedPersonTable;
