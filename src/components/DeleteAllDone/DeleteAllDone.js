import React, { useContext } from 'react'
import { TodoContext } from "../../context/TodoContext";

const DeleteAllDone = () => {

    const { 
        state: { todos }, 
        action: {  deleteCompleteTasks } } = useContext(TodoContext)

    // get the id of all completed tasks    
    const getAllDone = () => {
        // let idsToDelete = todos.filter( todo => todo.done === true).map( todo => todo.id)
        deleteCompleteTasks()
    }

    return (
        <div className="container text-right" style={{marginTop: 10, marginRight: 0}}>
            <button className="btn btn-info" onClick={getAllDone}>Delete All Completed Tasks</button>
        </div>
    )
}

export default DeleteAllDone
