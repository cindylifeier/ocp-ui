/**
 *
 * AddAssignRolesForm
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import StyledRaisedButton from 'components/StyledRaisedButton';
import RadioButtonGroup from 'components/RadioButtonGroup';
import { RadioButton } from 'material-ui/RadioButton/index';
import StyledFlatButton from 'components/StyledFlatButton';
import messages from './messages';
import AddAssignRolesSection from './AddAssignRolesSection';

function AddAssignRolesForm(props) {
  const {
    handleCloseDialog,
    organization,
    handleAssignRole,
    groups,
  } = props;
  return (
    <div>
      <div>Organization : {organization.name} </div>
      <Formik
        onSubmit={(values, actions) => {
          handleAssignRole(values, actions);
        }}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <div>
              <AddAssignRolesSection>
                <div>
                  <RadioButtonGroup name="role">
                    {groups && groups.map((group) => (
                      <RadioButton
                        key={group.id}
                        value={group.id}
                        label={group.displayName}
                        onClick={() => {
                        }}
                      />))
                    }
                  </RadioButtonGroup>
                </div>
              </AddAssignRolesSection>
              <StyledRaisedButton
                type="submit"
                disabled={!dirty || isSubmitting || !isValid}
              >
                <FormattedMessage {...messages.assignButton} />
              </StyledRaisedButton>
              <StyledFlatButton type="reset" onClick={handleCloseDialog}>
                <FormattedMessage {...messages.cancelButton} />
              </StyledFlatButton>
            </div>
          </Form>
        )}
      />
    </div>
  );
}

AddAssignRolesForm.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  handleAssignRole: PropTypes.func,
  groups: PropTypes.array,
  organization: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default AddAssignRolesForm;
