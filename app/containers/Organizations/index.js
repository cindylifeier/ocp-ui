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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectOrganizations from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadOrganizations } from './actions';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading';
import styles from './Organizations.css';
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
  }

  handleSearch(query) {
    this.props.loadOrganizations(query);
  }

  handleRowClick({ id, name }) {
    this.props.getActiveLocations(id, name);
  }

  render() {
    const { organizations } = this.props;
    return (
      <div className={styles.root}>
        <h3><FormattedMessage {...messages.header} /></h3>

        <SearchBar
          minimumLength={Organizations.SEARCH_BAR_TEXT_LENGTH}
          onSearch={this.handleSearch}
        />

        {organizations.loading && <RefreshIndicatorLoading />}

        {(!organizations.loading && organizations.data && organizations.data.length > 0 &&
          <OrganizationTable>
            {organizations.data.map((org) => (
              <OrganizationTableRow
                key={org.id}
                {...org}
                onRowClick={this.handleRowClick}
              />
            ))}
          </OrganizationTable>) ||

        (<div className={styles.textCenter}>
          <span>No organizations found</span>
        </div>)
        }
      </div>
    );
  }
}

Organizations.propTypes = {
  loadOrganizations: PropTypes.func.isRequired,
  getActiveLocations: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizations(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadOrganizations: (query, includeInactive, searchType) => dispatch(loadOrganizations(query, includeInactive, searchType)),
    getActiveLocations: (organizationId, organizationName) => dispatch(getActiveLocations(organizationId, organizationName)),
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
