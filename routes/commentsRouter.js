var express = require("express");
var mongoose = require("mongoose");
var Comment = require("../models/Comment");

var comments = express.Router();

comments.route("/get-comments/:feed_id").get((req, res) => {
  Comment.find({ feedItem_id: req.params.feed_id })
    .sort({ _id: 1 })
    .exec((err, comments) => {
        if(err) console.log(err);
        res.send(comments);
    });
});

comments.route("/new-comment/:feed_id").post((req, res) => {
  let comment = new Comment();
  comment.feedItem_id = req.params.feed_id;
  comment.user_name = req.body.user_name;
  comment.user_avatar = req.body.user_avatar;
  comment.content = req.body.content;
  comment.postDate = req.body.postDate;
  comment.save(err => {
    if (err) console.log(err);
    res.json({ message: "Comment Posted" });
  });
});

module.exports = comments;
