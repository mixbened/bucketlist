const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const datastore = require('./datastore');

// define the App
const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoints
app.post('/bucket', datastore.addBucket);
app.get('/buckets', datastore.getBuckets);
app.delete('/bucket/:id', datastore.deleteBucket);
app.put('/bucket', datastore.editBucket);


// start the server 
app.listen(PORT, () => {
    console.log('App is listening on Port: ', PORT);
});