/**
 *
 * GoBackButton
 *
 */

import React from 'react';
import createHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import StyledFlatButton from 'components/StyledFlatButton';
import messages from './messages';


export function GoBackButton(props) { // eslint-disable-line react/prefer-stateless-function
  const history = createHistory();
  const { label, isDisabled } = props;
  return (
    <div>
      <StyledFlatButton
        fullWidth
        label={label}
        default
        disabled={isDisabled}
        onClick={() => history.goBack()}
      />
    </div>
  );
}

GoBackButton.propTypes = {
  label: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

GoBackButton.defaultProps = {
  label: <FormattedMessage {...messages.label} />,
  isDisabled: false,
};

export default GoBackButton;

