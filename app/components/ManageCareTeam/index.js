/**
*
* ManageCareTeam
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import SearchParticipant from '../SearchParticipant';

function ManageCareTeam(props) {
  const { onSearch } = props;
  const searchParticipantProps = {};
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <SearchParticipant onSearch={onSearch} {...searchParticipantProps}></SearchParticipant>
    </div>
  );
}

ManageCareTeam.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default ManageCareTeam;
