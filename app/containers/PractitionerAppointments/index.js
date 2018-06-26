/**
 *
 * PractitionerAppointments
 *
 */

import CenterAlign from 'components/Align/CenterAlign';
import AppointmentTable from 'components/AppointmentTable';
import Card from 'components/Card';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import FilterSection from 'components/FilterSection';
import HorizontalAlignment from 'components/HorizontalAlignment';
import InfoSection from 'components/InfoSection';
import { PanelToolbar } from 'components/PanelToolbar';
import RecordsRange from 'components/RecordsRange';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import StatusCheckbox from 'components/StatusCheckbox';
import SizedStickyDiv from 'components/StickyDiv/SizedStickyDiv';
import StyledDialog from 'components/StyledDialog';
import StyledRaisedButton from 'components/StyledRaisedButton';
import { getLookupsAction } from 'containers/App/actions';
import {
  APPOINTMENT_STATUS,
  APPOINTMENT_TYPE,
  DEFAULT_START_PAGE_NUMBER,
  MANAGE_COMMUNICATION_URL,
  PATIENTS_URL,
} from 'containers/App/constants';
import { getPatient } from 'containers/App/contextActions';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { makeSelectAppointmentStatuses, makeSelectAppointmentTypes } from 'containers/App/lookupSelectors';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import { DialogContent, DialogTitle } from 'material-ui-next';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Cell, Grid } from 'styled-css-grid';
import { ASC, DESC } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Util from 'utils/Util';
import {
  acceptPractitionerAppointment,
  cancelPractitionerAppointment,
  declinePractitionerAppointment,
  getPractitionerAppointments,
  tentativePractitionerAppointment,
} from './actions';
import { MONTH, MONTH_DISPLAY, RESET, RESET_DISPLAY, TODAY, TODAY_DISPLAY, WEEK, WEEK_DISPLAY } from './constants';
import messages from './messages';
import NoPractitionerAppointmentsMessage from './NoPractitionerAppointmentsMessage';
import reducer from './reducer';
import saga from './saga';
import { makeSelectPractitionerAppointments, makeSelectShowPastAppointments } from './selectors';

