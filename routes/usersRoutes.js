var express = require("express");
var mongoose = require("mongoose");
var Users = require("../models/Users");

var router = express.Router();

router
  .route("/users-list")
  //retrieve all users from the database
  .get(function(req, res) {
    console.log("IN USER LIST GET");
    //looks at our Users Schema
    Users.find(function(err, users) {
      if (err) res.send(err);
      //responds with a json object of our database users.
      res.json(users);
    });
  });

router
  .route("/teacher-list")
  //retrieve all users from the database
  .get(function(req, res) {
    console.log("IN TEACHER LIST GET");
    //looks at our Users Schema
    Users.find({ teacher: true, admin: false }, (err, users) => {
      if (err) res.send(err);
      //responds with a json object of our database users.
      res.json(users);
    });
  });

router
  .route("/admin-list")
  //retrieve all users from the database
  .get(function(req, res) {
    console.log("IN TEACHER LIST GET");
    //looks at our Users Schema
    Users.find({ admin: true }, (err, users) => {
      if (err) res.send(err);
      //responds with a json object of our database users.
      res.json(users);
    });
  });

router
  .route("/teacher-list/:class_type")
  //retrieve all users from the database
  .get(function(req, res) {
    console.log("IN TEACHER LIST GET");
    //looks at our Users Schema
    Users.find({ teacher: true, teacherSubject: req.params.class_type },
      (err, users) => {
      if (err) res.send(err);
      //responds with a json object of our database users.
      res.json(users);
    });
  });
//Adding a route to a specific user based on the database ID
router
  .route("/verify-teacher/:user_id/:class_type")
  //The put method gives us the chance to update our user based on the ID passed to the route
  .put(function(req, res) {
    Users.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);
      //Setting the Users teacher flag to true
      user.teacher = true;
      console.log(req.params.class_type);

      user.teacherSubject = req.params.class_type;
      //Saving the user
      user.save(function(err) {
        if (err) res.send(err);
        res.json({ message: "Teacher has been verified" });
      });
    });
  });

router.route("/add_class_to_user").put((req, res)=>{
  Users.findById(req.body.user, (err, user)=>{
    if(err) res.send(err);
    console.log(req.body.classes);
    console.log(user.classes);
    user.classes = user.classes.concat(req.body.classes);

    user.save( err => {
      if(err) res.send(err);
      res.json({message: "Classes were added"})
    });
  });
});

module.exports = router;