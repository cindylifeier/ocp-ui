import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import LinearProgressIndicator from 'components/LinearProgressIndicator';
import StyledFlatButton from 'components/StyledFlatButton';
import SearchParticipantReferences from './SearchParticipantReferences';
import messages from './messages';

function OutOfOrgTabContent(props) {
  const { onCloseDialog, onSearchParticipantReferences, participantReferences } = props;
  const { loading } = participantReferences;
  return (
    <Grid columns={1}>
      <SearchParticipantReferences onSearchParticipantReferences={onSearchParticipantReferences} />
      <LinearProgressIndicator loading={loading} />
      <Grid columns={8}>
        <Cell left={8}>
          <StyledFlatButton onClick={onCloseDialog}><FormattedMessage {...messages.cancelButton} /></StyledFlatButton>
        </Cell>
      </Grid>
    </Grid>
  );
}

OutOfOrgTabContent.propTypes = {
  participantReferences: PropTypes.shape({
    loading: PropTypes.bool,
    currentPage: PropTypes.number,
    totalNumberOfPages: PropTypes.number,
    data: PropTypes.array,
  }),
  onCloseDialog: PropTypes.func.isRequired,
  onSearchParticipantReferences: PropTypes.func.isRequired,
};

export default OutOfOrgTabContent;
