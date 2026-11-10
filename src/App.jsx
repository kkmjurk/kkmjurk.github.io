
import TaskList from './components/TaskList.jsx'
import NewTaskForm from './components/NewTaskForm.jsx'
import Footer from './components/Footer.jsx'
import TasksFilter from './components/TasksFilter.jsx'
import { useState, useEffect } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') {
      return !task.completed
    }

    if (filter === 'Completed') {
      return task.completed
    }

    return true
  })

  const activeTasksCount = tasks.filter(
    (task) => !task.completed
  ).length


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.map((task) => ({
          id: task.id,
          description: task.title,
          completed: task.completed,
          editing: false,
          createdAt: new Date(),
        })))
      })
  }, [])

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

  function handleClearCompleted() {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => !task.completed)
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
          tasks={filteredTasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onSaveTask={handleSaveTask}
        />


        <TasksFilter
          filter={filter}
          onFilterChange={setFilter}
        />

        <Footer
          activeTasksCount={activeTasksCount}
          onClearCompleted={handleClearCompleted}
        />
      </section>
    </section>
  )
}

export default App