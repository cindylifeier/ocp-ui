/**
*
* TodoCardContent
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import TodoCardGrid from 'components/TodoCardContent/TodoCardGrid';
import ToDoCardCell from 'components/TodoCardContent/TodoCardCell';
import Align from 'components/Align';
import { Cell, Grid } from 'styled-css-grid';
import PropTypes from 'prop-types';
import NotificationPriorityHigh from 'material-ui/svg-icons/notification/priority-high';
import ContentFlag from 'material-ui/svg-icons/content/flag';
import { DUE_TODAY, OVER_DUE, UPCOMING } from 'components/TodoCardContent/constants';
import messages from './messages';


function TodoCardContent(props) {
  const {
    dueDate,
    patientName,
    status,
    description,
    user,
    todoLogicalId,
    taskBaseUrl,
    patientId,
  } = props;
  console.log(user);
  const dueDateStr = 'Due '.concat(dueDate);
  const editTodoUrl = `${taskBaseUrl}/${todoLogicalId}?patientId=${patientId}&isMainTask=false`;
  function getStatusWithIcon(statusStr) {
    let statusElement = null;
    if (statusStr === UPCOMING) {
      statusElement = (<div><ContentFlag /><FormattedMessage {...messages.todoStatusOverdue} /></div>);
    } else if (statusStr === OVER_DUE) {
      statusElement = (<div><NotificationPriorityHigh /><FormattedMessage {...messages.todoStatusUpcoming} /></div>);
    } else if (statusStr === DUE_TODAY) {
      statusElement = (<div><NotificationPriorityHigh /><FormattedMessage {...messages.todoStatusDueToday} /></div>);
    }
    return statusElement;
  }
  return (
    <div>
      <TodoCardGrid column={12}>
        <ToDoCardCell top={1} left={1} width={12}>
          <Grid columns="6fr 6fr" gap="">
            <Cell>
              <strong>
                {dueDateStr}
              </strong>
            </Cell>
            <Cell>
              <Align variant="right">
                {patientId ? '' : <strong>{patientName}</strong>}
              </Align>
            </Cell>
          </Grid>
        </ToDoCardCell>
        <ToDoCardCell top={2} left={1} width={12}>
          {description}
        </ToDoCardCell>
        <ToDoCardCell top={3} left={1} width={12}>
          <Grid columns="6fr 6fr" gap="">
            <Cell>
              {getStatusWithIcon(status)}
            </Cell>
            <Cell>
              { patientId &&
                <Align variant="right">
                  <a href={editTodoUrl}>Manage</a>
                </Align>
              }
            </Cell>
          </Grid>
        </ToDoCardCell>
      </TodoCardGrid>
    </div>
  );
}


TodoCardContent.propTypes = {
  dueDate: PropTypes.string.isRequired,
  patientName: PropTypes.string.isRequired,
  patientId: PropTypes.string,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  todoLogicalId: PropTypes.string.isRequired,
  taskBaseUrl: PropTypes.string.isRequired,
  user: PropTypes.object,
};

export default TodoCardContent;
