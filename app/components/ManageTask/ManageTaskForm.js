import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { teal500, white } from 'material-ui/styles/colors';
import { DATE_PICKER_MODE, PATIENTS_URL } from '../../containers/App/constants';
import styles from './styles.css';
import messages from './messages';
import TextField from '../TextField';
import SelectField from '../SelectField';
import DatePicker from '../DatePicker';

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
    <div>
      <div className={styles.title}>
        <FormattedMessage {...messages.title} />
      </div>
      <Form>
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem} ${styles.activityDefinitions}`}>
            <SelectField
              fullWidth
              name="activityDefinition"
              hintText={<FormattedMessage {...messages.hintText.activityDefinitions} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.activityDefinitions} />}
            >
              {activityDefinitions && activityDefinitions.map((activityDefinition) =>
                <MenuItem key={activityDefinition.reference} value={activityDefinition.reference} primaryText={activityDefinition.display} />,
              )}
            </SelectField>
          </div>
          <div className={`${styles.gridItem} ${styles.contextInfoGroup}`}>
            <SelectField
              fullWidth
              name="organization"
              className={styles.orgName}
              hintText={<FormattedMessage {...messages.hintText.organization} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.organization} />}
            >
              {organization && organization.map((org) =>
                <MenuItem key={org.reference} value={org.reference} primaryText={org.display} />,
              )}
            </SelectField>

            <TextField
              fullWidth
              name="patientName"
              hintText={<FormattedMessage {...messages.hintText.patientName} />}
              floatingLabelText={<FormattedMessage
                {...messages.floatingLabelText.patientName}
              />}
              disabled
            />
            <TextField
              fullWidth
              name="requester"
              hintText={<FormattedMessage {...messages.hintText.requester} />}
              floatingLabelText={<FormattedMessage
                {...messages.floatingLabelText.requester}
              />}
              disabled
            />
          </div>
          <div className={`${styles.gridItem} ${styles.timeGroup}`}>
            <DatePicker
              fullWidth
              name="authoredOn"
              minDate={today}
              maxDate={today}
              hintText={<FormattedMessage {...messages.hintText.authoredOn} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.authoredOn} />}
            />
            <DatePicker
              fullWidth
              name="lastModifiedDate"
              defaultDate={today}
              minDate={today}
              maxDate={today}
              hintText={<FormattedMessage {...messages.hintText.lastModifiedDate} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastModifiedDate} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.serviceGroup}`}>

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
          </div>
          <div className={`${styles.gridItem} ${styles.contextGroup}`}>
            <SelectField
              fullWidth
              name="taskOwner"
              hintText={<FormattedMessage {...messages.hintText.taskOwner} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.taskOwner} />}
            >
              {practitioners && practitioners.map((practitioner) =>
                <MenuItem key={practitioner.reference} value={practitioner.reference} primaryText={practitioner.display} />,
              )}
            </SelectField>
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
          </div>

          <div className={`${styles.gridItem} ${styles.effectiveGroup}`}>
            <DatePicker
              fullWidth
              name="taskStart"
              mode={DATE_PICKER_MODE.LANDSCAPE}
              minDate={today}
              hintText={<FormattedMessage {...messages.hintText.taskStart} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.taskStart} />}
            />
            <DatePicker
              fullWidth
              name="taskEnd"
              minDate={today}
              mode={DATE_PICKER_MODE.LANDSCAPE}
              hintText={<FormattedMessage {...messages.hintText.taskEnd} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.taskEnd} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.description}`}>
            <TextField
              fullWidth
              name="description"
              multiLine
              rows={2}
              hintText={<FormattedMessage {...messages.hintText.description} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.description} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.comments}`}>
            <TextField
              fullWidth
              name="comments"
              multiLine
              rows={2}
              hintText={<FormattedMessage {...messages.hintText.comments} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.comments} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.buttonGroup}`}>
            <RaisedButton
              fullWidth
              type="submit"
              label="Save"
              backgroundColor={teal500}
              labelColor={white}
              disabled={!dirty || isSubmitting || !isValid}
            />
            <FlatButton
              fullWidth
              label="Cancel"
              default
              disabled={isSubmitting}
              containerElement={<Link to={PATIENTS_URL} />}
            />
          </div>
        </div>
      </Form>
    </div>
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
