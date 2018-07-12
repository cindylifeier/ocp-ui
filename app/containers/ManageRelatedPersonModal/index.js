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
import { makeSelectPatient } from 'containers/App/contextSelectors';
import ManageRelatedPersonDialog from 'components/ManageRelatedPersonDialog';
import { searchRelatedPersons } from './actions';
import makeSelectManageRelatedPersonModal from './selectors';
import reducer from './reducer';
import saga from './saga';

export class ManageRelatedPersonModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleRelatedPersonsSearch = this.handleRelatedPersonsSearch.bind(this);
  }

  handleRelatedPersonsSearch(searchValue, showInactive, searchType) {
    const patientId = this.props.patient.id;
    const page = 1;
    this.props.searchRelatedPersons(searchValue, showInactive, searchType, patientId, page);
  }

  render() {
    const { dialogOpen, onDialogClose } = this.props;
    return (
      <ManageRelatedPersonDialog
        dialogOpen={dialogOpen}
        onDialogClose={onDialogClose}
        onRelatedPersonsSearch={this.handleRelatedPersonsSearch}
      />
    );
  }
}

ManageRelatedPersonModal.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  onDialogClose: PropTypes.func.isRequired,
  searchRelatedPersons: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    identifier: PropTypes.array,
    name: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  relatedPersonModal: makeSelectManageRelatedPersonModal(),
  patient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    searchRelatedPersons: (searchValue, showInactive, searchType, patientId, currentPage) => dispatch(searchRelatedPersons(searchValue, showInactive, searchType, patientId, currentPage)),
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
