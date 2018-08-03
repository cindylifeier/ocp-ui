import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { Cell, Grid } from 'styled-css-grid';
import uniq from 'lodash/uniq';

import TextField from 'components/TextField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import FormSubtitle from 'components/FormSubtitle';
import CustomErrorText from 'components/CustomErrorText';
import AssignPermissionGroupOnOrganization from 'components/AssignPermissionGroupOnOrganization';
import ManageUserFormGrid from './ManageUserFormGrid';
import messages from './messages';
import { PATIENT } from './constants';


function ManageUserForm(props) {
  const {
    isSubmitting, dirty, isValid, values, errors,
    user, groups, resourceType,
  } = props;
  const assignedOrganizations = values.roles && values.roles.map((role) => role.organization);
  let duplicatedAssignedOrganization = false;
  if (assignedOrganizations) {
    duplicatedAssignedOrganization = uniq(assignedOrganizations).length !== assignedOrganizations.length;
  }
  const assignPermissionGroupProps = {
    user,
    groups,
    resourceType,
    errors,
    roles: values.roles,
  };
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
        <Cell area="assignPermissionGroup">
          <AssignPermissionGroupOnOrganization {...assignPermissionGroupProps} />
          {duplicatedAssignedOrganization &&
          <CustomErrorText><FormattedMessage {...messages.validation.duplicatedOrganization} /></CustomErrorText>
          }
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
  errors: PropTypes.object,
  user: PropTypes.object,
  groups: PropTypes.array,
  resourceType: PropTypes.string,
};

export default ManageUserForm;
