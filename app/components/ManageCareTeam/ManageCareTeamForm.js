import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import { Cell, Grid } from 'styled-css-grid';

import Util from 'utils/Util';
import { mapToPatientName } from 'utils/PatientUtils';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import FormSubtitle from 'components/FormSubtitle';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import ErrorText from 'components/ErrorText';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import { DATE_PICKER_MODE, PATIENTS_URL } from 'containers/App/constants';
import SelectedParticipants from './SelectedParticipants';
import messages from './messages';
import ManageCareTeamFormGrid from './ManageCareTeamFormGrid';

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
    selectedPatient,
  } = props;

  const selectedParticipantsProps = {
    selectedParticipants,
    removeParticipant,
  };

  // To check whether has participant
  const hasParticipants = !isEmpty(selectedParticipants);
  const PATIENT_NAME_HTML_ID = uniqueId('patient_name_');

  return (
    <div>
      <Form>
        <ManageCareTeamFormGrid gap="1vw">
          <Cell area="generalInformationSubtitle">
            <FormSubtitle margin="0">
              <FormattedMessage {...messages.title} />
            </FormSubtitle>
          </Cell>
          <Cell area="selectedPatient">
            <InfoSection margin="2vh 0 0 0">
              <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}><FormattedMessage {...messages.labelPatientName} />&nbsp;
              </InlineLabel>
              <span id={PATIENT_NAME_HTML_ID}>{mapToPatientName(selectedPatient)}</span>
            </InfoSection>
          </Cell>
          <Cell area="careTeamName">
            <TextField
              fullWidth
              name="careTeamName"
              hintText={<FormattedMessage {...messages.hintText.careTeamName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.careTeamName} />}
            />
          </Cell>
          <Cell area="category">
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
          </Cell>
          <Cell area="status">
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
          </Cell>
          <Cell area="episodeOfCare">
            <TextField
              fullWidth
              name="episodeOfCare"
              hintText={<FormattedMessage {...messages.hintText.episodeOfCare} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.episodeOfCare} />}
              disabled
            />
          </Cell>
          <Cell area="reason">
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
          </Cell>
          <Cell area="startDate">
            <DatePicker
              fullWidth
              name="startDate"
              minDate={today}
              mode={DATE_PICKER_MODE.LANDSCAPE}
              hintText={<FormattedMessage {...messages.hintText.startDate} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startDate} />}
            />
          </Cell>
          <Cell area="endDate">
            <DatePicker
              fullWidth
              name="endDate"
              minDate={today}
              mode={DATE_PICKER_MODE.LANDSCAPE}
              hintText={<FormattedMessage {...messages.hintText.endDate} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endDate} />}
            />
          </Cell>
          <Cell area="participantSubtitle">
            <FormSubtitle margin="0">
              <FormattedMessage {...messages.participantTitle} />
            </FormSubtitle>
          </Cell>
          <Cell area="addParticipant">
            <StyledRaisedButton
              fullWidth
              onClick={handleOpen}
              label={<FormattedMessage {...messages.addParticipantBtnLabel} />}
            />
          </Cell>
          <Cell area="selectedParticipants">
            <SelectedParticipants {...selectedParticipantsProps} />
            {!hasParticipants &&
            <ErrorText>{hasParticipants ?
              '' : <FormattedMessage {...messages.validation.checkParticipants} />}
            </ErrorText>
            }
          </Cell>
          <Cell area="buttonGroup">
            <Grid columns={2}>
              <Cell>
                <StyledRaisedButton
                  fullWidth
                  type="submit"
                  label="Save"
                  disabled={!reCheckFormDirty(dirty, selectedParticipants, initialSelectedParticipants) || isSubmitting || !isValid || !hasParticipants}
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
        </ManageCareTeamFormGrid>
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
  selectedPatient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
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
