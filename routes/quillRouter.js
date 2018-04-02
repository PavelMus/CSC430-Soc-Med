var express = require('express');
var mongoose = require('mongoose');
var Quill = require("../models/QuillPost");

var quillRouter = express.Router();

quillRouter.route('/quill')
  //retrieve all posts from the database
  //.get(function(req, res) {
  //  //looks at our Post Schema
  //  Post.find(function(err, posts) {
  //    if (err)
  //      res.send(err);
  //    //responds with a json object of our database posts.
  //    res.json(posts)
  //  });
  //})
  //post new post to the database
  .post(function(req, res) {
    var quill = new Quill();
    quill.delta = req.body;

    quill.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Post successfully added!' });
    });
  });

  module.exports = quillRouter;