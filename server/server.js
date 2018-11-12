require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 8010;
const datastore = require('./datastore');
var session = require('express-session');

// define the App
const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// ENDPOINTS
// Bucket Crud
app.post('/bucket', datastore.addBucket);
app.get('/user/:id', datastore.getUser);
app.delete('/bucket', datastore.deleteBucket);
// app.put('/bucket', datastore.changeBucket);
// Todo Crud
app.post('/todo', datastore.addTodo);
// app.get('/todos', datastore.getTodos);
app.delete('/todo', datastore.deleteTodo);
app.put('/todo', datastore.checkTodo);
// User Crud
app.post('/user', datastore.registerUser);
app.post('/login', datastore.loginUser);
app.get('/logout', datastore.logout);
app.delete('/user', datastore.deleteUser);
app.get('/session', datastore.session);


// start the server 
app.listen(PORT, () => {
    console.log('App is listening on Port: ', PORT);
});