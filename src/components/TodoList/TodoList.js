import React, { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import Todo from "../Todo/Todo";

const TodoList = () => {
  const {
    state: { todos }
  } = useContext(TodoContext);

  return todos.map(todo => <Todo todo={todo} key={todo._id} />);
};

export default TodoList;
