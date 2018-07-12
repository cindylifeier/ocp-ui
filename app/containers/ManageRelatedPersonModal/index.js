/**
 *
 * ManageRelatedPersonModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ManageRelatedPersonDialog from 'components/ManageRelatedPersonDialog';
import makeSelectManageRelatedPersonModal from './selectors';
import reducer from './reducer';
import saga from './saga';

export class ManageRelatedPersonModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { dialogOpen, onDialogClose } = this.props;
    return (
      <ManageRelatedPersonDialog dialogOpen={dialogOpen} onDialogClose={onDialogClose} />
    );
  }
}

ManageRelatedPersonModal.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  onDialogClose: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managerelatedpersonmodal: makeSelectManageRelatedPersonModal(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageRelatedPersonModal', reducer });
const withSaga = injectSaga({ key: 'manageRelatedPersonModal', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageRelatedPersonModal);
