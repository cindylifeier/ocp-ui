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
import MenuItem from 'material-ui/MenuItem';

import injectSaga from 'utils/injectSaga';
import saga from './saga';
import messages from './messages';
import { logout } from './actions';

export class Logout extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <MenuItem
          primaryText={<FormattedMessage {...messages.logoutButton} />}
          onClick={this.props.onLogout}
        />
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
