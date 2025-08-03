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
    fireEvent.click(task);
    expect(task).toHaveClass('completed'); 
});