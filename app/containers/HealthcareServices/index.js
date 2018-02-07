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
import { makeSelectHealthcareServices,
  makeSelectCurrentPage, makeSelectIncludeInactive,
  makeSelectOrganization, makeSelectQueryError,
  makeSelectQueryLoading, makeSelectTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import HealthcareServiceTable from '../../components/HealthcareServiceTable/index';
import { getFilteredHealthcareServices, initializeHealthcareServices } from './actions';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading/index';
import StatusCheckbox from '../../components/StatusCheckbox/index';

export class HealthcareServices extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    this.props.initializeHealthcareServices();
  }

  handlePageClick(currentPage) {
    this.props.onChangePage(currentPage, this.props.includeInactive);
  }


  render() {
    const { loading, healthcareServices, organization } = this.props;
    return (
      <div className={styles.card}>
        {isEmpty(organization) &&
        <h4><FormattedMessage {...messages.organizationNotSelected} /></h4>}

        {!loading && organization && <div>
          <div><strong>Organization:</strong> {organization.name}</div>
          <div className={styles.actionGridContainer}>
            <StatusCheckbox
              messages={messages.inactive}
              elementId="inactiveCheckBox"
              checked={this.props.includeInactive}
              handleCheck={this.props.onCheckIncludeInactive}
            >
            </StatusCheckbox>
          </div>
        </div>
        }

        {loading &&
        <RefreshIndicatorLoading />}

        {!loading && !isEmpty(organization) && isEmpty(healthcareServices) &&
        <h4><FormattedMessage {...messages.noHealthcareServicesFound} /></h4>
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
      </div>
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
  onChangePage: PropTypes.func,
  onCheckIncludeInactive: PropTypes.func,
  organization: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
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
    onChangePage: (currentPage, includeInactive) => dispatch(getFilteredHealthcareServices(currentPage, includeInactive)),
    onCheckIncludeInactive: (evt, checked) => {
      const currentPage = 1;
      dispatch(getFilteredHealthcareServices(currentPage, checked));
    },
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
