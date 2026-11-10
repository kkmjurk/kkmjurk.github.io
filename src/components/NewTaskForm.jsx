import { useState } from 'react'

function NewTaskForm({ onAddTask }) {

    const [value, setValue] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        if (value.trim() === '') {
            return
        }

        onAddTask(value.trim())
        setValue('')
    }

    return (
        <header className="header">
            <h1>todos</h1>

            <form onSubmit={handleSubmit}>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </form>
        </header>
    )
}

export default NewTaskForm