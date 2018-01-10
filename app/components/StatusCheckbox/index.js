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
      <div>
        <FormattedMessage {...this.props.messages} >
          {(msg) => (
            <Checkbox
              label={msg}
              labelPosition="right"
              id="inactiveCheckBox"
              onCheck={this.props.handleCheck}
            />
          )}
        </FormattedMessage>
      </div>
    );
  }
}

StatusCheckbox.propTypes = {
  messages: PropTypes.object,
  handleCheck: PropTypes.func,
};

export default StatusCheckbox;
