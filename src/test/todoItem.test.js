import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TodoItem from '../components/TodoItem';

test('Muestra la tarea correctamente', () => {
    render(<TodoItem task="Aprender Jest" />);
    const taskElement = screen.getByText(/Aprender Jest/i);
    expect(taskElement).toBeInTheDocument();
});