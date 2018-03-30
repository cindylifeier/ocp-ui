/**
 *
 * HealthcareServiceTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import { FormattedMessage } from 'react-intl';

import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import messages from './messages';

function HealthcareServiceTable({ elements, showAssigned = false, onCheck, relativeTop }) {
  function getDisplayNameFromValueSetList(valueSets) {
    return valueSets && valueSets.map((entry) =>
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
        <TableHeader relativeTop={relativeTop}>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderCategory} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderProgramName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderReferralMethod} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderSpecialty} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderActive} /></TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableHeader>
        {!isEmpty(elements) && elements.map((element) => (
          <TableRow key={element.logicalId}>
            <TableRowColumn>{element.name}</TableRowColumn>
            <TableRowColumn>{element.category && element.category.display}</TableRowColumn>
            <TableRowColumn>{getDisplayNameFromValueSetList(element.type)}</TableRowColumn>
            <TableRowColumn>{getProgramNames(element.programName)}</TableRowColumn>
            <TableRowColumn>{getDisplayNameFromValueSetList(element.referralMethod)}</TableRowColumn>
            <TableRowColumn>{getDisplayNameFromValueSetList(element.specialty)}</TableRowColumn>
            <TableRowColumn>{element.active ?
              <FormattedMessage {...messages.labelActive} /> :
              <FormattedMessage {...messages.labelInactive} />}
            </TableRowColumn>
            <TableRowColumn>
              <NavigationStyledIconMenu>
                <MenuItem
                  primaryText={<FormattedMessage {...messages.edit} />}
                  containerElement={<Link to={`/ocp-ui/manage-healthcare-service/${element.logicalId}`} />}
                />
              </NavigationStyledIconMenu>
            </TableRowColumn>
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
            <TableRowColumn>
              <Grid columns={12}>
                <Cell left={2} width={1}>
                  <Checkbox
                    checked={element.assignedToCurrentLocation}
                    onCheck={(evt, checked) => onCheck(evt, checked, element.logicalId)}
                  />
                </Cell>
              </Grid>
            </TableRowColumn>
            <TableRowColumn>{element.name}</TableRowColumn>
            <TableRowColumn>{element.category && element.category.display}</TableRowColumn>
            <TableRowColumn>{getDisplayNameFromValueSetList(element.type)}</TableRowColumn>
            <TableRowColumn>{getProgramNames(element.programName)}</TableRowColumn>
            <TableRowColumn>{getDisplayNameFromValueSetList(element.referralMethod)}</TableRowColumn>
            <TableRowColumn>{getDisplayNameFromValueSetList(element.specialty)}</TableRowColumn>
            <TableRowColumn>{element.active ?
              <FormattedMessage {...messages.labelActive} /> :
              <FormattedMessage {...messages.labelInactive} />}
            </TableRowColumn>
          </TableRow>
        ))}
      </Table>}
    </div>
  );
}


HealthcareServiceTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  elements: PropTypes.array,
  showAssigned: PropTypes.bool,
  onCheck: PropTypes.func,
};

export default HealthcareServiceTable;
