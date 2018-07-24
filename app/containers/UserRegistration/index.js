/**
 *
 * UserRegistration
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { PanelToolbar } from 'components/PanelToolbar';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { combineAddress, mapToTelecoms } from 'containers/App/helpers';
import { flattenPractitionerData } from 'containers/Practitioners/helpers';
import { makeSelectUsCoreEthnicities, makeSelectUsCoreRaces } from 'containers/App/lookupSelectors';
import { USCOREETHNICITY, USCORERACE } from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import { flattenPatientData } from 'containers/Patients/helpers';
import PatientSearchResult from 'components/PatientSearchResult';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import RecordsRange from 'components/RecordsRange';
import InfoSection from 'components/InfoSection';
import PractitionerTable from 'components/PractitionerTable';
import makeSelectUserRegistration from './selectors';
import reducer from './reducer';
import saga from './saga';
import { searchResources } from './actions';
import { PRACTITIONER, PATIENT } from './constants';

export class UserRegistration extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isShowSearchResult: false,
      search: {
        resourceType: PRACTITIONER,
        searchType: 'name',
        searchValue: '',
        includeInactive: false,
        currentPage: 1,
      },
      relativeTop: 0,
      currentPage: 1,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.onSize = this.onSize.bind(this);
  }
  componentDidMount() {
    this.props.getLookUpData();
  }

  onSize(size) {
    this.setState({ relativeTop: size.height });
  }
  handleSearch(searchValue, includeInactive, searchType, resourceType) {
    this.setState({
      isShowSearchResult: true,
      search: { searchType, searchValue, includeInactive, resourceType },
    });
    this.props.searchResources(searchType, searchValue, resourceType, includeInactive, this.state.search.currentPage);
  }

  handleChangeSearchPage(currentPage) {
    this.props.searchResources(this.state.search.searchType, this.state.search.searchValue, this.state.search.resourceType, this.state.search.includeInactive, currentPage);
  }

  render() {
    const { resources, usCoreRaces, usCoreEthnicities } = this.props;
    const resourcesData = {
      loading: resources.loading,
      data: resources.data,
      currentPage: resources.currentPage,
      totalNumberOfPages: resources.totalNumberOfPages,
      currentPageSize: resources.currentPageSize,
      totalElements: resources.totalElements,
      handleChangePage: this.handleChangeSearchPage,
    };
    return (
      <div>
        <PanelToolbar
          onSearch={this.handleSearch}
          onSize={this.onSize}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon={false}
          showUserRegistrationRoleSelection
          showSearchBarByDefault
        />
        {this.state.search.resourceType === PRACTITIONER &&
        <InfoSection margin="0 0 10px 0">
          <PractitionerTable
            relativeTop={this.state.relativeTop}
            practitionersData={resourcesData}
            flattenPractitionerData={flattenPractitionerData}
            combineAddress={combineAddress}
            mapToTelecoms={mapToTelecoms}
            manageUserEnabled
          />
        </InfoSection>
        }
        {this.state.search.resourceType === PATIENT &&
        <InfoSection margin="0 0 10px 0">
          <PatientSearchResult
            loading={resourcesData.loading}
            usCoreRaces={usCoreRaces}
            usCoreEthnicities={usCoreEthnicities}
            error={false}
            searchResult={resourcesData.data}
            relativeTop={this.state.relativeTop}
            flattenPatientData={flattenPatientData}
            mapToTelecoms={mapToTelecoms}
            combineAddress={combineAddress}
            manageUserEnabled
          />
          {!!resourcesData.data && !!resourcesData.currentPage && !resourcesData.loading &&
          <div>
            <CenterAlignedUltimatePagination
              currentPage={resourcesData.currentPage}
              totalPages={resourcesData.totalNumberOfPages}
              onChange={resourcesData.handleChangePage}
            />
            <RecordsRange
              currentPage={resourcesData.currentPage}
              totalPages={resourcesData.totalNumberOfPages}
              totalElements={resourcesData.totalElements}
              currentPageSize={resourcesData.currentPageSize}
            />
          </div>
          }
        </InfoSection>
        }
      </div>
    );
  }
}

UserRegistration.propTypes = {
  searchResources: PropTypes.func.isRequired,
  resources: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    result: PropTypes.array,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }),
  usCoreRaces: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  usCoreEthnicities: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  getLookUpData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resources: makeSelectUserRegistration(),
  usCoreRaces: makeSelectUsCoreRaces(),
  usCoreEthnicities: makeSelectUsCoreEthnicities(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookUpData: () => dispatch(getLookupsAction([USCORERACE, USCOREETHNICITY])),
    searchResources: (searchType, searchValue, resourceType, includeInactive, currentPage, organization) => dispatch(searchResources(searchType, searchValue, resourceType, includeInactive, currentPage, organization)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userRegistration', reducer });
const withSaga = injectSaga({ key: 'userRegistration', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserRegistration);
