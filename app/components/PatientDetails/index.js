/**
 *
 * PatientDetails
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import messages from './messages';

// import styled from 'styled-components';

function PatientDetails(props) {
  return (
    <div>
      {console.log(props.selectedPatient)}
      <FormattedMessage {...messages.header} />
    </div>
  );
}

PatientDetails.propTypes = {
  selectedPatient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
};

export default PatientDetails;
