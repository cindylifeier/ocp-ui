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
import IconButton from 'material-ui/IconButton';
import ActionLogout from 'material-ui/svg-icons/action/exit-to-app';


import injectSaga from 'utils/injectSaga';
import { clearAll } from 'containers/Context/actions';
import saga from './saga';
import messages from './messages';
import { logout } from './actions';

export class Logout extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <IconButton
          tooltip={<FormattedMessage {...messages.logoutButton} />}
          onClick={this.props.onLogout}
        >
          <ActionLogout />
        </IconButton>
      </div>
    );
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => {
      dispatch(logout());
      dispatch(clearAll());
    },
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'logout', saga });

export default compose(
  withSaga,
  withConnect,
)(Logout);
