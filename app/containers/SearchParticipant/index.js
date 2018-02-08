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
import { DatePicker } from 'material-ui';
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
import { makeSelectParticipantRoles, makeSelectParticipantTypes } from '../App/selectors';
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
import { DATE_PICKER_MODE } from '../App/constants';


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


  createSearchResultHeader() {
    return (<Table>
      <TableHeader>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderName} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderRole} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderPeriod} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderAction} />}</TableHeaderColumn>
      </TableHeader>
    </Table>);
  }

  createSearchResultRows() {
    const today = new Date();
    const participantRoles = this.props.participantRoles;
    return this.props.searchParticipantResult.map((participant) => (
      <Formik
        key={uniqueId()}
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
              <Table>
                <TableRow key={uniqueId()}>
                  <TableRowColumn> {getParticipantName(participant)} </TableRowColumn>
                  <TableRowColumn>
                    <SelectField
                      name="role"
                      fullWidth
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.participantRole} />}
                    >
                      {participantRoles && participantRoles.map((participantRole) => (
                        <MenuItem value={participantRole.code} primaryText={participantRole.display} key={uniqueId()} />
                      ))}
                    </SelectField>
                  </TableRowColumn>
                  <TableRowColumn>
                    <DatePicker
                      fullWidth
                      name="startDate"
                      minDate={today}
                      mode={DATE_PICKER_MODE.LANDSCAPE}
                      hintText={<FormattedMessage {...messages.hintText.startDate} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startDate} />}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <DatePicker
                      fullWidth
                      name="endDate"
                      minDate={today}
                      mode={DATE_PICKER_MODE.LANDSCAPE}
                      hintText={<FormattedMessage {...messages.hintText.endDate} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endDate} />}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      backgroundColor={teal500}
                      labelColor={white}
                      label={<FormattedMessage {...messages.addParticipantBtnLabel} />}
                      type="button"
                      value={participant}
                      onClick={() => this.addParticipant(participant)}
                      primary
                      disabled={!dirty || isSubmitting || !isValid}
                    />
                  </TableRowColumn>
                </TableRow>
              </Table>
            </Form>
          );
        }}
      />
    ));
  }

  createNoSearchResultTable() {
    return (<Table>
      <TableHeader>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderName} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderRole} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderPeriod} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderAction} />}</TableHeaderColumn>
      </TableHeader>
      <TableRow key={uniqueId()}>
        <TableRowColumn> {<FormattedMessage {...messages.noSearchParticipantResult} />}</TableRowColumn>
        <TableRowColumn> </TableRowColumn>
        <TableRowColumn> </TableRowColumn>
        <TableRowColumn> </TableRowColumn>
      </TableRow>
    </Table>);
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
                        hintText={<FormattedMessage {...messages.hintText.practitionerName} />}
                        floatingLabelText={<FormattedMessage {...messages.floatingLabelText.practitionerName} />}
                      />
                    </div>
                    <div className={styles.gridItem}>
                      <SelectField
                        name="member"
                        floatingLabelText={<FormattedMessage {...messages.floatingLabelText.practitionerMember} />}
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
                    <div className={styles.gridItem}>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        />
        {searchParticipantResult && searchParticipantResult.length > 0 && this.createSearchResultHeader()}
        {searchParticipantResult && searchParticipantResult.length > 0 && this.createSearchResultRows()}
        {searchParticipantResult && searchParticipantResult.length === 0 && this.createNoSearchResultTable()}
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
  participantRoles: PropTypes.array,
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
  participantRoles: makeSelectParticipantRoles(),
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
