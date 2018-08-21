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
import AutoSuggestionField from 'components/AutoSuggestion';
import { Form, Formik } from 'formik';
import 'react-select/dist/react-select.css';
import yup from 'yup';
import messages from './messages';


const tableColumns = '1fr 1fr 1.5fr .5fr 2fr 2fr 1fr';

class PractitionerRoleForOrganizationTable extends React.Component {

  constructor(props) {
    super(props);
    this.renderIdentifiers = this.renderIdentifiers.bind(this);
    this.findExistingOrganization = this.findExistingOrganization.bind(this);
  }

  findExistingOrganization(reference, existingOrganizations) {
    return find(existingOrganizations, ['organization.reference', reference]);
  }

  renderIdentifiers(identifiers) {
    return identifiers && identifiers.map((identifier) => (<div key={uniqueId()}>{identifier.systemDisplay}</div>));
  }

  render() {
    const { organizations, onAddPractitionerRole, existingOrganizations, onCloseDialog, roleType, specialtyType } = this.props;
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
              const { code, specialty } = values;
              actions.setSubmitting(false);
              onAddPractitionerRole({
                organization: { reference: `Organization/${org.id}`, display: `${org.name}` },
                code,
                specialty,
                active: true,
              });
              onCloseDialog();
            }}
            validationSchema={yup.object().shape({
              code: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              specialty: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
            })}
            render={(formikProps) => {
              const { isSubmitting, dirty, isValid } = formikProps;
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
                          <AutoSuggestionField
                            name="code"
                            isRequired
                            placeholder={<FormattedMessage {...messages.rolePlaceholder} />}
                            suggestions={roleSuggestions}
                            {...this.props}
                          />
                        </TableRowColumn>
                        <TableRowColumn>
                          <AutoSuggestionField
                            name="specialty"
                            isRequired
                            placeholder={<FormattedMessage {...messages.specialtyPlaceholder} />}
                            suggestions={specialtySuggestions}
                            {...this.props}
                          />
                        </TableRowColumn>
                        <TableRowColumn>
                          <StyledRaisedButton
                            type="submit"
                            value={org}
                            disabled={!dirty || isSubmitting || !isValid || this.findExistingOrganization(`Organization/${org.id}`, existingOrganizations) !== undefined}
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
  onAddPractitionerRole: PropTypes.func,
  existingOrganizations: PropTypes.array,
  onCloseDialog: PropTypes.func,
  roleType: PropTypes.array,
  specialtyType: PropTypes.array,
};

export default PractitionerRoleForOrganizationTable;
