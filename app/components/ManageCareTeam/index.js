/**
*
* ManageCareTeam
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ManageCareTeam() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ManageCareTeam.propTypes = {

};

export default ManageCareTeam;
