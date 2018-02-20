/**
*
* RelatedPersonTable
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function RelatedPersonTable() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

RelatedPersonTable.propTypes = {

};

export default RelatedPersonTable;
