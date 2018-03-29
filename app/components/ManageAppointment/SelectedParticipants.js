import StyledRaisedButton from 'components/StyledRaisedButton';
import Table from 'components/Table/index';
import TableHeader from 'components/TableHeader/index';
import TableHeaderColumn from 'components/TableHeaderColumn/index';
import TableRow from 'components/TableRow/index';
import TableRowColumn from 'components/TableRowColumn/index';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

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
        <TableHeaderColumn>{
          <FormattedMessage {...messages.participantTableHeaderParticipationType} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderRequired} />}</TableHeaderColumn>
        <TableHeaderColumn>{
          <FormattedMessage {...messages.participantTableHeaderParticipationStatus} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderAction} />}</TableHeaderColumn>
      </TableHeader>
      {selectedParticipants && selectedParticipants.length > 0 ?
        selectedParticipants.map((participant) => (
          <TableRow key={uniqueId()}>
            <TableRowColumn>{participant.name}</TableRowColumn>
            <TableRowColumn>{capitalizeFirstLetter(participant.memberType)}</TableRowColumn>
            <TableRowColumn>{capitalizeFirstLetter(participant.participationType.display)}</TableRowColumn>
            <TableRowColumn>{capitalizeFirstLetter(participant.required.display)}</TableRowColumn>
            <TableRowColumn>{capitalizeFirstLetter(participant.status.display)}</TableRowColumn>
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
