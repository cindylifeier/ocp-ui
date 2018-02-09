/**
 *
 * HealthcareServiceTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import Checkbox from 'material-ui/Checkbox';
import { FormattedMessage } from 'react-intl';

import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';
import messages from './messages';

const checkboxStyle = { marginTop: '40px', height: '30px' };

function HealthcareServiceTable({ elements, showAssigned = false, onCheck }) {
  function getDisplayNameFromValueSetList(valueSets) {
    return valueSets.map((entry) =>
      (
        <div key={`healthCareService-valueSet-${uniqueId()}`}>
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
      {!showAssigned &&
      <Table>
        <TableHeader>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderCategory} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderProgramName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderReferralMethod} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderSpecialty} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderActive} /></TableHeaderColumn>
        </TableHeader>
        {!isEmpty(elements) && elements.map((element) => (
          <TableRow key={element.logicalId}>
            <TableRowColumn>{element.name}</TableRowColumn>
            <TableRowColumn>{element.category && element.category.display}</TableRowColumn>
            <TableRowColumn>{getDisplayNameFromValueSetList(element.type)}</TableRowColumn>
            <TableRowColumn>{getProgramNames(element.programName)}</TableRowColumn>
            <TableRowColumn>{getDisplayNameFromValueSetList(element.referralMethod)}</TableRowColumn>
            <TableRowColumn>{getDisplayNameFromValueSetList(element.specialty)}</TableRowColumn>
            <TableRowColumn>{element.active ? 'Active' : 'Inactive'}</TableRowColumn>
          </TableRow>
        ))}
      </Table>}
      {showAssigned &&
      <Table>
        <TableHeader>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAssignedToLocation} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderCategory} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderProgramName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderReferralMethod} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderSpecialty} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderActive} /></TableHeaderColumn>
        </TableHeader>
        {!isEmpty(elements) && elements.map((element) => (
          <TableRow key={element.logicalId}>
            <Checkbox
              style={checkboxStyle}
              defaultChecked={element.assignedToCurrentLocation}
              disabled={element.assignedToCurrentLocation}
              onCheck={(evt, checked) => onCheck(evt, checked, element.logicalId)}
            />
            <TableRowColumn>{element.name}</TableRowColumn>
            <TableRowColumn>{element.category && element.category.display}</TableRowColumn>
            <TableRowColumn>{getDisplayNameFromValueSetList(element.type)}</TableRowColumn>
            <TableRowColumn>{getProgramNames(element.programName)}</TableRowColumn>
            <TableRowColumn>{getDisplayNameFromValueSetList(element.referralMethod)}</TableRowColumn>
            <TableRowColumn>{getDisplayNameFromValueSetList(element.specialty)}</TableRowColumn>
            <TableRowColumn>{element.active ? 'Active' : 'Inactive'}</TableRowColumn>
          </TableRow>
        ))}
      </Table>}
    </div>
  );
}


HealthcareServiceTable.propTypes = {
  elements: PropTypes.array,
  showAssigned: PropTypes.bool,
  onCheck: PropTypes.func,
};

export default HealthcareServiceTable;
