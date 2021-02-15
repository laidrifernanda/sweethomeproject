//Import dependencies
const mongoose = require("mongoose");
require("dotenv").config();

//Import data
const { MONGO_URI } = process.env;

//Connection
try {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  //Testing connection
  console.log(`Connect to MongoDB...`);
} catch (err) {
  console.log(`Could not connect to MongoDB...`, err);
}