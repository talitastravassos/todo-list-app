import React, { Component } from 'react'
import 'whatwg-fetch';

export const TodoContext = React.createContext({})

export default class TodoProvider extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            todos: [
                {
                    "id": 1,
                    "description": "vivamus arcu felis bibendum ut",
                    "done": false
                },
                {
                    "id": 2,
                    "description": "in hendrerit gravida rutrum quisque",
                    "done": true
                },
                {
                    "id": 3,
                    "description": "mauris pharetra et ultrices neque",
                    "done": false
                }
            ]
        }

    }

    urlAPI = "https://homolog.compufacil.com.br/rpc/v1/"

    getTasks = () => {

        let DATA = {
            "search": "lorem ipsum"
        }

        fetch(`${this.urlAPI}challenge.get-task`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "challenge-token": "c2435d834e0c5815b07e6aef8b50bbf7" // Token given by e-mail
            },
            body: DATA
          }).then(data => data.json())
            .then(res => {
                this.setState({ todos: res}, 
                    //() => console.log(this.state.todos)
                    )
            })
            .catch(error => console.log(error))

    }

    completeTask = (id) => {
        // console.log(id)
        this.setState({ todos: this.state.todos.map( todo => {
            if(todo.id === id){
                todo.done = !todo.done
            }
            return todo
        })})
    }

    deleteTask = (id) => {
        // console.log(id)

        fetch(`${this.urlAPI}challenge.delete-task`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "challenge-token": "c2435d834e0c5815b07e6aef8b50bbf7" // Token given by e-mail
            },
            body: JSON.stringify({
                "ids": [id]
            })
          }).then(data => data.json())
            .then(res => {console.log(res)})
            .catch(error => console.log(error))
    }

    editTask = (id) => {
        console.log(id)
    }

    addTask = (task) => {
        //console.log(task)
        
        let newTask = {
            "description": task,
            "done": false
        }

        fetch(`${this.urlAPI}challenge.post-task`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "challenge-token": "c2435d834e0c5815b07e6aef8b50bbf7" // Token given by e-mail
            },
            body: JSON.stringify(newTask)
          }).then(data => data.json())
            .then(res => {console.log(res)})
            .catch(error => console.log(error))

    }

    componentDidMount(){
        this.getTasks()
    }

    componentDidUpdate(){
        this.getTasks()
    }
    
    render() {
        const value = {
            state: { ...this.state },
            action: {
             getTasks: this.getTasks,   
             completeTask: this.completeTask,
             deleteTask: this.deleteTask,
             editTask: this.editTask,
             addTask: this.addTask
            }
          };
      
        return (
            <TodoContext.Provider value={value}>
                {this.props.children}
            </TodoContext.Provider>
        )

    }
}
