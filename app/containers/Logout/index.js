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
import { createStructuredSelector } from 'reselect';
import { MenuItem } from 'material-ui-next/Menu';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import { clearAll } from 'containers/App/contextActions';
import { makeSelectConfig } from 'containers/App/selectors';
import saga from './saga';
import messages from './messages';
import { logout } from './actions';

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
      <div>
        <MenuItem component={Link} to="/c2s-ui/manage-client">
          <FormattedMessage {...messages.manageClient} />
        </MenuItem>
        <MenuItem
          onClick={this.handleLogout}
        >
          <FormattedMessage {...messages.logoutButton} />
        </MenuItem>
      </div>
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
