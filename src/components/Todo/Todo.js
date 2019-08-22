import React, {useContext, useState, useCallback} from 'react'
import style from "./todo.module.css";
import { TodoContext } from "../../context/todoContext";

const Todo = (props) => {
    const { action: { completeTask, editTask, deleteTask, updateTask } } = useContext(TodoContext)
    const { id, description, done } = props.todo;

    const [isEdit, setIsEdit] = useState(false)
    const [newDescription, setNewDescription] = useState("")

    const edit = () => {
        setIsEdit(true)
        //console.log(newDescription)
    }

    
    const onSubmit = (e) => {
        e.preventDefault();
        updateTask(props.todo, newDescription)
        setIsEdit(false)
    }

    const onChange = useCallback((e) => {
        const { value } = e.target;

        setNewDescription(value)

        //console.log(newDescription)
      },
      [newDescription]
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
                <button onClick={() => deleteTask(id)}>Delete</button>
                <button onClick={edit}>Edit</button>
                </p>
            </div>
        ) 
        
        
}

export default Todo
