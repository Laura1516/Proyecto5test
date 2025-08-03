///URL DE GIT
https://github.com/Laura1516/Proyecto5test

//TODOITEM.JS

/* Componente que representa una sola tarea.
Recibe:
Task: el texto de la tarea
Completed: booleano que indica si está completada
onToggle: función que se ejecuta al hacer click para marcar/desmarcar*/
import React from 'react';
function TodoItem({task, completed, onToggle}){
      return (
        <li className={completed ? 'completed' : ''} onClick={onToggle} style={{ cursor: 'pointer' }}>
            {task}
        </li>
    );
}

export default TodoItem;

//TODOITEM.TEST.JS
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TodoItem from '../components/TodoItem';

test('Muestra la tarea correctamente', () => {
    // Renderiza el componente con un texto
    render(<TodoItem task="Aprender Jest" />);
    // Verifica que el texto esté en el DOM
    const taskElement = screen.getByText(/Aprender Jest/i);
    expect(taskElement).toBeInTheDocument();
});

//TODOLIST.JSX
import React from 'react';
import TodoItem from './TodoItem';

// Componente que representa una lista de tareas.
// Recorre el array de tareas y renderiza un TodoItem por cada una.
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

//TODOLIST.TEST.JS
import React from 'react';
import { render } from '@testing-library/react';
import TodoList from '../components/TodoList';


test('Genera un snapshot del componente TodoList', () => {
    const tasks = ['Tarea 1', 'Tarea 2'];
    const { asFragment } = render(<TodoList tasks={tasks} />);
    expect(asFragment()).toMatchSnapshot();
});

//TODOAPP.JSX
import React, { useState } from 'react';
import TodoList from './TodoList';

// Componente principal que maneja el estado de las tareas.
function TodoApp() {
    const [tasks, setTasks] = useState([]); //Lista de Tareas
    const [inputValue, setInputValue] = useState(''); //Texto del Input

    const handleAddTask = () => {
        if (inputValue.trim() === '') return;
        setTasks([...tasks, { text: inputValue, completed: false }]);
        setInputValue('');
    };

    const handleToggle = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed; // Alterna el estado de completado
        setTasks(updatedTasks);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}//Actualiza el input
            />
            <button onClick={handleAddTask}>Agregar Tarea</button>
            <TodoList tasks={tasks} onToggle={handleToggle} />
        </div>
    );
}

//TODOAPP.TEST.JS
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

test('Permite agregar una tarea a la lista', () => {
    render(<TodoApp />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /agregar tarea/i });
    fireEvent.change(input, { target: { value: 'Nueva tarea' } });//Escribe el input
    fireEvent.click(button);
    const newTask = screen.getByText(/nueva tarea/i);//Verifica que se agrego
    expect(newTask).toBeInTheDocument();
});

//TODOAPPACCEPTANCE.TEST.JS
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

test('Permite al usuario agregar y completar tareas', () => {
    render(<TodoApp />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /agregar tarea/i });
    fireEvent.change(input, { target: { value: 'Tarea importante' } });
    fireEvent.click(button);
    const task = screen.getByText(/tarea importante/i);
    expect(task).toBeInTheDocument();
    fireEvent.click(task);//Marca la tarea como completada
    expect(task).toHaveClass('completed'); // Verifica que tenga la calse 'completed'
});

