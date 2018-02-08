/**
 *
 * SearchParticipant
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Formik } from 'formik';
import yup from 'yup';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import { teal500, white } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.css';
import messages from './messages';
import { fieldStyle, floatingLabelStyle, iconButtonStyle } from './constants';
import { makeSelectParticipantTypes } from '../App/selectors';
import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import { addParticipants, getSearchParticipant, initializeSearchParticipant } from './actions';
import { makeSelectSearchParticipantResults } from './selectors';
import Table from '../../components/Table';
import TableHeaderColumn from '../../components/TableHeaderColumn';
import TableRow from '../../components/TableRow';
import TableRowColumn from '../../components/TableRowColumn';
import TableHeader from '../../components/TableHeader';
import { getParticipantName } from '../../utils/CareTeamUtils';

export class SearchParticipant extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  componentWillMount() {
    this.props.initializeSearchParticipant(this.props.initialSelectedParticipants);
  }

  addParticipant(participant) {
    this.handleDialogClose();
    const selected = [];
    selected.push(participant);
    this.props.addParticipants(selected);
  }

  handleDialogClose() {
    this.setState({ open: false });
    this.props.handleClose();
  }

  handleSearch(values) {
    const { name, member } = values;
    this.props.searchParticipant(name, member);
  }

  createSearchResultRows() {
    return this.props.searchParticipantResult.map((participant) => (
      <TableRow key={uniqueId()}>
        <TableRowColumn> {getParticipantName(participant)} </TableRowColumn>
        <TableRowColumn>
          <RaisedButton
            backgroundColor={teal500}
            labelColor={white}
            label={<FormattedMessage {...messages.addParticipantBtnLabel} />}
            type="button"
            value={participant}
            onClick={() => this.addParticipant(participant)}
            primary
          />
        </TableRowColumn>
      </TableRow>
    ));
  }

  render() {
    const { participantTypes, isOpen, searchParticipantResult } = this.props;
    const actionsButtons = [
      <FlatButton
        label={<FormattedMessage {...messages.addParticipantDialogCancelBtnLabel} />}
        onClick={this.handleDialogClose}
      />,
    ];
    return (
      <Dialog
        title={<FormattedMessage {...messages.addParticipantDialogTitle} />}
        actions={actionsButtons}
        modal={false}
        open={isOpen}
        autoScrollBodyContent
      >
        <Formik
          initialValues={{}}
          onSubmit={(values, actions) => {
            this.handleSearch(values);
            actions.setSubmitting(false);
          }}
          validationSchema={yup.object().shape({})}
          render={(formikProps) => {
            const { isSubmitting, dirty, isValid } = formikProps;
            return (
              <Form>
                <div className={styles.root}>
                  <div className={styles.gridContainer}>
                    <div className={styles.gridItem}>
                      <TextField
                        name="name"
                        style={fieldStyle}
                        floatingLabelStyle={floatingLabelStyle}
                        hintText={<FormattedMessage {...messages.PractitionerNameHintText} />}
                        floatingLabelText={<FormattedMessage {...messages.PractitionerNameFloatingLabelText} />}
                      />
                    </div>
                    <div className={styles.gridItem}>
                      <SelectField
                        name="member"
                        floatingLabelText={<FormattedMessage {...messages.PractitionerMemberFloatingLabel} />}
                      >
                        {participantTypes && participantTypes.map((member) =>
                          <MenuItem key={member.code} value={member.code} primaryText={member.display} />,
                        )
                        }
                      </SelectField>
                    </div>
                    <div className={styles.gridItem}>
                      <IconButton
                        style={iconButtonStyle}
                        tooltip={<FormattedMessage {...messages.searchButtonTooltip} />}
                        type="submit"
                        disabled={!dirty || isSubmitting || !isValid}
                      >
                        <ActionSearch />
                      </IconButton>
                    </div>
                  </div>
                  {searchParticipantResult && searchParticipantResult.length > 0 &&
                  <Table>
                    <TableHeader>
                      <TableHeaderColumn>{
                        <FormattedMessage {...messages.participantTableHeaderName} />}</TableHeaderColumn>
                      <TableHeaderColumn>{
                        <FormattedMessage {...messages.participantTableHeaderAction} />}</TableHeaderColumn>
                    </TableHeader>
                    {this.createSearchResultRows()}
                  </Table>
                  }
                </div>
              </Form>
            );
          }}
        />
      </Dialog>
    );
  }
}

SearchParticipant.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  initialSelectedParticipants: PropTypes.array,
  searchParticipant: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  initializeSearchParticipant: PropTypes.func.isRequired,
  addParticipants: PropTypes.func.isRequired,
  searchParticipantResult: PropTypes.array,
  participantTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    definition: PropTypes.string,
    system: PropTypes.string,
  })),
};

const mapStateToProps = createStructuredSelector({
  participantTypes: makeSelectParticipantTypes(),
  searchParticipantResult: makeSelectSearchParticipantResults(),
});

function mapDispatchToProps(dispatch) {
  return {
    searchParticipant: (name, member) => dispatch(getSearchParticipant(name, member)),
    addParticipants: (participant) => dispatch(addParticipants(participant)),
    initializeSearchParticipant: (initialSelectedParticipants) => dispatch(initializeSearchParticipant(initialSelectedParticipants)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchParticipant', reducer });
const withSaga = injectSaga({ key: 'searchParticipant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchParticipant);
