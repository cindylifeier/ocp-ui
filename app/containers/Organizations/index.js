/**
 *
 * Organizations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import UltimatePagination from 'react-ultimate-pagination-material-ui';
import { FloatingActionButton } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';
import { teal500 } from 'material-ui/styles/colors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectCurrentPage, makeSelectOrganizations, makeSelectTotalNumberOfPages } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadOrganizations } from './actions';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading';
import styles from './styles.css';
import OrganizationTable from '../../components/OrganizationTable/Loadable';
import OrganizationTableRow from '../../components/OrganizationTableRow/Loadable';
import SearchBar from '../../components/SearchBar';
import { getActiveLocations } from '../Locations/actions';

export class Organizations extends React.PureComponent {

  static SEARCH_BAR_TEXT_LENGTH = 3;

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.state = {
      currentPage: 1,
      searchValue: '',
      showInactive: false,
      searchType: 'name',
    };
  }

  handleSearch(searchValue, showInactive, searchType) {
    this.setState({ searchValue, showInactive, searchType });
    this.props.loadOrganizations(searchValue, showInactive, searchType, this.state.currentPage);
  }

  handleRowClick({ id, name }) {
    const currentPage = 1;
    this.props.getActiveLocations(id, name, currentPage);
  }

  handlePageClick(currentPage) {
    this.setState({ currentPage });
    this.props.loadOrganizations(this.state.searchValue, this.state.showInactive, this.state.searchType, currentPage);
  }

  render() {
    const { organizations } = this.props;
    return (
      <div className={styles.card}>
        <FloatingActionButton
          backgroundColor={teal500}
          className={styles.addButton}
          mini
          containerElement={<Link to="/manage-organization" />}
        >
          <ContentAdd />
        </FloatingActionButton>
        <h3 className={styles.header}><FormattedMessage {...messages.header} /></h3>

        <SearchBar
          minimumLength={Organizations.SEARCH_BAR_TEXT_LENGTH}
          onSearch={this.handleSearch}
        />

        {organizations.loading && <RefreshIndicatorLoading />}

        {(!organizations.loading && organizations.data && organizations.data.length > 0 &&
          <div>
            <OrganizationTable>
              {organizations.data.map((org) => (
                <OrganizationTableRow
                  key={org.id}
                  {...org}
                  onRowClick={this.handleRowClick}
                />
              ))}
            </OrganizationTable>
            <div className={styles.textCenter}>
              <UltimatePagination
                currentPage={this.props.currentPage}
                totalPages={this.props.totalNumberOfPages}
                boundaryPagesRange={1}
                siblingPagesRange={1}
                hidePreviousAndNextPageLinks={false}
                hideFirstAndLastPageLinks={false}
                hideEllipsis={false}
                onChange={this.handlePageClick}
              />
            </div>
          </div>
        ) ||
        ((!organizations.loading && organizations.data && organizations.data.length === 0 &&
          <div className={styles.textCenter}>
            <span>No organizations found</span>
          </div>))
        }
      </div>
    );
  }
}

Organizations.propTypes = {
  loadOrganizations: PropTypes.func.isRequired,
  getActiveLocations: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizations(),
  currentPage: makeSelectCurrentPage(),
  totalNumberOfPages: makeSelectTotalNumberOfPages(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadOrganizations: (searchValue, showInactive, searchType, currentPage) => dispatch(loadOrganizations(searchValue, showInactive, searchType, currentPage)),
    getActiveLocations: (organizationId, organizationName, currentPage) => dispatch(getActiveLocations(organizationId, organizationName, currentPage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'organizations', reducer });
const withSaga = injectSaga({ key: 'organizations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Organizations);
