import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FieldArray, Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import find from 'lodash/find';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { teal500, white } from 'material-ui/styles/colors';
import styles from './styles.css';
import messages from './messages';
import TextField from '../TextField';
import SelectField from '../SelectField';
import { DATE_PICKER_MODE, HOME_URL } from '../../containers/App/constants';
import DatePicker from '../DatePicker';
import AddArtifactForm from '../AddArtifactForm';
import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';

class ManageActivityDefinitionForm extends React.PureComponent {

  static addButtonStyle = { width: '150px' };

  constructor(props) {
    super(props);
    this.state = {
      addArtifactsDialogOpen: false,
    };
    this.handleAddArtifactsClick = this.handleAddArtifactsClick.bind(this);
  }

  handleAddArtifactsClick() {
    this.setState((prevState) => ({ addArtifactsDialogOpen: !prevState.addArtifactsDialogOpen }));
  }

  render() {
    const {
      organization,
      publicationStatuses,
      definitionTopics,
      resourceTypes,
      actionParticipantTypes,
      actionParticipantRoles,
      relatedArtifactTypes,
      isSubmitting, dirty, isValid, errors,
      values,
    } = this.props;

    const today = new Date();

    return (
      <div>
        <div className={styles.title}>
          <FormattedMessage {...messages.title} />
        </div>
        <Form>
          <div className={styles.organizationInfoSection}>
            <div className={styles.organizationInfoLabel}>
              {<FormattedMessage {...messages.hintText.organizationNameLabel} />}
            </div>
            <div className={styles.organizationName}>
              {organization.name}
            </div>
          </div>
          <div className={styles.gridContainer}>
            <div className={`${styles.gridItem} ${styles.version}`}>
              <TextField
                fullWidth
                name="version"
                hintText={<FormattedMessage {...messages.hintText.version} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.version} />}
              />
            </div>
            <div className={`${styles.gridItem} ${styles.systemName}`}>
              <TextField
                fullWidth
                name="name"
                hintText={<FormattedMessage {...messages.hintText.systemName} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.systemName} />}
              />
            </div>
            <div className={`${styles.gridItem} ${styles.displayName}`}>
              <TextField
                fullWidth
                name="title"
                hintText={<FormattedMessage {...messages.hintText.displayName} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.displayName} />}
              />
            </div>
            <div className={`${styles.gridItem} ${styles.description}`}>
              <TextField
                fullWidth
                name="description"
                hintText={<FormattedMessage {...messages.hintText.description} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.description} />}
              />
            </div>
            <div className={styles.lastPublishDateLabel}>
              {<FormattedMessage {...messages.hintText.lastPublishDateLabel} />}
            </div>
            <div className={styles.lastPublishDate}>
              {organization.name}
            </div>
            <div className={`${styles.gridItem} ${styles.timeGroup}`}>
              <DatePicker
                fullWidth
                name="effectiveStart"
                mode={DATE_PICKER_MODE.LANDSCAPE}
                minDate={today}
                hintText={<FormattedMessage {...messages.hintText.effectiveStart} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.effectiveStart} />}
              />
              <DatePicker
                fullWidth
                name="effectiveEnd"
                minDate={today}
                mode={DATE_PICKER_MODE.LANDSCAPE}
                hintText={<FormattedMessage {...messages.hintText.effectiveEnd} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.effectiveEnd} />}
              />
              <TextField
                fullWidth
                name="duration"
                hintText={<FormattedMessage {...messages.hintText.duration} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.duration} />}
              />
              <TextField
                fullWidth
                name="frequency"
                hintText={<FormattedMessage {...messages.hintText.frequency} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.frequency} />}
              />
            </div>
            <div className={`${styles.gridItem} ${styles.serviceGroup}`}>
              <SelectField
                fullWidth
                name="status"
                hintText={<FormattedMessage {...messages.hintText.status} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
              >
                {publicationStatuses && publicationStatuses.map((status) =>
                  <MenuItem key={status.code} value={status} primaryText={status.display} />,
                )}
              </SelectField>
              <SelectField
                fullWidth
                name="topic"
                hintText={<FormattedMessage {...messages.hintText.topic} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.topic} />}
              >
                {definitionTopics && definitionTopics.map((topic) =>
                  <MenuItem key={topic.code} value={topic} primaryText={topic.display} />,
                )}
              </SelectField>
              <SelectField
                fullWidth
                name="kind"
                hintText={<FormattedMessage {...messages.hintText.resourceType} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.resourceType} />}
              >
                {resourceTypes && resourceTypes.map((kind) =>
                  <MenuItem key={kind.code} value={kind} primaryText={kind.display} />,
                )}
              </SelectField>
            </div>
            <div className={`${styles.gridItem} ${styles.participantGroup}`}>
              <SelectField
                fullWidth
                name="participantType"
                hintText={<FormattedMessage {...messages.hintText.participantType} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.participantType} />}
              >
                {actionParticipantTypes && actionParticipantTypes.map((type) =>
                  <MenuItem key={type.code} value={type} primaryText={type.display} />,
                )}
              </SelectField>
              <SelectField
                fullWidth
                name="participantRole"
                hintText={<FormattedMessage {...messages.hintText.participantRole} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.participantRole} />}
              >
                {actionParticipantRoles && actionParticipantRoles.map((role) =>
                  <MenuItem key={role.code} value={role} primaryText={role.display} />,
                )}
              </SelectField>
            </div>
          </div>
          <div className={styles.title}>
            <FormattedMessage {...messages.relatedArtifacts.subtitle} />
          </div>
          <div className={styles.addArtifactsButton}>
            <RaisedButton
              backgroundColor={teal500}
              labelColor={white}
              onClick={this.handleAddArtifactsClick}
              style={ManageActivityDefinitionForm.addButtonStyle}
              label={<FormattedMessage {...messages.relatedArtifacts.addButtonLabel} />}
            />
            <Dialog
              open={this.state.addArtifactsDialogOpen}
            >
              <FieldArray
                name="relatedArtifact"
                render={(arrayHelpers) => (
                  <AddArtifactForm
                    onAddArtifact={arrayHelpers.push}
                    relatedArtifactTypes={relatedArtifactTypes}
                    callback={this.handleAddArtifactsClick}
                  />)}
              />
            </Dialog>
            <Table>
              <TableHeader>
                <TableHeaderColumn><FormattedMessage {...messages.relatedArtifacts.tableColumnName} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.relatedArtifacts.tableColumnType} /></TableHeaderColumn>
              </TableHeader>
              {errors && errors.relatedArtifact && <span className={styles.error}>{errors.relatedArtifact}</span>}
              {values.relatedArtifact.map(({ display, type }) => (
                <TableRow key={`${display}-${type}`}>
                  <TableRowColumn>{display}</TableRowColumn>
                  <TableRowColumn>{find(relatedArtifactTypes, { code: type }).display}</TableRowColumn>
                </TableRow>
              ))}
            </Table>
          </div>
          <div className={styles.gridContainer}>
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
                containerElement={<Link to={HOME_URL} />}
              />
            </div>
          </div>
        </Form>
      </div>
    );
  }

}

ManageActivityDefinitionForm.propTypes = {
  organization: PropTypes.object.isRequired,
  publicationStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  definitionTopics: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  resourceTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  actionParticipantTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  actionParticipantRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  relatedArtifactTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  values: PropTypes.object,
};

export default ManageActivityDefinitionForm;
