/**
*
* TaskTable
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function TaskTable() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

TaskTable.propTypes = {

};

export default TaskTable;
