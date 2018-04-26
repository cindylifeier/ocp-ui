/**
 *
 * ManageActivityDefinition
 *
 */

import React from 'react';
import { Formik } from 'formik';
import yup from 'yup';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ManageActivityDefinitionForm from './ManageActivityDefinitionForm';
import messages from './messages';
import { TEXT_MIN_LENGTH } from './constants';

function ManageActivityDefinition(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const {
    onSave, initialActivityDefinitionFormValues, publicationStatuses, definitionTopics, resourceTypes, actionParticipantTypes,
    actionParticipantRoles, organization, editMode, selectedActivityDefinition, relatedArtifactTypes,
  } = props;
  const formData = {
    organization,
    publicationStatuses,
    definitionTopics,
    resourceTypes,
    actionParticipantTypes,
    actionParticipantRoles,
    relatedArtifactTypes,
  };

  return (
    <div>
      {((editMode && selectedActivityDefinition) || !editMode) &&
      <Formik
        initialValues={initialActivityDefinitionFormValues(selectedActivityDefinition)}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={() =>
          yup.lazy((values) => {
            let effectiveStart = new Date();
            if (values.effectiveStart) {
              effectiveStart = values.effectiveStart;
            }
            return yup.object().shape({
              version: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(minimumLength, (
                  <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
              name: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(minimumLength, (
                  <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
              title: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(minimumLength, (
                  <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
              effectiveStart: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
              effectiveEnd: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(effectiveStart.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
              duration: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              frequency: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              status: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              topic: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              kind: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              participantType: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              participantRole: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              relatedArtifact: yup.array()
                .required((<FormattedMessage {...messages.validation.requiredRelatedArtifacts} />))
                .min(1, (<FormattedMessage {...messages.validation.minLengthdRelatedArtifacts} />)),
            });
          })}
        render={(formikProps) => <ManageActivityDefinitionForm {...formikProps} {...formData} />}
      />
      }
    </div>
  );
}

ManageActivityDefinition.propTypes = {
  onSave: PropTypes.func.isRequired,
  initialActivityDefinitionFormValues: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  selectedActivityDefinition: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    version: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    }),
    date: PropTypes.string,
    publisher: PropTypes.string,
    description: PropTypes.string,
    effectivePeriod: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
    topic: PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    }),
    relatedArtifact: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    })),
    kind: PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    }),
    timing: PropTypes.shape({
      durationMax: PropTypes.number,
      frequency: PropTypes.number,
    }),
    actionParticipantType: PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    }),
    actionParticipantRole: PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    }),
  }),
  publicationStatuses: PropTypes.array.isRequired,
  definitionTopics: PropTypes.array.isRequired,
  resourceTypes: PropTypes.array.isRequired,
  actionParticipantTypes: PropTypes.array.isRequired,
  actionParticipantRoles: PropTypes.array.isRequired,
  relatedArtifactTypes: PropTypes.array.isRequired,
};

export default ManageActivityDefinition;
