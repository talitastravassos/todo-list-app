import React, {useContext, useState, useCallback, useEffect} from 'react'
import { TodoContext } from "../../context/todoContext";

const AddTodo = () => {

    const { action: { addTask } } = useContext(TodoContext)

    const [task, setTask] = useState("")

    useEffect(() => {
      //console.log(task)
    }, [task])

    const onChange = useCallback((e) => {
        const { value } = e.target;

        setTask(...task, value)
      },
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
