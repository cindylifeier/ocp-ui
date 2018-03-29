/**
*
* TodoCardContent
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import ToDoCardGrid from 'components/ToDoCardGrid';
import ToDoCardCell from 'components/ToDoCardCell';
import Align from 'components/Align';
import { Cell, Grid } from 'styled-css-grid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotificationPriorityHigh from 'material-ui/svg-icons/notification/priority-high';
import ActionEvent from 'material-ui/svg-icons/action/event';
import ContentFlag from 'material-ui/svg-icons/content/flag';
import ToDoItemDescriptionBoxModel from 'components/ToDoCardContent/ToDoItemDescriptionBoxModel';
import { DUE_TODAY, OVER_DUE, UPCOMING } from 'components/ToDoCardContent/constants';
import ToDoCardHeader from 'components/ToDoCardHeader';
import messages from './messages';


function ToDoCardContent(props) {
  const {
    dueDate,
    patientName,
    status,
    description,
    toDoLogicalId,
    taskBaseUrl,
    patientId,
    isPatient,
    isPractitioner,
  } = props;
  const dueDateStr = dueDate ? 'Due '.concat(dueDate) : '';
  const patientNameStr = ((isPatient && isPractitioner) || isPractitioner) ? patientName : '';
  const editTodoUrl = `${taskBaseUrl}/${toDoLogicalId}?patientId=${patientId}&isMainTask=false`;
  function getStatusWithIcon(statusStr) {
    let statusElement = null;
    if (statusStr === UPCOMING) {
      statusElement = (<div><ContentFlag /><FormattedMessage {...messages.todoStatusUpcoming} /></div>);
    } else if (statusStr === OVER_DUE) {
      statusElement = (<div><NotificationPriorityHigh /><FormattedMessage {...messages.todoStatusOverdue} /></div>);
    } else if (statusStr === DUE_TODAY) {
      statusElement = (<div><ActionEvent /><FormattedMessage {...messages.todoStatusDueToday} /></div>);
    }
    return statusElement;
  }
  return (
    <div>
      <ToDoCardHeader dueDateStr={dueDateStr} patientName={patientNameStr}></ToDoCardHeader>
      <ToDoCardGrid column={12}>
        <ToDoCardCell top={1} left={1} width={12}>
          <ToDoItemDescriptionBoxModel>
            {description}
          </ToDoItemDescriptionBoxModel>
        </ToDoCardCell>
        <ToDoCardCell top={2} left={1} width={12}>
          <Grid columns="6fr 6fr" gap="">
            <Cell>
              {getStatusWithIcon(status)}
            </Cell>
            <Cell>
              { isPatient &&
                <Align variant="right">
                  <Link to={editTodoUrl}>Manage</Link>
                </Align>
              }
            </Cell>
          </Grid>
        </ToDoCardCell>
      </ToDoCardGrid>
    </div>
  );
}


ToDoCardContent.propTypes = {
  dueDate: PropTypes.string.isRequired,
  patientName: PropTypes.string.isRequired,
  patientId: PropTypes.string,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  toDoLogicalId: PropTypes.string.isRequired,
  taskBaseUrl: PropTypes.string.isRequired,
  isPatient: PropTypes.bool,
  isPractitioner: PropTypes.bool,
};

export default ToDoCardContent;
