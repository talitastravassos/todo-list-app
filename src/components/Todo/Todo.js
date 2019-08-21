import React from 'react'

const Todo = (props) => {
    return (
        <div>
            <p>
                {props.todo.description}
            </p>
        </div>
    )
}

export default Todo
