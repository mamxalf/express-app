const MongoClient = require("mongodb").MongoClient;
const connectionString = "mongodb://user_latihan:123456@localhost:27017?authSource=admin";
(async () => {
    try {
        const client = await MongoClient.connect(connectionString, {
            useUnifiedTopology: true
        })
        const db = client.db('latihan')
        // // kode query ke collection quotes
        // const quotes = await db.collection('quotes').find().toArray()
        // console.log(quotes)
        const quote = await db.collection('quotes').findOne()
        console.log(quote)
    } catch (error) {
        console.error(error);
    }
})();