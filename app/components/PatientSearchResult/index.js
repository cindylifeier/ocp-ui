/**
 *
 * PatientSearchResult
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import RefreshIndicatorLoading from '../RefreshIndicatorLoading';
import { MANAGE_CARE_TEAM_URL } from '../../containers/App/constants';
import messages from './messages';
import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';
import NavigationStyledIconMenu from '../StyledIconMenu/NavigationStyledIconMenu';
import StyledMenuItem from '../StyledMenuItem';

const columns = '1fr 1fr 1fr 1fr 30% 1fr 50px';

function displayPatientSearchResult(patients, onPatientClick) {
  return patients && patients.map((patient) => (
    <TableRow
      columns={columns}
      key={`patient-${uniqueId()}`}
      onClick={() => onPatientClick && onPatientClick(patient)}
      role="button"
      tabIndex="0"
    >
      <TableRowColumn>{patient.name[0] != null ? patient.name[0].firstName : null}</TableRowColumn>
      <TableRowColumn>{patient.name[0] != null ? patient.name[0].lastName : null}</TableRowColumn>
      <TableRowColumn>{patient.birthDate}</TableRowColumn>
      <TableRowColumn>{patient.genderCode}</TableRowColumn>
      <TableRowColumn>{getIdentifiers(patient.identifier)}</TableRowColumn>
      <TableRowColumn>{patient.active ?
        <FormattedMessage {...messages.active} /> :
        <FormattedMessage {...messages.inactive} />}
      </TableRowColumn>
      <TableRowColumn>
        <NavigationStyledIconMenu>
          <StyledMenuItem
            primaryText={<FormattedMessage {...messages.addCareTeam} />}
            containerElement={<Link
              to={{
                pathname: MANAGE_CARE_TEAM_URL,
                search: `?patientId=${patient.id}`,
              }}
            />}
          />
          <StyledMenuItem
            primaryText={<FormattedMessage {...messages.addTask} />}
            containerElement={<Link to={'/ocp-ui/manage-task'} />}
          />
          <StyledMenuItem
            primaryText={<FormattedMessage {...messages.edit} />}
            containerElement={<Link to={`/ocp-ui/manage-patient/${patient.id}`} />}
          />
          <StyledMenuItem primaryText={<FormattedMessage {...messages.remove} />} disabled />
        </NavigationStyledIconMenu>
      </TableRowColumn>
    </TableRow>
  ));
}

function getIdentifiers(identifier) {
  return identifier.map((entry) =>
    (
      <div key={`patient-id-${uniqueId()}`}>
        {entry.system}: {entry.value}
        <br />
      </div>
    ),
  );
}

function PatientSearchResult({ loading, error, searchResult, onPatientClick }) {
  if (loading) {
    return <RefreshIndicatorLoading />;
  }

  if (error !== false) {
    return (<p>Error!</p>);
  }

  if (error !== false) {
    return (<p>No match search result.</p>);
  }

  if (searchResult !== false && searchResult !== null && searchResult.length === 0) {
    return (<p>No patients found.</p>);
  }

  if (searchResult !== false && searchResult !== null && searchResult.length !== 0) {
    return (
      <Table>
        <TableHeader columns={columns}>
          <TableHeaderColumn><FormattedMessage {...messages.firstName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.lastName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.dob} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.gender} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.identifier} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.status} /></TableHeaderColumn>
          <TableHeaderColumn />
        </TableHeader>
        {displayPatientSearchResult(searchResult, onPatientClick)}
      </Table>
    );
  }
  return null;
}

PatientSearchResult.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  searchResult: PropTypes.any,
  onPatientClick: PropTypes.func,
};

export default PatientSearchResult;
