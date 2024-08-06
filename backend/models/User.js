const { mongoose } = require("../config");
const { Schema } = mongoose;

const userSchema = Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  name: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
