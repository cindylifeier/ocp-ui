/**
 *
 * SampleComponent
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import materialUiWrapperHOC from '../../utils/materialUiWrapperHOC';

function SampleComponent() {
  return (
    <div>
      <h1>
        This is the sample component!
      </h1>
    </div>
  );
}

SampleComponent.propTypes = {};

export function createSampleComponent(location) {
  ReactDOM.render(
    materialUiWrapperHOC(SampleComponent),
    document.getElementById(location)
  );
}

export default SampleComponent;
