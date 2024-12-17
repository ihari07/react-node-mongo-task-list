import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TaskList from './TaskList';

describe('TaskList Component', () => {
  test('renders TaskList message when no tasks', () => {
    const { container } = render(
      <BrowserRouter>
        <TaskList tasks={[]} />
      </BrowserRouter>
    );

    expect(container.innerHTML).toContain('No tasks available'); // Check if the text is inside the HTML

  });
});
