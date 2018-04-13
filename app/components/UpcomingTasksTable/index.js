/**
 *
 * UpcomingTaskTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';

import Util from 'utils/Util';
import NavigationIconMenu from 'components/NavigationIconMenu';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import messages from './messages';


const tableColumns = 'repeat(5, 1fr) 50px';

// Todo: Fix ViewDetail that is already not working

function UpcomingTaskTable({ elements, onPatientViewDetailsClick, relativeTop }) {
  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns} relativeTop={relativeTop}>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderPatientName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderActivityType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTask} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskStartDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskEndDate} /></TableHeaderColumn>
        </TableHeader>
        {!isEmpty(elements) && elements.map(({ logicalId, beneficiary, definition, description, executionPeriod }) => {
          const menuItems = [{
            primaryText: <FormattedMessage {...messages.viewDetails} />,
            onClick: () => onPatientViewDetailsClick(getPatientIdFromTask(beneficiary)),
          }];
          return (
            <TableRow
              columns={tableColumns}
              key={logicalId}
            >
              <TableRowColumn>{beneficiary.display}</TableRowColumn>
              <TableRowColumn>{definition.display}</TableRowColumn>
              <TableRowColumn>{description}</TableRowColumn>
              <TableRowColumn>{executionPeriod.start}</TableRowColumn>
              <TableRowColumn>{executionPeriod.end}</TableRowColumn>
              <TableRowColumn>
                <NavigationIconMenu menuItems={menuItems} />
              </TableRowColumn>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}

UpcomingTaskTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  elements: PropTypes.arrayOf(PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    beneficiary: PropTypes.object.isRequired,
    definition: PropTypes.object,
    description: PropTypes.string,
    executionPeriod: PropTypes.object,
  })),
  onPatientViewDetailsClick: PropTypes.func.isRequired,
};

export default UpcomingTaskTable;

function getPatientIdFromTask(beneficiary) {
  const patientPattern = 'Patient/';
  let patientId = null;
  if (!isUndefined(beneficiary.reference)) {
    patientId = Util.extractTrimmedStringByCharacters(beneficiary.reference, patientPattern);
  }
  return patientId;
}
