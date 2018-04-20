/**
 *
 * PatientSearchResult
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import sizeMeHOC from 'utils/SizeMeUtils';
import { MANAGE_CARE_TEAM_URL, MANAGE_PATIENT_URL, MANAGE_TASK_URL } from 'containers/App/constants';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import messages from './messages';
import { EXPANDED_TABLE_COLUMNS, SUMMARISED_TABLE_COLUMNS, SUMMARY_VIEW_WIDTH } from './constants';


function displayPatientSearchResult(patients, onPatientClick, onPatientViewDetailsClick, isExpanded, columns) {
  return patients && patients.map((patient) => {
    const menuItems = [{
      primaryText: <FormattedMessage {...messages.edit} />,
      linkTo: `${MANAGE_PATIENT_URL}/${patient.id}`,
    }, {
      primaryText: <FormattedMessage {...messages.viewDetails} />,
      onClick: () => onPatientViewDetailsClick(patient),
    }, {
      primaryText: <FormattedMessage {...messages.addAdvisory} />,
      linkTo: `${MANAGE_PATIENT_URL}/${patient.id}`,
    }, {
      primaryText: <FormattedMessage {...messages.addTask} />,
      linkTo: {
        pathname: MANAGE_TASK_URL,
        search: `?patientId=${patient.id}&isMainTask=true`,
      },
    }, {
      primaryText: <FormattedMessage {...messages.addCareTeam} />,
      linkTo: {
        pathname: MANAGE_CARE_TEAM_URL,
        search: `?patientId=${patient.id}`,
      },
    }, {
      primaryText: <FormattedMessage {...messages.addRelatedPerson} />,
      linkTo: {
        pathname: '/ocp-ui/manage-related-person',
        search: `?patientId=${patient.id}`,
      },
    }, {
      primaryText: <FormattedMessage {...messages.remove} />,
      disabled: true,
    }];
    return (
      <TableRow
        columns={columns}
        key={`patient_${patient.id}`}
        onClick={() => onPatientClick && onPatientClick(patient)}
        role="button"
        tabIndex="0"
      >
        <TableRowColumn>{patient.name[0] != null ? patient.name[0].firstName : null}</TableRowColumn>
        <TableRowColumn>{patient.name[0] != null ? patient.name[0].lastName : null}</TableRowColumn>
        { isExpanded &&
        <TableRowColumn>{patient.birthDate}</TableRowColumn>
        }
        <TableRowColumn>{patient.genderCode}</TableRowColumn>
        {isExpanded &&
        <TableRowColumn>{getIdentifiers(patient.identifier)}</TableRowColumn>
        }
        <TableRowColumn>{patient.active ?
          <FormattedMessage {...messages.active} /> :
          <FormattedMessage {...messages.inactive} />}
        </TableRowColumn>
        <TableRowColumn>
          <NavigationIconMenu menuItems={menuItems} />
        </TableRowColumn>
      </TableRow>
    );
  });
}

function getIdentifiers(identifier) {
  return identifier.map(({ systemDisplay, value }) =>
    (
      <div key={`patient_id_${systemDisplay}_${value}`}>
        {systemDisplay}: {value}
        <br />
      </div>
    ),
  );
}

function PatientSearchResult({ loading, error, searchResult, onPatientClick, onPatientViewDetailsClick, relativeTop, size }) {
  const isExpanded = size && size.width && (Math.floor(size.width) > SUMMARY_VIEW_WIDTH);
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARISED_TABLE_COLUMNS;

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
        <TableHeader columns={columns} relativeTop={relativeTop}>
          <TableHeaderColumn><FormattedMessage {...messages.firstName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.lastName} /></TableHeaderColumn>
          {isExpanded &&
          <TableHeaderColumn><FormattedMessage {...messages.dob} /></TableHeaderColumn>
          }
          <TableHeaderColumn><FormattedMessage {...messages.gender} /></TableHeaderColumn>
          {isExpanded &&
          <TableHeaderColumn><FormattedMessage {...messages.identifier} /></TableHeaderColumn>
          }
          <TableHeaderColumn><FormattedMessage {...messages.status} /></TableHeaderColumn>
          <TableHeaderColumn />
        </TableHeader>
        {displayPatientSearchResult(searchResult, onPatientClick, onPatientViewDetailsClick, isExpanded, columns)}
      </Table>
    );
  }
  return null;
}

PatientSearchResult.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  searchResult: PropTypes.any,
  onPatientClick: PropTypes.func,
  onPatientViewDetailsClick: PropTypes.func,
  size: PropTypes.object.isRequired,
};

export default sizeMeHOC(PatientSearchResult);
