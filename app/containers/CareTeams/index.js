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
import { Cell, Grid } from 'styled-css-grid';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCareTeams from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading';
import CareTeamTable from '../../components/CareTeamTable';
import { getCareTeams, initializeCareTeams } from './actions';
import { makeSelectCareTeamStatuses } from '../App/selectors';
import { DEFAULT_CARE_TEAM_STATUS_CODE } from './constants';
import { getLookupsAction } from '../App/actions';
import { CARETEAMSTATUS, DEFAULT_START_PAGE_NUMBER } from '../App/constants';
import Card from '../../components/Card';
import CardHeader from '../../components/CardHeader';
import CenterAlign from '../../components/Align/CenterAlign';
import FilterSection from './FilterSection';
import CheckboxGrid from './CheckboxGrid';
import NoCareTeamSection from './NoCareTeamSection';
import PatientInfoSection from './PatientInfoSection';
import PatientLabel from './PatientLabel';

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

  calculateCheckboxColumns({ length }) {
    return `60px repeat(${length < 1 ? 0 : length - 1},120px) 180px 1fr`;
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

  renderFilter(careTeamStatuses, statusList) {
    const filteredCareTeamStatuses = careTeamStatuses.filter(({ code }) => DEFAULT_CARE_TEAM_STATUS_CODE !== code);
    return (
      <FilterSection>
        <CheckboxGrid columns={this.calculateCheckboxColumns(filteredCareTeamStatuses)} gap="">
          <Cell><CenterAlign>Include</CenterAlign></Cell>
          {filteredCareTeamStatuses.map(({ code, display }) => (
            <Cell key={code}>
              <CenterAlign>
                <Checkbox
                  name={code}
                  checked={statusList.includes(code)}
                  label={display}
                  onCheck={(event, checked) => this.handleStatusListChange(code, checked)}
                />
              </CenterAlign>
            </Cell>
          ))
          }
        </CheckboxGrid>
      </FilterSection>);
  }

  render() {
    const { careTeams: { loading, data, patientName, statusList }, careTeamStatuses } = this.props;
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />} />
        {isEmpty(patientName) ?
          <h4><FormattedMessage {...messages.patientNotSelected} /></h4> :
          <Grid columns={1} gap="">
            <Cell>
              <PatientInfoSection>
                <PatientLabel>
                  <FormattedMessage {...messages.patientLabel} />&nbsp;:&nbsp;
                </PatientLabel>
                {patientName}
              </PatientInfoSection>
            </Cell>
            <Cell>
              {!isEmpty(careTeamStatuses) &&
              this.renderFilter(careTeamStatuses, statusList)
              }
            </Cell>
          </Grid>
        }

        {loading &&
        <RefreshIndicatorLoading />}

        {!loading && !isEmpty(patientName) && isEmpty(data) &&
        <NoCareTeamSection>No care teams found.</NoCareTeamSection>}

        {!isEmpty(data) && !isEmpty(data.elements) &&
        <CenterAlign>
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
        </CenterAlign>
        }
      </Card>
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
