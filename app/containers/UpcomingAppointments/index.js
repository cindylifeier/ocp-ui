/**
 *
 * UpcomingAppointments
 *
 */

import CenterAlign from 'components/Align/CenterAlign';
import Card from 'components/Card/index';
import CareCoordinatorUpcomingAppointmentTable from 'components/CareCoordinatorUpcomingAppointmentTable/index';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination/index';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import FilterSection from 'components/FilterSection';
import PanelToolbar from 'components/PanelToolbar';
import RecordsRange from 'components/RecordsRange';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading/index';
import StatusCheckbox from 'components/StatusCheckbox';
import { getLookupsAction } from 'containers/App/actions';
import {
  APPOINTMENT_STATUS,
  APPOINTMENT_TYPE,
  CARE_COORDINATOR_ROLE_VALUE,
  DEFAULT_START_PAGE_NUMBER,
  MANAGE_APPOINTMENT_URL,
  MANAGE_COMMUNICATION_URL,
} from 'containers/App/constants';
import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { makeSelectAppointmentStatuses, makeSelectAppointmentTypes } from 'containers/App/lookupSelectors';
import { cancelAppointment, getUpcomingAppointments } from 'containers/UpcomingAppointments/actions';
import NoUpcomingAppointmentsMessage from 'containers/UpcomingAppointments/NoUpcomingAppointmentsMessage';
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
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { makeSelectShowPastAppointments, makeSelectUpcomingAppointments } from './selectors';

export class UpcomingAppointments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
  }

  componentDidMount() {
    this.props.getUpcomingAppointments({
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      showPastAppointments: false,
    });
    this.props.getLookupData();
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
    const { upcomingAppointments: { loading, data }, appointmentTypes, appointmentStatuses } = this.props;
    const patientId = this.props.patient ? this.props.patient.id : null;
    const showPastAppFilter = true;
    const role = (this.props.user && this.props.user.resource) ? this.props.user.role : '';
    const addNewItem = (patientId && role === CARE_COORDINATOR_ROLE_VALUE) ? {
      addNewItem: {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        linkUrl: MANAGE_APPOINTMENT_URL,
      },
    } : undefined;
    return (
      <div>
        <Card>
          <PanelToolbar {...addNewItem} showSearchIcon={false} />
          {showPastAppFilter &&
          <div>
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
          </div>
          }
          {loading &&
          <RefreshIndicatorLoading />}
          {!loading && isEmpty(data) &&
          <NoUpcomingAppointmentsMessage>{
            <FormattedMessage {...messages.noUpcomingAppointments} />}</NoUpcomingAppointmentsMessage>}
          {!isEmpty(data) && !isEmpty(data.elements) &&
          <CenterAlign>
            <CareCoordinatorUpcomingAppointmentTable
              elements={data.elements}
              appointmentStatuses={appointmentStatuses}
              appointmentTypes={appointmentTypes}
              cancelAppointment={this.cancelAppointment}
              patientId={patientId}
              communicationBaseUrl={communicationBaseUrl}
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

UpcomingAppointments.propTypes = {
  getUpcomingAppointments: PropTypes.func.isRequired,
  getLookupData: PropTypes.func.isRequired,
  appointmentTypes: PropTypes.array,
  appointmentStatuses: PropTypes.array,
  upcomingAppointments: PropTypes.shape({
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
  upcomingAppointments: makeSelectUpcomingAppointments(),
  appointmentTypes: makeSelectAppointmentTypes(),
  appointmentStatuses: makeSelectAppointmentStatuses(),
  patient: makeSelectPatient(),
  user: makeSelectUser(),
  showPastAppointments: makeSelectShowPastAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUpcomingAppointments: (query, showPastAppointments) => dispatch(getUpcomingAppointments(query, showPastAppointments)),
    getLookupData: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE])),
    cancelAppointment: (id) => dispatch(cancelAppointment(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'upcomingAppointments', reducer });
const withSaga = injectSaga({ key: 'upcomingAppointments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UpcomingAppointments);
