/**
*
* TodoCardContent
*
*/

import React from 'react';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import TodoCardGrid from 'components/TodoCardContent/TodoCardGrid';
import ToDoCardCell from 'components/TodoCardContent/TodoCardCell';
import Align from 'components/Align';
import Checkbox from 'material-ui/Checkbox';
import { Cell, Grid } from 'styled-css-grid';
// import messages from './messages';
import PropTypes from 'prop-types';


function TodoCardContent(props) {
  const { dueDate, patientName } = props;
  const dueDateStr = 'Due '.concat(dueDate);
  return (
    <div>
      <TodoCardGrid column={12}>
        <ToDoCardCell top={1} left={1} width={12}>
          <Grid columns="6fr 6fr" gap="">
            <Cell>
              <strong>
                <Checkbox name="test" label={dueDateStr} />
              </strong>
            </Cell>
            <Cell>
              <Align variant="right">
                <strong>{patientName}</strong>
              </Align>
            </Cell>
          </Grid>
        </ToDoCardCell>
        <ToDoCardCell top={2} left={1} width={12}>
         Confirm adherence to medication recommendations Old <br />
        </ToDoCardCell>
        <ToDoCardCell top={3} left={1} width={12}>
          <Grid columns="6fr 6fr" gap="">
            <Cell>
              <span>!Overdue</span>
            </Cell>
            <Cell>
              <Align variant="right">
                <a href="">View</a>
              </Align>
            </Cell>
          </Grid>
        </ToDoCardCell>
      </TodoCardGrid>
    </div>
  );
}

TodoCardContent.propTypes = {
  dueDate: PropTypes.String.isRequired,
  patientName: PropTypes.String.isRequired,
};

export default TodoCardContent;
