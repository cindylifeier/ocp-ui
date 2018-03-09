/**
*
* UpcomingTasksTable
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function UpcomingTasksTable() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

UpcomingTasksTable.propTypes = {

};

export default UpcomingTasksTable;
