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
                    "done": false
                },
                {
                    "id": 3,
                    "description": "mauris pharetra et ultrices neque",
                    "done": false
                }
            ]
        }

    }
    
    render() {
        const value = {
            state: { ...this.state },
            // action: {
            //   getSearch: this.getSearch
            // }
          };
      
        return (
            <TodoContext.Provider value={value}>
                {this.props.children}
            </TodoContext.Provider>
        )

    }
}
