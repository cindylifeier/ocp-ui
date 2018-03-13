/**
 *
 * Logout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import IconButton from 'material-ui-next/IconButton';
import Tooltip from 'material-ui-next/Tooltip';
import ActionLogout from 'material-ui-icons/ExitToApp';


import injectSaga from 'utils/injectSaga';
import saga from './saga';
import messages from './messages';
import { logout } from './actions';

export class Logout extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Tooltip title={<FormattedMessage {...messages.logoutButton} />}>
          <IconButton onClick={this.props.onLogout}>
            <ActionLogout />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logout()),
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'logout', saga });

export default compose(
  withSaga,
  withConnect,
)(Logout);
