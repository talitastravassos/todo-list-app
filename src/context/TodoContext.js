import React from "react";
import "whatwg-fetch";
import Swal from "sweetalert2";

export const TodoContext = React.createContext({});
export default class TodoProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };
  }

  urlAPI = "https://tst-todosapi.herokuapp.com/api/todos";
  HEADERS = {
    "Content-Type": "application/json"
  };

  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000
  });

  //success and error notifications
  notifications = (status, message, done) => {
    if (status === 200 && done === true) {
      this.Toast.fire({
        type: "success",
        title: message
      });
    } else if (status === 500) {
      this.Toast.fire({
        type: "error",
        title: "Something's wrong, sorry :/"
      });
    }
  };

  //get tasks from the API
  getTasks = () => {
    fetch(`${this.urlAPI}`)
      .then(data => data.json())
      .then(res => {
        this.setState({ todos: res });
        console.log(res);
      })
      .catch(error => console.log(error));
  };

  //update the description of a task from the API
  updateTask = todo => {
    let DATA = {
      description: todo.description,
      done: todo.done
    };

    fetch(`${this.urlAPI}/${todo._id}`, {
      method: "PUT",
      headers: this.HEADERS,
      body: JSON.stringify(DATA)
    })
      .then(data => {
        console.log(data);
        this.notifications(data.status, (todo.done) ? "Task completed!" : "Task updated!", true);
        this.getTasks();
      })
      .catch(error => console.log(error));
  };

  //delete by id one task from the API
  deleteTaskByID = id => {
    fetch(`${this.urlAPI}/${id}`, {
      method: "DELETE"
    })
      .then(data => {
        console.log(data);
        this.notifications(data.status, "Task deleted!", true);
        this.getTasks();
      })
      .catch(error => console.log(error));
  };

  //delete complete tasks from the API
  deleteCompleteTasks = () => {
    fetch(`${this.urlAPI}`, {
      method: "DELETE"
    })
      .then(data => {
        console.log(data);
        this.notifications(data.status, "Complete Tasks deleted!", true);
        this.getTasks();
      })
      .catch(error => console.log(error));
  };

  //create a new task in the API
  addTask = task => {
    let DATA = {
      description: task
    };

    fetch(`${this.urlAPI}`, {
      method: "POST",
      headers: this.HEADERS,
      body: JSON.stringify(DATA)
    })
      .then(data => {
        console.log(data);
        this.notifications(data.status, "Task added!", true);
        this.getTasks();
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.getTasks();
  }

  render() {
    const value = {
      state: { ...this.state },
      action: {
        getTasks: this.getTasks,
        deleteCompleteTasks: this.deleteCompleteTasks,
        deleteTaskByID: this.deleteTaskByID,
        addTask: this.addTask,
        updateTask: this.updateTask
      }
    };

    return (
      <TodoContext.Provider value={value}>
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}
