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

class AddAssignRolesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignRoles: [
        { id: '1', displayName: 'Permission Group 1' },
        { id: '2', displayName: 'Permission Group 2' },
        { id: '3', displayName: 'Permission Group 3' },
        { id: '4', displayName: 'Permission Group 4' },
        { id: '5', displayName: 'Permission Group 5' },
        { id: '6', displayName: 'Permission Group 6' },
      ],
    };
  }
  render() {
    const {
      handleCloseDialog,
      organization,
    } = this.props;
    return (
      <div>
        <Formik
          render={({ isSubmitting, dirty, isValid }) => (
            <Form>
              <div>
                <AddAssignRolesSection>
                  <div>
                    <div>Organization : {organization.identifiers.name} </div>
                    <RadioButtonGroup name="assignRoleButtonGroup">
                      {this.state.assignRoles && this.state.assignRoles.map((role) => (
                        <RadioButton
                          value={role.id}
                          label={role.displayName}
                          onClick={() => {}}
                        />))
                      }
                    </RadioButtonGroup>
                  </div>
                </AddAssignRolesSection>
                <StyledRaisedButton
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  <FormattedMessage {...messages.addButton} />
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
}

AddAssignRolesForm.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  organization: PropTypes.shape({
    identifiers: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default AddAssignRolesForm;
