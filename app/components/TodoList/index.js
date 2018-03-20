/**
*
* TodoList
*
*/

import React from 'react';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import isEmpty from 'lodash/isEmpty';
import TodoCard from 'components/TodoCard/index';
import TodoCardContent from 'components/TodoCardContent/index';
import PropTypes from 'prop-types';

function TodoList(props) {
  const { todos } = props;
  return (
    <div>
      {todos && todos.length > 0 &&
        <div>
          {!isEmpty(todos) && todos.map((todo) =>
            (<TodoCard key={todo.logicalId}>
              <TodoCardContent
                dueDate={todo.executionPeriod && todo.executionPeriod.end ? todo.executionPeriod.end : ''}
                patientName={todo.beneficiary.display}
              />
            </TodoCard>)
          )
          }
        </div>
      }
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoList;
