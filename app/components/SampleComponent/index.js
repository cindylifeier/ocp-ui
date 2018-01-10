/**
 *
 * SampleComponent
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SampleComponent() {
  return (
    <div>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    </div>
  );
}

SampleComponent.propTypes = {};

export default SampleComponent;
