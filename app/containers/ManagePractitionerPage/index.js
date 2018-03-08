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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ManagePractitioner from 'components/ManagePractitioner';
import {
  makeSelectPractitionerIdentifierSystems,
  makeSelectPractitionerRoles,
  makeSelectTelecomSystems,
  makeSelectUspsStates,
} from 'containers/App/lookupSelectors';
import { PRACTITIONERIDENTIFIERSYSTEM, PRACTITIONERROLES, TELECOMSYSTEM, USPSSTATES } from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import {
  getOrganizations,
  getPractitioner,
  initializeManagePractitioner,
  initializeOrganizations,
  savePractitioner,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import {
  makeSelectCurrentPage,
  makeSelectOrganizations,
  makeSelectPractitioner,
  makeSelectTotalNumberOfPages,
} from './selectors';

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
    const {
      match, uspsStates, identifierSystems, telecomSystems, practitionerRoleCodes, selectedPractitioner,
      organizations,
      currentPage,
      totalNumberOfPages,
    } = this.props;
    const editMode = !isUndefined(match.params.id);
    let practitioner = null;
    if (editMode && selectedPractitioner) {
      practitioner = selectedPractitioner;
    }
    const formProps = {
      uspsStates,
      identifierSystems,
      telecomSystems,
      practitionerRoleCodes,
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
        <ManagePractitioner
          {...formProps}
          onSave={this.handleSave}
          onPageClick={this.handlePageClick}
          onSearch={this.handleSearch}
          initialSearchOrganizationResult={this.initialSearchOrganizationResult}
        />
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
  practitionerRoleCodes: PropTypes.array,
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
  practitionerRoleCodes: makeSelectPractitionerRoles(),
  selectedPractitioner: makeSelectPractitioner(),
  organizations: makeSelectOrganizations(),
  currentPage: makeSelectCurrentPage(),
  totalNumberOfPages: makeSelectTotalNumberOfPages(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeManagePractitioner: () => dispatch(initializeManagePractitioner()),
    initializeOrganizations: () => dispatch(initializeOrganizations()),
    getLookUpFormData: () => dispatch(getLookupsAction([USPSSTATES, PRACTITIONERIDENTIFIERSYSTEM, TELECOMSYSTEM, PRACTITIONERROLES])),
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
