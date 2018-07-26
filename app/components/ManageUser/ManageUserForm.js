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


function ManageUserForm(props) {
  const {
    user, groups, isSubmitting, dirty, isValid,
  } = props;
  const organizations = user && user.episodeOdCare;
  return (
    <Form>
      <ManageUserFormGrid>
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        <Cell area="firstName">
          <TextField
            fullWidth
            name="firstName"
            hintText={<FormattedMessage {...messages.hintText.firstName} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.firstName} />}
          />
        </Cell>
        <Cell area="lastName">
          <TextField
            fullWidth
            name="lastName"
            hintText={<FormattedMessage {...messages.hintText.lastName} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastName} />}
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
            hintText={<FormattedMessage {...messages.hintText.password} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.password} />}
          />
        </Cell>
        <Cell area="repeatPassword">
          <TextField
            fullWidth
            name="repeatPassword"
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
            {organizations && organizations.map((organization) =>
              <MenuItem key={organization.id} value={organization.id} primaryText={organization.name} />,
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
};

export default ManageUserForm;
