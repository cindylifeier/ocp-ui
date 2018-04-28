/**
 *
 * ActivityDefinitionsTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';

import CenterAlign from 'components/Align/CenterAlign';
import NoResultsFoundText from 'components/NoResultsFoundText';
import PropTypes from 'prop-types';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import RecordsRange from 'components/RecordsRange';
import messages from './messages';


const tableColumns = 'repeat(6, 1fr) 50px';

function ActivityDefinitionsTable(props) {
  const { activityDefinitionsData } = props;
  return (
    <div>
      {(activityDefinitionsData.data &&
        activityDefinitionsData.data.length > 0 ?
          <div>
            <Table>
              <TableHeader columns={tableColumns}>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnDisplayName} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnTopic} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnEffectiveStart} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnEffectiveEnd} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnDescription} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnStatus} /></TableHeaderColumn>
              </TableHeader>
              {!isEmpty(activityDefinitionsData.data) && activityDefinitionsData.data.map((activityDefinition) => {
                const { logicalId, title, topic, effectivePeriod, description, status } = activityDefinition;
                const menuItems = [{
                  primaryText: <FormattedMessage {...messages.edit} />,
                  linkTo: `/ocp-ui/manage-activity-definition/${logicalId}`,
                }];
                return (
                  <TableRow
                    columns={tableColumns}
                    key={uniqueId()}
                  >
                    <TableRowColumn>{title}</TableRowColumn>
                    <TableRowColumn>{topic}</TableRowColumn>
                    <TableRowColumn>{effectivePeriod && effectivePeriod.start}</TableRowColumn>
                    <TableRowColumn>{effectivePeriod && effectivePeriod.end}</TableRowColumn>
                    <TableRowColumn>{description}</TableRowColumn>
                    <TableRowColumn>{status}</TableRowColumn>
                    <TableRowColumn>
                      <NavigationIconMenu menuItems={menuItems} />
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </Table>
            <CenterAlignedUltimatePagination
              currentPage={activityDefinitionsData.currentPage}
              totalPages={activityDefinitionsData.totalNumberOfPages}
              onChange={activityDefinitionsData.handleChangePage}
            />
            <RecordsRange
              currentPage={activityDefinitionsData.currentPage}
              totalPages={activityDefinitionsData.totalNumberOfPages}
              totalElements={activityDefinitionsData.totalElements}
              currentPageSize={activityDefinitionsData.currentPageSize}
            />
          </div> :
          (<CenterAlign>
            <NoResultsFoundText><FormattedMessage {...messages.noResultsFound} /></NoResultsFoundText>
          </CenterAlign>)
      )}
    </div>
  );
}

ActivityDefinitionsTable.propTypes = {
  activityDefinitionsData: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handleChangePage: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      version: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string,
      status: PropTypes.string,
      date: PropTypes.string,
      publisher: PropTypes.string,
      description: PropTypes.string,
      effectivePeriod: PropTypes.shape({
        start: PropTypes.string,
        end: PropTypes.string,
      }),
      topic: PropTypes.string,
      relatedArtifact: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string,
        system: PropTypes.string,
        definition: PropTypes.string,
        display: PropTypes.string,
      })),
      kind: PropTypes.shape({
        code: PropTypes.string,
        system: PropTypes.string,
        definition: PropTypes.string,
        display: PropTypes.string,
      }),
      timing: PropTypes.shape({
        durationMax: PropTypes.number,
        frequency: PropTypes.number,
      }),
      actionParticipantType: PropTypes.shape({
        code: PropTypes.string,
        system: PropTypes.string,
        definition: PropTypes.string,
        display: PropTypes.string,
      }),
      actionParticipantRole: PropTypes.shape({
        code: PropTypes.string,
        system: PropTypes.string,
        definition: PropTypes.string,
        display: PropTypes.string,
      }),
    })).isRequired,
  }),
};

export default ActivityDefinitionsTable;