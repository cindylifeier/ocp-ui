/*
 * ToDoCardContent Messages
 *
 * This contains all the text for the TodoCardContent component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.ToDoCardContent.header',
    defaultMessage: 'This is the ToDoCardContent component !',
  },
  todoStatusOverdue: {
    id: 'ocpui.components.ToDoCardContent.todoStatusOverdue',
    defaultMessage: 'Overdue',
  },
  todoStatusUpcoming: {
    id: 'ocpui.components.ToDoCardContent.todoStatusUpcoming',
    defaultMessage: 'Upcoming',
  },
  todoStatusDueToday: {
    id: 'ocpui.components.ToDoCardContent.todoStatusDueToday',
    defaultMessage: 'Due Today',
  },
});
