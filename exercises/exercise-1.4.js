const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected!");

  const users = await db
    .collection("users")
    .insertOne({ data: { name: "Morty Smith" } });
  res.status(201).json(users);

  client.close();
  console.log("disconnected!");
};

module.exports = { addUser };
