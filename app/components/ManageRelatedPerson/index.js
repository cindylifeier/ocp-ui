/**
*
* ManageRelatedPerson
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ManageRelatedPerson() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ManageRelatedPerson.propTypes = {

};

export default ManageRelatedPerson;
