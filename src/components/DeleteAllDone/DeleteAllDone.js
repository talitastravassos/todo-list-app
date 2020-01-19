import React, { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

const DeleteAllDone = () => {
  const {
    action: { deleteCompleteTasks }
  } = useContext(TodoContext);

  return (
    <div
      className="container text-right"
      style={{ marginTop: 10, marginRight: 0 }}
    >
      <button className="btn btn-info" onClick={() => deleteCompleteTasks()}>
        Delete All Completed Tasks
      </button>
    </div>
  );
};

export default DeleteAllDone;
