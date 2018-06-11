/**
*
* CoverageTable
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function CoverageTable() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

CoverageTable.propTypes = {

};

export default CoverageTable;
