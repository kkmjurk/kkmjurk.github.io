import Task from './Task.jsx'

function TaskList({ tasks }) {
    return (
        <ul className="todo-list">
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    description={task.description}
                    completed={task.completed}
                    editing={task.editing}
                    createdAt={task.createdAt}
                />
            ))}
        </ul>
    )
}

export default TaskList