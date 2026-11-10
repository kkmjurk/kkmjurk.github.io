
import TaskList from './components/TaskList.jsx'
import NewTaskForm from './components/NewTaskForm.jsx'
import Footer from './components/Footer.jsx'
import TasksFilter from './components/TasksFilter.jsx'
import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: 'Completed task',
      completed: true,
      editing: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      description: 'Editing task',
      completed: false,
      editing: true,
      createdAt: new Date(),
    },
    {
      id: 3,
      description: 'Active task',
      completed: false,
      editing: false,
      createdAt: new Date(),
    },
  ])

  function handleAddTask(description) {
    const newTask = {
      id: Date.now(),
      description: description,
      completed: false,
      editing: false,
      createdAt: new Date(),
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  return (
    <section className="todoapp">
      <NewTaskForm onAddTask={handleAddTask} />

      <section className="main">
        <TaskList tasks={tasks} />


        <TasksFilter />

        <Footer />
      </section>
    </section>
  )
}

export default App