var express = require('express');
var mongoose = require('mongoose');
var Users = require("../models/Users");

var router = express.Router();

router.route('/users-list')
  //retrieve all users from the database
  .get(function(req, res) {
    console.log("IN USER LIST GET");
    //looks at our Users Schema
    Users.find(function(err, users) {
      if (err)
        res.send(err);
      //responds with a json object of our database users.
      res.json(users)
    });
  })
//Adding a route to a specific user based on the database ID
router.route('/verify-teacher/:user_id')
//The put method gives us the chance to update our user based on the ID passed to the route
  .put(function(req, res) {
    Users.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);
      //setting the new author and text to whatever was changed. If nothing was changed
      // we will not alter the field.
      user.teacher = true;
      //save user
      user.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Teacher has been verified' });
      });
    });
  });

module.exports = router;