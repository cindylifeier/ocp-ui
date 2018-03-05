/**
*
* ManageAppointment
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ManageAppointment() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ManageAppointment.propTypes = {

};

export default ManageAppointment;
