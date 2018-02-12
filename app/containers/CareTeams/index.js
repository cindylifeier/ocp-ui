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
import { Checkbox } from 'material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCareTeams from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading';
import CareTeamTable from '../../components/CareTeamTable';
import { getCareTeams, initializeCareTeams } from './actions';
import { makeSelectCareTeamStatuses } from '../App/selectors';
import { DEFAULT_CARE_TEAM_STATUS_CODE } from './constants';
import { getLookupsAction } from '../App/actions';
import { CARETEAMSTATUS, DEFAULT_START_PAGE_NUMBER } from '../App/constants';

export class CareTeams extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleStatusListChange = this.handleStatusListChange.bind(this);
  }

  componentDidMount() {
    this.props.initializeCareTeams();
    this.props.initializeLookups();
  }

  handlePageClick(page) {
    const { query, patientName, statusList } = this.props.careTeams;
    this.props.getCareTeams({ ...query, pageNumber: page }, patientName, statusList);
  }

  handleStatusListChange(code, checked) {
    const { query, patientName, statusList } = this.props.careTeams;
    const filteredStatusList = statusList.filter((c) => c !== code);
    const newStatusList = checked ? [...filteredStatusList, code] : filteredStatusList;
    this.props.getCareTeams({ ...query, pageNumber: DEFAULT_START_PAGE_NUMBER }, patientName, newStatusList);
  }

  render() {
    const { careTeams: { loading, data, patientName, statusList }, careTeamStatuses } = this.props;
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <FormattedMessage {...messages.header} />
        </div>
        {isEmpty(patientName) ?
          <h4><FormattedMessage {...messages.patientNotSelected} /></h4> :
          <div className={styles.gridContainer}>
            <div className={styles.patientInfoSection}>
              <div className={styles.patientLabel}>
                Patient&nbsp;:&nbsp;
              </div>
              {patientName}
            </div>
            <div className={styles.filterSection}>
              <div>
                <div className={styles.filterGridContainer}>
                  <div className={styles.filterGridItem}>Include</div>
                  {!isEmpty(careTeamStatuses) && careTeamStatuses
                    .filter(({ code }) => DEFAULT_CARE_TEAM_STATUS_CODE !== code)
                    .map(({ code, display }) => (
                      <div key={code}>
                        <Checkbox
                          className={styles.filterGridItem}
                          name={code}
                          checked={statusList.includes(code)}
                          label={display}
                          onCheck={(event, checked) => this.handleStatusListChange(code, checked)}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        }

        {loading &&
        <RefreshIndicatorLoading />}

        {!loading && !isEmpty(patientName) && isEmpty(data) &&
        <div className={styles.noCareTeam}>
          No care teams found.
        </div>}

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
  initializeCareTeams: PropTypes.func.isRequired,
  initializeLookups: PropTypes.func.isRequired,
  careTeams: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    query: PropTypes.object,
    patientName: PropTypes.string,
    statusList: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  careTeamStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
};

const mapStateToProps = createStructuredSelector({
  careTeams: makeSelectCareTeams(),
  careTeamStatuses: makeSelectCareTeamStatuses(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCareTeams: (query, patientName, statusList) => dispatch(getCareTeams(query, patientName, statusList)),
    initializeLookups: () => dispatch(getLookupsAction([CARETEAMSTATUS])),
    initializeCareTeams: () => dispatch(initializeCareTeams()),
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
