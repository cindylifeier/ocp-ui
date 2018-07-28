import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import Util from 'utils/Util';
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
        <Cell area="organization">
          <SelectField
            fullWidth
            name="organization"
            hintText={<FormattedMessage {...messages.hintText.organization} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.organization} />}
          >
            {resourceType === 'Patient' &&
            <MenuItem
              key={user.organization && user.organization.reference}
              value={user.organization && user.organization.reference}
              primaryText={user.organization && user.organization.display}
            />
            }
            {resourceType === 'Practitioner' && user && user.practitionerRoles && user.practitionerRoles.map((practitionerRole) =>
              <MenuItem key={practitionerRole.organization.reference} value={practitionerRole.organization.reference} primaryText={practitionerRole.organization.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="permissionGroup">
          <SelectField
            fullWidth
            name="role"
            hintText={<FormattedMessage {...messages.hintText.permissionGroup} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.permissionGroup} />}
          >
            {groups && groups.map((group) => {
              const displayName = group.displayName.split('.');
              return (<MenuItem
                key={group.id}
                value={group.id}
                primaryText={Util.deCamelize(displayName[displayName.length - 1])}
              />);
            },
            )}
          </SelectField>
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
