/**
 *
 * Patients
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEqual from 'lodash/isEqual';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import RecordsRange from 'components/RecordsRange';
import PatientSearchResult from 'components/PatientSearchResult';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import ConfirmPatientModal from 'components/ConfirmPatientModal';
import PanelToolbar from 'components/PanelToolbar';
import {
  CARE_MANAGER_ROLE_CODE,
  OCP_ADMIN_ROLE_CODE,
  MANAGE_PATIENT_URL,
  ORGANIZATION_ADMIN_ROLE_CODE,
  USCOREETHNICITY,
  USCORERACE,
} from 'containers/App/constants';
import { setPatient } from 'containers/App/contextActions';
import { combineAddress, isAdminWorkspace, mapToTelecoms, getPractitionerIdByRole } from 'containers/App/helpers';
import { makeSelectOrganization, makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectUsCoreEthnicities, makeSelectUsCoreRaces } from 'containers/App/lookupSelectors';
import { makeSelectLocation } from 'containers/App/selectors';
import {
  makeSelectCurrentPage,
  makeSelectCurrentPageSize,
  makeSelectPatientSearchResult,
  makeSelectPatientTotalElements,
  makeSelectQueryIncludeInactive,
  makeSelectQuerySearchTerms,
  makeSelectQuerySearchType,
  makeSelectSearchError,
  makeSelectSearchLoading,
  makeSelectTotalPages,
} from './selectors';
import { initializePatients, loadPatientSearchResult, fitlerPatient } from './actions';
import reducer from './reducer';
import saga from './saga';
import { flattenPatientData } from './helpers';
import messages from './messages';
import
{ MY_CARE_TEAM_PATIENTS,
  MY_CARE_TEAM_PATIENTS_DISPLAY,
  ALL_ORG_PATIENTS,
  ALL_ORG_PATIENTS_DISPLAY,
  UNASSIGNED_PATIENTS,
  UNASSIGNED_PATIENTS_DISPLAY,
} from './constants';

export class Patients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relativeTop: 0,
      currentPage: 1,
      patient: null,
      isPatientModalOpen: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handlePatientClick = this.handlePatientClick.bind(this);
    this.handlePatientViewDetailsClick = this.handlePatientViewDetailsClick.bind(this);
    this.handlePatientModalClose = this.handlePatientModalClose.bind(this);
    this.onSize = this.onSize.bind(this);
  }

  componentDidMount() {
    const { patient, organization } = this.props;
    const initSearchTerms = '';
    const includeInactive = false;
    const searchType = 'name';
    if (organization) {
      this.handleSearch(initSearchTerms, includeInactive, searchType);
    }
    if (patient) {
      this.props.initializePatients([patient]);
    } else {
      this.props.initializePatients();
    }
    this.props.getLookUpData();
  }

  componentWillReceiveProps(nextProps) {
    const { patient, organization } = this.props;
    const { patient: newPatient, organization: newOrganization } = nextProps;
    if (!isEqual(patient, newPatient) && !this.props.currentPage) {
      this.props.initializePatients([newPatient]);
    }

    if (!isEqual(organization, newOrganization)) {
      this.props.onSearchPatient('', '', false, newOrganization.logicalId);
    }
  }

  onSize(size) {
    this.setState({ relativeTop: size.height });
  }

  handlePatientClick(patient) {
    const { onPatientClick } = this.props;
    if (onPatientClick) {
      onPatientClick(patient);
    } else {
      this.props.setPatient(patient);
    }
    this.setState({
      patient,
      isPatientModalOpen: true,
    });
  }

  handlePatientViewDetailsClick(patient) {
    this.setState({
      patient,
      isPatientModalOpen: true,
    });
  }

  handlePatientModalClose() {
    this.setState({ isPatientModalOpen: false });
  }

  handleSearch(searchTerms, includeInactive, searchType) {
    const { organization, location: { pathname } } = this.props;
    const organizationId = isAdminWorkspace(pathname) ? null : organization.logicalId;

    if (organization) {
      this.props.onSearchPatient(searchTerms, searchType, includeInactive, organizationId, this.state.currentPage);
    } else {
      this.props.onSearchPatient(searchTerms, searchType, includeInactive, organizationId, this.state.currentPage);
    }
  }

  handleFilter(filterBy) {
    const { organization, user, location: { pathname } } = this.props;
    const practitionerId = getPractitionerIdByRole(user);
    const organizationId = isAdminWorkspace(pathname) ? null : organization.logicalId;
    if (organizationId && practitionerId) {
      this.props.onFitlerPatient(filterBy, organizationId, practitionerId, this.state.currentPage, this.props.includeInactive);
    }
  }

  handleChangePage(newPage) {
    this.setState({ currentPage: newPage });
    const { organization } = this.props;
    if (organization) {
      this.props.onChangePage(this.props.searchTerms, this.props.searchType, this.props.includeInactive, newPage, organization.logicalId);
    } else {
      this.props.onChangePage(this.props.searchTerms, this.props.searchType, this.props.includeInactive, newPage);
    }
  }

  render() {
    const { loading, error, searchResult, organization, usCoreRaces, usCoreEthnicities, showSearchBarByDefault, hideToolbar, user } = this.props;
    const searchResultProps = {
      loading,
      error,
      searchResult,
      organization,
      usCoreRaces,
      usCoreEthnicities,
    };
    const addNewItem = {
      addNewItem: {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        linkUrl: MANAGE_PATIENT_URL,
      },
    };
    const filterDateOptions = [
      { value: ALL_ORG_PATIENTS, display: ALL_ORG_PATIENTS_DISPLAY },
      { value: MY_CARE_TEAM_PATIENTS, display: MY_CARE_TEAM_PATIENTS_DISPLAY },
      { value: UNASSIGNED_PATIENTS, display: UNASSIGNED_PATIENTS_DISPLAY },
    ];
    const filterField = {
      filterTypes: filterDateOptions,
      filterValueHintText: <FormattedMessage {...messages.filterLabel} />,
    };
    return (
      <div>
        <PanelToolbar
          {...addNewItem}
          allowedAddNewItemRoles={[ORGANIZATION_ADMIN_ROLE_CODE, CARE_MANAGER_ROLE_CODE]}
          onSearch={this.handleSearch}
          onSize={this.onSize}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon={user.role !== OCP_ADMIN_ROLE_CODE}
          showPatientSpecificFilters
          filterField={filterField}
          onFilter={this.handleFilter}
          showSearchBarByDefault={showSearchBarByDefault}
          hideToolbar={hideToolbar}
        />
        <PatientSearchResult
          {...searchResultProps}
          relativeTop={this.state.relativeTop}
          onPatientClick={this.handlePatientClick}
          onPatientViewDetailsClick={this.handlePatientViewDetailsClick}
          flattenPatientData={flattenPatientData}
          mapToTelecoms={mapToTelecoms}
          combineAddress={combineAddress}
          showActionButton={user.role !== OCP_ADMIN_ROLE_CODE}
        />
        {!!this.props.searchResult && !!this.props.currentPage &&
        <div>
          <CenterAlignedUltimatePagination
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            onChange={this.handleChangePage}
          />
          <RecordsRange
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            totalElements={this.props.totalElements}
            currentPageSize={this.props.searchResult.length}
          />
        </div>
        }
        {this.state.patient &&
        <ConfirmPatientModal
          patient={this.state.patient}
          isPatientModalOpen={this.state.isPatientModalOpen}
          onPatientModalClose={this.handlePatientModalClose}
        />}
      </div>
    );
  }
}

Patients.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  searchResult: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  usCoreRaces: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  usCoreEthnicities: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  onSearchPatient: PropTypes.func.isRequired,
  onFitlerPatient: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalElements: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  searchTerms: PropTypes.string,
  searchType: PropTypes.string,
  includeInactive: PropTypes.bool,
  initializePatients: PropTypes.func.isRequired,
  setPatient: PropTypes.func.isRequired,
  getLookUpData: PropTypes.func.isRequired,
  patient: PropTypes.object,
  organization: PropTypes.object,
  onPatientClick: PropTypes.func,
  showSearchBarByDefault: PropTypes.bool,
  hideToolbar: PropTypes.bool,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

Patients.defaultProps = {
  showSearchBarByDefault: false,
  hideToolbar: false,
};

const mapStateToProps = createStructuredSelector({
  searchResult: makeSelectPatientSearchResult(),
  totalElements: makeSelectPatientTotalElements(),
  loading: makeSelectSearchLoading(),
  error: makeSelectSearchError(),
  currentPage: makeSelectCurrentPage(),
  currentPageSize: makeSelectCurrentPageSize(),
  totalPages: makeSelectTotalPages(),
  searchTerms: makeSelectQuerySearchTerms(),
  searchType: makeSelectQuerySearchType(),
  includeInactive: makeSelectQueryIncludeInactive(),
  patient: makeSelectPatient(),
  organization: makeSelectOrganization(),
  usCoreRaces: makeSelectUsCoreRaces(),
  usCoreEthnicities: makeSelectUsCoreEthnicities(),
  location: makeSelectLocation(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSearchPatient: (searchTerms, searchType, includeInactive, organization) => {
      const currentPage = 1;
      dispatch(loadPatientSearchResult(searchTerms, searchType, includeInactive, currentPage, organization));
    },
    onChangePage: (searchTerms, searchType, includeInactive, currentPage, organization) => dispatch(loadPatientSearchResult(searchTerms, searchType, includeInactive, currentPage, organization)),
    initializePatients: (patients) => dispatch(initializePatients(patients)),
    getLookUpData: () => dispatch(getLookupsAction([USCORERACE, USCOREETHNICITY])),
    setPatient: (patient) => dispatch(setPatient(patient)),
    onFitlerPatient: (filterBy, organizationId, practitionerId, currentPage, includeInactive) => dispatch(fitlerPatient(filterBy, organizationId, practitionerId, currentPage, includeInactive)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'patients', reducer });
const withSaga = injectSaga({ key: 'patients', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Patients);
