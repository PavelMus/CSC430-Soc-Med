var express = require("express");
var mongoose = require("mongoose");
var Class = require("../models/Class");
var ClassTemplate = require("../models/ClassTemplate");

var classRouter = express.Router();
//adding the /class-list route to our /api classRouter
classRouter
  .route("/class-list")
  //retrieve all classes from the database
  .get((req, res) => {
    //looks at our feed Schema
    Class.find()
      .sort({ level: -1 })
      .exec(function(err, _class) {
        if (err) res.send(err);
        //responds with a json object of our database classes.
        res.json(_class);
      });
  });

classRouter.route("/class-list/:type").get((req, res) => {
  Class.find({type: req.params.type})
  .sort({ level: 1 })
  .exec( (err, _class) => {
    if(err) res.send(err);
    res.json(_class);
  });
});

//Finding a class based on its id
classRouter.route("/class/:class_id").get((req, res) => {
  Class.findById(req.params.class_id, function(err, _class) {
    if (err) res.send(err);
    res.json(_class);
  });
});

/* This is the feed router for create class, it is responsible for
     post events that are made through the api/create-class URI */

classRouter.route("/create-class").post((req, res) => {
  var _class = new Class();
  _class.type = req.body.type;
  _class.level = req.body.level;
  _class.subject = req.body.subject;
  _class.section = req.body.section;
  _class.teacher = req.body.teacher;
  _class.content = [];
  _class.unverifiedStudents = [];
  _class.studentList = [];
  _class.announcements = [];
  _class.save(err => {
    if (err) res.send(err);
    res.json({ message: "Class Section Created" });
  });
});

//Creating a class template for the purpose of grabbing it from the admins to grab them
//from the database later on, this is a dev tool only.
classRouter.route("/create-class_template").post((req, res) => {
  console.log("IN CREATE-CLASS TEMPLATE POST");
  
  const { type, level, subject, description } = req.body;
  req.checkBody("type", "Class Type is required!").notEmpty();
  req.checkBody("level", "Class Level is required!").notEmpty();
  req.checkBody("subject", "Class Subject is required!").notEmpty();
  req
    .checkBody("description", "Class Description is required!")
    .notEmpty();
  let errors = req.validationErrors();

  if (errors) {
    res.json(errors);
    console.log(errors);
  } else {
    var _class = new ClassTemplate();
    _class.type = type;
    _class.level = level;
    _class.subject = subject;
    _class.description = description;
    _class.save(err => {
      if (err) res.send(err);
      res.json("posted");
    });
  }
});

// Search for a class_template by their types
classRouter.route("/class_template/:class_type").get((req, res) => {
  ClassTemplate.find({type: req.params.class_type}, (err, _class) => {
    if (err) res.send(err);
    res.json(_class);
  });
});

/*
//Adding a route to a specific feed based on the database ID
feedRouter
  .route("/feed/:feed_id")
  //The put method gives us the chance to update our feed based on the ID passed to the route
  .put(function(req, res) {
    Feed.findById(req.params.feed_id, function(err, feed) {
      if (err) res.send(err);
      //setting the new author and text to whatever was changed. If nothing was changed
      // we will not alter the field.
      req.body.author ? (feed.author = req.body.author) : null;
      req.body.text ? (feed.text = req.body.text) : null;
      //save feed
      feed.save(function(err) {
        if (err) res.send(err);
        res.json({ message: "feed has been updated" });
      });
    });
  })
  //delete method for removing a feed from our database
  .delete(function(req, res) {
    //selects the feed by its ID, then removes it.
    Feed.remove({ _id: req.params.feed_id }, function(err, feed) {
      if (err) res.send(err);
      res.json({ message: "feed has been deleted" });
    });
  });
*/
module.exports = classRouter;
