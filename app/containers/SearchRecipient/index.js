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

// import makeSelectSelectedPatient from 'containers/App/sharedDataSelectors';
import Table from 'components/Table/index';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import { makeSelectRecipients, makeSelectSelectedRecipients } from 'containers/SearchRecipient/selectors';
import {
  addSelectedRecipients,
  getRecipients,
  setSelectRecipientStatus,
} from 'containers/SearchRecipient/actions';
import Checkbox from 'material-ui/Checkbox';
import { getRoleName } from 'utils/CommunicationUtils';
import StyledFlatButton from 'components/StyledFlatButton/index';
import Dialog from 'material-ui/Dialog';
import TableHeader from 'components/TableHeader/index';
import uniqueId from 'lodash/uniqueId';
import StyledRaisedButton from 'components/StyledRaisedButton';
import SelectField from 'components/SelectField/index';
import MenuItem from 'material-ui/MenuItem';
import ActionSearch from 'material-ui/svg-icons/action/search';
import StyledIconButton from 'components/StyledIconButton/index';
import { Form, Formik } from 'formik';
import TextField from 'components/TextField/index';
import { floatingLabelStyle, iconButtonStyle } from 'containers/SearchRecipient/constants';
import * as yup from 'yup';
import { getLookupsAction } from 'containers/App/actions';
import { PARTICIPANTROLE, PARTICIPANTTYPE } from 'containers/App/constants';
import { makeSelectParticipantTypes } from 'containers/App/lookupSelectors';
import makeSelectSelectedPatient from 'containers/App/sharedDataSelectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';


const customContentStyle = {
  width: '70%',
  maxWidth: 'none',
};

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
    // this.props.getRecipients(this.props.selectedPatient.id);
    // this.props.initializeSearchRecipients(this.props.initialSelectedRecipients);
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
    console.log(values);
    if (this.props.communicationId) {
      this.props.getRecipients(this.props.selectedPatient.id, this.props.communicationId);
    } else {
      this.props.getRecipients(this.props.selectedPatient.id, null);
    }
  }

  createRecipientTable() {
    return (
      <Table>
        <TableHeader key={uniqueId()}>
          <TableHeaderColumn></TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderName} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderRole} />}</TableHeaderColumn>
        </TableHeader>
        {this.createRecipientTableRows()}
      </Table>
    );
  }

  createRecipientTableRows() {
    return this.props.recipients.map((recipient) => (
      <TableRow key={uniqueId()}>
        <TableRowColumn>
          <Checkbox
            checked={recipient.checked}
            onCheck={(evt, checked) => {
              this.updateCheck(evt, checked, recipient.reference);
            }}
            disabled={recipientIsSelected(recipient.reference, this.props.selectedRecipients)}
          >
          </Checkbox>
        </TableRowColumn>
        <TableRowColumn>
          {recipient.display}
        </TableRowColumn>
        <TableRowColumn>
          {getRoleName(recipient.reference)}
        </TableRowColumn>
      </TableRow>
    ));
  }

  createNoRecipientTable() {
    return (<Table>
      <TableHeader key={uniqueId()}>
        <TableHeaderColumn></TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderName} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderRole} />}</TableHeaderColumn>
      </TableHeader>
      <TableRow key={uniqueId()}>
        <TableRowColumn> {<FormattedMessage {...messages.noRecipientRecord} />}</TableRowColumn>
        <TableRowColumn> </TableRowColumn>
        <TableRowColumn> </TableRowColumn>
      </TableRow>
    </Table>);
  }

  render() {
    const { isOpen, recipients, participantTypes } = this.props;
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
        <div className={styles.title}>
          <FormattedMessage {...messages.addRecipientDialogTitle} />
        </div>
        <div>
          <Formik
            onSubmit={(values, actions) => {
              this.handleSearch(values);
              actions.setSubmitting(false);
            }}
            validationSchema={yup.object().shape({
              // name: yup.string()
              //   .required((<FormattedMessage {...messages.validation.required} />))
              //   .min(minimumLength, (
              //     <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
              // member: yup.string()
              //   .required((<FormattedMessage {...messages.validation.required} />)),
            })}
            render={(formikProps) => {
              const { isSubmitting, dirty, isValid } = formikProps;
              return (
                <Form>
                  <div className={styles.root}>
                    <div className={styles.searchGridContainer}>
                      <TextField
                        name="name"
                        fullWidth
                        floatingLabelStyle={floatingLabelStyle}
                        hintText={<FormattedMessage {...messages.hintText.practitionerName} />}
                        floatingLabelText={<FormattedMessage {...messages.floatingLabelText.practitionerName} />}
                      />
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
                    </div>
                  </div>
                </Form>
              );
            }}
          />
          {recipients && recipients.length > 0 && this.createRecipientTable()}
          {recipients && recipients.length === 0 && this.createNoRecipientTable()}
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
  // initialSelectedRecipients: PropTypes.array.isRequired,
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
    getRecipients: (patientId, communicationId) => dispatch(getRecipients(patientId, communicationId)),
    getLookUpFormData: () => dispatch(getLookupsAction([PARTICIPANTTYPE, PARTICIPANTROLE])),
    setSelectRecipientStatus: (checked, recipientReference) => dispatch(setSelectRecipientStatus(checked, recipientReference)),
    addSelectedRecipients: () => dispatch(addSelectedRecipients()),
    // initializeSearchRecipients: () => dispatch(initializeSearchRecipients()),
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

function recipientIsSelected(recipientReference, selectedRecipients) {
  if (recipientReference && selectedRecipients && selectedRecipients.length > 0) {
    for (let i = 0; i < selectedRecipients.length; i += 1) {
      if (selectedRecipients[i].reference === recipientReference) {
        return true;
      }
    }
  }
  return false;
}
