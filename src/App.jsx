
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

  function handleToggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function handleDeleteTask(id) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    )
  }

  function handleEditTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, editing: true }
          : task
      )
    )
  }

  function handleSaveTask(id, newDescription) {
    if (newDescription.trim() === '') {
      return
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
            ...task,
            description: newDescription.trim(),
            editing: false,
          }
          : task
      )
    )
  }

  return (
    <section className="todoapp">
      <NewTaskForm onAddTask={handleAddTask} />

      <section className="main">
        <TaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onSaveTask={handleSaveTask}
        />


        <TasksFilter />

        <Footer />
      </section>
    </section>
  )
}

export default App