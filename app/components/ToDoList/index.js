/**
*
* TodoList
*
*/

import React from 'react';
import isEmpty from 'lodash/isEmpty';
import ToDoCard from 'components/ToDoCard';
import ToDoCardContent from 'components/ToDoCardContent';
import PropTypes from 'prop-types';
import Padding from 'components/Padding';

function ToDoList(props) {
  const { toDos, taskBaseUrl, patientId, isPatient, isPractitioner } = props;
  return (
    <div>
      <Padding top={'10px'} right={'10px'} bottom={'10px'} left={'10px'}>
        {toDos && toDos.length > 0 &&
        <div>
          {!isEmpty(toDos) && toDos.map((toDo) =>
            (<ToDoCard key={toDo.logicalId}>
              <ToDoCardContent
                description={toDo.description}
                toDoLogicalId={toDo.logicalId}
                patientId={patientId}
                isPatient={isPatient}
                isPractitioner={isPractitioner}
                status={toDo.taskDue}
                dueDate={toDo.executionPeriod && toDo.executionPeriod.end ? toDo.executionPeriod.end : ''}
                patientName={toDo.beneficiary.display}
                taskBaseUrl={taskBaseUrl}
              />
            </ToDoCard>)
          )
          }
        </div>
      }
      </Padding>
    </div>
  );
}

ToDoList.propTypes = {
  toDos: PropTypes.array.isRequired,
  patientId: PropTypes.string,
  taskBaseUrl: PropTypes.string.isRequired,
  isPatient: PropTypes.bool,
  isPractitioner: PropTypes.bool,
};

export default ToDoList;
