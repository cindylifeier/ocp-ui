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
  const { todos, isPatientWorkspace } = props;
  return (
    <div>
      {todos && todos.length > 0 &&
        <div>
          {!isEmpty(todos) && todos.map((todo) =>
            (<TodoCard key={todo.logicalId}>
              <TodoCardContent
                isPatientWorkspace={isPatientWorkspace}
                description={todo.description}
                status={todo.taskDue}
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
  isPatientWorkspace: PropTypes.bool.isRequired,
};

export default TodoList;
