/**
 *
 * ChangePassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectUser } from 'containers/App/contextSelectors';
import StyledDrawer from 'components/StyledDrawer';
import ChangePasswordForm from 'components/ChangePasswordForm';
import makeSelectChangePassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class ChangePassword extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangePassword(changePasswordFormData) {
    console.log(changePasswordFormData);
  }

  render() {
    const { drawerOpen, onCloseDrawer, user } = this.props;
    return (
      <StyledDrawer
        anchor="right"
        open={drawerOpen}
        transitionDuration={{ enter: 500, exit: 20 }}
        width="500px"
      >
        <DialogTitle>
          <FormattedMessage {...messages.title} />
        </DialogTitle>
        <DialogContent>
          <ChangePasswordForm user={user} onCloseDrawer={onCloseDrawer} onChangePassword={this.handleChangePassword} />
        </DialogContent>
      </StyledDrawer>
    )
      ;
  }
}

ChangePassword.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  onCloseDrawer: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user_name: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  changepassword: makeSelectChangePassword(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'changePassword', reducer });
const withSaga = injectSaga({ key: 'changePassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChangePassword);
