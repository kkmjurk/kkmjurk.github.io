import { formatDistanceToNow } from 'date-fns'

function Task({ id,
    description,
    completed = false,
    editing = false,
    createdAt = new Date(),
    onToggleTask,
    onDeleteTask,
    onEditTask,
    onSaveTask
}) {

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            onSaveTask(id, event.target.value)
        }
    }
    return (
        <li className={completed ? 'completed' : editing ? 'editing' : ''}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    defaultChecked={completed}
                    onChange={() => onToggleTask(id)}
                />

                <label>
                    <span className="description">{description}</span>
                    <span className="created">
                        created {formatDistanceToNow(createdAt, { addSuffix: true })}
                    </span>
                </label>

                <button
                    className="icon icon-edit"
                    onClick={() => onEditTask(id)}
                ></button>
                <button
                    className="icon icon-destroy"
                    onClick={() => onDeleteTask(id)}
                ></button>
            </div>

            {editing && (
                <input
                    className="edit"
                    type="text"
                    defaultValue={description}
                    onKeyDown={handleKeyDown}
                />
            )}
        </li>
    )
}

export default Task