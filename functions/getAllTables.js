const { MongoClient } = require('mongodb');

// dbURL, key, comsosDbURL coming from Azure
const url = `mongodb://${dbURL}}:${key}${cosmosDbURL}:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${dbURL}@';`;
const client = new MongoClient(url);

module.exports = async function (context) {
    await client.connect();
    const database = client.db('tablesDB');
    const collection = database.collection('tables');
    const result = await collection.find({}).toArray();

    return (context.res = {
        status: 200,
        body: result,
    });
};
