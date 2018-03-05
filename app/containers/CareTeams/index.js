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
import { Checkbox } from 'material-ui';
import { Cell, Grid } from 'styled-css-grid';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import CareTeamTable from 'components/CareTeamTable';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import FilterSection from 'components/FilterSection';
import { makeSelectCareTeamStatuses } from 'containers/App/lookupSelectors';
import { getLookupsAction } from 'containers/App/actions';
import { CARETEAMSTATUS, DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import makeSelectCareTeams from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getCareTeams, initializeCareTeams } from './actions';
import { DEFAULT_CARE_TEAM_STATUS_CODE } from './constants';

export class CareTeams extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static PATIENT_NAME_HTML_ID = uniqueId('patient_name_');

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
    const { careTeams: { loading, data, patientName, statusList }, careTeamStatuses } = this.props;
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />} />
        {isEmpty(patientName) ?
          <h4><FormattedMessage {...messages.patientNotSelected} /></h4> :
          <Grid columns={1} gap="">
            <Cell>
              <InfoSection>
                <InlineLabel htmlFor={CareTeams.PATIENT_NAME_HTML_ID}>
                  <FormattedMessage {...messages.patientLabel} />&nbsp;
                </InlineLabel>
                <span id={CareTeams.PATIENT_NAME_HTML_ID}>{patientName}</span>
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
