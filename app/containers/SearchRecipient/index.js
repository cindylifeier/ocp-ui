/**
 *
 * SearchRecipient
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DialogHeader from 'components/DialogHeader/index';
import { makeSelectRecipients, makeSelectSelectedRecipients } from 'containers/SearchRecipient/selectors';
import {
  addSelectedRecipients,
  getRecipients,
  setSelectRecipientStatus,
} from 'containers/SearchRecipient/actions';
import FormGrid from 'components/FormGrid/index';
import FormCell from 'components/FormCell/index';
import { Cell, Grid } from 'styled-css-grid';
import { getRoleName } from 'utils/CommunicationUtils';
import StyledFlatButton from 'components/StyledFlatButton/index';
import Dialog from 'material-ui/Dialog';
import StyledRaisedButton from 'components/StyledRaisedButton';
import SelectField from 'components/SelectField/index';
import MenuItem from 'material-ui/MenuItem';
import ActionSearch from 'material-ui/svg-icons/action/search';
import StyledIconButton from 'components/StyledIconButton/index';
import { Form, Formik } from 'formik';
import TextField from 'components/TextField/index';
import { customContentStyle, floatingLabelStyle, iconButtonStyle } from 'containers/SearchRecipient/constants';
import yup from 'yup';
import { getLookupsAction } from 'containers/App/actions';
import { PARTICIPANTROLE, PARTICIPANTTYPE } from 'containers/App/constants';
import { makeSelectParticipantTypes } from 'containers/App/lookupSelectors';
import makeSelectSelectedPatient from 'containers/App/sharedDataSelectors';
import RecipientsTable from 'components/RecipientsTable';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class SearchRecipient extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.addRecipients = this.addRecipients.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.getLookUpFormData();
  }

  addRecipients() {
    this.handleDialogClose();
    this.props.addSelectedRecipients();
  }

  updateCheck(evt, checked, recipientReference) {
    this.props.setSelectRecipientStatus(checked, recipientReference);
  }

  handleDialogClose() {
    this.setState({ open: false });
    this.props.handleClose();
  }

  handleSearch(values) {
    const member = values && values.member ? values.member : '';
    if (this.props.communicationId) {
      this.props.getRecipients(this.props.selectedPatient.id, member, this.props.communicationId);
    } else {
      this.props.getRecipients(this.props.selectedPatient.id, member, null);
    }
  }

  render() {
    const { isOpen, recipients, participantTypes, selectedRecipients } = this.props;
    const actionsButtons = [
      <StyledFlatButton
        label={<FormattedMessage {...messages.dialogCancelBtnLabel} />}
        onClick={this.handleDialogClose}
      />,
      <StyledRaisedButton
        label={<FormattedMessage {...messages.dialogAddBtnLabel} />}
        primary
        onClick={this.addRecipients}
      />,
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
        <div>
          <Formik
            onSubmit={(values, actions) => {
              this.handleSearch(values);
              actions.setSubmitting(false);
            }}
            validationSchema={yup.object().shape({
            })}
            render={(formikProps) => {
              const { isSubmitting, dirty, isValid } = formikProps;
              return (
                <Form>
                  <FormGrid columns={12}>
                    <FormCell top={1} left={1} width={7}>
                      <Grid columns="3fr 3fr 1fr" gap="">
                        <Cell>
                          <TextField
                            name="name"
                            fullWidth
                            floatingLabelStyle={floatingLabelStyle}
                            hintText={<FormattedMessage {...messages.hintText.practitionerName} />}
                            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.practitionerName} />}
                          />
                        </Cell>
                        <Cell>
                          <SelectField
                            name="member"
                            fullWidth
                            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.practitionerMember} />}
                          >
                            {participantTypes && participantTypes.map((member) =>
                              <MenuItem key={member.code} value={member.code} primaryText={member.display} />,
                            )}
                          </SelectField>
                          <StyledIconButton
                            style={iconButtonStyle}
                            tooltip={<FormattedMessage {...messages.searchButtonTooltip} />}
                            type="submit"
                            disabled={!dirty || isSubmitting || !isValid}
                          >
                            <ActionSearch />
                          </StyledIconButton>
                        </Cell>
                        <Cell>
                          <StyledIconButton
                            style={iconButtonStyle}
                            tooltip={<FormattedMessage {...messages.searchButtonTooltip} />}
                            type="submit"
                            disabled={isSubmitting}
                          >
                            <ActionSearch />
                          </StyledIconButton>
                        </Cell>
                      </Grid>
                    </FormCell>
                  </FormGrid>
                </Form>
              );
            }}
          />
          <RecipientsTable
            recipients={recipients}
            updateCheck={this.updateCheck}
            selectedRecipients={selectedRecipients}
            getRoleName={getRoleName}
          />
        </div>
      </Dialog>
    );
  }
}

SearchRecipient.propTypes = {
  getRecipients: PropTypes.func.isRequired,
  communicationId: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  addSelectedRecipients: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  setSelectRecipientStatus: PropTypes.func.isRequired,
  selectedPatient: PropTypes.object,
  recipients: PropTypes.array.isRequired,
  selectedRecipients: PropTypes.array,
  getLookUpFormData: PropTypes.func.isRequired,
  participantTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    definition: PropTypes.string,
    system: PropTypes.string,
  })),

};

const mapStateToProps = createStructuredSelector({
  recipients: makeSelectRecipients(),
  participantTypes: makeSelectParticipantTypes(),
  selectedPatient: makeSelectSelectedPatient(),
  selectedRecipients: makeSelectSelectedRecipients(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRecipients: (patientId, member, communicationId) => dispatch(getRecipients(patientId, member, communicationId)),
    getLookUpFormData: () => dispatch(getLookupsAction([PARTICIPANTTYPE, PARTICIPANTROLE])),
    setSelectRecipientStatus: (checked, recipientReference) => dispatch(setSelectRecipientStatus(checked, recipientReference)),
    addSelectedRecipients: () => dispatch(addSelectedRecipients()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchRecipient', reducer });
const withSaga = injectSaga({ key: 'searchRecipient', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchRecipient);
