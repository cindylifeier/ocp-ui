/**
 *
 * PractitionerTable
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';

import { MANAGE_PRACTITIONER_URL } from 'containers/App/constants';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import messages from './messages';

const tableColumns = 'repeat(4, 1fr) 50px';

function PractitionerTable(props) {
  const { practitionersData } = props;
  return (
    <div>
      {practitionersData.loading && <RefreshIndicatorLoading />}
      {(!practitionersData.loading && practitionersData.data &&
        practitionersData.data.length > 0 ?
          <div>
            <Table>
              <TableHeader columns={tableColumns}>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnFirstName} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnLastName} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnStatus} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnIdentifier} /></TableHeaderColumn>
              </TableHeader>
              {!isEmpty(practitionersData.data) && practitionersData.data.map((practitioner) => {
                const { logicalId, name, active, identifiers } = practitioner;
                return (
                  <TableRow
                    columns={tableColumns}
                    key={logicalId}
                    role="button"
                    tabIndex="0"
                  >
                    <TableRowColumn>{renderFirstName(name)}</TableRowColumn>
                    <TableRowColumn>{renderLastName(name)}</TableRowColumn>
                    <TableRowColumn>
                      {active ?
                        <FormattedMessage {...messages.active} /> :
                        <FormattedMessage {...messages.inactive} />
                      }
                    </TableRowColumn>
                    <TableRowColumn>{renderIdentifiers(identifiers)}</TableRowColumn>
                    <TableRowColumn>
                      <NavigationStyledIconMenu>
                        <MenuItem
                          primaryText={<FormattedMessage {...messages.edit} />}
                          containerElement={<Link to={`${MANAGE_PRACTITIONER_URL}/${practitioner.logicalId}`} />}
                        />
                      </NavigationStyledIconMenu>
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </Table>
            <CenterAlignedUltimatePagination
              currentPage={practitionersData.currentPage}
              totalPages={practitionersData.totalNumberOfPages}
              onChange={practitionersData.handleChangePage}
            />
          </div> :
          (<CenterAlign>
            <NoResultsFoundText>No practitioners found</NoResultsFoundText>
          </CenterAlign>)
      )}
    </div>
  );
}

function renderFirstName(names) {
  return names && names.map((name) => (<div key={uniqueId()}>{name.firstName}</div>));
}

function renderLastName(names) {
  return names && names.map((name) => (<div key={uniqueId()}>{name.lastName}</div>));
}

function renderIdentifiers(identifiers) {
  return identifiers && identifiers.map((identifier) => (<div key={uniqueId()}>{identifier}</div>));
}

PractitionerTable.propTypes = {
  practitionersData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      identifiers: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        oid: PropTypes.string,
        value: PropTypes.string,
        priority: PropTypes.number,
        display: PropTypes.string,
      })),
      active: PropTypes.bool,
      name: PropTypes.array.isRequired,
      addresses: PropTypes.arrayOf(PropTypes.shape({
        line1: PropTypes.string,
        line2: PropTypes.string,
        city: PropTypes.string,
        stateCode: PropTypes.string,
        postalCode: PropTypes.string,
        countryCode: PropTypes.string,
        use: PropTypes.string,
      })),
      telecoms: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        value: PropTypes.string,
        use: PropTypes.string,
      })),
      practitionerRoles: PropTypes.array,
    })).isRequired,
  }),
};

export default PractitionerTable;
