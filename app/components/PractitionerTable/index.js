/**
 *
 * PractitionerTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import { Link } from 'react-router-dom';

import sizeMeHOC from 'utils/SizeMeUtils';
import RecordsRange from 'components/RecordsRange';
import StyledDialog from 'components/StyledDialog';
import StyledFlatButton from 'components/StyledFlatButton';
import { MANAGE_PRACTITIONER_URL, MANAGE_USER_REGISTRATION } from 'containers/App/constants';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import ExpansionTableRow from 'components/ExpansionTableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import PractitionerExpansionRowDetails from './PractitionerExpansionRowDetails';
import messages from './messages';
import { EXPANDED_TABLE_COLUMNS, SUMMARIZED_TABLE_COLUMNS, SUMMARY_PANEL_WIDTH } from './constants';

class PractitionerTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOrgSelectDialogOpen: false,
      practitioner: {},
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
  }

  handleOpenDialog(practitioner) {
    this.setState({
      isOrgSelectDialogOpen: true,
      practitioner,
    });
  }

  render() {
    const { relativeTop, practitionersData, size, flattenPractitionerData, combineAddress, mapToTelecoms, manageUserEnabled, assignLocationUrl } = this.props;
    const { setSelectedPractitioner } = practitionersData;
    const isExpanded = size && size.width && (Math.floor(size.width) > SUMMARY_PANEL_WIDTH);
    const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;


    function renderFullName(names) {
      return names && names.map((name) => (<div key={uniqueId()}>{name.firstName} {name.lastName} </div>));
    }

    return (
      <div>
        <StyledDialog
          maxWidth={'md'}
          open={this.state.isOrgSelectDialogOpen}
        >
          <DialogTitle>
            <FormattedMessage {...messages.selectOrganization} />
          </DialogTitle>

          <DialogContent>
            {this.state.practitioner && this.state.practitioner.practitionerRoles && this.state.practitioner.practitionerRoles.map((practitionerRole) => (
              <StyledFlatButton
                component={Link}
                to={`${MANAGE_USER_REGISTRATION}/${this.state.practitioner.logicalId}?resourceType=Practitioner&orgId=${practitionerRole.organization.reference.split('/').pop()}`}
              >
                {practitionerRole.organization.display}
              </StyledFlatButton>
            ))}

          </DialogContent>
        </StyledDialog>
        {practitionersData.loading && <RefreshIndicatorLoading />}
        {(!practitionersData.loading && practitionersData.data &&
          practitionersData.data.length > 0 ?
            <div>
              <Table>
                <TableHeader columns={columns} relativeTop={relativeTop}>
                  <TableHeaderColumn />
                  <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnFullName} /></TableHeaderColumn>
                  {isExpanded &&
                  <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAddress} /></TableHeaderColumn>
                  }
                  <TableHeaderColumn> <FormattedMessage {...messages.tableColumnHeaderTelecom} /></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnStatus} /></TableHeaderColumn>
                  {isExpanded &&
                  <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnIdentifier} /></TableHeaderColumn>
                  }
                  <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnAction} /></TableHeaderColumn>
                </TableHeader>
                {!isEmpty(practitionersData.data) && practitionersData.data.map((practitioner) => {
                  const { logicalId, name, active, addresses, telecoms } = practitioner;
                  const flattenedPractitioner = flattenPractitionerData(practitioner);
                  const address = addresses && addresses.length > 0 ? combineAddress(addresses[0]) : '';
                  const contact = telecoms && telecoms.length > 0 ? mapToTelecoms(telecoms.slice(0, 1)) : '';
                  let menuItems;
                  if (manageUserEnabled) {
                    menuItems = [{
                      primaryText: <FormattedMessage {...messages.manageUser} />,
                      onClick: () => this.handleOpenDialog(practitioner),
                    }];
                  } else {
                    menuItems = [{
                      primaryText: <FormattedMessage {...messages.edit} />,
                      linkTo: `${MANAGE_PRACTITIONER_URL}/${practitioner.logicalId}`,
                    }, {
                      primaryText: <FormattedMessage {...messages.assignLocation} />,
                      linkTo: `${assignLocationUrl}/${practitioner.logicalId}`,
                    },
                    ];
                  }
                  return (
                    <ExpansionTableRow
                      expansionTableRowDetails={<PractitionerExpansionRowDetails
                        practitioner={flattenedPractitioner}
                      />}
                      columns={columns}
                      key={logicalId}
                      onClick={() => setSelectedPractitioner && setSelectedPractitioner(practitioner)}
                    >
                      <TableRowColumn>{renderFullName(name)}</TableRowColumn>
                      {isExpanded ?
                        <TableRowColumn>{address}</TableRowColumn> : null
                      }
                      <TableRowColumn>{contact}</TableRowColumn>
                      <TableRowColumn>
                        {active ?
                          <FormattedMessage {...messages.active} /> :
                          <FormattedMessage {...messages.inactive} />
                        }
                      </TableRowColumn>
                      {isExpanded &&
                      <TableRowColumn>{flattenedPractitioner.identifiers}</TableRowColumn>
                      }
                      <TableRowColumn>
                        <NavigationIconMenu menuItems={menuItems} />
                      </TableRowColumn>
                    </ExpansionTableRow>
                  );
                })}
              </Table>
              <CenterAlignedUltimatePagination
                currentPage={practitionersData.currentPage}
                totalPages={practitionersData.totalNumberOfPages}
                onChange={practitionersData.handleChangePage}
              />
              <RecordsRange
                currentPage={practitionersData.currentPage}
                totalPages={practitionersData.totalNumberOfPages}
                totalElements={practitionersData.totalElements}
                currentPageSize={practitionersData.currentPageSize}
              />
            </div> :
            (
              <NoResultsFoundText><FormattedMessage {...messages.NoPractitionersFound} /></NoResultsFoundText>
            )
        )}
      </div>
    );
  }
}

PractitionerTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  size: PropTypes.object.isRequired,
  flattenPractitionerData: PropTypes.func.isRequired,
  assignLocationUrl: PropTypes.string,
  practitionersData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
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
      name: PropTypes.array,
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
  combineAddress: PropTypes.func.isRequired,
  mapToTelecoms: PropTypes.func.isRequired,
  manageUserEnabled: PropTypes.bool,
};

export default sizeMeHOC(PractitionerTable);
