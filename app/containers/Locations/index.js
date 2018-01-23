/**
 *
 * Locations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import UltimatePagination from 'react-ultimate-pagination-material-ui';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectCurrentPage, makeSelectIncludeInactive, makeSelectIncludeSuspended, makeSelectLocations,
  makeSelectOrganization,
  makeSelectTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import { getFilteredLocations } from './actions';
import StatusCheckbox from '../../components/StatusCheckbox';

export class Locations extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleIncludeInactive = this.handleIncludeInactive.bind(this);
    this.handleIncludeSuspended = this.handleIncludeSuspended.bind(this);
  }

  getTelecoms(telecoms) {
    return telecoms.map((entry) =>
      (
        <div key={entry.value}>
          {entry.system}: {entry.value},
        </div>
      ),
    );
  }

  getAddress(address) {
    const { line1, line2, city, stateCode, postalCode, countryCode } = address;
    const addressStr = [line1, line2, city, stateCode, postalCode, countryCode].filter((i) => i && i !== '').join(', ');
    return addressStr ? (<div>{ addressStr }</div>) : '';
  }

  handleIncludeInactive(event, checked) {
    this.props.onCheckIncludeInactive(event, checked, this.props.includeSuspended);
  }

  handleIncludeSuspended(event, checked) {
    this.props.onCheckIncludeSuspended(event, checked, this.props.includeInactive);
  }

  handlePageClick(currentPage) {
    this.props.onChangePage(currentPage, this.props.includeInactive, this.props.includeSuspended);
  }

  createRows() {
    if (this.props.data) {
      return this.props.data.map((location) => (
        <div key={location.logicalId} className={styles.rowGridContainer}>
          <div className={styles.cellGridItem}>{location.name}</div>
          <div className={styles.cellGridItem}>{location.status}</div>
          <div className={styles.cellGridItem}>{this.getTelecoms(location.telecoms)}</div>
          <div className={styles.cellGridItem}>{this.getAddress(location.address)} </div>
        </div>
      ));
    }
    return '<div></div>';
  }

  createTable() {
    return (
      <div>
        <div className={styles.card}>
          <div><strong>Organization Name: </strong>
            {this.props.organization ? this.props.organization.name : ''}</div>
          <div className={styles.actionGridContainer}>
            <StatusCheckbox
              messages={messages.inactive}
              elementId="inactiveCheckBox"
              checked={this.props.includeInactive}
              handleCheck={this.handleIncludeInactive}
            >
            </StatusCheckbox>
            <StatusCheckbox
              messages={messages.suspended}
              elementId="suspendedCheckBox"
              checked={this.props.includeSuspended}
              handleCheck={this.handleIncludeSuspended}
            >
            </StatusCheckbox>
          </div>
          <div className={styles.table}>
            <div className={styles.rowGridContainer}>
              <div className={styles.cellGridHeaderItem}>Name</div>
              <div className={styles.cellGridHeaderItem}>Status</div>
              <div className={styles.cellGridHeaderItem}>Telecoms</div>
              <div className={styles.cellGridHeaderItem}>Address</div>
            </div>
            {this.createRows()}
            <div className={styles.pagination}>
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
        </div>
      </div>
    );
  }

  createLocationTable() {
    const { data } = this.props;
    if (data && data.length > 0) {
      return this.createTable();
    }
    return (<div className={styles.wrapper}><h3> No locations loaded. Please select an organization to view its
      locations.</h3></div>);
  }

  render() {
    return this.createLocationTable();
  }
}

Locations.propTypes = {
  onCheckIncludeInactive: PropTypes.func.isRequired,
  onCheckIncludeSuspended: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  data: PropTypes.array,
  organization: PropTypes.object,
  currentPage: PropTypes.number,
  totalNumberOfPages: PropTypes.number,
  includeInactive: PropTypes.bool,
  includeSuspended: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectLocations(),
  organization: makeSelectOrganization(),
  currentPage: makeSelectCurrentPage(),
  totalNumberOfPages: makeSelectTotalNumberOfPages(),
  includeInactive: makeSelectIncludeInactive(),
  includeSuspended: makeSelectIncludeSuspended(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCheckIncludeInactive: (evt, checked, includeSuspended) => {
      const currentPage = 1;
      dispatch(getFilteredLocations(currentPage, checked, includeSuspended));
    },
    onCheckIncludeSuspended: (evt, checked, includeInactive) => {
      const currentPage = 1;
      dispatch(getFilteredLocations(currentPage, includeInactive, checked));
    },
    onChangePage: (currentPage, includeInactive, includeSuspended) => dispatch(getFilteredLocations(currentPage, includeInactive, includeSuspended)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'locations', reducer });
const withSaga = injectSaga({ key: 'locations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Locations);
