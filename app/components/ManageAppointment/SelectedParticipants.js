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
import startCase from 'lodash/startCase';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import messages from './messages';

function SelectedParticipants(props) {
  const {
    handleDialogOpen,
    selectedParticipants,
    removeParticipant,
    getReferenceTypeFromReference,
  } = props;

  const handleRemoveParticipant = (participant) => {
    removeParticipant(participant);
  };

  return (
    <div>
      <StyledRaisedButton onClick={() => handleDialogOpen()}>
        <FormattedMessage {...messages.addParticipantBtnLabel} />
      </StyledRaisedButton>
      <Table margin="10px 0px">
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
              <TableRowColumn>{participant.display}</TableRowColumn>
              <TableRowColumn>{upperFirst(getReferenceTypeFromReference(participant.reference))}</TableRowColumn>
              <TableRowColumn>{upperFirst(participant.participationTypeDisplay)}</TableRowColumn>
              <TableRowColumn>{startCase(camelCase(participant.participantRequiredDisplay))}</TableRowColumn>
              <TableRowColumn>{upperFirst(participant.participationStatusDisplay)}</TableRowColumn>
              <TableRowColumn>
                <StyledRaisedButton onClick={() => handleRemoveParticipant(participant)}>
                  <FormattedMessage {...messages.removeParticipantBtnLabel} />
                </StyledRaisedButton>
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
  handleDialogOpen: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  getReferenceTypeFromReference: PropTypes.func.isRequired,
  selectedParticipants: PropTypes.array,
};

export default SelectedParticipants;

