const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  console.log("hello");
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected!");

  const users = await db.collection("users").find().toArray();
  if (users.length === 0) {
    res.status(404);
  }
  if (users.length > 0) {
    console.log("YES");
    res.status(200).json(users);
  }
  client.close();
  console.log("disconnected!");
};

module.exports = { getUsers };
