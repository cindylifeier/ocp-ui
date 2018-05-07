/**
 *
 * SelectCareTeam
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Dialog from 'material-ui/Dialog';

import injectSaga from 'utils/injectSaga';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import DialogHeader from 'components/DialogHeader';
import injectReducer from 'utils/injectReducer';
import { getRoleName } from 'utils/CommunicationUtils';
import SelectCareTeamDialogContent from 'components/SelectCareTeamDialogContent';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import makeSelectSelectCareTeam from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { customContentStyle, getActors } from './constants';

export class SelectCareTeam extends React.Component { // eslint-disable-line react/prefer-stateless-function

  handleDialogClose() {
    this.setState({ open: false });
    this.props.handleClose();
  }

  handleSearch() {
    this.props.getActors(this.props.selectedPatient.id);
  }

  render() {
    const { isOpen, careTeamMembers, selectedCareTeamMembers, memberTypes } = this.props;
    const localProps = {
      careTeamMembers,
      selectedCareTeamMembers,
      memberTypes,
    };
    const actionsButtons = [
      <StyledFlatButton onClick={this.handleDialogClose}>
        <FormattedMessage {...messages.dialogCancelBtnLabel} />
      </StyledFlatButton>,
      <StyledRaisedButton onClick={this.addRecipients}>
        <FormattedMessage {...messages.dialogAddBtnLabel} />
      </StyledRaisedButton>,
    ];
    return (
      <Dialog
        actions={actionsButtons}
        modal
        open={isOpen}
        contentStyle={customContentStyle}
        autoScrollBodyContent
      >
        <DialogHeader>
          <FormattedMessage {...messages.addRecipientDialogTitle} />
        </DialogHeader>
        <SelectCareTeamDialogContent
          {...localProps}
          updateCheck={this.updateCheck}
          handleSearch={this.handleSearch}
          getRoleName={getRoleName}
        />
      </Dialog>
    );
  }
}

SelectCareTeam.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  careTeamMembers: PropTypes.array.isRequired,
  selectedCareTeamMembers: PropTypes.array,
  memberTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    definition: PropTypes.string,
    system: PropTypes.string,
  })),
  getActors: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedPatient: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectcareteam: makeSelectSelectCareTeam(),
  selectedPatient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    getActors: (patientId) => dispatch(getActors(patientId)),

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'selectCareTeam', reducer });
const withSaga = injectSaga({ key: 'selectCareTeam', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SelectCareTeam);
