

var express = require("express");
var mongoose = require("mongoose");
var Feed = require("../models/Feed");
var News = require("../models/NewsPost");
var Events = require("../models/EventPost");

var feedRouter = express.Router();

//adding the /feeds route to our /api feedRouter
feedRouter
  .route("/feed")
  //retrieve all feeds from the database
  .get(function(req, res) {
    //looks at our feed Schema
    Feed.find().sort({_id: -1}).exec(function(err, feed) {
      if (err) res.send(err);
      //responds with a json object of our database feeds.
      res.json(feed);
    });
  });

  feedRouter
    .route("/feed/:feed_id")
    .get(function(req, res){
      Feed.findById(req.params.feed_id, function(err, feed){
        if(err)
          res.send(err);
        
        res.json(feed);
      });
    });

  /* This is the feed router for news posts, it is responsible for
     post and put events that are made through the api/feed/news URI */

  feedRouter
    .route("/feed/news-post")
    .post((req, res) =>{
        var news = new News();
        var date = new Date();
        var dateFormated = date.toUTCString();
        news.author = req.body.author;
        news.title = req.body.title;
        news.postDate = dateFormated;
        news.delta = req.delta;
        news.preview = req.body.preview;

        var feed = new Feed();
        feed.type = "news";
        feed.feedItem = news;
        feed.save((err) => {
            if(err)
                res.send(err);
            res.json({message: 'news item successfully posted'});
        });
    });

      /* This is the feed router for event posts, it is responsible for
     post and put events that are made through the api/feed/events URI */

    feedRouter
    .route("/feed/event-post")
    .post((req, res) =>{
        var event = new Events();
        var date = new Date();
        var dateFormated = date.toUTCString();

        event.author = req.body.author;
        event.title = req.body.title;
        event.postDate = dateFormated;
        event.delta = req.body.delta;
        event.preview = req.body.preview;

        var feed = new Feed();
        feed.type = "event";
        feed.feedItem = event;
        feed.save((err) => {
            if(err)
                res.send(err);
            res.json({message: 'event item successfully posted'});
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
  module.exports = feedRouter;
