import React from 'react';
function TodoItem({task, completed, onToggle}){
      return (
        <li className={completed ? 'completed' : ''} onClick={onToggle} style={{ cursor: 'pointer' }}>
            {task}
        </li>
    );
}

export default TodoItem;