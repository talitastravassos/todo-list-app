import React, {useContext, useState, useCallback} from 'react'
import { TodoContext } from "../../context/todoContext";

const AddTodo = () => {

    const { action: { addTask } } = useContext(TodoContext)
    const [task, setTask] = useState("")

    const onChange = useCallback((e) => {
        const { value } = e.target;

        setTask(...task, value)
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
    );

    const onSubmit = (e) => {
        e.preventDefault();

        addTask(task)
        setTask("")
    }

    return (
        <form onSubmit={onSubmit}>
            <input 
                type="text" 
                name="description" 
                placeholder="Add new task.."
                value={task}
                onChange={onChange} />
            <input type="submit" value="Add"/>
        </form>
    )
}

export default AddTodo
