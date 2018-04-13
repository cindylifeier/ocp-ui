/**
 *
 * CommunicationsTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CenterAlign from 'components/Align/CenterAlign';
import NoResultsFoundText from 'components/NoResultsFoundText';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import Table from 'components/Table';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import NavigationIconMenu from 'components/NavigationIconMenu';
import messages from './messages';

const tableColumns = 'repeat(6, 1fr) 50px';

function CommunicationsTable(props) {
  const { loading, data, selectedPatient, manageCommunicationBaseUrl } = props.communicationsData;
  return (
    <div>
      {loading && <RefreshIndicatorLoading />}
      {(!loading && data.elements &&
        data.elements.length > 0 ?
          <div>
            <Table>
              <TableHeader columns={tableColumns} relativeTop={props.relativeTop}>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCategory} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderContactMethod} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderRecipients} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderSender} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderSent} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
              </TableHeader>
              {!isEmpty(data.elements) && data.elements.map((communication) => {
                const menuItems = [{
                  primaryText: 'Edit',
                  linkTo: {
                    pathname: `${manageCommunicationBaseUrl}/${communication.logicalId}`,
                    search: `?patientId=${selectedPatient.id}`,
                  },
                }];
                return (
                  <TableRow key={communication.logicalId} columns={tableColumns}>
                    <TableRowColumn>{communication.categoryValue}</TableRowColumn>
                    <TableRowColumn>{communication.mediumValue}</TableRowColumn>
                    <TableRowColumn> {getRecipientsList(communication.recipient)}</TableRowColumn>
                    <TableRowColumn>{communication.sender.display}</TableRowColumn>
                    <TableRowColumn>{communication.sent}</TableRowColumn>
                    <TableRowColumn>{communication.statusValue}</TableRowColumn>
                    <TableRowColumn>
                      <NavigationIconMenu menuItems={menuItems} />
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </Table>
            <CenterAlignedUltimatePagination
              currentPage={data.currentPage}
              totalPages={data.totalNumberOfPages}
              onChange={props.handleChangePage}
              boundaryPagesRange={1}
              siblingPagesRange={1}
              hidePreviousAndNextPageLinks={false}
              hideFirstAndLastPageLinks={false}
              hideEllipsis={false}
            />
          </div> :
          (<CenterAlign>
            <NoResultsFoundText><FormattedMessage {...messages.noCommunications} /></NoResultsFoundText>
          </CenterAlign>)
      )}
    </div>
  );
}

CommunicationsTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  communicationsData: PropTypes.shape({
    manageCommunicationBaseUrl: PropTypes.string.isRequired,
    selectedPatient: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.array,
    }),
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      currentPage: PropTypes.number,
      totalNumberOfPages: PropTypes.number,
      currentPageSize: PropTypes.number,
      totalElements: PropTypes.number,
      elements: PropTypes.array,
    }).isRequired,
  }).isRequired,
  handleChangePage: PropTypes.func.isRequired,
};

export default CommunicationsTable;

function getRecipientsList(recipients) {
  const names = [];
  if (recipients) {
    recipients.forEach((entry) => {
      if (entry.display) {
        names.push(entry.display);
      }
    });
  }
  return names.join(',');
}
