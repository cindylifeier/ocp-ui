/**
 *
 * AddAssociateRole
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray, Form, Formik } from 'formik';
import yup from 'yup';

import FormSubtitle from 'components/FormSubtitle';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import Table from 'components/Table';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import AutoSuggestionField from 'components/AutoSuggestion';
import { flattenOrganization } from './helpers';
import messages from './messages';


class AddAssociateRole extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { roleType, specialtyType, organizationContext } = this.props;
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

    const { logicalId, name } = organizationContext;
    return (
      <div>
        <FormSubtitle margin="1vh 0 0 0">
          <FormattedMessage {...messages.header} />
        </FormSubtitle>
        <FieldArray
          name="practitionerRoles"
          render={(arrayHelpers) => (
            <Formik
              onSubmit={(values, actions) => {
                const { code, specialty } = values;
                actions.setSubmitting(false);
                arrayHelpers.push({
                  organization: { reference: `Organization/${logicalId}`, display: `${name}` },
                  code,
                  specialty,
                  active: true,
                });
              }}
              validationSchema={yup.object().shape({
                code: yup.string()
                  .required((<FormattedMessage {...messages.validation.required} />)),
                specialty: yup.string()
                  .required((<FormattedMessage {...messages.validation.required} />)),
              })}
              render={() => {
                const flattenedOrganization = flattenOrganization(organizationContext);
                const { addresses, identifiers, active } = flattenedOrganization;
                return (
                  <Form>
                    <Table margin="0px">
                      <TableHeader columns=".5fr .5fr .5fr .3fr .7fr .7fr .3fr">
                        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderName} /></TableHeaderColumn>
                        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAddress} /></TableHeaderColumn>
                        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderId} /></TableHeaderColumn>
                        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
                        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderCode} /></TableHeaderColumn>
                        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderSpecialty} /></TableHeaderColumn>
                        <TableHeaderColumn />
                      </TableHeader>
                      <TableRow columns=".5fr .5fr .5fr .3fr .7fr .7fr .3fr" key={logicalId}>
                        <TableRowColumn>{name}</TableRowColumn>
                        <TableRowColumn>{addresses}</TableRowColumn>
                        <TableRowColumn>{identifiers}</TableRowColumn>
                        <TableRowColumn>{active}</TableRowColumn>
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
                      </TableRow>
                    </Table>
                  </Form>
                );
              }}
            />
          )}
        />
      </div>
    );
  }
}

AddAssociateRole.propTypes = {
  roleType: PropTypes.array.isRequired,
  specialtyType: PropTypes.array.isRequired,
  organizationContext: PropTypes.shape({
    name: PropTypes.string.isRequired,
    identifiers: PropTypes.array,
    addresses: PropTypes.array,
    logicalId: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
};

export default AddAssociateRole;
