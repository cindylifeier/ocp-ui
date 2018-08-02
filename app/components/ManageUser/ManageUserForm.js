import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { Cell, Grid } from 'styled-css-grid';

import TextField from 'components/TextField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import FormSubtitle from 'components/FormSubtitle';
import AssignPermissionGroupOnOrganization from 'components/AssignPermissionGroupOnOrganization';
import ManageUserFormGrid from './ManageUserFormGrid';
import messages from './messages';
import { PATIENT } from './constants';


function ManageUserForm(props) {
  const {
    user, groups, isSubmitting, dirty, isValid, resourceType,
  } = props;
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
            hintText={<FormattedMessage {...messages.hintText.repeatPassword} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.repeatPassword} />}
          />
        </Cell>
        <Cell area="assignPermissionGroup">
          <AssignPermissionGroupOnOrganization user={user} groups={groups} />
        </Cell>
        <Cell area="buttonGroup">
          <Grid columns={2}>
            <Cell>
              <StyledRaisedButton
                fullWidth
                type="submit"
                disabled={!dirty || isSubmitting || !isValid}
              >
                Save
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
  user: PropTypes.object,
  groups: PropTypes.array,
  resourceType: PropTypes.string,
};

export default ManageUserForm;
