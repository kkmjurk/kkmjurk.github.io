function Task({ id,
    description,
    completed,
    editing,
    onToggleTask,
    onDeleteTask,
    onEditTask, }) {

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