import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { teal500, white } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import uniqueId from 'lodash/uniqueId';
import messages from './messages';
import TextField from '../TextField';
import SelectField from '../SelectField';
import { DATE_PICKER_MODE, PATIENTS_URL } from '../../containers/App/constants';
import styles from './styles.css';
import DatePicker from '../DatePicker';
import Table from '../Table/index';
import TableHeader from '../TableHeader/index';
import TableHeaderColumn from '../TableHeaderColumn/index';
import TableRow from '../TableRow/index';
import TableRowColumn from '../TableRowColumn/index';
import { addButtonStyle, removeButtonStyle } from './constants';
import { getParticipantName } from '../../utils/CareTeamUtils';

function ManageCareTeamForm(props) {
  const today = new Date();
  const {
    isSubmitting,
    dirty,
    isValid,
    careTeamCategories,
    careTeamStatuses,
    handleOpen,
    hasParticipants,
    selectedParticipants,
    removeParticipant,
  } = props;
  const handleRemoveParticipant = (participant) => {
    removeParticipant(participant);
  };
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

        <div className={styles.title}>
          <FormattedMessage {...messages.participantTitle} />
        </div>
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
        {dirty &&
        <div className={styles.participantError}>{hasParticipants ?
          '' : <FormattedMessage {...messages.validation.checkParticipants} />}
        </div>
        }
        <Table>
          <TableHeader>
            <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderName} />}</TableHeaderColumn>
            <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderRole} />}</TableHeaderColumn>
            <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderPeriod} />}</TableHeaderColumn>
            <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderAction} />}</TableHeaderColumn>
          </TableHeader>
          {selectedParticipants && selectedParticipants.length > 0 &&
          selectedParticipants.map((participant) => (
            <TableRow key={uniqueId()}>
              <TableRowColumn> {getParticipantName(participant)} </TableRowColumn>
              <TableRowColumn>{participant.role.display}</TableRowColumn>
              <TableRowColumn />
              <TableRowColumn>
                <RaisedButton
                  backgroundColor={teal500}
                  labelColor={white}
                  onClick={() => handleRemoveParticipant(participant)}
                  style={removeButtonStyle}
                  label={<FormattedMessage {...messages.removeParticipantBtnLabel} />}
                  primary
                />
              </TableRowColumn>
            </TableRow>
          ))
          }
          {
            selectedParticipants && selectedParticipants.length === 0 &&
            <TableRow>
              <TableRowColumn>
                <span><FormattedMessage {...messages.noParticipantAdded} /></span>
              </TableRowColumn>
            </TableRow>
          }
        </Table>
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem} ${styles.buttonGroup}`}>
            <RaisedButton
              fullWidth
              type="submit"
              label="Save"
              backgroundColor={teal500}
              labelColor={white}
              disabled={!dirty || isSubmitting || !isValid || !hasParticipants}
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
  hasParticipants: PropTypes.bool.isRequired,
  selectedParticipants: PropTypes.array,
  careTeamCategories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  careTeamStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
};

export default ManageCareTeamForm;
