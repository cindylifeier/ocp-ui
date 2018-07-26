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
import { DialogActions, DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import StyledDrawer from 'components/StyledDrawer';
import StyledFlatButton from 'components/StyledFlatButton';
import ChangePasswordForm from 'components/ChangePasswordForm';
import makeSelectChangePassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class ChangePassword extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { drawerOpen, onCloseDrawer } = this.props;
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
          <ChangePasswordForm />
        </DialogContent>
        <DialogActions>
          <StyledFlatButton onClick={onCloseDrawer}>
            <FormattedMessage {...messages.cancelButton} />
          </StyledFlatButton>
        </DialogActions>
      </StyledDrawer>
    )
      ;
  }
}

ChangePassword.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  onCloseDrawer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  changepassword: makeSelectChangePassword(),
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
