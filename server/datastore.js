const Datastore = require('@google-cloud/datastore');

const datastore = new Datastore({});

// module.exports = {
//     // CRUD for BUCKETS
//     addBucket: (req, res) => {
//         const title = req.body.title;
//         const userId = req.body.userId;
//         const bucketKey = datastore.key('Bucket');

//         const entity = {
//             key: bucketKey,
//             data: [
//                 {
//                     name: 'created',
//                     value: new Date().toJSON()
//                 },
//                 {
//                     name: 'title',
//                     value: title
//                 },
//                 {
//                     name: 'user',
//                     value: userId
//                 }
//             ]
//         }

//         datastore.save(entity).then(() => {
//             console.log(`Bucket saved with ID ${bucketKey.id} created`);
//             res.send('Successfull creation');
//         }).catch(err => {
//             console.log('Error: ', err);
//             res.send('Failed')
//         });
//     },
//     getBuckets: (req,res) => {
//         const query = datastore.createQuery('Bucket').order('created');

//         datastore.runQuery(query).then(results => {
//             const buckets = results[0];
//             const formatBuckets = [];
//             buckets.forEach(bucket => {
//                 const bucketObj = {
//                     id: bucket[datastore.KEY].id,
//                     title: bucket.title
//                 }
//                 formatBuckets.push(bucketObj);
//             })
//             console.log('buckets', formatBuckets)
//             res.status(200).json(formatBuckets);
//         });
//     },
//     deleteBucket: (req, res) => {
//         const bucketId = parseInt(req.params.id,10);
//         const bucketKey = datastore.key(['Bucket', bucketId]);
//         console.log(bucketId)
//         datastore.delete(bucketKey).then(() => {
//             console.log(`Task successfully deleted ${bucketId}`);
//             res.status(200).send('Delete Success')
//         }).catch(err => {
//             console.log('Error in deleting: ', bucketId);
//         });
//     },
//     changeBucket: (req, res) => {
//         const title = req.body.title;
//         const transaction = datastore.transaction();
//         const taskKey = datastore.key(['Bucket', parseInt(req.body.id, 10)]);
        
//         // invalid Transactin - FIX!
//         transaction
//             .run()
//             .then(() => transaction.get(taskKey))
//             .then(results => {
//                 const todo = results[0];
//                 todo.title = title;
//                 transaction.save({
//                     key: taskKey,
//                     data: todo
//                 });
//                 return transaction.commit();
//             })
//             .then(() => {
//                 console.log('Task ' + req.body.id + ' changed successfully');
//                 res.status(200).send('Title changed!')
//             })
//             .catch(err => console.log('Error to the Console: ', err));
//     },
//     // CRUD for Tasks
//     addTodo: (req, res) => {
//         const userId = req.body.userId;
//         const bucket = req.body.bucket;
//         const descr = req.body.descr;
//         const todoKey = datastore.key('Todo');

//         const entity = {
//             key: todoKey,
//             data: [
//                 {
//                     name: 'created',
//                     value: new Date().toJSON()
//                 },
//                 {
//                     name: 'description',
//                     value: descr
//                 },
//                 {
//                     name: 'bucket',
//                     value: bucket
//                 },
//                 {
//                     name: 'user',
//                     value: userId
//                 },
//                 {
//                     name: 'check',
//                     value: false
//                 }
//             ]
//         }

//         datastore.save(entity).then(() => {
//             console.log(`Todo saved with ID ${todoKey.id} created`);
//             res.send('Successfull creation');
//         }).catch(err => {
//             console.log('Error: ', err);
//             res.send('Failed')
//         });
//     },
//     getTodos: (req,res) => {
//         const userId = req.params.id;
//         const query = datastore.createQuery('Todo').filter('user', '=', userId).order('created');
//         datastore.runQuery(query).then(results => {
//             const todos = results[0];            
//             console.log('Todos: ', todos);
//             res.status(200).json(todos);
//         });
//     },
//     deleteTodo: (req, res) => {
//         const todoId = parseInt(req.params.id,10);
//         const todoKey = datastore.key(['Todo', todoId]);
//         datastore.delete(todoKey).then(() => {
//             console.log(`Todo successfully deleted ${bucketId}`);
//             res.status(200).send('Delete Success')
//         }).catch(err => {
//             console.log('Error in deleting: ', todoId);
//         });
//     },
//     editTodo: (req, res) => {
//         const transaction = datastore.transaction();
//         console.log(transaction)
//         const taskKey = datastore.key(['Bucket', req.body.id]);
        
//         // invalid Transaction - FIX!
//         transaction
//             .run()
//             .then(() => transaction.get(taskKey)
//                 .then(results => {
//                     console.log(results)
//                 const task = results[0];
//                 task.title = 'some title';
//                 transaction.save({
//                     key: taskKey,
//                     data: task,
//                 });
//                 return transaction.commit();
//             }))
//             .then(() => {
//             // The transaction completed successfully.
//             console.log(`Task ${taskId} updated successfully.`);
//             })
//             .catch(() => transaction.rollback());
//     },
// };

module.exports = {
    registerUser: (req, res) => {
        const userName = req.body.userName;
        const pw = req.body.pw;
        const userKey = datastore.key('User');

        const entity = {
            key: userKey,
            data: [
                {
                    name: 'created',
                    value: new Date().toJSON()
                },
                {
                    name: 'username',
                    value: userName
                },
                {
                    name: 'password',
                    value: pw
                },
                {
                    name: 'buckets',
                    value: []
                }
            ]
        }

        datastore.save(entity).then(() => {
            console.log(`User saved with ID ${userKey.id} created`);
            res.send('Successfull creation of User');
        }).catch(err => {
            console.log('Error: ', err);
            res.send('Failed')
        });
    },
    addBucket: (req, res) => {
        const transaction = datastore.transaction();
        const userKey = datastore.key(['User', parseInt(req.body.id, 10)]);

        // create Bucket with no Tasks
        const bucket = {
            title: req.body.title,
            todos: []
        }

        // get the Users Buckets and add the new One
        transaction
            .run()
            .then(() => transaction.get(userKey))
            .then(results => {
                const user = results[0];
                user.buckets.push(bucket)
                console.log('This is the User Buckets: ', user.buckets);
                transaction.save({
                    key: userKey,
                    data: user
                });
                return transaction.commit();
            })
            .then(() => {
                // Successfull Transaction
                console.log('Bucket added to User!')
                res.status(200).send('Successfull Creation of Bucket');
            })
            .catch(() => transaction.rollback());
    },
    deleteBucket: (req, res) => {
        const transaction = datastore.transaction();
        const userKey = datastore.key(['User', parseInt(req.body.id, 10)]);

        // get the Users Buckets and remove the One with the provided ID
        transaction
            .run()
            .then(() => transaction.get(userKey))
            .then(results => {
                const user = results[0];
                user.buckets.indexOf(bucket)
                console.log('This is the User Buckets: ', user.buckets);
                transaction.save({
                    key: userKey,
                    data: user
                });
                return transaction.commit();
            })
            .then(() => {
                // Successfull Transaction
                console.log('Bucket added to User!')
                res.status(200).send('Successfull Creation of Bucket');
            })
            .catch(() => transaction.rollback());
    }
}