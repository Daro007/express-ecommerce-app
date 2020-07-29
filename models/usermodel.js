const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// saltRounds ??
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

// Hash user password before saving into database
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = mongoose.model("user", userSchema);
