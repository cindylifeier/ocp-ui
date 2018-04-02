/**
*
* FilterBar
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function FilterBar() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

FilterBar.propTypes = {

};

export default FilterBar;
