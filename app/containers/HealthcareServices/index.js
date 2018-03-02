/**
 *
 * HealthcareServices
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import UltimatePagination from 'react-ultimate-pagination-material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Card from 'components/Card';
import HealthcareServiceTable from 'components/HealthcareServiceTable';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import StatusCheckbox from 'components/StatusCheckbox';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import FilterSection from 'components/FilterSection';
import { DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import {
  getHealthcareServicesByLocation,
  getHealthcareServicesByOrganization,
  initializeHealthcareServices,
} from './actions';
import {
  makeSelectCurrentPage,
  makeSelectHealthcareServices,
  makeSelectIncludeInactive,
  makeSelectLocation,
  makeSelectOrganization,
  makeSelectQueryError,
  makeSelectQueryLoading,
  makeSelectTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';

export class HealthcareServices extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentWillMount() {
    this.props.initializeHealthcareServices();
  }

  handlePageClick(currentPage) {
    const { organization: { id: orgId, name: orgName }, location } = this.props;
    if (!isEmpty(location)) {
      const { id: locId, name: locName } = location;
      this.props.getHealthcareServicesByLocation(orgId, orgName, locId, locName, currentPage, this.props.includeInactive);
    } else {
      this.props.getHealthcareServicesByOrganization(orgId, orgName, currentPage, this.props.includeInactive);
    }
  }

  handleCheck(event, checked) {
    const { organization: { id: orgId, name: orgName }, location } = this.props;
    if (!isEmpty(location)) {
      const { id: locId, name: locName } = location;
      this.props.getHealthcareServicesByLocation(orgId, orgName, locId, locName, DEFAULT_START_PAGE_NUMBER, checked);
    } else {
      this.props.getHealthcareServicesByOrganization(orgId, orgName, DEFAULT_START_PAGE_NUMBER, checked);
    }
  }

  render() {
    const { loading, healthcareServices, organization, location } = this.props;
    return (
      <Card>
        {isEmpty(organization) &&
        <h4><FormattedMessage {...messages.organizationNotSelected} /></h4>}

        {!isEmpty(organization) &&
        <InfoSection>
          <InlineLabel>
            Organization&nbsp;:&nbsp;
          </InlineLabel>
          {organization.name}
        </InfoSection>}
        {!isEmpty(location) &&
        <InfoSection>
          <InlineLabel>
            Location&nbsp;:&nbsp;
          </InlineLabel>
          {location.name}
        </InfoSection>}
        {!isEmpty(organization) &&
        <div>
          <FilterSection>
            <div className={styles.filterGridContainer}>
              <div>
                <FormattedMessage {...messages.filterLabel} />
              </div>
              <StatusCheckbox
                messages={messages.inactive}
                elementId="inactiveCheckBox"
                checked={this.props.includeInactive}
                handleCheck={this.handleCheck}
              >
              </StatusCheckbox>
            </div>
          </FilterSection>
        </div>
        }

        {loading &&
        <RefreshIndicatorLoading />}

        {!loading && !isEmpty(organization) && isEmpty(healthcareServices) &&
        <div className={styles.noHealthcareServicesFound}>
          <FormattedMessage {...messages.noHealthcareServicesFound} />
        </div>
        }

        {!isEmpty(organization) && !isEmpty(healthcareServices) && healthcareServices.length > 0 &&
        <div className={styles.textCenter}>
          <HealthcareServiceTable elements={healthcareServices} />
          <UltimatePagination
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            boundaryPagesRange={1}
            siblingPagesRange={1}
            hidePreviousAndNextPageLinks={false}
            hideFirstAndLastPageLinks={false}
            hideEllipsis={false}
            onChange={this.handlePageClick}
          />
        </div>
        }
      </Card>
    );
  }
}

HealthcareServices.propTypes = {
  loading: PropTypes.bool,
  includeInactive: PropTypes.bool,
  healthcareServices: PropTypes.array,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  initializeHealthcareServices: PropTypes.func,
  getHealthcareServicesByOrganization: PropTypes.func.isRequired,
  getHealthcareServicesByLocation: PropTypes.func.isRequired,
  organization: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
  location: makeSelectLocation(),
  loading: makeSelectQueryLoading(),
  error: makeSelectQueryError(),
  currentPage: makeSelectCurrentPage(),
  totalPages: makeSelectTotalNumberOfPages(),
  includeInactive: makeSelectIncludeInactive(),
  healthcareServices: makeSelectHealthcareServices(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeHealthcareServices: () => dispatch(initializeHealthcareServices()),
    getHealthcareServicesByOrganization: (organizationId, organizationName, currentPage, includeInactive) =>
      dispatch(getHealthcareServicesByOrganization(organizationId, organizationName, currentPage, includeInactive)),
    getHealthcareServicesByLocation: (organizationId, organizationName, locationId, locationName, currentPage, includeInactive) =>
      dispatch(getHealthcareServicesByLocation(organizationId, organizationName, locationId, locationName, currentPage, includeInactive)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'healthcareServices', reducer });
const withSaga = injectSaga({ key: 'healthcareServices', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HealthcareServices);
