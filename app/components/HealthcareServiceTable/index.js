/**
 *
 * HealthcareServiceTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import { FormattedMessage } from 'react-intl';

import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';
import messages from './messages';

function HealthcareServiceTable({ elements }) {
  function getIdentifiers(identifier) {
    return identifier.map((entry) =>
      (
        <div key={`healthCareService-id-${uniqueId()}`}>
          {entry.system}: {entry.value}
          <br />
        </div>
      ),
    );
  }

  function getTypes(types) {
    return types.map((entry) =>
      (
        <div key={`healthCareService-type-${uniqueId()}`}>
          {entry.display}
          <br />
        </div>
      ),
    );
  }

  function getProgramNames(programNames) {
    return programNames.map((entry) =>
      (
        <div key={`healthCareService-programNames-${uniqueId()}`}>
          {entry}
          <br />
        </div>
      ),
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderCategory} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderProgramName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderIdentifier} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderActive} /></TableHeaderColumn>
        </TableHeader>
        {!isEmpty(elements) && elements.map((element) => (
          <TableRow key={element.logicalId}>
            <TableRowColumn>{element.name}</TableRowColumn>
            <TableRowColumn>{element.category && element.category.display}</TableRowColumn>
            <TableRowColumn>{getTypes(element.type)}</TableRowColumn>
            <TableRowColumn>{getProgramNames(element.programName)}</TableRowColumn>
            <TableRowColumn>{getIdentifiers(element.identifiers)}</TableRowColumn>
            <TableRowColumn>{element.active ?
              <FormattedMessage {...messages.labelActive} /> :
              <FormattedMessage {...messages.labelInactive} />}
            </TableRowColumn>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}


HealthcareServiceTable.propTypes = {
  elements: PropTypes.array,
};

export default HealthcareServiceTable;
