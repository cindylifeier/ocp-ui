import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';

import { EMAIL_SYSTEM, PHONE_SYSTEM } from 'utils/constants';
import { PHONE_PATTERN } from 'containers/App/constants';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import FieldGroupGrid from 'components/FieldGroupGrid';
import SystemCell from 'components/FieldGroupGrid/SystemCell';
import ValueCell from 'components/FieldGroupGrid/ValueCell';
import messages from './messages';

function AddMultipleTelecomsForm(props) {
  const phonePattern = new RegExp(PHONE_PATTERN);
  const {
    telecomSystems,
    telecomUses,
    initialValues,
    onAddTelecom,
    onRemoveTelecom,
    handleCloseDialog,
  } = props;

  return (
    <div>
      <Formik
        onSubmit={(values) => {
          if (initialValues) {
            onRemoveTelecom(initialValues.index);
          }
          onAddTelecom(values);
          handleCloseDialog();
        }}
        initialValues={{ ...(initialValues || {}).telecom }}
        validationSchema={yup.object().shape({
          system: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          value: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .when('system', {
              is: EMAIL_SYSTEM,  // alternatively: (val) => val == true
              then: yup.string().email(),
              otherwise: null,
            })
            .when('system', {
              is: PHONE_SYSTEM,  // alternatively: (val) => val == true
              then: yup
                .string()
                .matches(phonePattern, (<FormattedMessage {...messages.validation.phone} />)),
              otherwise: null,
            }),
        })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Grid columns={4}>
              <Cell width={3}>
                <FieldGroupGrid>
                  <SystemCell>
                    <SelectField
                      name="system"
                      hintText={<FormattedMessage {...messages.hintText.system} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.system} />}
                      fullWidth
                    >
                      {telecomSystems && telecomSystems.map((telecomSystem) => (
                        <MenuItem
                          key={telecomSystem.code}
                          value={telecomSystem.code}
                          primaryText={telecomSystem.display}
                        />))}
                    </SelectField>
                  </SystemCell>
                  <ValueCell>
                    <TextField
                      name="value"
                      hintText={<FormattedMessage {...messages.hintText.value} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.value} />}
                      fullWidth
                    />
                  </ValueCell>
                </FieldGroupGrid>
              </Cell>
              <Cell width={1}>
                <SelectField
                  name="use"
                  hintText={<FormattedMessage {...messages.hintText.use} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.use} />}
                  fullWidth
                >
                  {telecomUses && telecomUses.map((telecomUse) => (
                    <MenuItem
                      key={telecomUse.code}
                      value={telecomUse.code}
                      primaryText={telecomUse.display}
                    />))}
                </SelectField>
              </Cell>
              <Cell width={4}>
                <StyledRaisedButton
                  type="submit"
                  label={<FormattedMessage {...messages.saveButton} />}
                  disabled={!dirty || isSubmitting || !isValid}
                />
                <StyledFlatButton
                  type="reset"
                  label={<FormattedMessage {...messages.cancelButton} />}
                  onClick={handleCloseDialog}
                />
              </Cell>
            </Grid>
          </Form>
        )}
      />
    </div>
  );
}

AddMultipleTelecomsForm.propTypes = {
  onAddTelecom: PropTypes.func.isRequired,
  onRemoveTelecom: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number.isRequired,
    telecom: PropTypes.object.isRequired,
  }),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  telecomUses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })).isRequired,
};

export default AddMultipleTelecomsForm;

