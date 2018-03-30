/**
*
* ManageConsent
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ManageConsent() {
  return (
    <div>
      <FormattedMessage {...messages.title} />
    </div>
  );
}

ManageConsent.propTypes = {

};

export default ManageConsent;
