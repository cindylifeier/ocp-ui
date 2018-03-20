import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import Util from 'utils/Util';
import ErrorText from 'components/ErrorText';
import Link from 'react-router-dom/es/Link';
import { RaisedButton } from 'material-ui';
import { DATE_PICKER_MODE, PATIENTS_URL } from 'containers/App/constants';
import { addButtonStyle } from 'components/ManageCommunication/constants';
import { teal500, white } from 'material-ui/styles/colors';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import { uniqueId } from 'lodash';
import MenuItem from 'material-ui/MenuItem';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRowColumn from 'components/TableRowColumn';
import TableRow from 'components/TableRow';
import { getRoleName } from 'utils/CommunicationUtils';
import isEmpty from 'lodash/isEmpty';
import FormGrid from 'components/FormGrid';
import FormCell from 'components/FormCell';
import Checkbox from 'components/Checkbox';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import TextField from 'components/TextField';
import DatePicker from 'components/DatePicker';
import SelectField from 'components/SelectField';
import messages from './messages';

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
    handleOpen,
    selectedRecipients,
    handleRemoveRecipient,
    selectedPatient,
    initialSelectedRecipients,
  } = props;
  const hasRecipients = !isEmpty(selectedRecipients);
  const handleRemoveSelectedRecipient = (check, reference) => {
    handleRemoveRecipient(check, reference);
  };

  function createRecipientTableRows() {
    return selectedRecipients && selectedRecipients.map((recipient) => (
      <TableRow key={uniqueId()}>
        <TableRowColumn>
          {recipient.display}
        </TableRowColumn>
        <TableRowColumn>
          {getRoleName(recipient.reference)}
        </TableRowColumn>
        <TableRowColumn>
          <StyledRaisedButton
            backgroundColor={teal500}
            labelColor={white}
            onClick={() => handleRemoveSelectedRecipient(false, recipient.reference)}
            label={<FormattedMessage {...messages.form.removeRecipient} />}
          />
        </TableRowColumn>
      </TableRow>
    ));
  }

  return (
    <Form>
      <FormGrid columns={12}>
        <FormCell top={1} left={1} width={2}>
          <span>Patient: </span> {getPatientName(selectedPatient)}
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
        <FormCell top={3} left={1} width={7}>
          <Grid columns="2fr 2fr 3fr" gap="">
            <Cell>
              <SelectField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.status} />}
                name="statusCode"
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
                name="topic"
                disabled
              />
            </Cell>
            <Cell>
              <SelectField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.context} />}
                name="episodeOfCareCode"
                fullWidth
              >
                {episodeOfCares && episodeOfCares.map((episodeOfCare) => (
                  <MenuItem key={uniqueId()} value={episodeOfCare.reference} primaryText={episodeOfCare.display} />
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
            name="notDoneReasonCode"
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
                name="categoryCode"
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
                name="mediumCode"
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
          <RaisedButton
            fullWidth
            backgroundColor={teal500}
            labelColor={white}
            onClick={handleOpen}
            style={addButtonStyle}
            label={<FormattedMessage {...messages.form.addRecipient} />}
          />
        </FormCell>
        <FormCell top={11} left={1} width={10}>
          { selectedRecipients && selectedRecipients.length > 0 &&
            <Table>
              <TableHeader key={uniqueId()}>
                <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderName} />}</TableHeaderColumn>
                <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderRole} />}</TableHeaderColumn>
                <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderAction} />}</TableHeaderColumn>
              </TableHeader>
              {createRecipientTableRows()}
            </Table>
          }
          {!hasRecipients &&
          <ErrorText>{hasRecipients ?
            '' : <FormattedMessage {...messages.validation.noRecipients} />}
          </ErrorText>
          }
        </FormCell>

        <FormCell top={12} left={1} width={2}>
          <Grid columns="1fr 1fr" gap="6vw">
            <Cell>
              <StyledRaisedButton
                type="submit"
                backgroundColor={teal500}
                labelColor={white}
                label={isSubmitting ?
                  <FormattedMessage {...messages.form.savingButton} /> :
                  <FormattedMessage {...messages.form.saveButton} />}
                disabled={!isDirty(dirty, selectedRecipients, initialSelectedRecipients) || isSubmitting || !isValid || !hasRecipients}
              />
            </Cell>
            <Cell>
              <StyledFlatButton
                type="button"
                default
                label={<FormattedMessage {...messages.form.cancelButton} />}
                disabled={isSubmitting}
                containerElement={<Link to={PATIENTS_URL} />}
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
  initialSelectedRecipients: PropTypes.array.isRequired,
  communicationNotDoneReasons: PropTypes.array.isRequired,
  communicationMedia: PropTypes.array.isRequired,
  episodeOfCares: PropTypes.array.isRequired,
  handleOpen: PropTypes.func.isRequired,
  selectedRecipients: PropTypes.array,
  selectedPatient: PropTypes.object.isRequired,
  handleRemoveRecipient: PropTypes.func.isRequired,
};

export default ManageCommunicationForm;

function isDirty(dirty, selectedRecipients, initialSelectedRecipients) {
  let isFormDirty = dirty;
  const identityOfArray = 'reference';
  if (!Util.isUnorderedArraysEqual(selectedRecipients, initialSelectedRecipients, identityOfArray)) {
    isFormDirty = true;
  }
  return isFormDirty;
}


function getPatientName(patient) {
  if (patient && patient.name && patient.name.length > 0) {
    const name = patient.name[0];
    return (name && name.firstName && name.lastName) ? name.firstName.concat(' ').concat(name.lastName) : '';
  }
  return '';
}
