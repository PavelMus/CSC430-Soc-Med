const bcrypt = require("bcryptjs");
const passport = require("passport");

//Bring in User Model

let User = require("../models/Users");

// Register Form
module.exports = app => {
  app.get("/api/register", (req, res) => {
    console.log("ON REGISTER");
  });

  app.post("/api/register", (req, res) => {
    console.log("POSTING!");
    const {
      first_name,
      last_name,
      email,
      password,
      password2,
      EMPLID
    } = req.body;
    let displayName = first_name + " " + last_name;

    req.checkBody("first_name", "First name is required!").notEmpty();
    req.checkBody("last_name", "Last Name is required!").notEmpty();
    req.checkBody("email", "Email is required!").notEmpty();
    req.checkBody("password", "Password is required!").notEmpty();
    req
      .checkBody("password2", "Passwords do not match!")
      .equals(req.body.password);
    req.checkBody("EMPLID", "EMPLID is required!").notEmpty();

    let errors = req.validationErrors();

    if (errors) {
      res.json(errors);
      console.log(errors);
    } else {
      console.log("NO ERRORS");
      let newUser = new User({
        displayName: displayName,
        name:{
          givenName: first_name,
          familyName: last_name
        },
        EMPLID: EMPLID,
        googleId: "",
        email: email,
        password: password,
        avatar: "",
        admin: false,
        teacher: false,
        classes: []
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser.save(err => {
            if (err) {
              res.json(err);
            } else {
              res.json("redirect");
            }
          });
        });
      });
    }
  });
  app.post("/api/login-local", 
  passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    }), (req, res) => {
        console.log("AFTER AUTHENTICATE");
        res.redirect('/');
    });
}