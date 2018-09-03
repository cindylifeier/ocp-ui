import React from 'react';
import PropTypes from 'prop-types';
import SearchParticipantReferences from './SearchParticipantReferences';

function OutOfOrgTabContent(props) {
  const { onSearchParticipantReferences } = props;
  return (
    <SearchParticipantReferences onSearchParticipantReferences={onSearchParticipantReferences} />
  );
}

OutOfOrgTabContent.propTypes = {
  onSearchParticipantReferences: PropTypes.func.isRequired,
};

export default OutOfOrgTabContent;
