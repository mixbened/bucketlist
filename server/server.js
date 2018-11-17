require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const PORT = process.env.PORT || 8010;
const datastore = require("./datastore");
// const cookieParser = require("cookie-parser");

// define the App
const app = express();

// middleware
app.use(
	cors({
		origin: ["http://localhost:8080"],
		methods: ["GET", "POST", "DELETE"],
		credentials: true // enable set cookie
	})
);
app.use(bodyParser.json());
// secure == false to set the cookie on local
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET,
		cookie: { secure: false }
	})
);

// ENDPOINTS
// Bucket Crud
app.post("/bucket", datastore.addBucket);
app.get("/user", datastore.getUser);
app.delete("/bucket/:title", datastore.deleteBucket);
// app.put('/bucket', datastore.changeBucket);
// Todo Crud
app.post("/todo", datastore.addTodo);
// app.get('/todos', datastore.getTodos);
app.delete("/todo", datastore.deleteTodo);
app.put("/todo", datastore.checkTodo);
// User Crud
app.post("/user", datastore.registerUser);
app.post("/login", datastore.loginUser);
app.get("/logout", datastore.logout);
app.delete("/user", datastore.deleteUser);
app.get("/check", function(req, res) {
	res.send(req.session.user);
});

// start the server
app.listen(PORT, () => {
	console.log("App is listening on Port: ", PORT);
});
