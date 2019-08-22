import React, {useContext} from 'react';
import { TodoContext } from "../../context/todoContext";
import Todo from '../Todo/Todo';

const TodoList = () => {
    const { state: { todos } } = useContext(TodoContext)
    
    return todos.map(todo => (
        <Todo todo={todo} key={todo.id}/>
    ))
}

export default TodoList
