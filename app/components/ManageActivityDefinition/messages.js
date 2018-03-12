/*
 * ManageHealthcareService Messages
 *
 * This contains all the text for the ManageHealthcareService component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManageActivityDefinition.title',
    defaultMessage: 'General Information',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    requiredRelatedArtifacts: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.requiredRelatedArtifacts',
      defaultMessage: 'Must have related artifacts',
    },
    minLengthdRelatedArtifacts: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.minLengthdRelatedArtifacts',
      defaultMessage: 'Minimum of 1 related artifacts',
    },
    invalid: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.minStartDate',
      defaultMessage: 'Effective Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.validation.minEndDate',
      defaultMessage: 'Effective End date field must be later than Effective Start date field',
    },
  },
  hintText: {
    organizationNameLabel: {
      id: 'app.containers.ManageActivityDefinition.manageForm.organizationNameLabel',
      defaultMessage: 'Organization:  ',
    },
    version: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.version',
      defaultMessage: 'Version',
    },
    systemName: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.systemName',
      defaultMessage: 'System Name',
    },
    displayName: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.displayName',
      defaultMessage: 'Display Name',
    },
    description: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.description',
      defaultMessage: 'Description',
    },
    lastPublishDateLabel: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.lastPublishDateLabel',
      defaultMessage: 'Last Publish Date:',
    },
    duration: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.duration',
      defaultMessage: 'Duration #Days',
    },
    frequency: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.frequency',
      defaultMessage: 'Frequency #Times',
    },
    effectiveStart: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.effectiveStart',
      defaultMessage: 'Effective Period: Start ',
    },
    effectiveEnd: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.effectiveEnd',
      defaultMessage: 'Effective Period: End ',
    },
    status: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.status',
      defaultMessage: 'Status',
    },
    topic: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.topic',
      defaultMessage: 'Topic',
    },
    resourceType: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.resourceType',
      defaultMessage: 'Resource Type',
    },
    participantType: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.participantType',
      defaultMessage: 'Participant Type',
    },
    participantRole: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.hintText.participantRole',
      defaultMessage: 'Participant Role',
    },
  },
  floatingLabelText: {
    version: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.version',
      defaultMessage: 'Version',
    },
    systemName: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.systemName',
      defaultMessage: 'System Name',
    },
    displayName: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.displayName',
      defaultMessage: 'Display Name',
    },
    description: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.description',
      defaultMessage: 'Description',
    },
    lastPublishDateLabel: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.lastPublishDateLabel',
      defaultMessage: 'Last Publish Date',
    },
    duration: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.duration',
      defaultMessage: 'Duration',
    },
    frequency: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.frequency',
      defaultMessage: 'Frequency',
    },
    effectiveStart: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.effectiveStart',
      defaultMessage: 'Effective Period: Start ',
    },
    effectiveEnd: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.effectiveEnd',
      defaultMessage: 'Effective Period: End ',
    },
    status: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.status',
      defaultMessage: 'Status',
    },
    topic: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.topic',
      defaultMessage: 'Topic',
    },
    resourceType: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.resourceType',
      defaultMessage: 'ResourceType',
    },
    participantType: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.participantType',
      defaultMessage: 'Participant Type',
    },
    participantRole: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.floatingLabelText.participantRole',
      defaultMessage: 'Participant Role',
    },
  },
  relatedArtifacts: {
    subtitle: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.relatedArtifacts.subtitle',
      defaultMessage: 'Related Artifacts',
    },
    addButtonLabel: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.relatedArtifacts.addButtonLabel',
      defaultMessage: 'Add Artifacts',
    },
    tableColumnName: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.relatedArtifacts.tableColumnName',
      defaultMessage: 'Name',
    },
    tableColumnType: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.relatedArtifacts.tableColumnType',
      defaultMessage: 'Artifact Type',
    },
    tableColumnAction: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.relatedArtifacts.tableColumnAction',
      defaultMessage: 'Action',
    },
    actionLabelEdit: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.relatedArtifacts.actionLabelEdit',
      defaultMessage: 'Edit',
    },
    actionLabelRemove: {
      id: 'ocpui.components.ManageActivityDefinition.manageForm.relatedArtifacts.actionLabelRemove',
      defaultMessage: 'Remove',
    },
  },
});
