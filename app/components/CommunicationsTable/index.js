/**
*
* CommunicationsTable
*
*/

import React from 'react';
import { uniqueId } from 'lodash';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import Link from 'react-router-dom/es/Link';
import { MANAGE_COMMUNICATION_URL } from 'containers/App/constants';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import Table from 'components/Table';
import messages from './messages';
import StyledIconButton from '../StyledIconButton';


function CommunicationsTable(props) {
  const { communications, selectedPatientId } = props;
  return (
    <div >
      <Table>
        <TableHeader>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCategory} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderContactMethod} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderRecipients} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderSender} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderSent} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableHeader>
        {communications && communications.map((communication) => (
          <TableRow key={communication.logicalId}>
            <TableRowColumn>{communication.categoryValue}</TableRowColumn>
            <TableRowColumn>{communication.mediumValue}</TableRowColumn>
            <TableRowColumn> { getRecipientsList(communication.recipient)}</TableRowColumn>
            <TableRowColumn>{communication.sender.display}</TableRowColumn>
            <TableRowColumn>{communication.sent}</TableRowColumn>
            <TableRowColumn>{communication.statusValue}</TableRowColumn>
            <TableRowColumn>
              <Grid columns="1fr 50px" gap="0px">
                <Cell left="2">
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
                      primaryText="Edit"
                      containerElement={<Link
                        to={{
                          pathname: `${MANAGE_COMMUNICATION_URL}/${communication.logicalId}`,
                          search: `?patientId=${selectedPatientId}`,
                        }}
                      />}
                    />
                  </IconMenu>
                </Cell>
              </Grid>
            </TableRowColumn>
          </TableRow>
        ))
        }
        {(communications.length === 0) && (
          <TableRow key={uniqueId()}>
            <TableRowColumn>
              <FormattedMessage {...messages.noCommunications} />
            </TableRowColumn>
          </TableRow>
        )
        }
      </Table>
    </div>
  );
}

CommunicationsTable.propTypes = {
  communications: PropTypes.array.isRequired,
  selectedPatientId: PropTypes.string.isRequired,
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
