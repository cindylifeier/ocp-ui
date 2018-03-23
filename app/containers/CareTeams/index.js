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
import uniqueId from 'lodash/uniqueId';
import isEqual from 'lodash/isEqual';
import { Checkbox } from 'material-ui';
import { Cell, Grid } from 'styled-css-grid';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import CareTeamTable from 'components/CareTeamTable';
import RecordsRange from 'components/RecordsRange';
import Card from 'components/Card';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import FilterSection from 'components/FilterSection';
import { makeSelectCareTeamStatuses } from 'containers/App/lookupSelectors';
import { getLookupsAction } from 'containers/App/actions';
import { CARETEAMSTATUS, DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import makeSelectCareTeams from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getCareTeams, initializeCareTeams } from './actions';
import { DEFAULT_CARE_TEAM_STATUS_CODE } from './constants';

export class CareTeams extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleStatusListChange = this.handleStatusListChange.bind(this);
    this.PATIENT_NAME_HTML_ID = uniqueId('patient_name_');
  }

  componentDidMount() {
    this.props.initializeCareTeams();
    this.props.initializeLookups();
    const { patient } = this.props;
    if (patient) {
      this.props.getCareTeams(1);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { patient } = this.props;
    const { patient: newPatient } = nextProps;
    if (!isEqual(patient, newPatient)) {
      this.props.getCareTeams(1);
    }
  }

  calculateCheckboxColumns({ length }) {
    return `60px repeat(${length < 1 ? 0 : length - 1},120px) 180px 1fr`;
  }

  handlePageClick(pageNumber) {
    const { statusList } = this.props.careTeams;
    this.props.getCareTeams(pageNumber, statusList);
  }

  handleStatusListChange(code, checked) {
    const { statusList } = this.props.careTeams;
    const filteredStatusList = statusList.filter((c) => c !== code);
    const newStatusList = checked ? [...filteredStatusList, code] : filteredStatusList;
    this.props.getCareTeams(DEFAULT_START_PAGE_NUMBER, newStatusList);
  }

  renderFilter(careTeamStatuses, statusList) {
    const filteredCareTeamStatuses = careTeamStatuses.filter(({ code }) => DEFAULT_CARE_TEAM_STATUS_CODE !== code);
    return (
      <FilterSection>
        <CheckboxFilterGrid columns={this.calculateCheckboxColumns(filteredCareTeamStatuses)}>
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
        </CheckboxFilterGrid>
      </FilterSection>);
  }

  render() {
    const { careTeams: { loading, data, statusList }, careTeamStatuses, patient } = this.props;
    let patientName = null;
    if (patient) {
      const { name: [{ firstName, lastName }] } = patient;
      patientName = [firstName, lastName].filter((n) => !isEmpty(n)).join(' ');
    }
    return (
      <Card>
        {isEmpty(patientName) ?
          <h4><FormattedMessage {...messages.patientNotSelected} /></h4> :
          <Grid columns={1} gap="">
            <Cell>
              <InfoSection>
                <div>
                  The care teams for&nbsp;
                  <InlineLabel htmlFor={this.PATIENT_NAME_HTML_ID}>
                    <span id={this.PATIENT_NAME_HTML_ID}>{patientName}</span>&nbsp;
                  </InlineLabel>
                  are :
                </div>
              </InfoSection>
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

        {!loading && !isEmpty(patientName) && (isEmpty(data) || isEmpty(data.elements)) &&
        <NoResultsFoundText>No care teams found.</NoResultsFoundText>}

        {!isEmpty(data) && !isEmpty(data.elements) &&
        <CenterAlign>
          <CareTeamTable elements={data.elements} />
          <CenterAlignedUltimatePagination
            currentPage={data.currentPage}
            totalPages={data.totalNumberOfPages}
            onChange={this.handlePageClick}
          />
          <RecordsRange
            currentPage={data.currentPage}
            totalPages={data.totalNumberOfPages}
            totalElements={data.totalElements}
            currentPageSize={data.currentPageSize}
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
  patient: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  careTeams: makeSelectCareTeams(),
  careTeamStatuses: makeSelectCareTeamStatuses(),
  patient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCareTeams: (pageNumber, statusList) => dispatch(getCareTeams(pageNumber, statusList)),
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
