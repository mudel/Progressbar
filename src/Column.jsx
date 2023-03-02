import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// board is a list of column
// column is a list of cards
// card is a tasks
// task is a numStatus, name, status, description

function Column(props) {
  const { tasks, columnIsEmpty, currentStatus, numStatus } = props;
  const [dropdownEnabledFlag, setdropdownEnabledFlag] = useState(false);
  const [nameNewTask, setNameNewTask] = useState('');
  let buttonTaskFootStatus = false;

  // Number of tasks by columns
  columnIsEmpty[numStatus] = tasks.reduce((count, task) => count + ((task.status === numStatus) ? 1 : 0), 0);
  // If there are no tasks in the column on the left, they cannot be added, the button will be inactive
  buttonTaskFootStatus = !(numStatus ? columnIsEmpty[numStatus - 1] : 1);

  return (<>

    {/* Column output with tasks */}
    <div className='column'>
      <p className='taskHead'>{currentStatus}</p>
      <div className='columnContainer'>

        <div className='cardContainer'>
          {tasks.filter((task) => task.status === numStatus).sort((a, b) => a.id - b.id).map((currentTask) => (
            <div key={currentTask.id} className='taskContainer'>
              <Link className='taskString' to={`/task${currentTask.id}`}>{currentTask.name}</Link>
            </div>
          ))}
        </div>
      </div>
      {/* Button "Add card" - moving the task */}
      <button
        disabled={buttonTaskFootStatus}
        className={buttonTaskFootStatus ? 'buttonTaskFootDisabled' : 'buttonTaskFoot'}
        onClick={() => { setdropdownEnabledFlag(true) }}
      > + Add card
      </button>

      {
        dropdownEnabledFlag
          ?
          numStatus
            ?
            // Handling "Add card" button click - when setdropdownEnabledFlag becomes true and numStatus is not equal to 0
            // Moving a task to another status
            <div className='changeCardContainer'>
              <select
                className='statusSelector'
                aria-label='statusSelector'
                size='4'
                onChange={
                  (event) => props.StatusChange(event, numStatus, setdropdownEnabledFlag)
                }
              >
                {tasks.filter((task) => task.status === (numStatus - 1)).map((currentTask) => (
                  <option key={currentTask.id} className='taskString' value={currentTask.id}>
                    {currentTask.name}
                  </option>
                ))}
              </select>
            </div>
            :
            // Handling "Add card" button click - when setdropdownEnabledFlag becomes true and numStatus is 0
            // Creating a new task - just enter a name
            <div className='addingCardContainer'>
              <input
                className='inputTaskName'
                type='text'
                placeholder='New task title...'
                value={nameNewTask}
                onChange={event => setNameNewTask(event.target.value)}
              />
              <button
                className='buttonSubmit'
                onClick={() => props.AddCard(nameNewTask, setdropdownEnabledFlag, setNameNewTask)}
              >Submit
              </button>
            </div>
          :
          // Stub for "Add card" button - when setdropdownEnabledFlag becomes false nothing is done
          <div></div>
      }
    </div>

  </>);
}

export default Column;
