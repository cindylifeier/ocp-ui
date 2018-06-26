/**
 *
 * Logout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { MenuItem } from 'material-ui-next/Menu';

import injectSaga from 'utils/injectSaga';
import { clearAll } from 'containers/App/contextActions';
import { makeSelectConfig } from 'containers/App/selectors';
import { logout } from './actions';
import saga from './saga';
import messages from './messages';

export class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.onLogout(this.props.config);
  }

  render() {
    return (
      <MenuItem onClick={this.handleLogout}>
        <FormattedMessage {...messages.logoutButton} />
      </MenuItem>
    );
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  config: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  config: makeSelectConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogout: (config) => {
      dispatch(logout(config));
      dispatch(clearAll());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'logout', saga });

export default compose(
  withSaga,
  withConnect,
)(Logout);
