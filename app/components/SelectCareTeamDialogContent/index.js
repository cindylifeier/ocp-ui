/**
*
* SelectCareTeamDialogContent
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SelectCareTeamDialogContent() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SelectCareTeamDialogContent.propTypes = {

};

export default SelectCareTeamDialogContent;
