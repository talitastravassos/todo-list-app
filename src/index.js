import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import './index.css';
import App from './App';
import TodoProvider from './context/todoContext';

ReactDOM.render(
    <TodoProvider>
        <App />
    </TodoProvider>, document.getElementById('root'));