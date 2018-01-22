/**
*
* ManagePractitioner
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ManagePractitioner() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ManagePractitioner.propTypes = {

};

export default ManagePractitioner;
