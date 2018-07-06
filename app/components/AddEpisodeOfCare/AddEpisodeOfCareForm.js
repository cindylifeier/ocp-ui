import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';
import find from 'lodash/find';
import merge from 'lodash/merge';


import { DATE_PICKER_MODE } from 'containers/App/constants';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import DatePicker from 'components/DatePicker';
import SelectField from 'components/SelectField';
import messages from './messages';

function AddEpisodeOfCareForm(props) {
  const {
    initialValues,
    onAddEpisodeOfCare,
    onRemoveEpisodeOfCare,
    handleCloseDialog,
    practitioners,
    episodeOfCareStatus,
    episodeOfCareType,
  } = props;
  const today = new Date();
  return (
    <div>
      <Formik
        onSubmit={(values) => {
          if (initialValues) {
            onRemoveEpisodeOfCare(initialValues.index);
          }

          const { status, startDate, endDate, type, careManager } = values;
          const selectedCareManager = find(practitioners, { reference: careManager });
          const episodeOfCare = {
            type,
            status,
            startDate: startDate && startDate.toLocaleString(),
            endDate: endDate && endDate.toLocaleString(),
            careManager: selectedCareManager,
          };
          onAddEpisodeOfCare(merge(values, episodeOfCare));

          handleCloseDialog();
        }}
        initialValues={{ ...(initialValues || {}).episodeOfCare }}
        validationSchema={() =>
          yup.lazy((values) => {
            let defaultStartDate = new Date();
            if (values.startDate) {
              defaultStartDate = values.startDate;
            }
            return yup.object().shape({
              type: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              status: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              startDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />)),
              endDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(defaultStartDate.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
            });
          })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Grid columns="repeat(2, 1fr)">
              <Cell>
                <SelectField
                  fullWidth
                  name={'status'}
                  hintText={<FormattedMessage {...messages.hintText.status} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
                >
                  {episodeOfCareStatus && episodeOfCareStatus.map((eocStatus) =>
                    (<MenuItem
                      key={eocStatus.code}
                      value={eocStatus.code}
                      primaryText={eocStatus.display}
                    />),
                  )}
                </SelectField>
              </Cell>
              <Cell>
              </Cell>
              <Cell>
                <SelectField
                  fullWidth
                  name={'type'}
                  hintText={<FormattedMessage {...messages.hintText.type} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.type} />}
                >
                  {episodeOfCareType && episodeOfCareType.map((eocType) =>
                    (<MenuItem
                      key={eocType.code}
                      value={eocType.code}
                      primaryText={eocType.display}
                    />),
                  )}
                </SelectField>
              </Cell>
              <Cell>
                <SelectField
                  fullWidth
                  name={'careManager'}
                  hintText={<FormattedMessage {...messages.hintText.careManager} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.careManager} />}
                >
                  {practitioners && practitioners.map((practitioner) =>
                    (<MenuItem
                      key={practitioner.reference}
                      value={practitioner.reference}
                      primaryText={practitioner.display}
                    />),
                  )}
                </SelectField>
              </Cell>
              <Cell>
                <DatePicker
                  fullWidth
                  name="startDate"
                  mode={DATE_PICKER_MODE.LANDSCAPE}
                  minDate={today}
                  hintText={<FormattedMessage {...messages.hintText.startDate} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startDate} />}
                />
              </Cell>
              <Cell>
                <DatePicker
                  fullWidth
                  name="endDate"
                  mode={DATE_PICKER_MODE.LANDSCAPE}
                  minDate={today}
                  hintText={<FormattedMessage {...messages.hintText.endDate} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endDate} />}
                />
              </Cell>
              <Cell>
                <StyledRaisedButton
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  <FormattedMessage {...messages.saveButton} />
                </StyledRaisedButton>
                <StyledFlatButton type="reset" onClick={handleCloseDialog}>
                  <FormattedMessage {...messages.cancelButton} />
                </StyledFlatButton>
              </Cell>
            </Grid>
          </Form>
        )}
      />
    </div>
  );
}

AddEpisodeOfCareForm.propTypes = {
  onAddEpisodeOfCare: PropTypes.func.isRequired,
  onRemoveEpisodeOfCare: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number,
    flag: PropTypes.object,
  }),
  practitioners: PropTypes.array,
  episodeOfCareStatus: PropTypes.array,
  episodeOfCareType: PropTypes.array,
};

export default AddEpisodeOfCareForm;

