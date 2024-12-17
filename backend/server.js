const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const listRoutes = require('./routes/lists');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const MONGODB_URI = 'mongodb://localhost:27017/tasklist';

console.log("mongoose.connection.readyState", mongoose.connection.readyState)
if (mongoose.connection.readyState === 0) { 
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));
}
app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);

let server = null;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
module.exports = { app, server }; 
