import React, { useState } from 'react';
import TodoList from './TodoList';

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleAddTask = () => {
        if (inputValue.trim() === '') return;
        setTasks([...tasks, { text: inputValue, completed: false }]);
        setInputValue('');
    };

    const handleToggle = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleAddTask}>Agregar Tarea</button>
            <TodoList tasks={tasks} onToggle={handleToggle} />
        </div>
    );
}

export default TodoApp;