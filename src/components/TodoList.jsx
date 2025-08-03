import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, onToggle }) {
    return (
        <ul>
            {tasks.map((task, index) => (
                <TodoItem
                    key={index}
                    task={task.text}         // Muestra el texto
                    completed={task.completed} // Indica si está completado
                    onToggle={() => onToggle(index)} // Maneja el click
                />
            ))}
        </ul>
    );
}

export default TodoList;