const { MongoClient } = require('mongodb');

// dbURL, key, comsosDbURL coming from Azure
const url = `mongodb://${dbURL}}:${key}${cosmosDbURL}:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${dbURL}@';`;
const client = new MongoClient(url);

module.exports = async function (context, req) {
    const userId = req.body?.userId;
    const action = req.body?.action;
    const reservationEnd = req?.body?.reservationEnd || 0;
    const reservationStart = req?.body?.reservationStart || 0;
    const office = req.params.OFFICE;
    const id = req.params.ID;

    await client.connect();
    const database = client.db('tablesDB');
    const collection = database.collection('tables');

    const reservedTablesByUser = await collection
        .find({ _id: `${office}`, 'tables.$.userId': `${userId}` })
        .toArray();
    let contextStatus = 'reserved';
    if (action === 'cancel') {
        contextStatus = 'cancelled';
        await collection.update(
            { _id: `${office}`, 'tables.ID': +id },
            { $set: { 'tables.$.userId': '', 'tables.$.reservedEnd': 0 } }
        );
    } else {
        if (reservedTablesByUser.length !== 0) contextStatus = 'error';
        if (contextStatus !== 'error') {
            contextStatus = 'updated';
            await collection.update(
                { _id: `${office}`, 'tables.ID': +id },
                {
                    $set: {
                        'tables.$.userId': `${userId}`,
                        'tables.$.reservedStart': +reservationStart,
                        'tables.$.reservedEnd': +reservationEnd,
                    },
                }
            );
        }
    }

    context.res = {
        status: 200,
        body: `{"status": "${contextStatus}", "tablesDocument": '${JSON.stringify(
            await collection.find({}).toArray()
        )}'}`,
    };
    return context.res;
};
