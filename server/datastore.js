const Datastore = require("@google-cloud/datastore");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const datastore = new Datastore({});

module.exports = {
	registerUser: (req, res) => {
		const userName = req.body.userName;
		const pw = req.body.pw;
		const mail = req.body.mail;
		const userKey = datastore.key("User");
		const query = datastore.createQuery("User").filter("username", "=", userName);

		// check for the username in the datastore
		datastore.runQuery(query).then(results => {
			const user = results[0][0];
			console.log("User found: ", user);
			// does the user exist?
			if (user) {
				// tell user, that usernames have to be unique
				res.status(200).send("User already exists!");
			} else {
				// start registration
				bcrypt.hash(pw, saltRounds).then(function(hash) {
					// create user entity
					const entity = {
						key: userKey,
						data: [
							{ name: "created", value: new Date().toJSON() },
							{ name: "username", value: userName },
							{ name: "password", value: hash },
							{ name: "buckets", value: [] },
							{ name: "email", value: mail }
						]
					};
					// save user in the database
					datastore
						.save(entity)
						.then(() => {
							console.log(`User saved with ID ${userKey.id} created`);
							res.send("Successfull creation of User");
						})
						.catch(err => {
							console.log("Error: ", err);
							res.send("Failed");
						});
				});
			}
		});
	},
	loginUser: (req, res) => {
		console.log(req.body);
		console.log("Login Session: ", req.cookies);
		const { userName, pw } = req.body;
		const query = datastore.createQuery("User").filter("username", "=", userName);

		datastore.runQuery(query).then(results => {
			const user = results[0][0];
			if (user) {
				const userId = user[datastore.KEY].id;
				const hashedPw = user.password;
				bcrypt
					.compare(pw, hashedPw)
					.then(response => {
						if (response) {
							req.session.user = {
								userId,
								userName
							};
							res
								.status(200)
								.send(`User logged in: ${req.session.user} with ID: ${req.sessionID}`);
						} else {
							res.status(403).send("Authentication failed.");
						}
					})
					.catch(err => console.log("Error in comparing PW", err));
			} else {
				res.send("User does not exist.");
			}
		});
	},
	// session: (req, res) => {
	//     console.log('Session request ', req.sessionID)
	//     res.status(200).send(req.sessionID)
	// },
	logout: (req, res) => {
		req.session.destroy();
		res.status(200).send("Logged out.");
	},
	deleteUser: (req, res) => {
		const userId = req.session.user.userId;
		const userKey = datastore.key(["User", parseInt(userId, 10)]);

		datastore
			.delete(userKey)
			.then(() => {
				res.status(200).send("Successfull Deletion");
			})
			.catch(err => console.log("Something went wrong in deletion the user."));
	},
	addBucket: (req, res) => {
		const transaction = datastore.transaction();
		console.log("User session", req.session.user);
		const userKey = datastore.key(["User", parseInt(req.body.id, 10)]);
		const { title } = req.body;

		// create Bucket with no Tasks
		const bucket = {
			title,
			todos: []
		};

		// get the Users Buckets and add the new One
		transaction
			.run()
			.then(() => transaction.get(userKey))
			.then(results => {
				const user = results[0];
				if (user.buckets.findIndex(el => el.title === title) >= 0) {
					user.buckets.push(bucket);
					console.log("This is the User Buckets: ", user.buckets);
					transaction.save({
						key: userKey,
						data: user
					});
					return transaction.commit();
				} else {
					res.status(200).send("Bucket already exists");
					transaction.rollback();
				}
			})
			.then(() => {
				// Successfull Transaction
				console.log("Bucket added to User!");
				res.status(200).send("Successfull Creation of Bucket");
			})
			.catch(() => transaction.rollback());
	},
	deleteBucket: (req, res) => {
		const transaction = datastore.transaction();
		const userKey = datastore.key(["User", parseInt(req.body.id, 10)]);
		const title = req.body.title;

		// get the Users Buckets and remove the One with the provided ID
		transaction
			.run()
			.then(() => transaction.get(userKey))
			.then(results => {
				const user = results[0];
				// console.log('This is the User Buckets: ', user.buckets);
				const index = user.buckets.findIndex(el => el.title === title);
				user.buckets.splice(index, 1);
				// console.log('This are the users Buckets after deletion', user.buckets)
				transaction.save({
					key: userKey,
					data: user
				});
				return transaction.commit();
			})
			.then(() => {
				// Successfull Transaction
				console.log("Bucket deleted!");
				res.status(200).send("Successfull Deletion of Bucket");
			})
			.catch(() => transaction.rollback());
	},
	getUser: (req, res) => {
		const userKey = datastore.key(["User", parseInt(req.params.id, 10)]);
		const query = datastore.createQuery("User").filter("__key__", "=", userKey);

		datastore
			.runQuery(query)
			.then(results => {
				const user = results[0];
				console.log(user);
				// format Result
				const userObj = {
					id: user[0][datastore.KEY].id,
					name: user[0].username,
					buckets: user[0].buckets
				};
				res.status(200).json(userObj);
			})
			.catch(err => console.log("Error in getting User: ", err));
	},
	addTodo: (req, res) => {
		console.log("Add Todo endpoint");
		const transaction = datastore.transaction();
		const userKey = datastore.key(["User", parseInt(req.body.id, 10)]);
		const { todo } = req.body;
		const { bucket } = todo;

		transaction
			.run()
			.then(() => transaction.get(userKey))
			.then(results => {
				const user = results[0];
				console.log("Add Todo endpoint 2", user);
				const bucketIndex = user.buckets.findIndex(el => el.title === bucket);
				user.buckets[bucketIndex].todos.push(todo);
				console.log("New User", user);
				transaction.save({
					key: userKey,
					data: user
				});
				return transaction.commit();
			})
			.then(() => {
				// Successfull Transaction
				console.log("Todo added to Bucket!");
				res.status(200).send("Successfull Creation of Todo");
			})
			.catch(() => transaction.rollback());
	},
	checkTodo: (req, res) => {
		const transaction = datastore.transaction();
		// required in Body - userID, todo description, bucketname
		const { bucket, id, descr } = req.body;
		const userKey = datastore.key(["User", parseInt(id, 10)]);

		transaction
			.run()
			.then(() => transaction.get(userKey))
			.then(results => {
				const user = results[0];
				const bucketIndex = user.buckets.findIndex(el => el.title === bucket);
				const todoIndex = user.buckets[bucketIndex].todos.findIndex(
					el => el.descr === descr
				);
				// change current state - done
				user.buckets[bucketIndex].todos[todoIndex].done = !user.buckets[bucketIndex]
					.todos[todoIndex].done;
				transaction.save({
					key: userKey,
					data: user
				});
				return transaction.commit();
			})
			.then(() => {
				// Successfull editing
				console.log("Change done state successfull!");
				res.status(200).send("Changed State successfull!");
			})
			.catch(() => transaction.rollback());
	},
	deleteTodo: (req, res) => {
		const transaction = datastore.transaction();
		// required in Body - userID, todo description, bucketname
		const { bucket, id, descr } = req.body;
		const userKey = datastore.key(["User", parseInt(id, 10)]);

		transaction
			.run()
			.then(() => transaction.get(userKey))
			.then(results => {
				const user = results[0];
				const bucketIndex = user.buckets.findIndex(el => el.title === bucket);
				const todoIndex = user.buckets[bucketIndex].todos.findIndex(
					el => el.descr === descr
				);
				// remove todo from Bucket
				user.buckets[bucketIndex].todos.splice(todoIndex, 1);
				transaction.save({
					key: userKey,
					data: user
				});
				return transaction.commit();
			})
			.then(() => {
				console.log("Successfull Deletion");
				res.status(200).send("Deleted!");
			})
			.catch(() => transaction.rollback());
	}
};
