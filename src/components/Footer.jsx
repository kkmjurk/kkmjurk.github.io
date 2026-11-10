function Footer({
    activeTasksCount = 0,
    onClearCompleted = () => { },
}) {
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeTasksCount}</strong> items left
            </span>

            <ul className="filters">
                <li>
                    <button className="selected">All</button>
                </li>
                <li>
                    <button>Active</button>
                </li>
                <li>
                    <button>Completed</button>
                </li>
            </ul>

            <button
                className="clear-completed"
                onClick={onClearCompleted}
            >
                Clear completed
            </button>
        </footer>
    )
}

export default Footer