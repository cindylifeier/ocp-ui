/**
 *
 * ResetPassword
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
import StyledFlatButton from 'components/StyledFlatButton';
import StyledDialog from 'components/StyledDialog';
import makeSelectResetPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class ResetPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { dialogOpen, onCloseDialog, user } = this.props;
    console.log(user);
    return (
      <StyledDialog fullWidth open={dialogOpen}>
        <DialogTitle>
          <FormattedMessage {...messages.title} />
        </DialogTitle>
        <DialogContent>
          <StyledFlatButton onClick={onCloseDialog}>Close</StyledFlatButton>
        </DialogContent>
      </StyledDialog>
    );
  }
}

ResetPassword.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  resetpassword: makeSelectResetPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'resetPassword', reducer });
const withSaga = injectSaga({ key: 'resetPassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ResetPassword);
