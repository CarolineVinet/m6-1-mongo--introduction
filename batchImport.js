const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");
const fs = require("file-system");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db("exercise_1");
    console.log("connected!");

    const r = await db.collection("greetings").insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);
    // res.status(201).json({ status: 201, data: req.body });
    console.log(r);

    client.close();
    console.log("disconnected!");
  } catch (err) {
    console.log(err.stack);
    // res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

batchImport();

module.exports = { batchImport };
