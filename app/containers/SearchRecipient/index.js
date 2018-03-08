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
  addSelectedRecipients, setSelectRecipientStatus,
} from 'containers/SearchRecipient/actions';
import Checkbox from 'material-ui/Checkbox';
import { getRoleName } from 'utils/CommunicationUtils';
import StyledFlatButton from 'components/StyledFlatButton/index';
import Dialog from 'material-ui/Dialog';
import TableHeader from 'components/TableHeader/index';
import uniqueId from 'lodash/uniqueId';
import StyledRaisedButton from 'components/StyledRaisedButton';
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
  }

  componentWillMount() {
    // this.props.getRecipients(this.props.selectedPatient.id);
    // this.props.initializeSearchRecipients(this.props.initialSelectedRecipients);
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
    const { isOpen, recipients } = this.props;
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
          {recipients && recipients.length > 0 && this.createRecipientTable()}
          {recipients && recipients.length === 0 && this.createNoRecipientTable()}
        </div>
      </Dialog>
    );
  }
}

SearchRecipient.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  addSelectedRecipients: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  setSelectRecipientStatus: PropTypes.func.isRequired,
  // selectedPatient: PropTypes.object,
  recipients: PropTypes.array.isRequired,
  // selectedRecipients: PropTypes.array.isRequired,
  // initialSelectedRecipients: PropTypes.array.isRequired,
  // initializeSearchRecipients: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  recipients: makeSelectRecipients(),
  // selectedPatient: makeSelectSelectedPatient(),
  selectedRecipients: makeSelectSelectedRecipients(),
});

function mapDispatchToProps(dispatch) {
  return {
    setSelectRecipientStatus: (checked, recipientReference) => dispatch(setSelectRecipientStatus(checked, recipientReference)),
    addSelectedRecipients: () => dispatch(addSelectedRecipients()),
    // initializeSearchRecipients: (initialSelectedRecipients) => dispatch(initializeSearchRecipients(initialSelectedRecipients)),
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
