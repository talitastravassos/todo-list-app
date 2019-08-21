import React, {useContext, useEffect} from 'react';
import { TodoContext } from "./context/todoContext";
import './App.css';
import TodoList from './components/TodoList/TodoList';

const App = () => {

  const { state: { todos } } = useContext(TodoContext)

  useEffect(() => {
    console.log(todos)

  }, [todos])

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
}

export default App;
