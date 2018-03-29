/**
 *
 * PatientTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import upperFirst from 'lodash/upperFirst';

import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import messages from './messages';

class PatientTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectPatient: null,
    };
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleCellClick(rowNumber) {
    const selectPatient = this.props.searchPatientData.result[rowNumber];
    this.props.onPatientSelect(selectPatient);
  }

  // Todo: Resolve table row cannot selected
  render() {
    const { searchPatientData, onChangeSearchPage, flattenPatientsData } = this.props;
    return (
      <div>
        {searchPatientData.loading && <RefreshIndicatorLoading />}
        {(!searchPatientData.loading && searchPatientData.result &&
          searchPatientData.result.length > 0 ?
            <div>
              <Table onCellClick={this.handleCellClick}>
                <TableHeader displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnFirstName} /></TableHeaderColumn>
                    <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnLastName} /></TableHeaderColumn>
                    <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnDOB} /></TableHeaderColumn>
                    <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnGender} /></TableHeaderColumn>
                    <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnIdentifier} /></TableHeaderColumn>
                    <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnStatus} /></TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!isEmpty(searchPatientData.result) && searchPatientData.result.map((patient) => {
                    const { id, name, birthDate, genderCode, identifier, active } = flattenPatientsData(patient);
                    return (
                      <TableRow key={id}>
                        <TableRowColumn>{renderFirstName(name)}</TableRowColumn>
                        <TableRowColumn>{renderLastName(name)}</TableRowColumn>
                        <TableRowColumn>{birthDate}</TableRowColumn>
                        <TableRowColumn>{upperFirst(genderCode)}</TableRowColumn>
                        <TableRowColumn>{identifier}</TableRowColumn>
                        <TableRowColumn>
                          {active ?
                            <FormattedMessage {...messages.active} /> :
                            <FormattedMessage {...messages.inactive} />
                          }
                        </TableRowColumn>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <CenterAlignedUltimatePagination
                currentPage={searchPatientData.currentPage}
                totalPages={searchPatientData.totalNumberOfPages}
                onChange={onChangeSearchPage}
              />
            </div> :
            (<CenterAlign>
              <NoResultsFoundText>No patients found</NoResultsFoundText>
            </CenterAlign>)
        )}
      </div>
    );
  }
}

function renderFirstName(names) {
  return names && names.map((name) => (<div key={uniqueId()}>{name.firstName}</div>));
}

function renderLastName(names) {
  return names && names.map((name) => (<div key={uniqueId()}>{name.lastName}</div>));
}

PatientTable.propTypes = {
  searchPatientData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    result: PropTypes.any.isRequired,
  }),
  onChangeSearchPage: PropTypes.func.isRequired,
  flattenPatientsData: PropTypes.func.isRequired,
  onPatientSelect: PropTypes.func.isRequired,
};

export default PatientTable;
