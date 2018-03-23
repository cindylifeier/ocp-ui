/**
*
* TodoList
*
*/

import React from 'react';
import isEmpty from 'lodash/isEmpty';
import TodoCard from 'components/TodoCard/index';
import TodoCardContent from 'components/TodoCardContent/index';
import PropTypes from 'prop-types';

function TodoList(props) {
  const { todos, taskBaseUrl, patientId, user } = props;
  return (
    <div>
      {todos && todos.length > 0 &&
        <div>
          {!isEmpty(todos) && todos.map((todo) =>
            (<TodoCard key={todo.logicalId}>
              <TodoCardContent
                description={todo.description}
                todoLogicalId={todo.logicalId}
                user={user}
                patientId={patientId}
                status={todo.taskDue}
                dueDate={todo.executionPeriod && todo.executionPeriod.end ? todo.executionPeriod.end : ''}
                patientName={todo.beneficiary.display}
                taskBaseUrl={taskBaseUrl}
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
  patientId: PropTypes.string,
  user: PropTypes.object,
  taskBaseUrl: PropTypes.string.isRequired,
};

export default TodoList;
