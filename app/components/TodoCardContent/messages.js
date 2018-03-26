/*
 * TodoCardContent Messages
 *
 * This contains all the text for the TodoCardContent component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.TodoCardContent.header',
    defaultMessage: 'This is the TodoCardContent component !',
  },
  todoStatusOverdue: {
    id: 'ocpui.components.TodoCardContent.todoStatusOverdue',
    defaultMessage: 'Overdue',
  },
  todoStatusUpcoming: {
    id: 'ocpui.components.TodoCardContent.todoStatusUpcoming',
    defaultMessage: 'Upcoming',
  },
  todoStatusDueToday: {
    id: 'ocpui.components.TodoCardContent.todoStatusDueToday',
    defaultMessage: 'Due Today',
  },
});
