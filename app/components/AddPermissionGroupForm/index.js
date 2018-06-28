/**
 *
 * AddPermissionGroupForm
 *
 */

import React from 'react';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { Form, Formik } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import yup from 'yup';

import ListBoxField from 'components/ListBoxField';
import TextField from 'components/TextField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import PropTypes from 'prop-types';
import PermissionGroupInfoSection from './PermissionGroupInfoSection';
import messages from './messages';
import PermissionGroupPageTitle from './PermissonGroupPageTitle';

class AddPermissionGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(selected) {
    this.setState({ selected });
  }
  render() {
    const options = [];
    const { selected } = this.state;
    const {
      handleCloseDialog,
      handleSaveGroup,
      initialValues,
      scopes,
    } = this.props;
    scopes.map((scope) => {
      const { id, description } = scope;
      const option = { value: id, label: description };
      return options.push(option);
    });
    return (
      <div>
        <Formik
          onSubmit={(values, actions) => {
            handleSaveGroup(values, actions);
            handleCloseDialog();
          }}
          initialValues={initialValues}
          validationSchema={yup.object().shape({
            displayName: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            description: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            scopes: yup.array()
              .min(1)
              .required((<FormattedMessage {...messages.validation.required} />)),
          })}
          render={({ isSubmitting, dirty, isValid }) => (
            <Form>
              <PermissionGroupInfoSection>
                <Grid columns={3}>
                  <Cell width={1}>
                    <TextField
                      name="displayName"
                      hintText={<FormattedMessage {...messages.hintText.groupName} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.groupName} />}
                      fullWidth
                    />
                  </Cell>
                  <Cell width={3}>
                    <TextField
                      name="description"
                      hintText={<FormattedMessage {...messages.hintText.description} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.description} />}
                      fullWidth
                    />
                  </Cell>
                </Grid>
              </PermissionGroupInfoSection>
              <PermissionGroupPageTitle>Add permissions</PermissionGroupPageTitle>
              <PermissionGroupInfoSection>
                <ListBoxField
                  name="scopes"
                  canFilter
                  availableLabel={'Scopes'}
                  selectedLabel={'Added Scopes'}
                  options={options}
                  selected={selected}
                  handleChange={this.onChange}
                />
              </PermissionGroupInfoSection>
              <div>
                <StyledRaisedButton
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  <FormattedMessage {...messages.saveButton} />
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

AddPermissionGroupForm.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  handleSaveGroup: PropTypes.func.isRequired,
  scopes: PropTypes.array,
  initialValues: PropTypes.object,
};

export default AddPermissionGroupForm;
