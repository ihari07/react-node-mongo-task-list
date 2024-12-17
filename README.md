# React Task Management App

This is a front-end application built using React for a task management system. The app includes user authentication (login and register), a dashboard, and a dynamic task list page. It uses React Router for navigation and follows a clean component-based architecture.


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Testing](#testing)


## Features

1. User Authentication:
   - Register a new account.
   - Login to access the dashboard.

2. Dashboard:
   - Displays user-specific content after login.

3. Task List:
   - Dynamic task list page with route parameter support (e.g., `/list/:listId`).

4. Routing:
   - Implemented using `react-router-dom` with multiple routes:
     - `/` - Login page
     - `/register` - Register page
     - `/dashboard` - Dashboard
     - `/list/:listId` - Task List

5. Component-Based Architecture:
   - Organized into modular React components.

## Technologies Used

- React: Front-end library for building the user interface.
- React Router: For navigation and dynamic routing.
- Jest & React Testing Library: For unit and integration testing.
- CSS: Basic styling for components.


## Installation

Follow these steps to run the application locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/ihari07/react-node-mongo-task-list.git
   cd react-node-mongo-task-list
   ```

2. Install dependencies: run the below command in each front end and backend

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open the application in your browser:

   ```
   http://localhost:3000
   ```

---

## Available Scripts

In the project directory, you can run:

- Start the development server:

   ```bash
   npm start
   ```

   Runs the app in development mode. The page will reload when you make edits.

- Build for production:

   ```bash
   npm run build
   ```

   Builds the app for production into the `build` folder.

- Run tests:

   ```bash
   npm test
   ```

   Launches the test runner in interactive watch mode.

## Testing

The project includes test cases for routing and rendering components using Jest and React Testing Library.

### Run Tests

To execute the test suite, run:

```bash
npm test
```



