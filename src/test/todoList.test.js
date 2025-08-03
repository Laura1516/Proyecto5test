import React from 'react';
import { render } from '@testing-library/react';
import TodoList from '../components/TodoList';


test('Genera un snapshot del componente TodoList', () => {
    const tasks = ['Tarea 1', 'Tarea 2'];
    const { asFragment } = render(<TodoList tasks={tasks} />);
    expect(asFragment()).toMatchSnapshot();
});