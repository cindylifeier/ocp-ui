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
import Padding from 'components/Padding';

function TodoList(props) {
  const { todos, taskBaseUrl, patientId } = props;
  return (
    <div>
      <Padding top={'10px'} right={'10px'} bottom={'10px'} left={'10px'}>
        {todos && todos.length > 0 &&
        <div>
          {!isEmpty(todos) && todos.map((todo) =>
            (<TodoCard key={todo.logicalId}>
              <TodoCardContent
                description={todo.description}
                todoLogicalId={todo.logicalId}
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
      </Padding>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  patientId: PropTypes.string,
  taskBaseUrl: PropTypes.string.isRequired,
};

export default TodoList;
