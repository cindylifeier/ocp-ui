/**
*
* StatusCheckbox
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Checkbox } from 'material-ui';
import PropTypes from 'prop-types';

class StatusCheckbox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <span>
        <FormattedMessage {...this.props.messages} >
          {(msg) => (
            <Checkbox
              label={msg}
              labelPosition="right"
              id={this.props.elementId}
              onCheck={this.props.handleCheck}
            />
          )}
        </FormattedMessage>
      </span>
    );
  }
}

StatusCheckbox.propTypes = {
  messages: PropTypes.object,
  handleCheck: PropTypes.func,
  elementId: PropTypes.string,
};

export default StatusCheckbox;
