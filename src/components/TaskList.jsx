import Task from './Task'

function TaskList({
    tasks,
    onToggleTask,
    onDeleteTask,
    onEditTask,
    onSaveTask,
}) {
    return (
        <ul className="todo-list">
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    id={task.id}
                    description={task.description}
                    completed={task.completed}
                    editing={task.editing}
                    createdAt={task.createdAt}
                    onToggleTask={onToggleTask}
                    onDeleteTask={onDeleteTask}
                    onEditTask={onEditTask}
                    onSaveTask={onSaveTask}
                />
            ))}
        </ul>
    )
}

export default TaskList