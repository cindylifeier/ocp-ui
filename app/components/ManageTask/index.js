/**
*
* ManageTask
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

function ManageTask() {
  return (
    <div className={styles.title}>
      <FormattedMessage {...messages.title} />
    </div>
  );
}

ManageTask.propTypes = {

};

export default ManageTask;
