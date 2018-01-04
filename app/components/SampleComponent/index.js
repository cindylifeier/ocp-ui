/**
 *
 * SampleComponent
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import withContext from '../../utils/withContext';

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

export function createSampleComponent(location) {
  ReactDOM.render(
    withContext(SampleComponent),
    document.getElementById(location)
  );
}

export default SampleComponent;