export class PractitionerAppointments extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      panelHeight: 0,
      filterHeight: 0,
      confirmViewPatientDetailsModalOpen: false,
      patientId: '',
      patientPageURL: '',
      columnToSort: '',
      sortDirection: DESC,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
    this.acceptAppointment = this.acceptAppointment.bind(this);
    this.declineAppointment = this.declineAppointment.bind(this);
    this.tentativeAppointment = this.tentativeAppointment.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleFilterResize = this.handleFilterResize.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleCloseViewPatientDetailsDialog = this.handleCloseViewPatientDetailsDialog.bind(this);
    this.handleAppointmentRowClick = this.handleAppointmentRowClick.bind(this);
    this.navigateToPatientDetailsPage = this.navigateToPatientDetailsPage.bind(this);
  }

  componentDidMount() {
    this.props.getUpcomingAppointments({
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      showPastAppointments: false,
    });
    this.props.getLookupData();
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  handleFilterResize(size) {
    this.setState({ filterHeight: size.height });
  }

  handlePageClick(page) {
    this.props.getUpcomingAppointments({ pageNumber: page });
  }

  handleAppointmentRowClick(patientId) {
    const patientSpecificUrl = `${PATIENTS_URL}/${patientId}`;
    this.setState({ patientPageURL: patientSpecificUrl });
    this.setState({ patientId });
    this.setState({ confirmViewPatientDetailsModalOpen: true });
  }

  handleCloseViewPatientDetailsDialog() {
    this.setState({ confirmViewPatientDetailsModalOpen: false });
  }

  navigateToPatientDetailsPage() {
    this.props.getPatient(this.state.patientId);
    this.props.history.push(this.state.patientPageURL);
  }

  handleFilter(dateRange) {
    if (dateRange === RESET) {
      this.props.getUpcomingAppointments({
        pageNumber: DEFAULT_START_PAGE_NUMBER,
        showPastAppointments: false,
      });
    } else {
      this.props.getUpcomingAppointments({
        pageNumber: DEFAULT_START_PAGE_NUMBER,
        showPastAppointments: false,
        filterDateOption: dateRange,
      });
    }
  }

  handleCheck(event, checked) {
    const practitionerId = (this.props.user && this.props.user.fhirResource) ? this.props.user.fhirResource.logicalId : null;
    this.props.getUpcomingAppointments({
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      practitionerId,
      showPastAppointments: checked,
    });
  }

  cancelAppointment(logicalId) {
    this.props.cancelAppointment(logicalId);
  }

  acceptAppointment(logicalId) {
    this.props.acceptAppointment(logicalId, {
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      showPastAppointments: false,
    });
  }

  declineAppointment(logicalId) {
    this.props.declineAppointment(logicalId, {
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      showPastAppointments: false,
    });
  }

  tentativeAppointment(logicalId) {
    this.props.tentativeAppointment(logicalId, {
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      showPastAppointments: false,
    });
  }

  handleSort(columnName) {
    this.setState({ columnToSort: columnName });
    this.setState({ sortDirection: this.state.columnToSort === columnName ? Util.invertSortDirection(this.state.sortDirection) : ASC });
  }

  render() {
    const communicationBaseUrl = MANAGE_COMMUNICATION_URL;
    const filterDateOptions = [
      { value: TODAY, display: TODAY_DISPLAY },
      { value: WEEK, display: WEEK_DISPLAY },
      { value: MONTH, display: MONTH_DISPLAY },
      { value: RESET, display: RESET_DISPLAY },
    ];
    const filterField = {
      filterTypes: filterDateOptions,
      filterValueHintText: <FormattedMessage {...messages.filterLabel} />,
    };
    const { practitionerAppointments: { loading, data }, appointmentTypes, appointmentStatuses } = this.props;
    const showPastAppFilter = true;
    return (
      <div>
        <Card>
          <PanelToolbar
            showSearchIcon={false}
            showUploadIcon={false}
            showSettingIcon={false}
            showFilter={false}
            showAppointmentSpecificFilters
            filterField={filterField}
            onFilter={this.handleFilter}
            onSize={this.handlePanelResize}
          />
          {showPastAppFilter &&
          <SizedStickyDiv onSize={this.handleFilterResize} top={`${this.state.panelHeight}px`}>
            <FilterSection>
              <CheckboxFilterGrid>
                <Cell>
                  <StatusCheckbox
                    messages={messages.showPastAppointments}
                    elementId="showPastAppointmentsCheckBox"
                    checked={this.props.showPastAppointments}
                    handleCheck={this.handleCheck}
                  />
                </Cell>
              </CheckboxFilterGrid>
            </FilterSection>
          </SizedStickyDiv>
          }
          {loading &&
          <RefreshIndicatorLoading />}
          {!loading && isEmpty(data) &&
          <NoPractitionerAppointmentsMessage>{
            <FormattedMessage {...messages.noUpcomingAppointments} />}</NoPractitionerAppointmentsMessage>}
          {!isEmpty(data) && !isEmpty(data.elements) &&
          <InfoSection margin="0 0 10px 0">
            <CenterAlign>
              <AppointmentTable
                elements={orderBy(data.elements, this.state.columnToSort, this.state.sortDirection)}
                appointmentStatuses={appointmentStatuses}
                appointmentTypes={appointmentTypes}
                cancelAppointment={this.cancelAppointment}
                acceptAppointment={this.acceptAppointment}
                declineAppointment={this.declineAppointment}
                tentativeAppointment={this.tentativeAppointment}
                communicationBaseUrl={communicationBaseUrl}
                relativeTop={this.state.panelHeight + this.state.filterHeight}
                handleSort={this.handleSort}
                columnToSort={this.state.columnToSort}
                sortDirection={this.state.sortDirection}
                handleAppointmentRowClick={this.handleAppointmentRowClick}
              />
              <CenterAlignedUltimatePagination
                currentPage={data.currentPage}
                totalPages={data.totalNumberOfPages}
                onChange={this.handlePageClick}
              />
              <RecordsRange
                currentPage={data.currentPage}
                totalPages={data.totalNumberOfPages}
                totalElements={data.totalElements}
                currentPageSize={data.currentPageSize}
              />
            </CenterAlign>
          </InfoSection>
          }
        </Card>

        <div>
          <StyledDialog
            open={this.state.confirmViewPatientDetailsModalOpen}
            fullWidth
          >
            <DialogTitle>
              <FormattedMessage {...messages.dialogTitleOpenEvent} />
            </DialogTitle>
            <DialogContent>
              <Grid columns={1} alignContent="space-between">
                <Cell>
                  <FormattedMessage {...messages.confirmNavigation} />
                </Cell>
                <Cell>
                  <HorizontalAlignment position={'end'}>
                    <Grid columns={2} alignContent="space-between">
                      <StyledRaisedButton
                        onClick={this.navigateToPatientDetailsPage}
                      >
                        <FormattedMessage {...messages.dialogButtonLabelOK} />
                      </StyledRaisedButton>
                      <StyledRaisedButton
                        onClick={this.handleCloseViewPatientDetailsDialog}
                      >
                        <FormattedMessage {...messages.dialogButtonLabelCancel} />
                      </StyledRaisedButton>
                    </Grid>
                  </HorizontalAlignment>
                </Cell>
              </Grid>
            </DialogContent>
          </StyledDialog>
        </div>
      </div>
    );
  }
}

PractitionerAppointments.propTypes = {
  getUpcomingAppointments: PropTypes.func.isRequired,
  getLookupData: PropTypes.func.isRequired,
  appointmentTypes: PropTypes.array,
  appointmentStatuses: PropTypes.array,
  practitionerAppointments: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      elements: PropTypes.array,
    }),
  }),
  cancelAppointment: PropTypes.func.isRequired,
  acceptAppointment: PropTypes.func.isRequired,
  declineAppointment: PropTypes.func.isRequired,
  tentativeAppointment: PropTypes.func.isRequired,
  user: PropTypes.object,
  showPastAppointments: PropTypes.bool,
  getPatient: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  practitionerAppointments: makeSelectPractitionerAppointments(),
  appointmentTypes: makeSelectAppointmentTypes(),
  appointmentStatuses: makeSelectAppointmentStatuses(),
  user: makeSelectUser(),
  showPastAppointments: makeSelectShowPastAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUpcomingAppointments: (query, showPastAppointments, filterDateOption) => dispatch(getPractitionerAppointments(query, showPastAppointments, filterDateOption)),
    getLookupData: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE])),
    cancelAppointment: (id) => dispatch(cancelPractitionerAppointment(id)),
    acceptAppointment: (id, query) => dispatch(acceptPractitionerAppointment(id, query)),
    declineAppointment: (id, query) => dispatch(declinePractitionerAppointment(id, query)),
    tentativeAppointment: (id, query) => dispatch(tentativePractitionerAppointment(id, query)),
    getPatient: (logicalId) => dispatch(getPatient(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitionerAppointments', reducer });
const withSaga = injectSaga({ key: 'practitionerAppointments', saga });

const reduxCompose = compose(
  withReducer,
  withSaga,
  withConnect,
)(PractitionerAppointments);

export default withRouter(reduxCompose);
