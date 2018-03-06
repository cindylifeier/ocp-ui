import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';
import { teal500, white } from 'material-ui/styles/colors';

import { POSTAL_CODE_PATTERN } from 'containers/App/constants';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import messages from './messages';

function AddMultipleAddressForm(props) {
  const postalCodePattern = new RegExp(POSTAL_CODE_PATTERN);

  const {
    uspsStates,
    initialValues,
    onAddAddress,
    onRemoveAddress,
    handleCloseDialog,
  } = props;

  // TODO: remove button color
  return (
    <div>
      <Formik
        onSubmit={(values) => {
          onAddAddress(values);
          if (initialValues) {
            onRemoveAddress(initialValues.index);
          }
          handleCloseDialog();
        }}
        initialValues={{ ...(initialValues || {}).address }}
        validationSchema={yup.object().shape({
          line1: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          city: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          state: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          postalCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .matches(postalCodePattern, (<FormattedMessage {...messages.validation.postalCode} />)),
          country: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Grid columns="repeat(2, 1fr)">
              <Cell>
                <TextField
                  fullWidth
                  name="line1"
                  hintText={<FormattedMessage {...messages.hintText.line1} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.line1} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="line2"
                  hintText={<FormattedMessage {...messages.hintText.line2} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.line2} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="city"
                  hintText={<FormattedMessage {...messages.hintText.city} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.city} />}
                />
              </Cell>
              <Cell>
                <SelectField
                  fullWidth
                  name="state"
                  hintText={<FormattedMessage {...messages.hintText.state} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.state} />}
                >
                  {uspsStates && uspsStates.map((uspsState) =>
                    <MenuItem key={uspsState.code} value={uspsState.code} primaryText={uspsState.display} />,
                  )}
                </SelectField>
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="postalCode"
                  hintText={<FormattedMessage {...messages.hintText.postalCode} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.postalCode} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="country"
                  hintText={<FormattedMessage {...messages.hintText.country} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.country} />}
                />
              </Cell>
              <Cell>
                <StyledRaisedButton
                  type="submit"
                  backgroundColor={teal500}
                  labelColor={white}
                  label={<FormattedMessage {...messages.saveAddressButton} />}
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

AddMultipleAddressForm.propTypes = {
  onAddAddress: PropTypes.func.isRequired,
  onRemoveAddress: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number.isRequired,
    address: PropTypes.object.isRequired,
  }),
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
};

export default AddMultipleAddressForm;

