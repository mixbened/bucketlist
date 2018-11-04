const Datastore = require('@google-cloud/datastore');

const datastore = new Datastore({});

module.exports = {
    // CRUD for BUCKETS
    addBucket: (req, res) => {
        const title = req.body.title;
        const bucketKey = datastore.key('Bucket');

        const entity = {
            key: bucketKey,
            data: [
                {
                    name: 'created',
                    value: new Date().toJSON()
                },
                {
                    name: 'title',
                    value: title
                }
            ]
        }

        datastore.save(entity).then(() => {
            console.log(`Bucket saved with ID ${bucketKey.id} created`);
            res.send('Successfull creation');
        }).catch(err => {
            console.log('Error: ', err);
            res.send('Failed')
        });
    },
    getBuckets: (req,res) => {
        const query = datastore.createQuery('Bucket').order('created');

        datastore.runQuery(query).then(results => {
            const buckets = results[0];
            const formatBuckets = [];
            buckets.forEach(bucket => {
                const bucketObj = {
                    id: bucket[datastore.KEY].id,
                    title: bucket.title
                }
                formatBuckets.push(bucketObj);
            })
            console.log('buckets', formatBuckets)
            res.status(200).json(formatBuckets);
        });
    },
    deleteBucket: (req, res) => {
        const bucketId = parseInt(req.params.id,10);
        const bucketKey = datastore.key(['Bucket', bucketId]);
        console.log(bucketId)
        datastore.delete(bucketKey).then(() => {
            console.log(`Task successfully deleted ${bucketId}`);
            res.status(200).send('Delete Success')
        }).catch(err => {
            console.log('Error in deleting: ', bucketId);
        });
    },
    editBucket: (req, res) => {
        const transaction = datastore.transaction();
        console.log(transaction)
        const taskKey = datastore.key(['Bucket', req.body.id]);
        
        // invalid Transactin - FIX!
        transaction
            .run()
            .then(() => transaction.get(taskKey)
                .then(results => {
                    console.log(results)
                const task = results[0];
                task.title = 'some title';
                transaction.save({
                    key: taskKey,
                    data: task,
                });
                return transaction.commit();
            }))
            .then(() => {
            // The transaction completed successfully.
            console.log(`Task ${taskId} updated successfully.`);
            })
            .catch(() => transaction.rollback());
            },
    // CRUD for Tasks
};