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

  //mark a task as done
  completeTask = todo => {
    let DATA = {
      description: todo.description,
      done: !todo.done
    };

    fetch(`${this.urlAPI}/${todo._id}`, {
      method: "PUT",
      headers: this.HEADERS,
      body: JSON.stringify(DATA)
    })
      .then(data => {
        console.log(data);
        this.notifications(data.status, "Task completed!", DATA.done);
        this.getTasks();
        return data.json();
      })
      .catch(error => console.log(error));
  };

  //update the description of a task from the API
  updateTask = (todo, newDescription) => {
    let DATA = {
      id: todo.id,
      description: newDescription,
      done: todo.done
    };

    fetch(`${this.urlAPI}challenge.put-task`, {
      method: "POST",
      headers: this.HEADERS,
      body: JSON.stringify(DATA)
    })
      .then(data => {
        console.log(data);
        this.notifications(data.status, "Updated task!", true);
        // this.getTasks()
        return data.json();
      })
      .catch(error => console.log(error));
  };

  //delete one or more task from the API
  deleteTasks = ids => {
    fetch(`${this.urlAPI}challenge.delete-task`, {
      method: "POST",
      headers: this.HEADERS,
      body: JSON.stringify({
        ids: ids
      })
    })
      .then(data => {
        console.log(data);
        this.notifications(
          data.status,
          ids.length > 1 ? "Deleted tasks!" : "Task deleted!",
          true
        );
        // this.getTasks()
        return data.json();
      })
      .catch(error => console.log(error));
  };

  //create a new task in the API
  addTask = task => {
    let newTask = {
      description: task,
      done: false
    };

    fetch(`${this.urlAPI}challenge.post-task`, {
      method: "POST",
      headers: this.HEADERS,
      body: JSON.stringify(newTask)
    })
      .then(data => {
        console.log(data);
        this.notifications(data.status, "Task added!", true);
        this.getTasks();
        return data.json();
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
        completeTask: this.completeTask,
        deleteTasks: this.deleteTasks,
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
