/**
 *
 * SearchAppointmentParticipant
 *
 */

import FormSubtitle from 'components/FormSubtitle';
import SelectField from 'components/SelectField';
import SelectFieldWithoutOnClick from 'components/SelectFieldWithoutOnClick';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import TextField from 'components/TextField';
import WideDialog from 'components/WideDialog';
import { getLookupsAction } from 'containers/App/actions';
import {
  APPOINTMENT_PARTICIPANT_REQUIRED,
  APPOINTMENT_PARTICIPATION_STATUS,
  APPOINTMENT_PARTICIPATION_TYPE,
  PARTICIPANTROLE,
  PARTICIPANTTYPE,
} from 'containers/App/constants';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import { makeSelectParticipantRoles, makeSelectParticipantTypes } from 'containers/App/lookupSelectors';
import {
  addAppointmentParticipants,
  getAppointmentSearchParticipant,
  initializeSearchAppointmentParticipant,
} from 'containers/SearchAppointmentParticipant/actions';
import AddParticipantDialogIconButton from 'containers/SearchAppointmentParticipant/AddParticipantDialogIconButton';
import { TEXT_MIN_LENGTH } from 'containers/SearchAppointmentParticipant/constants';
import ParticipantName from 'containers/SearchAppointmentParticipant/ParticipantName';
import ParticipantSearchContainer from 'containers/SearchAppointmentParticipant/ParticipantSearchContainer';
import { Form, Formik } from 'formik';
import { uniqueId } from 'lodash';
import { MenuItem } from 'material-ui';
import { ActionSearch } from 'material-ui/svg-icons/action/search';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Cell, Grid } from 'styled-css-grid';
import { mapSearchParticipantName } from 'utils/CareTeamUtils';
import injectReducer from 'utils/injectReducer';

import injectSaga from 'utils/injectSaga';
import * as yup from 'yup';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { makeSelectSearchAppointmentParticipantResults } from './selectors';

export class SearchAppointmentParticipant extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
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
    this.props.searchParticipant(name, member, this.props.patient.id);
  }

  createSearchResultHeader() {
    return (
      <Table>
        <TableHeader>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderName} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderRole} />}</TableHeaderColumn>
          <TableHeaderColumn>{
            <FormattedMessage {...messages.participantTableHeaderParticipationType} />}</TableHeaderColumn>
          <TableHeaderColumn>{
            <FormattedMessage {...messages.participantTableHeaderParticipationRequired} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderAction} />}</TableHeaderColumn>
        </TableHeader>
      </Table>
    );
  }

  createSearchResultRows() {
    const participantRoles = this.props.participantRoles;
    return this.props.searchParticipantResult.map((participant) => (
      <Formik
        key={uniqueId()}
        initialValues={{}}
        onSubmit={(values, actions) => {
          const { roleCode } = values;
          const role = find(this.props.participantRoles, { code: roleCode });
          const smallParticipant = {
            roleCode,
            roleDisplay: role.display,
            memberId: participant.member.id,
            memberType: participant.member.type,
            name: mapSearchParticipantName(participant),
          };
          this.addParticipant(smallParticipant);
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          roleCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })
        }
        render={(formikProps) => {
          const { isSubmitting, dirty, isValid } = formikProps;
          return (
            <Form>
              <Table>
                <TableRow key={uniqueId()}>
                  <TableRowColumn>
                    <Grid columns={5}>
                      <Cell middle>
                        <ParticipantName>
                          {mapSearchParticipantName(participant)}
                        </ParticipantName>
                      </Cell>
                      <Cell middle>
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
                      </Cell>
                      <Cell middle />
                      <Cell middle />
                      <Cell middle>
                        <StyledRaisedButton
                          label={<FormattedMessage {...messages.addParticipantBtnLabel} />}
                          type="submit"
                          value={participant}
                          disabled={!dirty || isSubmitting || !isValid}
                        />
                      </Cell>
                    </Grid>
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
        <TableHeaderColumn>{
          <FormattedMessage {...messages.participantTableHeaderParticipationType} />}</TableHeaderColumn>
        <TableHeaderColumn>{
          <FormattedMessage {...messages.participantTableHeaderParticipationRequired} />}</TableHeaderColumn>
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
      <StyledFlatButton
        label={<FormattedMessage {...messages.addParticipantDialogCancelBtnLabel} />}
        onClick={this.handleDialogClose}
      />,
    ];
    return (
      <WideDialog
        actions={actionsButtons}
        modal={false}
        open={isOpen}
        autoScrollBodyContent
      >
        <FormSubtitle margin="0">
          <FormattedMessage {...messages.addParticipantDialogTitle} />
        </FormSubtitle>
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
                <ParticipantSearchContainer>
                  <Grid columns={3}>
                    <Cell>
                      <TextField
                        name="name"
                        fullWidth
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
                        )
                        }
                      </SelectField>
                    </Cell>
                    <Cell>
                      <AddParticipantDialogIconButton
                        tooltip={<FormattedMessage {...messages.searchButtonTooltip} />}
                        type="submit"
                        disabled={!dirty || isSubmitting || !isValid}
                      >
                        <ActionSearch />
                      </AddParticipantDialogIconButton>
                    </Cell>
                  </Grid>
                </ParticipantSearchContainer>
              </Form>
            );
          }}
        />
        {searchParticipantResult && searchParticipantResult.length > 0 && this.createSearchResultHeader()}
        {searchParticipantResult && searchParticipantResult.length > 0 && this.createSearchResultRows()}
        {searchParticipantResult && searchParticipantResult.length === 0 && this.createNoSearchResultTable()}
      </WideDialog>
    );
  }
}


SearchAppointmentParticipant.propTypes = {
  initializeSearchParticipant: PropTypes.func.isRequired,
  addParticipants: PropTypes.func.isRequired,
  getLookups: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  initialSelectedParticipants: PropTypes.array,
  searchParticipant: PropTypes.func.isRequired,
  searchParticipantResult: PropTypes.array,
  participantRoles: PropTypes.array,
  patient: PropTypes.object,
  participantTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    definition: PropTypes.string,
    system: PropTypes.string,
  })),
};

const mapStateToProps = createStructuredSelector({
  participantTypes: makeSelectParticipantTypes(),
  participantRoles: makeSelectParticipantRoles(),
  patient: makeSelectPatient(),
  searchParticipantResult: makeSelectSearchAppointmentParticipantResults(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([PARTICIPANTTYPE,
      PARTICIPANTROLE, APPOINTMENT_PARTICIPATION_STATUS,
      APPOINTMENT_PARTICIPATION_TYPE,
      APPOINTMENT_PARTICIPANT_REQUIRED])),
    searchParticipant: (name, member) => dispatch(getAppointmentSearchParticipant(name, member)),
    addParticipants: (participant) => dispatch(addAppointmentParticipants(participant)),
    initializeSearchParticipant: (initialSelectedParticipants) => dispatch(initializeSearchAppointmentParticipant(initialSelectedParticipants)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchAppointmentParticipant', reducer });
const withSaga = injectSaga({ key: 'searchAppointmentParticipant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchAppointmentParticipant);
