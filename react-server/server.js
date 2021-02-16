/*
    Application startup module
    Start the server via express
    Connect to the database via mongoose
      Note: Start the server only when the database is connected

*/

const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Declare the use of static middleware
app.use(express.static('public'));
// Declare the use of middleware that parses post requests
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Declare the use of middleware that parses cookie data
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// Declare the use of router middleware
const indexRouter = require('./routers');
app.use('/', indexRouter);

// Connect to the database via mongoose
mongoose.connect('mongodb://localhost/server_db2', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Successfully connected to the database!")
        // Start the server only when the database is connected
        app.listen('5000', () => {
            console.log('Successfully started the server, please visit: http://localhost:5000');
        })
    })
    .catch(error => {
        console.error('Fail to connect to the database', error);
    });