/**
*
* ManageActivityDefinition
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

function ManageActivityDefinition() {
  return (
    <div className={styles.title}>
      <FormattedMessage {...messages.title} />
    </div>
  );
}

ManageActivityDefinition.propTypes = {

};

export default ManageActivityDefinition;
