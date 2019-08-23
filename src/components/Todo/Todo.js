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

    const renderEdit = () => (
        <form onSubmit={onSubmit} className={style.todo}>
            <input 
                type="text" 
                name="description"
                className="form-control"
                defaultValue={description}
                onChange={onChange}
                />
            <button type="submit" className="btn btn-success" style={{marginLeft: 10}}>
                Edit
            </button>
        </form>
    )

    const renderDefault = () => (
        <div className={style.todo} style={{ textDecoration: (done) ? "line-through" : "none"}}>
            <input type="checkbox" onChange={() => completeTask(props.todo)} checked={(done) ? "checked" : ""}/>{" "}
            <p className="col-lg-10 col-sm-8 col-8" style={{marginTop: "auto"}}>{description}</p>
            <div>
                <button className="btn btn-danger" style={{margin: 10}} onClick={() => deleteTask(id)}><i className="fas fa-trash"></i></button>
                <button className="btn btn-primary" onClick={() => setIsEdit(true)}><i className="fas fa-edit"></i></button>
            </div>
        </div>
    )

    return (isEdit) ? renderEdit() : renderDefault()
}

export default Todo
