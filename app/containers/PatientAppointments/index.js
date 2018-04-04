/**
 *
 * PatientAppointments
 *
 */

import CenterAlign from 'components/Align/CenterAlign';
import AppointmentTable from 'components/AppointmentTable';
import Card from 'components/Card';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import FilterSection from 'components/FilterSection';
import { PanelToolbar } from 'components/PanelToolbar';
import RecordsRange from 'components/RecordsRange';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import StatusCheckbox from 'components/StatusCheckbox';
import SizedStickyDiv from 'components/StickyDiv/SizedStickyDiv';
import { getLookupsAction } from 'containers/App/actions';
import {
  APPOINTMENT_STATUS,
  APPOINTMENT_TYPE,
  CARE_COORDINATOR_ROLE_CODE,
  DEFAULT_START_PAGE_NUMBER,
  MANAGE_APPOINTMENT_URL,
  MANAGE_COMMUNICATION_URL,
} from 'containers/App/constants';
import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { makeSelectAppointmentStatuses, makeSelectAppointmentTypes } from 'containers/App/lookupSelectors';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Cell } from 'styled-css-grid';
import injectReducer from 'utils/injectReducer';

import injectSaga from 'utils/injectSaga';
import { cancelPatientAppointment, getPatientAppointments } from './actions';
import { STATUS_CODE_CANCELLED } from './constants';
import messages from './messages';
import NoPatientAppointmentsMessage from './NoPatientAppointmentsMessage';
import reducer from './reducer';
import saga from './saga';
import { makeSelectPatientAppointments, makeSelectShowPastAppointments } from './selectors';

export class PatientAppointments extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      panelHeight: 0,
      filterHeight: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleFilterResize = this.handleFilterResize.bind(this);
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

  handleCheck(event, checked) {
    const patientId = this.props.patient ? this.props.patient.id : null;
    const practitionerId = (this.props.user && this.props.user.resource) ? this.props.user.resource.logicalId : null;
    if (!isUndefined(patientId) && patientId != null) {
      this.props.getUpcomingAppointments({
        pageNumber: DEFAULT_START_PAGE_NUMBER,
        practitionerId,
        showPastAppointments: checked,
        patientId,
      });
    } else {
      this.props.getUpcomingAppointments({
        pageNumber: DEFAULT_START_PAGE_NUMBER,
        practitionerId,
        showPastAppointments: checked,
      });
    }
  }

  cancelAppointment(logicalId) {
    this.props.cancelAppointment(logicalId);
  }

  render() {
    const communicationBaseUrl = MANAGE_COMMUNICATION_URL;
    const cancelledStatus = STATUS_CODE_CANCELLED;
    const manageAppointmentUrl = MANAGE_APPOINTMENT_URL;
    const { patientAppointments: { loading, data }, appointmentTypes, appointmentStatuses } = this.props;
    const patientId = this.props.patient ? this.props.patient.id : null;
    const showPastAppFilter = true;
    const role = (this.props.user && this.props.user.resource) ? this.props.user.role : '';
    const addNewItem = (patientId && role === CARE_COORDINATOR_ROLE_CODE) ? {
      addNewItem: {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        linkUrl: MANAGE_APPOINTMENT_URL,
      },
    } : undefined;
    const enableEditAppointment = !!(patientId && role === CARE_COORDINATOR_ROLE_CODE);
    return (
      <div>
        <Card>
          <PanelToolbar {...addNewItem} showSearchIcon={false} onSize={this.handlePanelResize} />
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
          <NoPatientAppointmentsMessage>{
            <FormattedMessage {...messages.noUpcomingAppointments} />}</NoPatientAppointmentsMessage>}
          {!isEmpty(data) && !isEmpty(data.elements) &&
          <CenterAlign>
            <AppointmentTable
              elements={data.elements}
              appointmentStatuses={appointmentStatuses}
              appointmentTypes={appointmentTypes}
              cancelAppointment={this.cancelAppointment}
              patientId={patientId}
              communicationBaseUrl={communicationBaseUrl}
              relativeTop={this.state.panelHeight + this.state.filterHeight}
              cancelledStatus={cancelledStatus}
              enableEditAppointment={enableEditAppointment}
              manageAppointmentUrl={manageAppointmentUrl}
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
          }
        </Card>
      </div>
    );
  }
}

PatientAppointments.propTypes = {
  getUpcomingAppointments: PropTypes.func.isRequired,
  getLookupData: PropTypes.func.isRequired,
  appointmentTypes: PropTypes.array,
  appointmentStatuses: PropTypes.array,
  patientAppointments: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      elements: PropTypes.array,
    }),
  }),
  cancelAppointment: PropTypes.func,
  patient: PropTypes.object,
  user: PropTypes.object,
  showPastAppointments: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  patientAppointments: makeSelectPatientAppointments(),
  appointmentTypes: makeSelectAppointmentTypes(),
  appointmentStatuses: makeSelectAppointmentStatuses(),
  user: makeSelectUser(),
  showPastAppointments: makeSelectShowPastAppointments(),
  patient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUpcomingAppointments: (query, showPastAppointments) => dispatch(getPatientAppointments(query, showPastAppointments)),
    getLookupData: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE])),
    cancelAppointment: (id) => dispatch(cancelPatientAppointment(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'patientAppointments', reducer });
const withSaga = injectSaga({ key: 'patientAppointments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PatientAppointments);
