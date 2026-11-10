function Task({ description, completed, editing }) {
    return (
        <li className={completed ? 'completed' : editing ? 'editing' : ''}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    defaultChecked={completed}
                />

                <label>
                    <span className="description">{description}</span>
                </label>

                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
            </div>

            {editing && (
                <input
                    className="edit"
                    type="text"
                    defaultValue={description}
                />
            )}
        </li>
    )
}

export default Task