var mongoose = require('mongoose');
var Post = mongoose.model("posts");

module.exports = (router) => {
  //adding the /posts route to our /api router
  router
    .route("/posts")
    //retrieve all posts from the database
    .get(function(req, res) {
      //looks at our post Schema
      Post.find(function(err, posts) {
        if (err) res.send(err);
        //responds with a json object of our database posts.
        res.json(posts);
      });
    })
    //post new post to the database
    .post(function(req, res) {
      var post = new Post();
      req.body.author ? (post.author = req.body.author) : null;
      req.body.text ? (post.text = req.body.text) : null;

      post.save(function(err) {
        if (err) res.send(err);
        res.json({ message: "post successfully added!" });
      });
    });

  //Adding a route to a specific post based on the database ID
  router
    .route("/posts/:post_id")
    //The put method gives us the chance to update our post based on the ID passed to the route
    .put(function(req, res) {
      Post.findById(req.params.post_id, function(err, post) {
        if (err) res.send(err);
        //setting the new author and text to whatever was changed. If nothing was changed
        // we will not alter the field.
        req.body.author ? (post.author = req.body.author) : null;
        req.body.text ? (post.text = req.body.text) : null;
        //save post
        post.save(function(err) {
          if (err) res.send(err);
          res.json({ message: "post has been updated" });
        });
      });
    })
    //delete method for removing a post from our database
    .delete(function(req, res) {
      //selects the post by its ID, then removes it.
      Post.remove({ _id: req.params.post_id }, function(err, post) {
        if (err) res.send(err);
        res.json({ message: "post has been deleted" });
      });
    });
};
