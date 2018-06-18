/**
 *
 * PractitionerRoleForOrganizationTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import StyledRaisedButton from 'components/StyledRaisedButton';
import { Form, Formik } from 'formik';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import yup from 'yup';
import messages from './messages';

const tableColumns = '1fr 1fr 1.5fr .5fr 2fr 2fr 1fr';

class PractitionerRoleForOrganizationTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      role: {},
      specialty: {},
    };
    this.renderIdentifiers = this.renderIdentifiers.bind(this);
    this.findExistingOrganization = this.findExistingOrganization.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleSpecialtyChange = this.handleSpecialtyChange.bind(this);
    this.isRoleSelected = this.isRoleSelected.bind(this);
    this.isSpecialtySelected = this.isSpecialtySelected.bind(this);
  }

  handleRoleChange(selectedOption) {
    this.setState({ role: selectedOption });
  }

  handleSpecialtyChange(selectedOption) {
    this.setState({ specialty: selectedOption });
  }

  findExistingOrganization(reference, existingOrganizations) {
    return find(existingOrganizations, ['organization.reference', reference]);
  }

  isRoleSelected() {
    const { roleType } = this.props;
    const role = this.state.role && this.state.role.value && find(roleType, ['code', this.state.role.value]);
    return this.state.role && role;
  }

  isSpecialtySelected() {
    const { specialtyType } = this.props;
    const specialty = this.state.specialty && this.state.specialty.value && find(specialtyType, ['code', this.state.specialty.value]);
    return this.state.specialty && specialty;
  }

  renderIdentifiers(identifiers) {
    return identifiers && identifiers.map((identifier) => (<div key={uniqueId()}>{identifier.systemDisplay}</div>));
  }

  render() {
    const { organizations, onAddAssociateOrganization, existingOrganizations, callback, roleType, specialtyType } = this.props;
    const roleSuggestions = roleType
      .filter((entry) => (entry.code !== null) && (entry.display !== null))
      .map((entry) => ({
        value: entry.code,
        label: entry.display,
      }));

    const specialtySuggestions = specialtyType
      .filter((entry) => (entry.code !== null) && (entry.display !== null))
      .map((entry) => ({
        value: entry.code,
        label: entry.display,
      }));

    return (
      <div>
        <Table>
          <TableHeader columns={tableColumns}>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderOrganization} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAddress} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderId} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderCode} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderSpecialty} /></TableHeaderColumn>
            <TableHeaderColumn />
          </TableHeader>
        </Table>
        {!isEmpty(organizations) && organizations.length > 0 && organizations.map((org) => (
          <Formik
            key={org.id}
            initialValues={this.findExistingOrganization(`Organization/${org.id}`, existingOrganizations)}
            onSubmit={(values, actions) => {
              const { role, specialty } = this.state;

              actions.setSubmitting(false);
              onAddAssociateOrganization({
                organization: { reference: `Organization/${org.id}`, display: `${org.name}` },
                code: role.value,
                specialty: specialty.value,
                active: true,
              });
              callback();
            }}
            validationSchema={yup.object().shape({
            })}
            render={() => {
              const { name, address, id, identifiers, status } = org;
              return (
                <Form>
                  <Table>
                    <TableRow key={id}>
                      <TableRow
                        columns={tableColumns}
                        key={id}
                        role="button"
                        tabIndex="0"
                      >
                        <TableRowColumn>{name}</TableRowColumn>
                        <TableRowColumn>{address}</TableRowColumn>
                        <TableRowColumn>{this.renderIdentifiers(identifiers)}</TableRowColumn>
                        <TableRowColumn>{status}</TableRowColumn>
                        <TableRowColumn>
                          <Select
                            name="code"
                            value={this.state.role}
                            onChange={this.handleRoleChange}
                            options={roleSuggestions}
                          />
                        </TableRowColumn>
                        <TableRowColumn>
                          <Select
                            name="specialty"
                            value={this.state.specialty}
                            onChange={this.handleSpecialtyChange}
                            options={specialtySuggestions}
                          />
                        </TableRowColumn>
                        <TableRowColumn>
                          <StyledRaisedButton
                            type="submit"
                            value={org}
                            disabled={!this.isRoleSelected() || !this.isSpecialtySelected()}
                          >
                            Add
                          </StyledRaisedButton>
                        </TableRowColumn>
                      </TableRow>
                    </TableRow>
                  </Table>
                </Form>
              );
            }}
          />
        ))}
      </div>
    );
  }
}

PractitionerRoleForOrganizationTable.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  onAddAssociateOrganization: PropTypes.func,
  existingOrganizations: PropTypes.array,
  callback: PropTypes.func,
  roleType: PropTypes.array,
  specialtyType: PropTypes.array,
};

export default PractitionerRoleForOrganizationTable;
