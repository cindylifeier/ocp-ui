import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import InlineLabel from 'components/InlineLabel';
import FormSubtitle from 'components/FormSubtitle';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import AddArtifacts from 'components/AddArtifacts';
import ManageActivityDefinitionFormGrid from './ManageActivityDefinitionFormGrid';
import messages from './messages';

class ManageActivityDefinitionForm extends React.Component {
  constructor(props) {
    super(props);
    this.ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
    this.LAST_PUBLISHED_DATE_HTML_ID = uniqueId('last_published_date_');
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

    const addArtifactsProps = {
      relatedArtifactTypes,
      errors,
      relatedArtifacts: values.relatedArtifacts,
    };

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
                <MenuItem key={status.code} value={status.code} primaryText={status.display} />,
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
                <MenuItem key={topic.code} value={topic.code} primaryText={topic.display} />,
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
                <MenuItem key={kind.code} value={kind.code} primaryText={kind.display} />,
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
                <MenuItem key={type.code} value={type.code} primaryText={type.display} />,
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
                <MenuItem key={role.code} value={role.code} primaryText={role.display} />,
              )}
            </SelectField>
          </Cell>
          <Cell area="relatedArtifactsSection">
            <AddArtifacts {...addArtifactsProps} />
          </Cell>
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
        </ManageActivityDefinitionFormGrid>
      </Form>
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
