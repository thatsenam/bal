const api = require("express").Router();
const User = require("../db/user");

api.use(User.verifyDatabase);
api.get("/", (req, res) => {
  res.status(200).json({ text: "api works!" });
});
api.post(
  "/signup",
  (req, res, next) => {
    if (
      req.body.mail === undefined ||
      req.body.userName === undefined ||
      req.body.age === undefined ||
      req.body.phoneNumber === undefined ||
      req.body.password === undefined
    ) {
      res.json({
        msg: "name,userName,age,phoneNumber,password,mail Should not be empty"
      });
    } else {
      User.User.find({ mail: req.body.mail }, (err, doc) => {
        if (err) console.log(err);
        if (doc.length) {
          res
            .status(200)
            .json({ error: "User Already Exists with " + req.body.mail });
        } else {
          next();
        }
      });
    }
  },
  (req, res) => {
    const newUser = new User.User({
      name: req.body.name,
      userName: req.body.userName,
      mail: req.body.mail,
      age: req.body.age,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password
    });
   
    newUser.save(err => {
      if (err) console.log("Fucked Up"+err);
      else {
        res.status(200).json({ message: "User Created!!! Login Using mail & password " ,loginRoute:"http://localhost:8080/api/login"});
      }
    });
  }
);
api.post("/login", (req, res) => {});

module.exports = api;

/* 
jwt.sign(
    {
      id: 1,
      name: "Enam",
      age: 22,
      city: "Dhaka"
    },
    "thats_secret",
    function(err, token) {
      if (err) {
        res.status(403).json({ error: err });
      } else {
        res.status(200).json({ text: "sign works!", token: token });
      }
    }
  );*/
