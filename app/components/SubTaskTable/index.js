/**
*
* SubTaskTable
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Section from 'components/Section';
import FormSubtitle from 'components/FormSubtitle';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import MenuItem from 'material-ui/MenuItem';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import messages from './messages';
import { TASK_TABLE_COLUMNS, MANAGE_TASK_URL } from './constants';
import AddSubTaskButton from './AddSubTaskButton';


function SubTaskTable({ elements, patientId, taskBaseUrl }) {
  return (
    <div>
      <Section>
        <FormSubtitle margin="1vh 0 0 0">
          <FormattedMessage {...messages.header} />
        </FormSubtitle>
        <AddSubTaskButton
          onClick={<Link to={MANAGE_TASK_URL} />}
          label={<FormattedMessage {...messages.addSubTaskButton} />}
          disabled
        />
        <Table>
          <TableHeader columns={TASK_TABLE_COLUMNS}>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderActivityType} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderDescription} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCreatedOn} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskPeriod} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCreatedBy} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskOwner} /></TableHeaderColumn>
            <TableHeaderColumn />
          </TableHeader>
          {!isEmpty(elements) && elements.map(({ logicalId, definition, status, description, authoredOn, executionPeriod, agent, owner }) => (
            <TableRow key={logicalId} columns={TASK_TABLE_COLUMNS}>
              <TableRowColumn>{definition && definition.display}</TableRowColumn>
              <TableRowColumn>{status && status.display}</TableRowColumn>
              <TableRowColumn>{description}</TableRowColumn>
              <TableRowColumn>{authoredOn}</TableRowColumn>
              <TableRowColumn>{executionPeriod && executionPeriod.start} - {executionPeriod && executionPeriod.end} </TableRowColumn>
              <TableRowColumn>{agent && agent.display} </TableRowColumn>
              <TableRowColumn>{owner && owner.display} </TableRowColumn>
              <TableRowColumn>
                <NavigationStyledIconMenu>
                  <MenuItem
                    primaryText={<FormattedMessage {...messages.editTask} />}
                    containerElement={<Link
                      to={{
                        pathname: `${taskBaseUrl}/${logicalId}`,
                        search: `?patientId=${patientId}&isMainTask=false`,
                      }}
                    />}
                  />
                </NavigationStyledIconMenu>
              </TableRowColumn>
            </TableRow>
          ))}
        </Table>
      </Section>
    </div>
  );
}

SubTaskTable.propTypes = {
  patientId: PropTypes.string.isRequired,
  taskBaseUrl: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    definition: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    status: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
    priority: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
    authoredOn: PropTypes.string,
    executionPeriod: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
    agent: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    owner: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
  })),

};

export default SubTaskTable;
