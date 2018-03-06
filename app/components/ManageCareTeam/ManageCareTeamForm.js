import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { teal500, white } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import isEmpty from 'lodash/isEmpty';

import Util from 'utils/Util';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import FormSubtitle from 'components/FormSubtitle';
import { DATE_PICKER_MODE, PATIENTS_URL } from 'containers/App/constants';
import SelectedParticipants from './SelectedParticipants';
import { addButtonStyle } from './constants';
import messages from './messages';
import styles from './styles.css';

function ManageCareTeamForm(props) {
  const today = new Date();
  const {
    isSubmitting,
    dirty,
    isValid,
    careTeamCategories,
    careTeamReasons,
    careTeamStatuses,
    handleOpen,
    selectedParticipants,
    initialSelectedParticipants,
    removeParticipant,
  } = props;

  const selectedParticipantsProps = {
    selectedParticipants,
    removeParticipant,
  };

  // To check whether has participant
  const hasParticipants = !isEmpty(selectedParticipants);

  return (
    <div>
      <Form>
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem} ${styles.careTeamName}`}>
            <TextField
              fullWidth
              name="careTeamName"
              hintText={<FormattedMessage {...messages.hintText.careTeamName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.careTeamName} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.category}`}>
            <SelectField
              fullWidth
              name="category"
              hintText={<FormattedMessage {...messages.hintText.category} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.category} />}
            >
              {careTeamCategories && careTeamCategories.map((category) =>
                <MenuItem key={category.code} value={category.code} primaryText={category.display} />,
              )}
            </SelectField>
          </div>
          <div className={`${styles.gridItem} ${styles.status}`}>
            <SelectField
              fullWidth
              name="status"
              hintText={<FormattedMessage {...messages.hintText.status} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
            >
              {careTeamStatuses && careTeamStatuses.map((status) =>
                <MenuItem key={status.code} value={status.code} primaryText={status.display} />,
              )}
            </SelectField>
          </div>
          <div className={`${styles.gridItem} ${styles.episodeOfCare}`}>
            <TextField
              fullWidth
              name="episodeOfCare"
              hintText={<FormattedMessage {...messages.hintText.episodeOfCare} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.episodeOfCare} />}
              disabled
            />
          </div>
          <div className={`${styles.gridItem} ${styles.reason}`}>
            <SelectField
              fullWidth
              name="reason"
              hintText={<FormattedMessage {...messages.hintText.reason} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.reason} />}
            >
              {careTeamReasons && careTeamReasons.map((reason) =>
                <MenuItem key={reason.code} value={reason.code} primaryText={reason.display} />,
              )}
            </SelectField>
          </div>
          <div className={`${styles.gridItem} ${styles.startDate}`}>
            <DatePicker
              fullWidth
              name="startDate"
              minDate={today}
              mode={DATE_PICKER_MODE.LANDSCAPE}
              hintText={<FormattedMessage {...messages.hintText.startDate} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startDate} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.endDate}`}>
            <DatePicker
              fullWidth
              name="endDate"
              minDate={today}
              mode={DATE_PICKER_MODE.LANDSCAPE}
              hintText={<FormattedMessage {...messages.hintText.endDate} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endDate} />}
            />
          </div>
        </div>

        <FormSubtitle>
          <FormattedMessage {...messages.participantTitle} />
        </FormSubtitle>
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem} ${styles.addParticipant}`}>
            <RaisedButton
              fullWidth
              backgroundColor={teal500}
              labelColor={white}
              onClick={handleOpen}
              style={addButtonStyle}
              label={<FormattedMessage {...messages.addParticipantBtnLabel} />}
            />
          </div>
        </div>

        <SelectedParticipants {...selectedParticipantsProps} />

        {!hasParticipants &&
        <div className={styles.participantError}>{hasParticipants ?
          '' : <FormattedMessage {...messages.validation.checkParticipants} />}
        </div>
        }
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem} ${styles.buttonGroup}`}>
            <RaisedButton
              fullWidth
              type="submit"
              label="Save"
              backgroundColor={teal500}
              labelColor={white}
              disabled={!reCheckFormDirty(dirty, selectedParticipants, initialSelectedParticipants) || isSubmitting || !isValid || !hasParticipants}
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

ManageCareTeamForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  selectedParticipants: PropTypes.array,
  initialSelectedParticipants: PropTypes.array,
  careTeamCategories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  careTeamReasons: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  careTeamStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
};

export default ManageCareTeamForm;

function reCheckFormDirty(dirty, selectedParticipants, originalSelectedParticipants) {
  let isDirty = dirty;
  const identityOfArray = 'memberId';
  if (!Util.isUnorderedArraysEqual(selectedParticipants, originalSelectedParticipants, identityOfArray)) {
    isDirty = true;
  }

  return isDirty;
}
