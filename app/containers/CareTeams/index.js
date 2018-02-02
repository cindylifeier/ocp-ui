/**
 *
 * CareTeams
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
import makeSelectCareTeams from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading';
import CareTeamTable from '../../components/CareTeamTable';
import { getCareTeams } from './actions';

export class CareTeams extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(page) {
    const { query, patientName } = this.props.careTeams;
    this.props.getCareTeams({ ...query, pageNumber: page }, patientName);
  }

  render() {
    const { careTeams: { loading, data, patientName } } = this.props;
    return (
      <div className={styles.card}>
        <h3><FormattedMessage {...messages.header} /></h3>

        {isEmpty(data) &&
        <h4><FormattedMessage {...messages.patientNotSelected} /></h4>}

        {!loading && data && <div><strong>Patient:</strong> {patientName}</div>}

        {loading &&
        <RefreshIndicatorLoading />}

        {!isEmpty(data) && !isEmpty(data.elements) &&
        <div className={styles.textCenter}>
          <CareTeamTable elements={data.elements} />
          <UltimatePagination
            currentPage={data.currentPage}
            totalPages={data.totalNumberOfPages}
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

CareTeams.propTypes = {
  getCareTeams: PropTypes.func.isRequired,
  careTeams: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    query: PropTypes.object,
    patientName: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  careTeams: makeSelectCareTeams(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCareTeams: (query, patientName) => dispatch(getCareTeams(query, patientName)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'careTeams', reducer });
const withSaga = injectSaga({ key: 'careTeams', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CareTeams);
