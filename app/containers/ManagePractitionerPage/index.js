/**
 *
 * ManagePractitionerPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Divider from 'material-ui/Divider';
import merge from 'lodash/merge';
import isUndefined from 'lodash/isUndefined';
import PropTypes from 'prop-types';
import {
  makeSelectPractitionerIdentifierSystems,
  makeSelectTelecomSystems,
  makeSelectUspsStates, makeSelectProviderRoles, makeSelectProviderSpecialties,
} from 'containers/App/lookupSelectors';
import { PRACTITIONERIDENTIFIERSYSTEM, PROVIDER_ROLE, PROVIDER_SPECIALTY, TELECOMSYSTEM, USPSSTATES } from 'containers/App/constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getPractitioner, initializeManagePractitioner, savePractitioner, getOrganizations, initializeOrganizations } from 'containers/ManagePractitionerPage/actions';
import reducer from './reducer';
import saga from './saga';
import ManagePractitioner from '../../components/ManagePractitioner';
import messages from './messages';
import styles from './styles.css';

import { getLookupsAction } from '../App/actions';
import { makeSelectPractitioner, makeSelectCurrentPage, makeSelectOrganizations,
  makeSelectTotalNumberOfPages } from './selectors';
export class ManagePractitionerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static SEARCH_BAR_TEXT_LENGTH = 3;

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.initialSearchOrganizationResult = this.initialSearchOrganizationResult.bind(this);
    this.state = {
      currentPage: 1,
      searchValue: '',
      showInactive: false,
      searchType: 'name',
    };
  }

  componentWillMount() {
    this.props.getLookUpFormData();
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      this.props.getPractitioner(logicalId);
    }
  }

  componentWillUnmount() {
    this.props.initializeManagePractitioner();
  }

  handleSearch(searchValue, showInactive, searchType) {
    this.setState({ searchValue, showInactive, searchType });
    this.props.getOrganizations(searchValue, showInactive, searchType, this.state.currentPage);
  }

  initialSearchOrganizationResult() {
    this.props.initializeOrganizations();
  }

  handlePageClick(currentPage) {
    this.setState({ currentPage });
    this.props.getOrganizations(this.state.searchValue, this.state.showInactive, this.state.searchType, currentPage);
  }

  handleSave(practitionerFormData, actions) {
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      merge(practitionerFormData, { logicalId });
    }
    this.props.onSaveForm(practitionerFormData, () => actions.setSubmitting(false));
  }

  render() {
    const { match, uspsStates, identifierSystems, telecomSystems, providerRoles, providerSpecialties, selectedPractitioner,
      organizations,
      currentPage,
      totalNumberOfPages } = this.props;
    const editMode = !isUndefined(match.params.id);
    let practitioner = null;
    if (editMode && selectedPractitioner) {
      practitioner = selectedPractitioner;
    }
    const formProps = {
      uspsStates,
      identifierSystems,
      telecomSystems,
      providerRoles,
      providerSpecialties,
      editMode,
      practitioner,
      organizations,
      currentPage,
      totalNumberOfPages,
    };
    return (
      <div className={styles.wrapper}>
        <Helmet>
          <title>Manage Practitioner</title>
          <meta name="description" content="Manage practitioner page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.header}>
          {editMode ? <FormattedMessage {...messages.updateHeader} />
            : <FormattedMessage {...messages.createHeader} />}
        </div>
        <Divider />
        <ManagePractitioner {...formProps} onSave={this.handleSave} onPageClick={this.handlePageClick} onSearch={this.handleSearch} initialSearchOrganizationResult={this.initialSearchOrganizationResult} />
      </div>
    );
  }
}

ManagePractitionerPage.propTypes = {
  match: PropTypes.object,
  getLookUpFormData: PropTypes.func.isRequired,
  getPractitioner: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  identifierSystems: PropTypes.array,
  telecomSystems: PropTypes.array,
  providerRoles: PropTypes.array,
  providerSpecialties: PropTypes.array,
  selectedPractitioner: PropTypes.object,
  onSaveForm: PropTypes.func,
  initializeManagePractitioner: PropTypes.func,
  getOrganizations: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
  initializeOrganizations: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  identifierSystems: makeSelectPractitionerIdentifierSystems(),
  telecomSystems: makeSelectTelecomSystems(),
  providerRoles: makeSelectProviderRoles(),
  providerSpecialties: makeSelectProviderSpecialties(),
  selectedPractitioner: makeSelectPractitioner(),
  organizations: makeSelectOrganizations(),
  currentPage: makeSelectCurrentPage(),
  totalNumberOfPages: makeSelectTotalNumberOfPages(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeManagePractitioner: () => dispatch(initializeManagePractitioner()),
    initializeOrganizations: () => dispatch(initializeOrganizations()),
    getLookUpFormData: () => dispatch(getLookupsAction([USPSSTATES, PRACTITIONERIDENTIFIERSYSTEM, TELECOMSYSTEM, PROVIDER_ROLE, PROVIDER_SPECIALTY])),
    onSaveForm: (practitionerFormData, handleSubmitting) => dispatch(savePractitioner(practitionerFormData, handleSubmitting)),
    getPractitioner: (logicalId) => dispatch(getPractitioner(logicalId)),
    getOrganizations: (searchValue, showInactive, searchType, currentPage) => dispatch(getOrganizations(searchValue, showInactive, searchType, currentPage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'managePractitionerPage', reducer });
const withSaga = injectSaga({ key: 'managePractitionerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagePractitionerPage);
