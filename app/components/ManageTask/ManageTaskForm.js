import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import uniqueId from 'lodash/uniqueId';

import Padding from 'components/Padding';
import AutoSuggestionField from 'components/AutoSuggestion';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import FormSubtitle from 'components/FormSubtitle';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import SubTaskTable from 'components/SubTaskTable';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import { mapToPatientName } from 'utils/PatientUtils';
import { MANAGE_TASK_URL, EMPTY_STRING } from './constants';
import messages from './messages';
import ManageTaskFormGrid from './ManageTaskFormGrid';

function ManageTaskForm(props) {
  const datePickerLandscapeMode = 'landscape';

  const {
    taskStatus,
    requestIntent,
    requestPriority,
    taskPerformerType,
    activityDefinitions,
    practitioners,
    eventTypes,
    tasksByPatient,
    subTasks,
    patient,
    isSubmitting, dirty, isValid, isMainTask, organization, requester,
  } = props;
  const today = new Date();
  const ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
  const PATIENT_NAME_HTML_ID = uniqueId('patient_name_');

  function createReferenceBaseSuggestions(entries) {
    return entries && entries
      .filter((entry) => (entry.reference !== null) && (entry.display !== null))
      .map((entry) => ({
        value: entry.reference,
        label: entry.display,
      }));
  }

  function createCodeBaseSuggestions(entries) {
    return entries && entries
      .filter((entry) => (entry.code !== null) && (entry.display !== null))
      .map((entry) => ({
        value: entry.code,
        label: entry.display,
      }));
  }

  const activityDefinitionSuggestions = createReferenceBaseSuggestions(activityDefinitions);
  const taskStatusSuggestions = createCodeBaseSuggestions(taskStatus);
  const requestPrioritySuggestions = createCodeBaseSuggestions(requestPriority);
  const requestIntentSuggestions = createCodeBaseSuggestions(requestIntent);
  const practitionersSuggestions = createReferenceBaseSuggestions(practitioners);
  const taskPerformerTypeSuggestions = createCodeBaseSuggestions(taskPerformerType);

  return (
    <Form>
      <ManageTaskFormGrid>
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        <Cell area="activityDefinition">
          <Padding top={'25'}>
            <AutoSuggestionField
              fullWidth
              name="activityDefinition"
              placeholder={<FormattedMessage {...messages.floatingLabelText.activityDefinitions} />}
              suggestions={activityDefinitionSuggestions}
              disabled={!isMainTask}
              {...props}
            />
          </Padding>
        </Cell>
        <Cell area="selOrganization">
          <InfoSection margin="4vh 0 0 0">
            <InlineLabel htmlFor={ORGANIZATION_NAME_HTML_ID}><FormattedMessage {...messages.floatingLabelText.organization} />&nbsp;
            </InlineLabel>
            <span id={ORGANIZATION_NAME_HTML_ID}>{organization && organization.name}</span>
          </InfoSection>
        </Cell>
        <Cell area="patientName">
          <InfoSection margin="2vh 0 0 0">
            <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}><FormattedMessage {...messages.hintText.patientName} />&nbsp;
            </InlineLabel>
            <span id={PATIENT_NAME_HTML_ID}>{mapToPatientName(patient)}</span>
          </InfoSection>
        </Cell>
        <Cell area="selRequester">
          <InfoSection margin="2vh 0 0 0">
            <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}><FormattedMessage {...messages.hintText.requester} />&nbsp;
            </InlineLabel>
            <span id={PATIENT_NAME_HTML_ID}>{getResourceName(requester)}</span>
          </InfoSection>
        </Cell>
        <Cell area="authoredOn">
          <DatePicker
            fullWidth
            name="authoredOn"
            disabled
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
            disabled
            defaultDate={today}
            minDate={today}
            maxDate={today}
            hintText={<FormattedMessage {...messages.hintText.lastModifiedDate} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastModifiedDate} />}
          />
        </Cell>
        <Cell area="status">
          <Padding top={'25'}>
            <AutoSuggestionField
              name="status"
              placeholder={<FormattedMessage {...messages.floatingLabelText.status} />}
              suggestions={taskStatusSuggestions}
              {...props}
            />
          </Padding>
        </Cell>
        <Cell area="priority">
          <Padding top={'25'}>
            <AutoSuggestionField
              name="priority"
              placeholder={<FormattedMessage {...messages.floatingLabelText.priority} />}
              suggestions={requestPrioritySuggestions}
              {...props}
            />
          </Padding>
        </Cell>
        <Cell area="intent">
          <Padding top={'25'}>
            <AutoSuggestionField
              name="intent"
              placeholder={<FormattedMessage {...messages.floatingLabelText.intent} />}
              suggestions={requestIntentSuggestions}
              {...props}
            />
          </Padding>
        </Cell>
        <Cell area="context">
          {(eventTypes && eventTypes.length > 0) &&
          <SelectField
            fullWidth
            name="context"
            hintText={<FormattedMessage {...messages.hintText.episodeOdCare} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.episodeOdCare} />}
            disabled={!isMainTask}
          >
            {eventTypes && eventTypes.map((eventType) =>
              <MenuItem key={uniqueId()} value={eventType.reference} primaryText={eventType.display} />,
            )}
          </SelectField>
          }
        </Cell>
        <Cell area="taskOwner">
          <Padding top={'25'}>
            <AutoSuggestionField
              name="taskOwner"
              placeholder={<FormattedMessage {...messages.floatingLabelText.taskOwner} />}
              suggestions={practitionersSuggestions}
              {...props}
            />
          </Padding>
        </Cell>
        <Cell area="performerType">
          <Padding top={'25'}>
            <AutoSuggestionField
              name="performerType"
              placeholder={<FormattedMessage {...messages.floatingLabelText.performerType} />}
              suggestions={taskPerformerTypeSuggestions}
              {...props}
            />
          </Padding>
        </Cell>

        <Cell area="partOf">
          {(tasksByPatient && tasksByPatient.length > 0) && !isMainTask &&
          <SelectField
            fullWidth
            disabled
            name="partOf"
            hintText={<FormattedMessage {...messages.hintText.partOf} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.partOf} />}
          >
            {tasksByPatient && tasksByPatient.map((partOf) =>
              <MenuItem key={uniqueId()} value={partOf.reference} primaryText={partOf.display} />,
            )}
          </SelectField>
          }
        </Cell>
        <Cell area="taskStart">
          <DatePicker
            fullWidth
            name="taskStart"
            mode={datePickerLandscapeMode}
            hintText={<FormattedMessage {...messages.hintText.taskStart} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.taskStart} />}
          />
        </Cell>
        <Cell area="taskEnd">
          <DatePicker
            fullWidth
            name="taskEnd"
            minDate={today}
            mode={datePickerLandscapeMode}
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
        {isMainTask && <Cell area="subTasksSection">
          <SubTaskTable elements={subTasks} patientId={patient.id} taskBaseUrl={MANAGE_TASK_URL} />
        </Cell>
        }
        <Cell area="buttonGroup">
          <Grid columns={2}>
            <Cell>
              <StyledRaisedButton
                fullWidth
                type="submit"
                disabled={!dirty || isSubmitting || !isValid}
              >
                Save
              </StyledRaisedButton>
            </Cell>
            <Cell>
              <GoBackButton disabled={isSubmitting} />
            </Cell>
          </Grid>
        </Cell>
      </ManageTaskFormGrid>
    </Form>
  );
}

ManageTaskForm.propTypes = {
  activityDefinitions: PropTypes.array,
  subTasks: PropTypes.array,
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
  isMainTask: PropTypes.bool.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  organization: PropTypes.object,
  requester: PropTypes.object,
};

export default ManageTaskForm;

function getResourceName(resource) {
  if (resource === undefined || resource === null) {
    return EMPTY_STRING;
  }
  const names = resource.name;
  return names && names
    .map((name) => {
      const firstName = name.firstName !== EMPTY_STRING ? name.firstName : EMPTY_STRING;
      const lastName = name.lastName !== EMPTY_STRING ? name.lastName : EMPTY_STRING;
      return `${firstName} ${lastName}`;
    })
    .join(', ');
}
