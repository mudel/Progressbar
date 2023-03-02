import React from 'react';
import { useEffect } from 'react';
import Column from './Column.jsx';

// board is a list of column
// column is a list of cards
// card = tasks
// task is a id, name, status, description

function Board(props) {
  const columnIsEmpty = [0, 0, 0, 0];
  const tasks = props.tasks;
  const setTasks = props.setTasks;
  const taskStatus = props.taskStatus;

  useEffect(() => {
    props.setActiveTasks(columnIsEmpty[0]);
    props.setFinishedTasks(columnIsEmpty[3]);
  });

  function StatusChange(event, newNumStatus, setdropdownEnabledFlag) {
    // Function to change the status of a task 
    const newTasks = tasks.map((task) => {
      if (task.id === +event.target.value) {
        // Замена id на максимальный + 1 для правильной сортировки в колонке
        return { ...task, status: newNumStatus, id: (Math.max.apply(null, tasks.map((task) => { return task.id })) + 1) };
      }
      return task;
    });
    setTasks(newTasks);
    setdropdownEnabledFlag(false);
  }

  function AddCard(nameNewTask, setdropdownEnabledFlag, setNameNewTask) {
    // Function for adding a new task
    if (nameNewTask) {
      const newTask = {
        id: tasks.length ? (Math.max.apply(null, tasks.map((task) => { return +task.id })) + 1) : 0,
        name: nameNewTask,
        status: 0,
        description: ''
      };
      const newTasks = tasks.concat(newTask);
      setTasks(newTasks);
      setdropdownEnabledFlag(false);
      setNameNewTask('');
    }
    setdropdownEnabledFlag(false)
  }

  return (
    <div className='appContainer'>
      <div className='boardContainer'>
        {taskStatus.map((currentStatus, index) => (
          <Column
            key={index}
            tasks={tasks}
            numStatus={index}
            currentStatus={currentStatus}
            taskStatus={taskStatus}
            StatusChange={StatusChange}
            AddCard={AddCard}
            columnIsEmpty={columnIsEmpty}
          />
        ))}
      </div>
    </div>
  )
}

export default Board

