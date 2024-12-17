# Task List Backend

This is the backend server for the Task List application built using Node.js and Express.js, connected to a MongoDB database. It provides RESTful APIs to handle user authentication, task list management, and CRUD operations for tasks and their items.

## Technologies Used

- Node.js and Express.js - For building the server.
- MongoDB and Mongoose - For database storage and object modeling.
- JSON Web Token (JWT) - For secure user authentication.
- Cors - To enable Cross-Origin Resource Sharing.
- Jest and Supertest - For unit testing.



## Installation

Follow these steps to set up the project locally:

### Prerequisites:
- Node.js and npm installed.
- MongoDB installed locally or a MongoDB cloud instance.



### Steps:


1. navigate to backend folder after cloning the `https://github.com/ihari07/react-node-mongo-task-list.git` 

```bash
npm install
```

2. Set Up MongoDB

Make sure MongoDB is running locally, or provide a connection string for a remote MongoDB instance.

3. Configure Environment Variables

Create a `.env` file in the project root directory:

```plaintext
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tasklist
NODE_ENV="test"
```


4. Run the Server

Start the development server:

```bash
npm start
```

The server will run on http://localhost:5000.

## Running Tests

Unit tests are implemented using Jest and Supertest.

Run tests with the following command:

```bash
npm test
```
