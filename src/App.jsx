import React from 'react';
import Board from './Board.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// kanban board app
// board is a list of column
// column is a list of cards
// card = tasks
// task is a id, name, status, description

const taskStatus = ['Backlog', 'Ready', 'In Progress', 'Finished'];


function ChangeDescription(descriptionTask, currentIndex, tasks, setTasks) {
  // description change function
  const newTasks = tasks.map((task, index) => {
    if (index === currentIndex) {
      task.description = descriptionTask;
    }
    return task;
  });
  setTasks(newTasks);
}


function Card(index, tasks, setTasks, place) {
  // Card display and description editing function

  function DescriptionЕditor(props) {
    // description text editing function to reduce rendering in Card
    const { index, tasks, setTasks } = props;
    const [descriptionTask, setDescriptionTask] = useState(tasks[index].description ? tasks[index].description : 'This task has no description');

    return (
      <>
        <div className='headerCard'>
          <h3 className='titleTaskDescription'>{tasks[index].name}</h3>
          <Link className='LinkDescriptionSubmit'
            to={`/`}
            onClick={event => ChangeDescription(descriptionTask, index, tasks, setTasks)}
          >
            <svg className='cross' width="80" height="80" viewBox="0 0 64 64" >
              <path d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z" />
            </svg>
          </Link>
        </div>
        <form className='inputTaskDescription'>
          <textarea
            className='inputText'
            type='text'
            value={descriptionTask}
            onChange={event => setDescriptionTask(event.target.value)}
          />

        </form>
      </>
    )
  }


  return (
    <div className='appContainer'>
      <div className='boardContainer2'>
        <div className='taskDescription'>

          <DescriptionЕditor index={index} tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  )
};


function App() {
  const initialState = JSON.parse(window.localStorage.getItem('kanban2222')) || []
  const [tasks, setTasks] = useState(initialState)
  useEffect(() => { window.localStorage.setItem('kanban2222', JSON.stringify(tasks)) }, [tasks])
  const [activeTasks, setActiveTasks] = useState(0);
  const [finishedTasks, setFinishedTasks] = useState(0);

  return (
    <>
      <div className='main'>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route key={'/'} path="/" exact element={<Board
              setActiveTasks={setActiveTasks}
              setFinishedTasks={setFinishedTasks}
              tasks={tasks}
              setTasks={setTasks}
              taskStatus={taskStatus} />} />
            {/* wildcard path for non-existent links */}
            <Route key={'*'} path="*" element={<Board
              setActiveTasks={setActiveTasks}
              setFinishedTasks={setFinishedTasks}
              tasks={tasks}
              setTasks={setTasks}
              taskStatus={taskStatus} />} />

            {
              tasks.map((task, index) => {
                return (
                  <Route key={task.id} id={task.id} path={`/task${task.id}`} element={Card(index, tasks, setTasks, 'Debug App Route')} />)
              })
            }
          </Routes>
        </BrowserRouter>
        <Footer activeTasks={activeTasks} finishedTasks={finishedTasks} />
      </div>
    </>
  )
}

export default App

