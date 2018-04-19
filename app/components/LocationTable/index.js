/**
*
* LocationTable
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function LocationTable() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

LocationTable.propTypes = {

};

export default LocationTable;
