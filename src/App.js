import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';
import Header from './components/Header/Header';
import DeleteAllDone from './components/DeleteAllDone/DeleteAllDone';

const App = () => {

  return (
    <React.Fragment>
      <Header />
      <AddTodo />
      <TodoList />
      <DeleteAllDone />
    </React.Fragment>
  );
}

export default App;
