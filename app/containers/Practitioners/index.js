/**
 *
 * Practitioners
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
import {
  DEFAULT_START_PAGE_NUMBER,
  MANAGE_PRACTITIONER_URL,
  OCP_ADMIN_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
} from 'containers/App/constants';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import InfoSection from 'components/InfoSection';
import PanelToolbar from 'components/PanelToolbar';
import PractitionerTable from 'components/PractitionerTable';
import { SUMMARY_PANEL_WIDTH } from 'containers/Practitioners/constants';
import { getPractitionersInOrganization, initializePractitioners, searchPractitioners } from './actions';
import { flattenPractitionerData } from './helpers';
import reducer from './reducer';
import saga from './saga';
import makeSelectPractitioners from './selectors';
import messages from './messages';

export class Practitioners extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      relativeTop: 0,
      isShowSearchResult: false,
      listPractitioners: {
        currentPage: 1,
      },
      searchPractitioners: {
        searchType: 'name',
        searchValue: '',
        includeInactive: false,
        currentPage: 1,
      },
      isExpanded: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeSearchPage = this.handleChangeSearchPage.bind(this);
    this.handleChangeListPage = this.handleChangeListPage.bind(this);
    this.onSize = this.onSize.bind(this);
  }

  componentDidMount() {
    this.props.initializePractitioners();
    const { organization } = this.props;
    if (organization) {
      this.props.getPractitionersInOrganization(DEFAULT_START_PAGE_NUMBER);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { organization } = this.props;
    const { organization: newOrganization } = nextProps;
    if (!isEqual(organization, newOrganization)) {
      this.props.getPractitionersInOrganization(DEFAULT_START_PAGE_NUMBER);
    }
  }

  onSize(size) {
    const isExpanded = size && size.width && (Math.floor(size.width) > SUMMARY_PANEL_WIDTH);
    this.setState({
      relativeTop: size.height,
      isExpanded,
    });
  }

  handleSearch(searchValue, includeInactive, searchType) {
    const { organization } = this.props;
    this.setState({
      isShowSearchResult: true,
      searchPractitioners: { searchType, searchValue, includeInactive },
    });
    if (organization) {
      this.props.searchPractitioners(searchType, searchValue, includeInactive, organization.logicalId, this.state.searchPractitioners.currentPage);
    } else {
      this.props.searchPractitioners(searchType, searchValue, includeInactive, this.state.searchPractitioners.currentPage);
    }
  }

  handleChangeSearchPage(currentPage) {
    const { organization } = this.props;
    if (organization) {
      this.props.searchPractitioners(this.state.searchPractitioners.searchType, this.state.searchPractitioners.searchValue, this.state.searchPractitioners.includeInactive, currentPage, organization.logicalId);
    } else {
      this.props.searchPractitioners(this.state.searchPractitioners.searchType, this.state.searchPractitioners.searchValue, this.state.searchPractitioners.includeInactive, currentPage);
    }
  }

  handleChangeListPage(currentPage) {
    this.props.getPractitionersInOrganization(currentPage);
  }

  render() {
    const { practitioners } = this.props;
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_PRACTITIONER_URL,
    };
    // By initial to show listing practitioners data
    let practitionersData = {
      loading: practitioners.listPractitioners.loading,
      data: flattenPractitionerData(practitioners.listPractitioners.data),
      currentPage: practitioners.listPractitioners.currentPage,
      totalNumberOfPages: practitioners.listPractitioners.totalNumberOfPages,
      currentPageSize: practitioners.listPractitioners.currentPageSize,
      totalElements: practitioners.listPractitioners.totalElements,
      handleChangePage: this.handleChangeListPage,
    };
    if (this.state.isShowSearchResult) {
      practitionersData = {
        loading: practitioners.searchPractitioners.loading,
        data: flattenPractitionerData(practitioners.searchPractitioners.result),
        currentPage: practitioners.searchPractitioners.currentPage,
        totalNumberOfPages: practitioners.searchPractitioners.totalNumberOfPages,
        currentPageSize: practitioners.searchPractitioners.currentPageSize,
        totalElements: practitioners.searchPractitioners.totalElements,
        handleChangePage: this.handleChangeSearchPage,
      };
    }

    return (
      <div>
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={[OCP_ADMIN_ROLE_CODE, ORGANIZATION_ADMIN_ROLE_CODE]}
          onSearch={this.handleSearch}
          onSize={this.onSize}
        />
        <InfoSection margin="0 0 10px 0">
          <PractitionerTable
            relativeTop={this.state.relativeTop}
            practitionersData={practitionersData}
            isExpanded={this.state.isExpanded}
            onSize={this.onSize}
          />
        </InfoSection>
      </div>
    );
  }
}

Practitioners.propTypes = {
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    active: PropTypes.bool,
    name: PropTypes.string,
    addresses: PropTypes.arrayOf(PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      stateCode: PropTypes.string,
      postalCode: PropTypes.string,
      countryCode: PropTypes.string,
      use: PropTypes.string,
    })),
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
  }),
  practitioners: PropTypes.shape({
    listPractitioners: PropTypes.shape({
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
    searchPractitioners: PropTypes.shape({
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
  }),
  getPractitionersInOrganization: PropTypes.func.isRequired,
  searchPractitioners: PropTypes.func.isRequired,
  initializePractitioners: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
  practitioners: makeSelectPractitioners(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializePractitioners: () => dispatch(initializePractitioners()),
    getPractitionersInOrganization: (currentPage) => dispatch(getPractitionersInOrganization(currentPage)),
    searchPractitioners: (searchType, searchValue, includeInactive, currentPage, organization) => dispatch(searchPractitioners(searchType, searchValue, includeInactive, currentPage, organization)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitioners', reducer });
const withSaga = injectSaga({ key: 'practitioners', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Practitioners);
