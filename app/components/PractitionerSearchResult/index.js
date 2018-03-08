/**
 *
 * PractitionerSearchResult
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import find from 'lodash/find';
import MenuItem from 'material-ui/MenuItem';

import NoResultsFoundText from 'components/NoResultsFoundText';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import { EMPTY_STRING, MANAGE_PRACTITIONER_URL } from 'containers/App/constants';
import messages from './messages';

function PractitionerSearchResult({ loading, error, searchResult, identifierSystems }) {
  if (loading) {
    return <RefreshIndicatorLoading />;
  }

  if (error !== false) {
    return (<NoResultsFoundText><FormattedMessage {...messages.noPractitionersFound} /></NoResultsFoundText>);
  }

  if (searchResult !== false) {
    const columns = '15% 15% 10% 50% 10%';
    return (
      <Table>
        <TableHeader columns={columns}>
          <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnFirstName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnLastName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnIdentifier} /></TableHeaderColumn>
          <TableHeaderColumn />
        </TableHeader>
        {displayPractitionerSearchResult(searchResult, identifierSystems, columns)}
      </Table>
    );
  }
  return (<div />);
}

function displayPractitionerSearchResult(practitioners, identifierSystems, columns) {
  return (
    practitioners && practitioners.map((practitioner) => (
      <TableRow key={uniqueId()} columns={columns}>
        <TableRowColumn>
          {practitioner.name[0].firstName ? practitioner.name[0].firstName : ''}
        </TableRowColumn>
        <TableRowColumn>
          {practitioner.name[0].lastName ? practitioner.name[0].lastName : ''}
        </TableRowColumn>
        <TableRowColumn>{practitioner.active ?
          <FormattedMessage {...messages.active} /> :
          <FormattedMessage {...messages.inactive} />}
        </TableRowColumn>
        <TableRowColumn>{mapToIdentifier(practitioner, identifierSystems)}</TableRowColumn>
        <TableRowColumn>
          <NavigationStyledIconMenu>
            <MenuItem
              primaryText={<FormattedMessage {...messages.edit} />}
              containerElement={<Link to={`${MANAGE_PRACTITIONER_URL}/${practitioner.logicalId}`} />}
            />
          </NavigationStyledIconMenu>
        </TableRowColumn>
      </TableRow>
    )));
}

// Todo: Refactor to make reuseable
function mapToIdentifier(practitioner, identifierSystems) {
  const identifiers = practitioner.identifiers;
  return identifiers && identifiers
    .map((identifier) => {
      const system = identifier.system !== EMPTY_STRING ? identifier.system : 'No system found';
      const display = find(identifierSystems, { uri: system }) !== null ? find(identifierSystems, { uri: system }).display : system;
      const value = identifier.value !== EMPTY_STRING ? identifier.value : 'No value found';
      return `${display}: ${value}`;
    })
    .join(', ');
}

PractitionerSearchResult.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  searchResult: PropTypes.any,
  identifierSystems: PropTypes.array,
};

export default PractitionerSearchResult;
