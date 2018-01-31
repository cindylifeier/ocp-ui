/**
 *
 * ManageCareTeam
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { mapToPatientName } from '../../containers/ManagePatientPage/api';
import SearchParticipant from '../SearchParticipant';

function ManageCareTeam(props) {
  const { onSearch, selectedPatient } = props;

  return (
    <div>
      {selectedPatient &&
      <div>
        <h4><FormattedMessage {...messages.title} /></h4>
        <p> Patient:</p>
        <p><strong>{mapToPatientName(selectedPatient)}</strong></p>
        <SearchParticipant onSearch={onSearch} />
      </div>
      }
    </div>
  );
}

ManageCareTeam.propTypes = {
  onSearch: PropTypes.func.isRequired,
  selectedPatient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
};

export default ManageCareTeam;
