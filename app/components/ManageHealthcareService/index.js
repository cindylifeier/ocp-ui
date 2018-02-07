/**
*
* ManageHealthcareService
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ManageHealthcareService() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ManageHealthcareService.propTypes = {

};

export default ManageHealthcareService;
