import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';

import { CARE_COORDINATOR_ROLE_CODE } from 'containers/App/constants';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import AdvisoryDetailsCell from './AdvisoryDetailsCell';
import StyledAdvisoryTable from './StyledAdvisoryTable';
import messages from './messages';


const tableColumns = '3fr 1.5fr 1.5fr 2fr 2fr';

function AdvisoryDetails({ flags }) {
  return (
    <AdvisoryDetailsCell>
      <ShowHideWrapper allowedRoles={CARE_COORDINATOR_ROLE_CODE}>
        <StyledAdvisoryTable>
          <TableHeader columns={tableColumns}>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAuthor} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderCategory} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderPeriodStart} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderPeriodEnd} /></TableHeaderColumn>
          </TableHeader>
          {!isEmpty(flags) && flags.map((flag) => {
            const { author, categoryDisplay, statusDisplay, period } = flag;
            return (
              <TableRow key={uniqueId()} columns={tableColumns}>
                <TableRowColumn>{author.display}</TableRowColumn>
                <TableRowColumn>{categoryDisplay}</TableRowColumn>
                <TableRowColumn>{statusDisplay}</TableRowColumn>
                <TableRowColumn>{period.start}</TableRowColumn>
                <TableRowColumn>{period.end}</TableRowColumn>
              </TableRow>
            );
          })}
        </StyledAdvisoryTable>
      </ShowHideWrapper>
    </AdvisoryDetailsCell>
  );
}

AdvisoryDetails.propTypes = {
  flags: PropTypes.arrayOf(PropTypes.shape({
    categoryDisplay: PropTypes.string,
    logicalId: PropTypes.string.isRequired,
    author: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    subject: PropTypes.string,
    code: PropTypes.string,
    statusDisplay: PropTypes.string,
    status: PropTypes.string,
    category: PropTypes.string,
    period: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
  })),
};

export default AdvisoryDetails;
