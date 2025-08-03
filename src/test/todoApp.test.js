import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

test('Permite agregar una tarea a la lista', () => {
    render(<TodoApp />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /agregar tarea/i });
    fireEvent.change(input, { target: { value: 'Nueva tarea' } });
    fireEvent.click(button);
    const newTask = screen.getByText(/nueva tarea/i);
    expect(newTask).toBeInTheDocument();
});