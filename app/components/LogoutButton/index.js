/**
*
* LogoutButton
*
*/

import React from 'react';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import withRouter from 'react-router-dom/es/withRouter';

class LogoutButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <IconButton
        tooltip="Sign out"
        iconClassName="fa fa-sign-out"
        onClick={() => { this.props.history.push('/login'); }}
      />
    );
  }
}

LogoutButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LogoutButton);
