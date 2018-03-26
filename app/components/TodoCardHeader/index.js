/**
 *
 * TodoCardHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import StyledTodoCardHeader from 'components/TodoCardHeader/StyledTodoCardHeader';
import TodoCardGrid from 'components/TodoCardGrid';
import ToDoCardCell from 'components/TodoCardCell';
import { Cell, Grid } from 'styled-css-grid';
import Align from 'components/Align';


function TodoCardHeader(props) {
  const { dueDateStr, patientName } = props;
  return (
    <StyledTodoCardHeader>
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
                <strong>{patientName}</strong>
              </Align>
            </Cell>
          </Grid>
        </ToDoCardCell>
      </TodoCardGrid>
    </StyledTodoCardHeader>
  );
}

TodoCardHeader.propTypes = {
  dueDateStr: PropTypes.string.isRequired,
  patientName: PropTypes.string,
};

export default TodoCardHeader;
