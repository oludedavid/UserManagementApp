const { usersDbUri, mongoose } = require("./config");
const fs = require("fs");
const path = require("path");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(usersDbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  // Read users.json file
  const usersFilePath = path.join(__dirname, "data/users.json");
  const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

  // Drop the users collection
  try {
    await User.collection.drop();
    console.log("Users collection dropped");
  } catch (error) {
    if (error.code === 26) {
      console.log("Namespace not found. Skipping drop.");
    } else {
      console.error("Error dropping users collection:", error);
    }
  }

  // Insert data into the database
  try {
    await User.insertMany(usersData);
    console.log("Users data has been successfully inserted");
  } catch (error) {
    console.error("Error inserting users data:", error);
  } finally {
    mongoose.connection.close();
  }
});
