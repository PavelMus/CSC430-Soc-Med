const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/Users");
require("./models/Posts");
require("./models/Feed");
require("./services/passport");
var posts = require("./routes/postsRoutes");
var feed = require("./routes/feedRoutes");
var alerts = require("./routes/alertRoutes");

mongoose.connect(keys.mongoURI);


// SOCKET IO SETUP //
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

/**************Applying middleware**************/
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/***********************************************/

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  //and remove cacheing so we get the most recent comments
  res.setHeader("Cache-Control", "no-cache");
  next();
});
/*********************************************************************************************************************/

app.use("/api", posts);
app.use("/api", feed);
app.use("/api", alerts);

require("./routes/authRoutes")(app);

if (process.env.NODE_ENV == "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Listening to port " + PORT)
);

//////// SOCKET IO FUNCTIONS  ////////////////////

io.on('connection', socket => {
  console.log("CONNECTED!");
  socket.on('text', (text) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log('Color Changed to: ', text)
    io.sockets.emit('recieve-text', text)
  })
   socket.on('disconnect', () => {
     socket.removeAllListeners('text');
     socket.removeAllListeners('disconnect');
     io.removeAllListeners('connection');
     console.log("DISCONNECTED");
})  
})