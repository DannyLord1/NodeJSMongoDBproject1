const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//so you can store environment variables in a .env file
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
//body parser is included in new express version
app.use(express.json());

//to connect to a MongoDB Atlas datbase (easier for testing)
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established")
})

//routers for navigation
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

//starts the server
app.listen(port, () => {
    console.log(`The server is up and running on port: ${port}`);
});