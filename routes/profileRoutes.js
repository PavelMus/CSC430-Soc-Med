var express = require("express");
var mongoose = require("mongoose");
var Users = require("../models/Users");
var Classes = require("../models/Class");
var Profile = require("../models/Profile");
var img_to_base64 = require("image-to-base64");

var router = express.Router();

router.route("/user-profile/:user_id").get((req, res) => {
  Profile.findOne({ user_id: req.params.user_id }, (err, profile) => {
    if (err) console.log(err);
    res.json(profile);
  });
});

router.route("/profile-update-picture/:profile_id").put((req, res) => {
  Profile.findById(req.params.profile_id, (err, profile) => {
    Users.findById(profile.user_id, (err, user) => {
      img_to_base64(req.body.new_url).then(response => {
        user.avatar = "data:image/png;base64," + response;
        user.save();
      }).catch(error => {
        console.log(error);
      });
    });
    img_to_base64(req.body.new_url).then(response => {
      profile.avatar = "data:image/png;base64,"+response;
      profile.save(err => {
        if (err) console.log(err);
        res.send({ message: "User Picture changed!" });
      });
    }).catch(error => {
      console.log(error);
      res.send({ message: "Something Went Wrong Sorry" });
    });
  });
});

router
  .route("/profile-update-social-media-url/:profile_id/:type")
  .put((req, res) => {
    Profile.findById(req.params.profile_id, (err, profile) => {
      let type = req.params.type;
      if (req.body.new_url) {
        switch (type) {
          case "facebook":
            profile.social_media.facebook = req.body.new_url;
            break;
          case "twitter":
            profile.social_media.twitter = req.body.new_url;
            break;
          case "instagram":
            profile.social_media.instagram = req.body.new_url;
            break;
          case "linkedIn":
            profile.social_media.linkedIn = req.body.new_url;
            break;
          case "gitHub":
            profile.social_media.gitHub = req.body.new_url;
            break;
          default:
            break;
        }
      }
      profile.save(err => {
        if (err) console.log(err);
        res.send({ message: "User " + type +  " url changed!" });
      });
    });
  });

module.exports = router;
