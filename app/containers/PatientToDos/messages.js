/*
 * PatientToDos Messages
 *
 * This contains all the text for the PatientToDos component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  noToDoError: {
    id: 'ocpui.containers.PatientToDos.noToDoError',
    defaultMessage: 'Error in getting To Do.',
  },
  noTaskReferenceError: {
    id: 'ocpui.containers.PatientToDos.noTaskReferenceError',
    defaultMessage: 'Error in getting To Do Task reference.',
  },
  buttonLabelCreateNew: {
    id: 'ocpui.containers.PatientToDos.buttonLabelCreateNew',
    defaultMessage: 'Create New',
  },
  noToDosFound: {
    id: 'ocpui.containers.PatientToDos.noToDosFound',
    defaultMessage: 'No To Dos found.',
  },
});
