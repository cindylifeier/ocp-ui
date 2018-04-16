/**
 *
 * OrganizationTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import RecordsRange from 'components/RecordsRange';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import TableHeader from 'components/TableHeader';
import Table from 'components/Table';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import OrganizationSlider from 'components/OrganizationSlider';
import messages from './messages';

const tableColumns = 'repeat(5, 1fr) 50px';
const ENTER_KEY = 'Enter';

class OrganizationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSlider: false,
      selectedOrganization: null,
    };
    this.handleSliderOpen = this.handleSliderOpen.bind(this);
    this.handleSliderClose = this.handleSliderClose.bind(this);
  }

  handleSliderOpen(selectedOrganization) {
    this.setState({
      selectedOrganization,
      openSlider: true,
    });
  }

  handleSliderClose() {
    this.setState({ openSlider: false });
  }

  render() {
    const { organizationData, flattenOrganizationData, onRowClick, relativeTop } = this.props;
    return (
      <div>
        {organizationData.loading && <RefreshIndicatorLoading />}
        {(!organizationData.loading && organizationData.data && organizationData.data.length > 0
            ? <div>
              <Table>
                <TableHeader columns={tableColumns} relativeTop={relativeTop}>
                  <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderOrganization} /></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAddress} /></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderTelecom} /></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderId} /></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
                </TableHeader>
                {!isEmpty(organizationData.data) && organizationData.data.map((organization) => {
                  const flattenOrganization = flattenOrganizationData(organization);
                  const { logicalId, name, addresses, telecoms, identifiers, active } = flattenOrganization;
                  const menuItems = [{
                    primaryText: <FormattedMessage {...messages.edit} />,
                    linkTo: `/ocp-ui/manage-organization/${logicalId}`,
                  }, {
                    primaryText: <FormattedMessage {...messages.viewDetails} />,
                    onClick: () => this.handleSliderOpen(flattenOrganization),
                  }, {
                    primaryText: <FormattedMessage {...messages.addLocation} />,
                    linkTo: '/ocp-ui/manage-location',
                  }, {
                    primaryText: <FormattedMessage {...messages.addHealthCareService} />,
                    linkTo: '/ocp-ui/manage-healthcare-service',
                  }, {
                    primaryText: <FormattedMessage {...messages.addActivityDefinition} />,
                    linkTo: '/ocp-ui/manage-activity-definition',
                  }, {
                    primaryText: <FormattedMessage {...messages.remove} />,
                    disabled: true,
                  }];
                  return (
                    <TableRow
                      columns={tableColumns}
                      key={logicalId}
                      onClick={() => onRowClick && onRowClick(organization)}
                      onKeyPress={(e) => {
                        if (e.key === ENTER_KEY) {
                          if (onRowClick) {
                            onRowClick(organization);
                          }
                        }
                        e.preventDefault();
                      }}
                      role="button"
                      tabIndex="0"
                    >
                      <TableRowColumn>{name}</TableRowColumn>
                      <TableRowColumn>{addresses}</TableRowColumn>
                      <TableRowColumn>{telecoms}</TableRowColumn>
                      <TableRowColumn>{identifiers}</TableRowColumn>
                      <TableRowColumn>
                        {active ?
                          <FormattedMessage {...messages.active} /> :
                          <FormattedMessage {...messages.inactive} />
                        }
                      </TableRowColumn>
                      <TableRowColumn>
                        <NavigationIconMenu menuItems={menuItems} />
                      </TableRowColumn>
                    </TableRow>
                  );
                })}
              </Table>
              {!!organizationData && !!organizationData.currentPage &&
              <div>
                <CenterAlignedUltimatePagination
                  currentPage={organizationData.currentPage}
                  totalPages={organizationData.totalNumberOfPages}
                  onChange={organizationData.handlePageClick}
                />
                <RecordsRange
                  currentPage={organizationData.currentPage}
                  totalPages={organizationData.totalNumberOfPages}
                  totalElements={organizationData.totalElements}
                  currentPageSize={organizationData.currentPageSize}
                />
              </div>}
            </div> :
            (<CenterAlign>
              <NoResultsFoundText>No organizations found</NoResultsFoundText>
            </CenterAlign>)
        )}
        {this.state.selectedOrganization &&
        <OrganizationSlider
          open={this.state.openSlider}
          onClose={this.handleSliderClose}
          organization={this.state.selectedOrganization}
        />
        }
      </div>
    );
  }
}

OrganizationTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  organizationData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handlePageClick: PropTypes.func.isRequired,
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
      name: PropTypes.string.isRequired,
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
    })).isRequired,
  }),
  onRowClick: PropTypes.func,
  flattenOrganizationData: PropTypes.func,
};

export default OrganizationTable;
