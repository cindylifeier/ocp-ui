import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';
import find from 'lodash/find';
import remove from 'lodash/remove';


import { DATE_PICKER_MODE } from 'containers/App/constants';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import DatePicker from 'components/DatePicker';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import messages from './messages';

function isDuplicate(initialValues, flags, code, category) {
  if (initialValues !== null) {
    return find(remove(flags, initialValues.index), { code, category }) !== undefined;
  }
  return find(flags, { code, category }) !== undefined;
}

function AddFlagForm(props) {
  const {
    initialValues,
    onAddFlag,
    onRemoveFlag,
    handleCloseDialog,
    flagStatuses,
    flagCategories,
    flags,
  } = props;

  const today = new Date();

  return (
    <div>
      <Formik
        onSubmit={(values) => {
          if (initialValues) {
            onRemoveFlag(initialValues.index);
          }
          onAddFlag(values);
          handleCloseDialog();
        }}
        initialValues={{ ...(initialValues || { flag: { flagStart: new Date() } }).flag }}
        validationSchema={() =>
          yup.lazy((values) => {
            let flagStart = new Date();
            if (values.flagStart) {
              flagStart = values.flagStart;
            }
            return yup.object().shape({
              code: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              category: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              status: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              flagStart: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />)),
              flagEnd: yup.date()
                .min(flagStart.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
            });
          })}
        render={({ isSubmitting, dirty, isValid, values }) => (
          <Form>
            <Grid columns="repeat(2, 1fr)">
              <Cell>
                <SelectField
                  fullWidth
                  name={'status'}
                  hintText={<FormattedMessage {...messages.hintText.status} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
                >
                  {flagStatuses && flagStatuses.map((rt) =>
                    (<MenuItem
                      key={rt.code}
                      value={rt.code}
                      primaryText={rt.display}
                    />),
                  )}
                </SelectField>
              </Cell>
              <Cell>
                <SelectField
                  fullWidth
                  name={'category'}
                  hintText={<FormattedMessage {...messages.hintText.category} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.category} />}
                >
                  {flagCategories && flagCategories.map((rt) =>
                    (<MenuItem
                      key={rt.code}
                      value={rt.code}
                      primaryText={rt.display}
                    />),
                  )}
                </SelectField>
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="code"
                  hintText={<FormattedMessage {...messages.hintText.code} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.code} />}
                />
              </Cell>
              <Cell />
              <Cell>
                <DatePicker
                  fullWidth
                  name="flagStart"
                  mode={DATE_PICKER_MODE.LANDSCAPE}
                  defaultDate={today}
                  minDate={today}
                  hintText={<FormattedMessage {...messages.hintText.startDate} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startDate} />}
                />
              </Cell>
              <Cell>
                <DatePicker
                  fullWidth
                  name="flagEnd"
                  mode={DATE_PICKER_MODE.LANDSCAPE}
                  minDate={today}
                  hintText={<FormattedMessage {...messages.hintText.endDate} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endDate} />}
                />
              </Cell>
              <Cell>
                <StyledRaisedButton
                  type="submit"
                  label={<FormattedMessage {...messages.saveFlagButton} />}
                  disabled={!dirty || isSubmitting || !isValid || isDuplicate(initialValues, flags, values.code, values.category)}
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

AddFlagForm.propTypes = {
  onAddFlag: PropTypes.func.isRequired,
  onRemoveFlag: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number,
    flag: PropTypes.object,
  }),
  flagStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  flagCategories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  flags: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    code: PropTypes.string,
    status: PropTypes.string,
    author: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
  })),
};

export default AddFlagForm;

