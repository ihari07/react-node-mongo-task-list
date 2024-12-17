import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/Login', () => () => <div>Login Page</div>);
jest.mock('./components/Register', () => () => <div>Register Page</div>);
jest.mock('./components/Dashboard', () => () => <div>Dashboard Page</div>);
jest.mock('./components/TaskList', () => () => <div>Task List Page</div>);

describe('App Component Routing', () => {
  test('renders Login page for the empty route', () => {
    window.history.pushState({}, 'Login Page', '/'); 

    render(<App />);

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  test('renders Login page for the default route', () => {
    window.history.pushState({}, 'Login Page', '/login'); 

    render(<App />);

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  test('renders Register page for "/register" route', () => {
    window.history.pushState({}, 'Register Page', '/register'); 

    render(<App />);

    expect(screen.getByText(/Register Page/i)).toBeInTheDocument();
  });

  test('renders Dashboard page for "/dashboard" route', () => {
    window.history.pushState({}, 'Dashboard Page', '/dashboard'); 

    render(<App />);

    expect(screen.getByText(/Dashboard Page/i)).toBeInTheDocument();
  });

  test('renders Task List page for "/list/:listId" dynamic route', () => {
    window.history.pushState({}, 'Task List Page', '/list/123'); 

    render(<App />);

    expect(screen.getByText(/Task List Page/i)).toBeInTheDocument();
  });
});
