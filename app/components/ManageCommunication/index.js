/**
*
* ManageCommunication
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ManageCommunication() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ManageCommunication.propTypes = {

};

export default ManageCommunication;
