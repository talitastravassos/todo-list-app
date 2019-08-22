import React, {useContext, useState, useCallback} from 'react'
import style from "./todo.module.css";
import { TodoContext } from "../../context/todoContext";

const Todo = (props) => {
    const { action: { completeTask, deleteTask, updateTask } } = useContext(TodoContext)
    const { id, description, done } = props.todo;

    const [isEdit, setIsEdit] = useState(false)
    const [newDescription, setNewDescription] = useState("")
    
    const onSubmit = (e) => {
        e.preventDefault();
        updateTask(props.todo, newDescription)
        setIsEdit(false)
    }

    const onChange = useCallback((e) => {
        const { value } = e.target;

        setNewDescription(value)
      },
      []
    );


    return (isEdit) ? 
        (
            <form onSubmit={onSubmit} className={style.todo}>
                <input 
                    type="text" 
                    name="description"
                    defaultValue={description}
                    onChange={onChange}
                    />
                <input type="submit" value="Edit"/>
            </form>
            ) : (
            <div className={style.todo} 
                style={{ textDecoration: (done) ? "line-through" : "none"}}
            >
                <p>
                <input type="checkbox" onChange={() => completeTask(props.todo)} checked={(done) ? "checked" : ""}/>{" "}
                {description}
                <button className="btn btn-primary" onClick={() => deleteTask(id)}><i className="fas fa-trash"></i></button>
                <button className="btn btn-primary" onClick={() => setIsEdit(true)}><i class="fas fa-edit"></i></button>
                </p>
            </div>
        ) 
}

export default Todo
