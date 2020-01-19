import React, { useContext, useState, useCallback } from "react";
import { TodoContext } from "../../context/TodoContext";

const AddTodo = () => {
  const {
    action: { addTask }
  } = useContext(TodoContext);
  const [task, setTask] = useState("");

  const onChange = useCallback(
    e => {
      const { value } = e.target;

      setTask(...task, value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSubmit = e => {
    e.preventDefault();

    addTask(task);
    setTask("");
  };

  return (
    <form onSubmit={onSubmit} className="container">
      <div className="row m-auto">
        <input
          type="text"
          className="form-control mb-2 col-8"
          name="description"
          placeholder="Add new task.."
          value={task}
          onChange={onChange}
        />
        <button
          type="submit"
          className="btn btn-outline-success mb-2 col-3 col-sm-3"
          style={{ marginLeft: 10 }}
        >
          New Task <i className="fas fa-plus-circle"></i>
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
