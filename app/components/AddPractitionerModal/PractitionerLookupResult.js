/**
 *
 * PractitionerLookupResult
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Divider from 'material-ui-next/Divider';
import { LinearProgress } from 'material-ui-next/Progress';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import { flattenPractitioner } from './helpers';
import messages from './messages';

const columns = 'repeat(4, 1fr) .5fr';

function PractitionerLookupResult(props) {
  const { practitionerLookup: { loading, practitioner, error } } = props;

  function renderPractitionerTable() {
    const flattenedPractitioner = flattenPractitioner(practitioner);
    const menuItems = [{
      primaryText: <FormattedMessage {...messages.edit} />,
      linkTo: `/ocp-ui/manage-practitioner/${practitioner.logicalId}`,
    }];

    return (
      <div>
        <FormattedMessage {...messages.modalContentText} />
        <Divider light />
        <Table>
          <TableHeader columns={columns}>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnName} /></TableHeaderColumn>
            <TableHeaderColumn> <FormattedMessage {...messages.tableColumnHeaderRole} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnIdentifier} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderEmail} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnAction} /></TableHeaderColumn>
          </TableHeader>
          <TableRow key={uniqueId()} columns={columns}>
            <TableRowColumn>{flattenedPractitioner.name}</TableRowColumn>
            <TableRowColumn>{flattenedPractitioner.roles}</TableRowColumn>
            <TableRowColumn>{flattenedPractitioner.identifiers}</TableRowColumn>
            <TableRowColumn>{flattenedPractitioner.email}</TableRowColumn>
            <TableRowColumn>
              <NavigationIconMenu menuItems={menuItems} />
            </TableRowColumn>
          </TableRow>
        </Table>
      </div>
    );
  }

  return (
    <div>
      {loading && <LinearProgress />}
      {error && isEmpty(practitioner) &&
      <FormattedMessage {...messages.NoExistPractitionerFound} />
      }
      {!loading && practitioner && renderPractitionerTable()}
    </div>
  );
}

PractitionerLookupResult.propTypes = {
  practitionerLookup: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    practitioner: PropTypes.shape({
      name: PropTypes.array,
      identifiers: PropTypes.array,
      telecoms: PropTypes.array,
      practitionerRoles: PropTypes.array,
    }),
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }).isRequired,
};

export default PractitionerLookupResult;
