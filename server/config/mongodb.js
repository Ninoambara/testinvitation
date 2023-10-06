const { MongoClient } = require("mongodb");

// const uri = "mongodb://127.0.0.1:27017";
// const uri = "mongodb+srv://ninoambara:IeEZqELaecn8M4Le@cluster0.wg7pw1e.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
const uri = process.env.MONGO_URL;

const dbName = "testingDB";

const client = new MongoClient(uri);

let db;

async function connect() {
  try {
    await client.connect();
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.log(error);
  }
}

function getDb() {
  return db;
}

module.exports = {
  connect,
  getDb,
};
