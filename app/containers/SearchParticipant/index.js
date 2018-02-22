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
import find from 'lodash/find';
import uniqueId from 'lodash/uniqueId';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { teal500, white } from 'material-ui/styles/colors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.css';
import messages from './messages';
import { floatingLabelStyle, iconButtonStyle, TEXT_MIN_LENGTH } from './constants';
import { makeSelectParticipantRoles, makeSelectParticipantTypes } from '../App/lookupSelectors';
import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import { addParticipants, getSearchParticipant, initializeSearchParticipant } from './actions';
import { makeSelectSearchParticipantResults } from './selectors';
import Table from '../../components/Table';
import TableHeaderColumn from '../../components/TableHeaderColumn';
import TableRow from '../../components/TableRow';
import TableRowColumn from '../../components/TableRowColumn';
import TableHeader from '../../components/TableHeader';
import DatePickerWithoutBlur from '../../components/DatePickerWithoutBlur/index';
import SelectFieldWithoutOnClick from '../../components/SelectFieldWithoutOnClick/index';
import { mapSearchParticipantName } from '../../utils/CareTeamUtils';
import { DATE_PICKER_MODE, PARTICIPANTROLE, PARTICIPANTTYPE } from '../App/constants';
import { getLookupsAction } from '../App/actions';
import { makeSelectPatient } from '../ManageCareTeamPage/selectors';

const customContentStyle = {
  width: '70%',
  maxWidth: 'none',
};

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
    this.props.getLookUpFormData();
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
    this.props.searchParticipant(name, member, this.props.selectedPatient.id);
  }


  createSearchResultHeader() {
    return (
      <Table>
        <TableHeader>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderName} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderRole} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderStartDate} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderEndDate} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderAction} />}</TableHeaderColumn>
        </TableHeader>
      </Table>
    );
  }

  createSearchResultRows() {
    const today = new Date();
    const participantRoles = this.props.participantRoles;
    return this.props.searchParticipantResult.map((participant) => (
      <Formik
        key={uniqueId()}
        initialValues={{}}
        onSubmit={(values, actions) => {
          const { roleCode, startDate, endDate } = values;
          const role = find(this.props.participantRoles, { code: roleCode });
          const smallParticipant = {
            roleCode,
            startDate: startDate.toLocaleDateString(),
            endDate: endDate.toLocaleDateString(),
            roleDisplay: role.display,
            memberId: participant.member.id,
            memberType: participant.member.type,
            name: mapSearchParticipantName(participant),
          };
          this.addParticipant(smallParticipant);
          actions.setSubmitting(false);
        }}
        validationSchema={() =>
          yup.lazy((values) => {
            let startDate = new Date();
            if (values.startDate) {
              startDate = values.startDate;
            }
            return yup.object().shape({
              roleCode: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              startDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
              endDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(startDate.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
            });
          })}
        render={(formikProps) => {
          const { isSubmitting, dirty, isValid } = formikProps;
          return (
            <Form>
              <Table>
                <TableRow key={uniqueId()}>
                  <TableRowColumn>
                    <div className={styles.participantResultGridContainer}>
                      <div className={styles.participantResultGridItem}>
                        <div className={styles.participantNameGridItem}>
                          {mapSearchParticipantName(participant)}
                        </div>
                      </div>
                      <div className={styles.participantResultGridItem}>
                        <SelectFieldWithoutOnClick
                          name="roleCode"
                          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.participantRole} />}
                        >
                          {participantRoles && participantRoles.map((participantRole) =>
                            (<MenuItem
                              key={uniqueId()}
                              value={participantRole.code}
                              primaryText={participantRole.display}
                            />),
                          )}
                        </SelectFieldWithoutOnClick>
                      </div>
                      <div className={styles.participantResultGridItem}>
                        <DatePickerWithoutBlur
                          fullWidth
                          name="startDate"
                          minDate={today}
                          mode={DATE_PICKER_MODE.LANDSCAPE}
                          hintText={<FormattedMessage {...messages.hintText.startDate} />}
                          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startDate} />}
                        />
                      </div>
                      <div className={styles.participantResultGridItem}>
                        <DatePickerWithoutBlur
                          fullWidth
                          name="endDate"
                          minDate={today}
                          mode={DATE_PICKER_MODE.LANDSCAPE}
                          hintText={<FormattedMessage {...messages.hintText.endDate} />}
                          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endDate} />}
                        />
                      </div>
                      <div className={styles.participantResultGridItem}>
                        <RaisedButton
                          backgroundColor={teal500}
                          labelColor={white}
                          label={<FormattedMessage {...messages.addParticipantBtnLabel} />}
                          type="submit"
                          value={participant}
                          disabled={!dirty || isSubmitting || !isValid}
                        />
                      </div>
                    </div>
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
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderStartDate} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderEndDate} />}</TableHeaderColumn>
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
    const minimumLength = TEXT_MIN_LENGTH;
    const { participantTypes, isOpen, searchParticipantResult } = this.props;
    const actionsButtons = [
      <FlatButton
        label={<FormattedMessage {...messages.addParticipantDialogCancelBtnLabel} />}
        onClick={this.handleDialogClose}
      />,
    ];
    return (
      <Dialog
        actions={actionsButtons}
        modal={false}
        open={isOpen}
        contentStyle={customContentStyle}
        autoScrollBodyContent
      >
        <div className={styles.title}>
          <FormattedMessage {...messages.addParticipantDialogTitle} />
        </div>
        <Formik
          onSubmit={(values, actions) => {
            this.handleSearch(values);
            actions.setSubmitting(false);
          }}
          validationSchema={yup.object().shape({
            name: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />))
              .min(minimumLength, (
                <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
            member: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
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
                      )
                      }
                    </SelectField>
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
  getLookUpFormData: PropTypes.func.isRequired,
  searchParticipantResult: PropTypes.array,
  participantRoles: PropTypes.array,
  selectedPatient: PropTypes.object,
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
  selectedPatient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookUpFormData: () => dispatch(getLookupsAction([PARTICIPANTTYPE, PARTICIPANTROLE])),
    searchParticipant: (name, member, patientId) => dispatch(getSearchParticipant(name, member, patientId)),
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
