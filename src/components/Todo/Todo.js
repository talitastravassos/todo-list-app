import React, {useContext} from 'react'
import style from "./todo.module.css";
import { TodoContext } from "../../context/todoContext";

const Todo = (props) => {
    const { action: { completeTask } } = useContext(TodoContext)


    return (
        <div className={style.todo} 
             style={{ textDecoration: (props.todo.done) ? "line-through" : "none"}}
        >
            <p>
            <input type="checkbox" onChange={() => completeTask(props.todo.id)}/>{" "}
            {props.todo.description}</p>
        </div>
    )
}

export default Todo
