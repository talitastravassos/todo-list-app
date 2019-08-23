import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';
import Header from './components/Header/Header';

const App = () => {

  return (
    <React.Fragment>
      <Header />
      <AddTodo />
      <TodoList />
    </React.Fragment>
  );
}

export default App;
