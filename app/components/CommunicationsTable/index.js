/**
 *
 * CommunicationsTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import sizeMeHOC from 'utils/SizeMeUtils';
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
import {
  EXPANDED_TABLE_COLUMNS, SUMMARIZED_TABLE_COLUMNS,
  SUMMARY_VIEW_WIDTH,
} from 'components/CommunicationsTable/constants';
import messages from './messages';

function CommunicationsTable(props) {
  const { loading, data, selectedPatient, manageCommunicationBaseUrl } = props.communicationsData;
  const { size } = props;
  const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;

  return (
    <div>
      {loading && <RefreshIndicatorLoading />}
      {(!loading && data.elements &&
        data.elements.length > 0 ?
          <div>
            <Table>
              <TableHeader columns={columns} relativeTop={props.relativeTop}>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTimeSent} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCategory} /></TableHeaderColumn>
                {isExpanded &&
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTopic} /></TableHeaderColumn>
                }
                {isExpanded &&
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderContactMethod} /></TableHeaderColumn>
                }
                {isExpanded &&
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderReason} /></TableHeaderColumn>
                }
              </TableHeader>
              {!isEmpty(data.elements) && data.elements.map((communication) => {
                const menuItems = [{
                  primaryText: 'Edit',
                  linkTo: {
                    pathname: `${manageCommunicationBaseUrl}/${communication.logicalId}`,
                    search: `?patientId=${selectedPatient.id}`,
                  },
                }];
                const { statusValue, categoryValue, context, mediumValue, notDoneReasonValue } = communication;
                return (
                  <TableRow key={communication.logicalId} columns={columns}>
                    <TableRowColumn></TableRowColumn>
                    <TableRowColumn>{statusValue}</TableRowColumn>
                    <TableRowColumn>{categoryValue}</TableRowColumn>
                    {isExpanded &&
                    <TableRowColumn> {context && context.display}</TableRowColumn>
                    }
                    {isExpanded &&
                    <TableRowColumn>{mediumValue}</TableRowColumn>
                    }
                    {isExpanded &&
                    <TableRowColumn>{notDoneReasonValue}</TableRowColumn>
                    }
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
  size: PropTypes.object.isRequired,
};

export default sizeMeHOC(CommunicationsTable);
