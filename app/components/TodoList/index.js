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
  // const { todos, isPatientWorkspace, todoMainTaskLogicalId, taskBaseUrl, patientId } = props;
  const { todos, isPatientWorkspace, taskBaseUrl, patientId } = props;
  return (
    <div>
      {todos && todos.length > 0 &&
        <div>
          {!isEmpty(todos) && todos.map((todo) =>
            (<TodoCard key={todo.logicalId}>
              <TodoCardContent
                isPatientWorkspace={isPatientWorkspace}
                description={todo.description}
                todoLogicalId={todo.logicalId}
                patientId={patientId}
                status={todo.taskDue}
                dueDate={todo.executionPeriod && todo.executionPeriod.end ? todo.executionPeriod.end : ''}
                patientName={todo.beneficiary.display}
                taskBaseUrl={taskBaseUrl}
                // todoMainTaskLogicalId={todoMainTaskLogicalId}
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
  // todoMainTaskLogicalId: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  taskBaseUrl: PropTypes.string.isRequired,
  isPatientWorkspace: PropTypes.bool.isRequired,
};

export default TodoList;
