/**
 *
 * UpcomingAppointments
 *
 */

import CenterAlign from 'components/Align/CenterAlign';
import Card from 'components/Card/index';
import CardHeader from 'components/CardHeader';
import CareCoordinatorUpcomingAppointmentTable from 'components/CareCoordinatorUpcomingAppointmentTable/index';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination/index';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading/index';
import StyledFlatButton from 'components/StyledFlatButton';
import { getLookupsAction } from 'containers/App/actions';
import {
  APPOINTMENT_STATUS,
  APPOINTMENT_TYPE,
  DEFAULT_START_PAGE_NUMBER,
  MANAGE_APPOINTMENT_URL,
} from 'containers/App/constants';
import { makeSelectAppointmentStatuses, makeSelectAppointmentTypes } from 'containers/App/lookupSelectors';
import makeSelectSelectedPatient from 'containers/App/sharedDataSelectors';
import { cancelAppointment, getUpcomingAppointments } from 'containers/UpcomingAppointments/actions';
import { PRACTITIONERIDVALUE } from 'containers/UpcomingAppointments/constants';
import NoUpcomingAppointmentsMessage from 'containers/UpcomingAppointments/NoUpcomingAppointmentsMessage';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectUpcomingAppointments from './selectors';


export class UpcomingAppointments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
  }

  componentDidMount() {
    const patientId = this.props.selectedPatient.id;
    if (!isUndefined(patientId)) {
      this.props.getUpcomingAppointments({
        pageNumber: DEFAULT_START_PAGE_NUMBER,
        practitionerId: PRACTITIONERIDVALUE,
        patientId,
      });
    } else {
      this.props.getUpcomingAppointments({
        pageNumber: DEFAULT_START_PAGE_NUMBER,
        practitionerId: PRACTITIONERIDVALUE,
      });
    }
    this.props.getLookupData();
  }

  handlePageClick(page) {
    this.props.getUpcomingAppointments({ pageNumber: page });
  }

  cancelAppointment(logicalId) {
    this.props.cancelAppointment(logicalId);
  }

  render() {
    const currentPath = window.location.pathname;
    const patientDetailsPage = currentPath.indexOf('patients') >= 0;
    const { upcomingAppointments: { loading, data }, appointmentTypes, appointmentStatuses } = this.props;
    return (
      <div>
        <Card>
          <CardHeader title={<FormattedMessage {...messages.header} />}>
            {patientDetailsPage &&
            <StyledFlatButton
              label={<FormattedMessage {...messages.buttonLabelCreateNew} />}
              icon={<ContentAddCircle />}
              containerElement={<Link to={MANAGE_APPOINTMENT_URL} />}
            />
            }
          </CardHeader>
          {loading &&
          <RefreshIndicatorLoading />}
          {!loading && isEmpty(data) &&
          <NoUpcomingAppointmentsMessage>{
            <FormattedMessage {...messages.noUpcomingAppointments} />}</NoUpcomingAppointmentsMessage>}
          {!isEmpty(data) && !isEmpty(data.elements) &&
          <CenterAlign>
            <CareCoordinatorUpcomingAppointmentTable elements={data.elements} appointmentStatuses={appointmentStatuses} appointmentTypes={appointmentTypes} cancelAppointment={this.cancelAppointment} />
            <CenterAlignedUltimatePagination
              currentPage={data.currentPage}
              totalPages={data.totalNumberOfPages}
              onChange={this.handlePageClick}
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
  }).isRequired,
  cancelAppointment: PropTypes.func,
  selectedPatient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  upcomingAppointments: makeSelectUpcomingAppointments(),
  appointmentTypes: makeSelectAppointmentTypes(),
  appointmentStatuses: makeSelectAppointmentStatuses(),
  selectedPatient: makeSelectSelectedPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUpcomingAppointments: (query) => dispatch(getUpcomingAppointments(query)),
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
