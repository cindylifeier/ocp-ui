/**
*
* SearchParticipant
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SearchParticipant() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SearchParticipant.propTypes = {

};

export default SearchParticipant;
