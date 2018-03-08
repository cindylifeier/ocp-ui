import StyledRaisedButton from 'components/StyledRaisedButton';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Table from '../Table/index';
import TableHeader from '../TableHeader/index';
import TableHeaderColumn from '../TableHeaderColumn/index';
import TableRow from '../TableRow/index';
import TableRowColumn from '../TableRowColumn/index';

import messages from './messages';


function SelectedParticipants(props) {
  const {
    selectedParticipants,
    removeParticipant,
  } = props;

  const handleRemoveParticipant = (participant) => {
    removeParticipant(participant);
  };

  const capitalizeFirstLetter = (word) => (word ? (word.charAt(0).toUpperCase().concat(word.slice(1))) : '');

  return (
    <Table>
      <TableHeader>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderName} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderType} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderParticipationType} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderRequired} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderParticipationStatus} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderAction} />}</TableHeaderColumn>
      </TableHeader>
      {selectedParticipants && selectedParticipants.length > 0 ?
        selectedParticipants.map((participant) => (
          <TableRow key={uniqueId()}>
            <TableRowColumn>{participant.name}</TableRowColumn>
            <TableRowColumn>{capitalizeFirstLetter(participant.memberType)}</TableRowColumn>
            <TableRowColumn>{participant.participationType}</TableRowColumn>
            <TableRowColumn>{participant.required}</TableRowColumn>
            <TableRowColumn>{participant.status}</TableRowColumn>
            <TableRowColumn>
              <StyledRaisedButton
                onClick={() => handleRemoveParticipant(participant)}
                label={<FormattedMessage {...messages.removeParticipantBtnLabel} />}
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
  );
}

SelectedParticipants.propTypes = {
  removeParticipant: PropTypes.func.isRequired,
  selectedParticipants: PropTypes.array,
};

export default SelectedParticipants;
