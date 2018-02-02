import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { teal500, white } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import messages from './messages';
import TextField from '../TextField';
import SelectField from '../SelectField';
import { PATIENTS_URL } from '../../containers/App/constants';
import styles from './styles.css';

function ManageCareTeamForm(props) {
  const {
    isSubmitting,
    dirty,
    isValid,
    careTeamCategories,
    careTeamStatuses,
    handleOpen,
  } = props;
  return (
    <div>
      <h4><FormattedMessage {...messages.title} /></h4>
      <Form>
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem} ${styles.careTeamName}`}>
            <TextField
              name="careTeamName"
              hintText={<FormattedMessage {...messages.hintText.careTeamName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.careTeamName} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.category}`}>
            <SelectField
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
              name="episodeOfCare"
              hintText={<FormattedMessage {...messages.hintText.episodeOfCare} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.episodeOfCare} />}
              disabled
            />
          </div>
          <div className={`${styles.gridItem} ${styles.startDate}`}>
            <TextField
              name="startDate"
              hintText={<FormattedMessage {...messages.hintText.startDate} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startDate} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.endDate}`}>
            <TextField
              name="endDate"
              hintText={<FormattedMessage {...messages.hintText.endDate} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endDate} />}
            />
          </div>
        </div>
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem} ${styles.addParticipant}`}>
            <RaisedButton
              backgroundColor={teal500}
              labelColor={white}
              onClick={handleOpen}
              label={<FormattedMessage {...messages.addParticipantBtnLabel} />}
              primary
            />
          </div>
        </div>
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem} ${styles.buttonGroup}`}>
            <RaisedButton
              type="submit"
              label="Save"
              backgroundColor={teal500}
              labelColor={white}
              disabled={!dirty || isSubmitting || !isValid}
            />
            <FlatButton
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
