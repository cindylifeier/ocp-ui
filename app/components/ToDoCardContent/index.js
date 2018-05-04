/**
 *
 * TodoCardContent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Align from 'components/Align';
import { Cell, Grid } from 'styled-css-grid';
import NotificationPriorityHigh from '@material-ui/icons/PriorityHigh';
import ActionEvent from '@material-ui/icons/Event';
import ContentFlag from '@material-ui/icons/Flag';

import ToDoCardCell from 'components/ToDoCardCell';
import ToDoCardGrid from 'components/ToDoCardGrid';
import StyledText from 'components/StyledText';
import ToDoItemDescriptionBoxModel from 'components/ToDoCardContent/ToDoItemDescriptionBoxModel';
import { DUE_TODAY, OVER_DUE, UPCOMING } from 'components/ToDoCardContent/constants';
import NavigationIconMenu from 'components/NavigationIconMenu';
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
    openDialog,
  } = props;
  const dueDateStr = dueDate ? 'Due '.concat(dueDate) : '';
  const patientNameStr = ((isPatient && isPractitioner) || isPractitioner) ? patientName : '';
  const editTodoUrl = `${taskBaseUrl}/${toDoLogicalId}?patientId=${patientId}&isMainTask=false`;

  function getStatusWithIcon(statusStr) {
    let statusElement = null;
    if (statusStr === UPCOMING) {
      statusElement = (<div><ContentFlag /><StyledText fontWeight="bold"><FormattedMessage {...messages.todoStatusUpcoming} /></StyledText></div>);
    } else if (statusStr === OVER_DUE) {
      statusElement = (<div><NotificationPriorityHigh /><StyledText fontWeight="bold"><FormattedMessage {...messages.todoStatusOverdue} /></StyledText></div>);
    } else if (statusStr === DUE_TODAY) {
      statusElement = (<div><ActionEvent /><StyledText fontWeight="bold"><FormattedMessage {...messages.todoStatusDueToday} /></StyledText></div>);
    }
    return statusElement;
  }

  const menuItems = [{
    primaryText: <FormattedMessage {...messages.editToDo} />,
    linkTo: `${editTodoUrl}`,
  }, {
    primaryText: <FormattedMessage {...messages.cancelToDo} />,
    onClick: () => openDialog(toDoLogicalId),
  }];
  return (
    <div>
      <ToDoCardHeader dueDateStr={dueDateStr} patientName={patientNameStr} />
      <ToDoCardGrid column={12}>
        <ToDoCardCell top={1} left={1} width={12}>
          <ToDoItemDescriptionBoxModel>
            <StyledText>
              {description}
            </StyledText>
          </ToDoItemDescriptionBoxModel>
        </ToDoCardCell>
        <ToDoCardCell top={2} left={1} width={12}>
          <Grid columns="6fr 5fr 1fr" gap="">
            <Cell>
              {getStatusWithIcon(status)}
            </Cell>
            <Cell>
              {isPatient &&
              <Align variant="right">
                <NavigationIconMenu menuItems={menuItems} />
              </Align>
              }
            </Cell>
            <Cell />
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
  taskBaseUrl: PropTypes.string,
  isPatient: PropTypes.bool,
  isPractitioner: PropTypes.bool,
  openDialog: PropTypes.func,
};

export default ToDoCardContent;
