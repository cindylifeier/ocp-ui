import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import CustomErrorText from 'components/CustomErrorText';
import messages from './messages';

function AddEpisodeOfCareTable(props) {
  const tableColumns = 'repeat(5, 1fr) 80px';
  const {
    errors,
    arrayHelpers,
    handleEditEpisodeOfCare,
    episodeOfCares,
  } = props;
  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns}>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderCareManager} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderStartDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderEndDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {errors && errors.epidoseOfCare &&
        <CustomErrorText>{errors.epidoseOfCare}</CustomErrorText>
        }
        {episodeOfCares && episodeOfCares.map((episodeOfCare, index) => {
          const { status, type, startDate, endDate, careManager, id } = episodeOfCare;
          const menuItems = [{
            primaryText: <FormattedMessage {...messages.addedCoveragesTable.tableActionEdit} />,
            onClick: () => handleEditEpisodeOfCare(index, episodeOfCare),
          }, {
            primaryText: <FormattedMessage {...messages.addedCoveragesTable.tableActionRemove} />,
            disabled: id !== undefined,
            onClick: () => arrayHelpers.remove(index),
          }];
          return (
            <TableRow key={uniqueId()} columns={tableColumns}>
              <TableRowColumn>{status}</TableRowColumn>
              <TableRowColumn>{type}</TableRowColumn>
              <TableRowColumn>{careManager && careManager.reference}</TableRowColumn>
              <TableRowColumn>{startDate}</TableRowColumn>
              <TableRowColumn>{endDate}</TableRowColumn>
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

AddEpisodeOfCareTable.propTypes = {
  errors: PropTypes.object,
  arrayHelpers: PropTypes.object,
  handleEditEpisodeOfCare: PropTypes.func,
  episodeOfCares: PropTypes.array,
};

export default AddEpisodeOfCareTable;
