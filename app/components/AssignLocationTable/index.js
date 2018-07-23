/**
*
* AssignLocationTable
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function AssignLocationTable() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

AssignLocationTable.propTypes = {

};

export default AssignLocationTable;
