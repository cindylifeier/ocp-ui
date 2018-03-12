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
import uniqueId from 'lodash/uniqueId';
import { Cell } from 'styled-css-grid';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import HealthcareServiceTable from 'components/HealthcareServiceTable';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import StatusCheckbox from 'components/StatusCheckbox';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import FilterSection from 'components/FilterSection';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
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

export class HealthcareServices extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
    this.LOCATION_NAME_HTML_ID = uniqueId('location_name_');
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
        <CardHeader title={<FormattedMessage {...messages.header} />} />
        {isEmpty(organization) &&
        <h4><FormattedMessage {...messages.organizationNotSelected} /></h4>}

        {!isEmpty(organization) &&
        <InfoSection>
          <InlineLabel htmlFor={this.ORGANIZATION_NAME_HTML_ID}>
            <FormattedMessage {...messages.labelOrganization} />&nbsp;
          </InlineLabel>
          <span id={this.ORGANIZATION_NAME_HTML_ID}>{organization.name}</span>
        </InfoSection>}
        {!isEmpty(location) &&
        <InfoSection>
          <InlineLabel htmlFor={this.LOCATION_NAME_HTML_ID}>
            <FormattedMessage {...messages.labelLocation} />&nbsp;
          </InlineLabel>
          <span id={this.LOCATION_NAME_HTML_ID}>{location.name}</span>
        </InfoSection>}
        {!isEmpty(organization) && isEmpty(location) &&
        <div>
          <FilterSection>
            <CheckboxFilterGrid>
              <Cell>
                <FormattedMessage {...messages.filterLabel} />
              </Cell>
              <Cell>
                <StatusCheckbox
                  messages={messages.inactive}
                  elementId="inactiveCheckBox"
                  checked={this.props.includeInactive}
                  handleCheck={this.handleCheck}
                />
              </Cell>
            </CheckboxFilterGrid>
          </FilterSection>
        </div>
        }

        {loading &&
        <RefreshIndicatorLoading />}

        {!loading && !isEmpty(organization) && isEmpty(healthcareServices) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noHealthcareServicesFound} />
        </NoResultsFoundText>
        }

        {!isEmpty(organization) && !isEmpty(healthcareServices) && healthcareServices.length > 0 &&
        <div>
          <CenterAlign>
            <HealthcareServiceTable elements={healthcareServices} />
          </CenterAlign>
          <CenterAlignedUltimatePagination
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
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
