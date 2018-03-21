/**
*
* TodoCardContent
*
*/

import React from 'react';

import TodoCardGrid from 'components/TodoCardContent/TodoCardGrid';
import ToDoCardCell from 'components/TodoCardContent/TodoCardCell';
import Align from 'components/Align';
import { Cell, Grid } from 'styled-css-grid';
import PropTypes from 'prop-types';

function TodoCardContent(props) {
  const { dueDate, patientName, status, description, isPatientWorkspace } = props;
  const dueDateStr = 'Due '.concat(dueDate);
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
                {isPatientWorkspace ? '' : <strong>{patientName}</strong>}
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
              <span>{status}</span>
            </Cell>
            <Cell>
              <Align variant="right">
                <a href="">Manage</a>
              </Align>
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
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isPatientWorkspace: PropTypes.bool.isRequired,
};

export default TodoCardContent;
