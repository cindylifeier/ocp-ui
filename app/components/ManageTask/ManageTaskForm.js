import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import FormSubtitle from 'components/FormSubtitle';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import { DATE_PICKER_MODE, PATIENTS_URL } from 'containers/App/constants';
import messages from './messages';
import ManageTaskFormGrid from './ManageTaskFormGrid';

function ManageTaskForm(props) {
  const {
    taskStatus,
    requestIntent,
    requestPriority,
    taskPerformerType,
    activityDefinitions,
    practitioners,
    eventTypes,
    organization,
    tasksByPatient,
    isSubmitting, dirty, isValid,
  } = props;

  const today = new Date();
  return (
    <Form>
      <ManageTaskFormGrid>
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        <Cell area="activityDefinitions">
          <SelectField
            fullWidth
            name="activityDefinition"
            hintText={<FormattedMessage {...messages.hintText.activityDefinitions} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.activityDefinitions} />}
          >
            {activityDefinitions && activityDefinitions.map((activityDefinition) => (
              <MenuItem
                key={activityDefinition.reference}
                value={activityDefinition.reference}
                primaryText={activityDefinition.display}
              />),
            )}
          </SelectField>
        </Cell>
        <Cell area="organization">
          <SelectField
            fullWidth
            name="organization"
            hintText={<FormattedMessage {...messages.hintText.organization} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.organization} />}
          >
            {organization && organization.map((org) =>
              <MenuItem key={org.reference} value={org.reference} primaryText={org.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="patientName">
          <TextField
            fullWidth
            name="patientName"
            hintText={<FormattedMessage {...messages.hintText.patientName} />}
            floatingLabelText={<FormattedMessage
              {...messages.floatingLabelText.patientName}
            />}
            disabled
          />
        </Cell>
        <Cell area="requester">
          <TextField
            fullWidth
            name="requester"
            hintText={<FormattedMessage {...messages.hintText.requester} />}
            floatingLabelText={<FormattedMessage
              {...messages.floatingLabelText.requester}
            />}
            disabled
          />
        </Cell>
        <Cell area="authoredOn">
          <DatePicker
            fullWidth
            name="authoredOn"
            minDate={today}
            maxDate={today}
            hintText={<FormattedMessage {...messages.hintText.authoredOn} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.authoredOn} />}
          />
        </Cell>
        <Cell area="lastModifiedDate">
          <DatePicker
            fullWidth
            name="lastModifiedDate"
            defaultDate={today}
            minDate={today}
            maxDate={today}
            hintText={<FormattedMessage {...messages.hintText.lastModifiedDate} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastModifiedDate} />}
          />
        </Cell>
        <Cell area="status">
          <SelectField
            fullWidth
            name="status"
            hintText={<FormattedMessage {...messages.hintText.status} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
          >
            {taskStatus && taskStatus.map((status) =>
              <MenuItem key={status.code} value={status.code} primaryText={status.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="priority">
          <SelectField
            fullWidth
            name="priority"
            hintText={<FormattedMessage {...messages.hintText.priority} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.priority} />}
          >
            {requestPriority && requestPriority.map((priority) =>
              <MenuItem key={priority.code} value={priority.code} primaryText={priority.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="intent">
          <SelectField
            fullWidth
            name="intent"
            hintText={<FormattedMessage {...messages.hintText.intent} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.intent} />}
          >
            {requestIntent && requestIntent.map((intent) =>
              <MenuItem key={intent.code} value={intent.code} primaryText={intent.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="context">
          {(eventTypes && eventTypes.length > 0) &&
          <SelectField
            fullWidth
            name="context"
            hintText={<FormattedMessage {...messages.hintText.eventType} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.eventType} />}
          >
            {eventTypes && eventTypes.map((eventType) =>
              <MenuItem key={eventType.code} value={eventType.code} primaryText={eventType.display} />,
            )}
          </SelectField>
          }
        </Cell>
        <Cell area="taskOwner">
          <SelectField
            fullWidth
            name="taskOwner"
            hintText={<FormattedMessage {...messages.hintText.taskOwner} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.taskOwner} />}
          >
            {practitioners && practitioners.map((practitioner) => (
              <MenuItem
                key={practitioner.reference}
                value={practitioner.reference}
                primaryText={practitioner.display}
              />),
            )}
          </SelectField>
        </Cell>
        <Cell area="performerType">
          <SelectField
            fullWidth
            name="performerType"
            hintText={<FormattedMessage {...messages.hintText.performerType} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.performerType} />}
          >
            {taskPerformerType && taskPerformerType.map((performerType) =>
              <MenuItem key={performerType.code} value={performerType.code} primaryText={performerType.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="partOf">
          {(tasksByPatient && tasksByPatient.length > 0) &&
          <SelectField
            fullWidth
            name="partOf"
            hintText={<FormattedMessage {...messages.hintText.partOf} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.partOf} />}
          >
            {tasksByPatient && tasksByPatient.map((partOf) =>
              <MenuItem key={partOf.reference} value={partOf.reference} primaryText={partOf.display} />,
            )}
          </SelectField>
          }
        </Cell>
        <Cell area="taskStart">
          <DatePicker
            fullWidth
            name="taskStart"
            mode={DATE_PICKER_MODE.LANDSCAPE}
            minDate={today}
            hintText={<FormattedMessage {...messages.hintText.taskStart} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.taskStart} />}
          />
        </Cell>
        <Cell area="taskEnd">
          <DatePicker
            fullWidth
            name="taskEnd"
            minDate={today}
            mode={DATE_PICKER_MODE.LANDSCAPE}
            hintText={<FormattedMessage {...messages.hintText.taskEnd} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.taskEnd} />}
          />
        </Cell>
        <Cell area="description">
          <TextField
            fullWidth
            name="description"
            multiLine
            rows={2}
            hintText={<FormattedMessage {...messages.hintText.description} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.description} />}
          />
        </Cell>
        <Cell area="comments">
          <TextField
            fullWidth
            name="comments"
            multiLine
            rows={2}
            hintText={<FormattedMessage {...messages.hintText.comments} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.comments} />}
          />
        </Cell>
        <Cell area="buttonGroup">
          <Grid columns={2}>
            <Cell>
              <StyledRaisedButton
                fullWidth
                type="submit"
                label="Save"
                disabled={!dirty || isSubmitting || !isValid}
              />
            </Cell>
            <Cell>
              <StyledFlatButton
                fullWidth
                label="Cancel"
                default
                disabled={isSubmitting}
                containerElement={<Link to={PATIENTS_URL} />}
              />
            </Cell>
          </Grid>
        </Cell>
      </ManageTaskFormGrid>
    </Form>
  );
}

ManageTaskForm.propTypes = {
  activityDefinitions: PropTypes.array,
  organization: PropTypes.array,
  practitioners: PropTypes.array,
  taskStatus: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  requestIntent: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  requestPriority: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  taskPerformerType: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  eventTypes: PropTypes.arrayOf(PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  })),
  tasksByPatient: PropTypes.arrayOf(PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  })),
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default ManageTaskForm;
