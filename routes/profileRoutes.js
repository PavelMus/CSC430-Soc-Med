var express = require("express");
var mongoose = require("mongoose");
var Users = require("../models/Users");
var Classes = require("../models/Class");
var Profile = require("../models/Profile");

var router = express.Router();

router.route("/user-profile/:user_id").get((req, res) => {
  Profile.findOne({ user_id: req.params.user_id }, (err, profile) => {
    if (err) console.log(err);
    res.json(profile);
  });
});

router.route("/profile-update-picture/:profile_id").put((req, res) => {
  Profile.findById(req.params.profile_id, (err, profile) => {
    Users.findById(profile.user_id, (err, user)=>{
        user.avatar = req.body.new_url;
        user.save();
    });
    profile.avatar = req.body.new_url;
    profile.save(err => {
      if (err) console.log(err);
      res.send({ message: "User Picture changed!" });
    });
  });
});

module.exports = router;
