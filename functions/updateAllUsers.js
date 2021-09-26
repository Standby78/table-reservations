const { MongoClient, ObjectID } = require('mongodb');

// dbURL, key, comsosDbURL coming from Azure
const url = `mongodb://${dbURL}}:${key}${cosmosDbURL}:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${dbURL}@';`;
const client = new MongoClient(url);

module.exports = async function (context, req) {
    await client.connect();
    const database = client.db('tablesDB');
    const collection = database.collection('users');
    await collection.updateOne(
        { _id: new ObjectID(req.body._id) },
        { $set: { users: JSON.parse(req.body.users) } }
    );

    return (context.res = {
        status: 200,
        body: 'updated',
    });
};
