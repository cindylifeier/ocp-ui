/**
 *
 * ChangePasswordForm
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


function ChangePasswordForm() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ChangePasswordForm.propTypes = {};

export default ChangePasswordForm;
