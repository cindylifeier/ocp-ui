import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { teal500, white } from 'material-ui/styles/colors';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import { uniqueId } from 'lodash';
import MenuItem from 'material-ui/MenuItem';
import messages from './messages';
import FormGrid from '../FormGrid';
import FormCell from '../FormCell';

import StyledRaisedButton from '../StyledRaisedButton/index';
import StyledFlatButton from '../StyledFlatButton/index';
import TextField from '../TextField';
import DatePicker from '../DatePicker';
import { DATE_PICKER_MODE } from '../../containers/App/constants';
import SelectField from '../SelectField/index';
import Checkbox from '../Checkbox/index';


function ManageCommunicationForm(props) {
  const today = new Date();
  const {
    isSubmitting,
    dirty,
    isValid,
    communicationStatus,
    communicationCategories,
    communicationNotDoneReasons,
    communicationMedia,
    episodeOfCares,
  } = props;
// Context =
  return (
    <Form>
      <FormGrid columns={12}>
        <FormCell top={1} left={1} width={2}>
          <span>Patient Name</span>
        </FormCell>
        <FormCell top={2} left={1} width={4}>
          <Grid columns="2fr 2fr" gap="">
            <Cell>
              <DatePicker
                fullWidth
                name="sent"
                minDate={today}
                mode={DATE_PICKER_MODE.LANDSCAPE}
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.sent} />}
              />
            </Cell>
            <Cell>
              <TextField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.sender} />}
                fullWidth
                name="sender"
                disabled
              />
            </Cell>
          </Grid>
        </FormCell>
        <FormCell top={3} left={1} width={6}>
          <Grid columns="2fr 2fr 2fr" gap="">
            <Cell>
              <SelectField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.status} />}
                name="status"
                fullWidth
              >
                {communicationStatus && communicationStatus.map((status) => (
                  <MenuItem key={uniqueId()} value={status.code} primaryText={status.display} />
                ))}
              </SelectField>
            </Cell>
            <Cell>
              <TextField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.topic} />}
                fullWidth
                name="Topic"
                disabled
              />
            </Cell>
            <Cell>
              <SelectField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.context} />}
                name="context"
                fullWidth
              >
                {episodeOfCares && episodeOfCares.map((episodeOfCare) => (
                  <MenuItem key={uniqueId()} value={episodeOfCare.code} primaryText={episodeOfCare.display} />
                ))}
              </SelectField>
            </Cell>
          </Grid>
        </FormCell>
        <FormCell top={4} left={1} width={3}>
          <Checkbox
            name="notDone"
            label={<FormattedMessage {...messages.form.floatingLabelText.notDone} />}
          >
          </Checkbox>
        </FormCell>
        <FormCell top={5} left={1} width={2}>
          <SelectField
            floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.notDoneReason} />}
            name="notDoneReason"
            fullWidth
          >
            {communicationNotDoneReasons && communicationNotDoneReasons.map((communicationNotDoneReason) => (
              <MenuItem key={uniqueId()} value={communicationNotDoneReason.code} primaryText={communicationNotDoneReason.display} />
            ))}
          </SelectField>
        </FormCell>
        <FormCell top={6} left={1} width={6}>
          <Grid columns="3fr 3fr" gap="">
            <Cell>
              <SelectField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.category} />}
                name="category"
                fullWidth
              >
                {communicationCategories && communicationCategories.map((category) => (
                  <MenuItem key={uniqueId()} value={category.code} primaryText={category.display} />
                ))}
              </SelectField>
            </Cell>
            <Cell>
              <SelectField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.medium} />}
                name="medium"
                fullWidth
              >
                {communicationMedia && communicationMedia.map((communicationMedium) => (
                  <MenuItem key={uniqueId()} value={communicationMedium.code} primaryText={communicationMedium.display} />
                ))}
              </SelectField>
            </Cell>
          </Grid>
        </FormCell>
        <FormCell top={7} left={1} width={2}>
          <Grid columns="2fr" gap="">
            <Cell>
              <TextField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.subject} />}
                fullWidth
                name="subject"
                disabled
              />
            </Cell>
          </Grid>
        </FormCell>
        <FormCell top={8} left={1} width={6}>
          <TextField
            floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.payloadContent} />}
            fullWidth
            name="payloadContent"
            multiLine
            rows={2}
            rowsMax={8}
          />
        </FormCell>
        <FormCell top={9} left={1} width={6}>
          <TextField
            floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.note} />}
            fullWidth
            name="note"
            multiLine
            rows={2}
            rowsMax={8}
          />
        </FormCell>
        <FormCell top={10} left={1} width={2}>
          <TextField
            floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.recipient} />}
            fullWidth
            name="recipient"
            disabled
          />
        </FormCell>

        <FormCell top={11} left={1} width={2}>
          <Grid columns="1fr 1fr" gap="1vw">
            <Cell>
              <StyledRaisedButton
                fullWidth
                type="submit"
                backgroundColor={teal500}
                labelColor={white}
                label={isSubmitting ?
                  <FormattedMessage {...messages.form.savingButton} /> :
                  <FormattedMessage {...messages.form.saveButton} />}
                disabled={!dirty || isSubmitting || !isValid}
              />
            </Cell>
            <Cell>
              <StyledFlatButton
                fullWidth
                type="button"
                default
                label={<FormattedMessage {...messages.form.cancelButton} />}
                // onClick={goBack}
              />
            </Cell>
          </Grid>
        </FormCell>
      </FormGrid>
    </Form>
  );
}

ManageCommunicationForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  communicationStatus: PropTypes.array.isRequired,
  communicationCategories: PropTypes.array.isRequired,
  communicationNotDoneReasons: PropTypes.array.isRequired,
  communicationMedia: PropTypes.array.isRequired,
  episodeOfCares: PropTypes.array.isRequired,
};

export default ManageCommunicationForm;
