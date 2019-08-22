import React, {useContext} from 'react'
import style from "./todo.module.css";
import { TodoContext } from "../../context/todoContext";

const Todo = (props) => {
    const { action: { completeTask, editTask, deleteTask } } = useContext(TodoContext)
    const { id, description, done } = props.todo;


    return (
        <div className={style.todo} 
             style={{ textDecoration: (done) ? "line-through" : "none"}}
        >
            <p>
            <input type="checkbox" onChange={() => completeTask(id)}/>{" "}
            {description}
            <button onClick={() => deleteTask(id)}>Delete</button>
            <button onClick={() => editTask(id)}>Edit</button>
            </p>

        </div>
    )
}

export default Todo
