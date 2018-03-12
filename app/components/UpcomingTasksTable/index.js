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
import trim from 'lodash/trim';
import toUpper from 'lodash/toUpper';
import IconMenu from 'material-ui/IconMenu';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';

import StyledIconButton from 'components/StyledIconButton';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import messages from './messages';


const tableColumns = 'repeat(6, 1fr) 50px';

function UpcomingTaskTable({ elements, onPatientViewDetailsClick }) {
  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns}>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderPatientName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderActivityType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTask} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskStartDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskEndDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
          <TableHeaderColumn />
        </TableHeader>
        {!isEmpty(elements) && elements.map(({ logicalId, beneficiary, definition, description, executionPeriod }) => (
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
              <IconMenu
                iconButtonElement={
                  (<StyledIconButton>
                    <NavigationMenu />
                  </StyledIconButton>)
                }
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem
                  primaryText={<FormattedMessage {...messages.viewDetails} />}
                  onClick={() => onPatientViewDetailsClick(getPatientIdFromTask(beneficiary))}
                />
              </IconMenu>
            </TableRowColumn>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

UpcomingTaskTable.propTypes = {
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
    patientId = trim(toUpper(beneficiary.reference), toUpper(patientPattern));
  }
  return patientId;
}
