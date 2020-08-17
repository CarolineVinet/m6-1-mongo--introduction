const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db("exercise_1");
    console.log("connected!");

    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });

    client.close();
    console.log("disconnected!");
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected!");

  const _id = req.params._id;

  await db.collection("greetings").findOne({ _id }, (err, result) => {
    console.log("in callback", _id, result);

    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
  });
};

const getGreetings = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected!");

  console.log(req.query);
  const start = parseInt(req.query.start - 1 || 0);
  const limit = parseInt(req.query.limit || 20);

  const findObjects = await db.collection("greetings").find().toArray();
  if (findObjects.length > 0) {
    console.log(findObjects.length);
    res.status(200).json(findObjects.slice(start, start + limit));
  } else if (findObjects.length === 0) {
    res.status(404);
  }
  client.close();
  console.log("disconnected!");
};

module.exports = { createGreeting, getGreeting, getGreetings };
