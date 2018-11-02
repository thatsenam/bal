const mongoose = require("mongoose");
const hash = require("bcrypt");
mongoose.connect("mongodb://127.0.0.1:27017/enamsblog",{
  useCreateIndex: true,
  useNewUrlParser: true
});
const db = mongoose.connection;
mongoose.set('useCreateIndex', true);
let isConnected = false;
db.on("error", err => {
  isConnected = false;
});
db.once("open", () => {
  isConnected = true;
});
const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  userName: {
    type: String,
    lowercase: true,
    trim: true
  },
  mail: {
    type: String,
    lowercase: true,
    required: true
  },
  age: Number,
  phoneNumber: String,
  password: String
});

userSchema.pre("save", next => {
  try {
    console.log(this.mail);
    this.password = hash.hashSync(this.password, 12);
   next();
  } catch (err) {
   
    console.log("Error Hashing Password : " + err);
  }
});
const User = mongoose.model("user", userSchema);
module.exports.User = User;
module.exports.verifyDatabase = function(req, res, next) {
  if (isConnected) {
    next();
  } else {
    res.json({ error: "Database Connection Error" });
  }
};
