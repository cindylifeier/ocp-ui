import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray, Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import find from 'lodash/find';
import uniqueId from 'lodash/uniqueId';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import { Cell, Grid } from 'styled-css-grid';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import AddArtifactForm from 'components/AddArtifactForm';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import InlineLabel from 'components/InlineLabel';
import FormSubtitle from 'components/FormSubtitle';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import ErrorText from 'components/ErrorText';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import messages from './messages';
import ManageActivityDefinitionFormGrid from './ManageActivityDefinitionFormGrid';

class ManageActivityDefinitionForm extends React.Component {

  static initialState = {
    artifactsDialogOpen: false,
    editingArtifact: null,
  };

  constructor(props) {
    super(props);
    this.state = { ...ManageActivityDefinitionForm.initialState };
    this.handleDialogCallback = this.handleDialogCallback.bind(this);
    this.handleAddArtifact = this.handleAddArtifact.bind(this);
    this.handleEditArtifact = this.handleEditArtifact.bind(this);
    this.ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
    this.LAST_PUBLISHED_DATE_HTML_ID = uniqueId('last_published_date_');
  }

  handleDialogCallback() {
    this.setState({ ...ManageActivityDefinitionForm.initialState });
  }

  handleAddArtifact() {
    this.setState({ artifactsDialogOpen: true });
  }

  handleEditArtifact(index, artifact) {
    this.setState((prevState) => ({
      artifactsDialogOpen: !prevState.artifactsDialogOpen,
      editingArtifact: { index, artifact },
    }));
  }

  render() {
    const {
      history,
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
      <Form>
        <ManageActivityDefinitionFormGrid>
          <Cell area="generalInformationSubtitle">
            <FormSubtitle margin="0">
              <FormattedMessage {...messages.title} />
            </FormSubtitle>
          </Cell>
          <Cell area="selectedOrganization">
            <InlineLabel htmlFor={this.ORGANIZATION_NAME_HTML_ID}>
              <FormattedMessage {...messages.hintText.organizationNameLabel} />&nbsp;
            </InlineLabel>
            <span id={this.ORGANIZATION_NAME_HTML_ID}>
              {organization.name}
            </span>
          </Cell>
          <Cell area="version">
            <TextField
              fullWidth
              name="version"
              hintText={<FormattedMessage {...messages.hintText.version} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.version} />}
            />
          </Cell>
          <Cell area="systemName">
            <TextField
              fullWidth
              name="name"
              hintText={<FormattedMessage {...messages.hintText.systemName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.systemName} />}
            />
          </Cell>
          <Cell area="displayName">
            <TextField
              fullWidth
              name="title"
              hintText={<FormattedMessage {...messages.hintText.displayName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.displayName} />}
            />
          </Cell>
          <Cell area="description">
            <TextField
              fullWidth
              name="description"
              hintText={<FormattedMessage {...messages.hintText.description} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.description} />}
            />
          </Cell>
          <Cell area="lastPublishDate">
            <InlineLabel htmlFor={this.LAST_PUBLISHED_DATE_HTML_ID}>
              <FormattedMessage {...messages.hintText.lastPublishDateLabel} />&nbsp;
            </InlineLabel>
            <span id={this.LAST_PUBLISHED_DATE_HTML_ID}>{organization.name}</span>
          </Cell>
          <Cell area="effectivePeriodStart">
            <DatePicker
              fullWidth
              name="effectiveStart"
              mode="landscape"
              minDate={today}
              hintText={<FormattedMessage {...messages.hintText.effectiveStart} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.effectiveStart} />}
            />
          </Cell>
          <Cell area="effectivePeriodEnd">
            <DatePicker
              fullWidth
              name="effectiveEnd"
              minDate={today}
              mode="landscape"
              hintText={<FormattedMessage {...messages.hintText.effectiveEnd} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.effectiveEnd} />}
            />
          </Cell>
          <Cell area="duration">
            <TextField
              fullWidth
              name="duration"
              hintText={<FormattedMessage {...messages.hintText.duration} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.duration} />}
            />
          </Cell>
          <Cell area="frequency">
            <TextField
              fullWidth
              name="frequency"
              hintText={<FormattedMessage {...messages.hintText.frequency} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.frequency} />}
            />
          </Cell>
          <Cell area="status">
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
          </Cell>
          <Cell area="topic">
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
          </Cell>
          <Cell area="kind">
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
          </Cell>
          <Cell area="participantType">
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
          </Cell>
          <Cell area="participantRole">
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
          </Cell>
          <Cell area="relatedArtifactSubtitle">
            <FormSubtitle margin="0">
              <FormattedMessage {...messages.relatedArtifacts.subtitle} />
            </FormSubtitle>
          </Cell>
          <Cell area="addArtifactsButton">
            <StyledRaisedButton
              onClick={this.handleAddArtifact}
              label={<FormattedMessage {...messages.relatedArtifacts.addButtonLabel} />}
            />
          </Cell>
          <Cell area="relatedArtifactsSection">
            <FieldArray
              name="relatedArtifact"
              render={(arrayHelpers) => (
                <div>
                  <Dialog
                    open={this.state.artifactsDialogOpen}
                  >
                    <AddArtifactForm
                      initialValues={this.state.editingArtifact}
                      arrayHelpers={arrayHelpers}
                      onAddArtifact={arrayHelpers.push}
                      onRemoveArtifact={arrayHelpers.remove}
                      relatedArtifactTypes={relatedArtifactTypes}
                      callback={this.handleDialogCallback}
                    />
                  </Dialog>
                  <Table>
                    <TableHeader>
                      <TableHeaderColumn><FormattedMessage {...messages.relatedArtifacts.tableColumnName} /></TableHeaderColumn>
                      <TableHeaderColumn><FormattedMessage {...messages.relatedArtifacts.tableColumnType} /></TableHeaderColumn>
                      <TableHeaderColumn><FormattedMessage {...messages.relatedArtifacts.tableColumnAction} /></TableHeaderColumn>
                    </TableHeader>
                    {errors && errors.relatedArtifact &&
                    <ErrorText>{errors.relatedArtifact}</ErrorText>}
                    {values.relatedArtifact.map((artifact, index) => {
                      const { display, type } = artifact;
                      return (
                        <TableRow key={`${display}-${type}`}>
                          <TableRowColumn>{display}</TableRowColumn>
                          <TableRowColumn>{find(relatedArtifactTypes, { code: type }).display}</TableRowColumn>
                          <TableRowColumn>
                            <NavigationStyledIconMenu>
                              <MenuItem
                                primaryText={<FormattedMessage {...messages.relatedArtifacts.actionLabelEdit} />}
                                onClick={() => this.handleEditArtifact(index, artifact)}
                              />
                              <MenuItem
                                primaryText={<FormattedMessage {...messages.relatedArtifacts.actionLabelRemove} />}
                                onClick={() => arrayHelpers.remove(index)}
                              />
                            </NavigationStyledIconMenu>
                          </TableRowColumn>
                        </TableRow>
                      );
                    })}
                  </Table>
                </div>)}
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
                  onClick={history.goBack}
                />
              </Cell>
            </Grid>
          </Cell>
        </ManageActivityDefinitionFormGrid>
      </Form>
    );
  }

}

ManageActivityDefinitionForm.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
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
