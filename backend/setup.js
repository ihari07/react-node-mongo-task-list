const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const List = require('./models/List');
const { server } = require('./server'); // Import app and server

let mongoServer;
const MONGODB_URI = 'mongodb://localhost:27017/tasklist';

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connection.close();

    console.log("uri", uri, "mongoose.connection.readyState", mongoose.connection.readyState)
    if (mongoose.connection.readyState === 0) { 
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    }
});

afterAll(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key]?.deleteMany({});
    }

    await mongoose.connection.close();
    await mongoServer.stop();

    // Close the Express server to release the port
    if (server) {
        server.close();
    }
});