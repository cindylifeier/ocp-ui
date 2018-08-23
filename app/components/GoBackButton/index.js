/**
 *
 * GoBackButton
 *
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import StyledFlatButton from 'components/StyledFlatButton';
import messages from './messages';

export function GoBackButton(props) {
  const { history, label, disabled } = props;
  return (
    <div>
      <StyledFlatButton
        fullWidth
        disabled={disabled}
        onClick={() => history.goBack()}
      >
        {label}
      </StyledFlatButton>
    </div>
  );
}

GoBackButton.propTypes = {
  label: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

GoBackButton.defaultProps = {
  label: <FormattedMessage {...messages.label} />,
  disabled: false,
};

export default withRouter(GoBackButton);

