/**
 * StatusCheckbox
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Checkbox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';

function StatusCheckbox(props) {
  return (
    <span>
      <FormattedMessage {...props.messages} >
        {(msg) => (
          <Checkbox
            label={msg}
            labelPosition="right"
            id={props.elementId}
            onCheck={props.handleCheck}
          />
        )}
      </FormattedMessage>
    </span>
  );
}

StatusCheckbox.propTypes = {
  messages: PropTypes.object,
  handleCheck: PropTypes.func,
  elementId: PropTypes.string,
};

export default StatusCheckbox;
