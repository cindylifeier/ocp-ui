import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { Cell, Grid } from 'styled-css-grid';
import uniq from 'lodash/uniq';
import Util from 'utils/Util';
import MenuItem from 'material-ui/MenuItem';


import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import FormSubtitle from 'components/FormSubtitle';
import ManageUserFormGrid from './ManageUserFormGrid';
import messages from './messages';
import { PATIENT } from './constants';


function ManageUserForm(props) {
  const {
    isSubmitting, dirty, isValid, values,
    user, groups, resourceType,
  } = props;
  const assignedOrganizations = values.roles && values.roles.map((role) => role.organization);
  let duplicatedAssignedOrganization = false;
  if (assignedOrganizations) {
    duplicatedAssignedOrganization = uniq(assignedOrganizations).length !== assignedOrganizations.length;
  }
  return (
    <Form>
      <ManageUserFormGrid>
        {resourceType !== PATIENT && <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        }
        {resourceType === PATIENT && <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.patientTitle} />
          </FormSubtitle>
        </Cell>
        }
        <Cell area="firstName">
          <TextField
            fullWidth
            name="firstName"
            hintText={<FormattedMessage {...messages.hintText.firstName} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.firstName} />}
            disabled
          />
        </Cell>
        <Cell area="lastName">
          <TextField
            fullWidth
            name="lastName"
            hintText={<FormattedMessage {...messages.hintText.lastName} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastName} />}
            disabled
          />
        </Cell>
        <Cell area="username">
          <TextField
            fullWidth
            name="username"
            hintText={<FormattedMessage {...messages.hintText.username} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.username} />}
          />
        </Cell>
        <Cell area="password">
          <TextField
            fullWidth
            name="password"
            type="password"
            hintText={<FormattedMessage {...messages.hintText.password} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.password} />}
          />
        </Cell>
        <Cell area="repeatPassword">
          <TextField
            fullWidth
            name="repeatPassword"
            type="password"
            hintText={<FormattedMessage {...messages.hintText.confirmPassword} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.confirmPassword} />}
          />
        </Cell>
        <Cell area="assignPermissionGroupSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.assignPermissionGroupSubtitle} />
          </FormSubtitle>
        </Cell>
        <Cell area="organization">
          <SelectField
            name="organization"
            hintText={<FormattedMessage {...messages.hintText.organization} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.organization} />}
            fullWidth
            disabled
          >
            {user && user.practitionerRoles &&
            user.practitionerRoles.map((practitionerRoles) => (
              <MenuItem
                key={practitionerRoles.organization.reference.split('/').pop()}
                value={practitionerRoles.organization.reference.split('/').pop()}
                primaryText={practitionerRoles.organization.display}
              />),
            )}
          </SelectField>
        </Cell>
        <Cell area="group">
          <SelectField
            name="group"
            fullWidth
            hintText={<FormattedMessage {...messages.hintText.permissionGroup} />}
            floatingLabelText={
              <FormattedMessage {...messages.floatingLabelText.permissionGroup} />}
          >
            {groups.map((group) => {
              const displayName = group.displayName.split('.').pop();
              return (
                <MenuItem
                  key={group.id}
                  value={group}
                  primaryText={Util.deCamelize(displayName)}
                />);
            })}
          </SelectField>
        </Cell>
        <Cell area="buttonGroup">
          <Grid columns={2}>
            <Cell>
              <StyledRaisedButton
                fullWidth
                type="submit"
                disabled={!dirty || isSubmitting || !isValid || duplicatedAssignedOrganization}
              >
                <FormattedMessage {...messages.saveButton} />
              </StyledRaisedButton>
            </Cell>
            <Cell>
              <GoBackButton disabled={isSubmitting} />
            </Cell>
          </Grid>
        </Cell>
      </ManageUserFormGrid>
    </Form>
  );
}

ManageUserForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  values: PropTypes.object,
  user: PropTypes.object,
  groups: PropTypes.array,
  resourceType: PropTypes.string,
};

export default ManageUserForm;
