import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { teal500, white } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import uniqueId from 'lodash/uniqueId';

import messages from './messages';
import Table from '../Table/index';
import TableHeader from '../TableHeader/index';
import TableHeaderColumn from '../TableHeaderColumn/index';
import TableRow from '../TableRow/index';
import TableRowColumn from '../TableRowColumn/index';
import { removeButtonStyle } from './constants';
import { getParticipantName } from '../../utils/CareTeamUtils';

function SelectedParticipants(props) {
  const {
    selectedParticipants,
    removeParticipant,
  } = props;

  const handleRemoveParticipant = (participant) => {
    removeParticipant(participant);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderName} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderRole} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderPeriod} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderReason} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderAction} />}</TableHeaderColumn>
        </TableHeader>
        {selectedParticipants && selectedParticipants.length > 0 ?
          selectedParticipants.map((participant) => (
            <TableRow key={uniqueId()}>
              <TableRowColumn> {getParticipantName(participant)} </TableRowColumn>
              <TableRowColumn>{participant.role.display}</TableRowColumn>
              <TableRowColumn />
              <TableRowColumn />
              <TableRowColumn>
                <RaisedButton
                  backgroundColor={teal500}
                  labelColor={white}
                  onClick={() => handleRemoveParticipant(participant)}
                  style={removeButtonStyle}
                  label={<FormattedMessage {...messages.removeParticipantBtnLabel} />}
                  primary
                />
              </TableRowColumn>
            </TableRow>
          )) :
          <TableRow>
            <TableRowColumn>
              <span><FormattedMessage {...messages.noParticipantAdded} /></span>
            </TableRowColumn>
          </TableRow>
        }
      </Table>
    </div>
  );
}

SelectedParticipants.propTypes = {
  removeParticipant: PropTypes.func.isRequired,
  selectedParticipants: PropTypes.array,
};

export default SelectedParticipants;
