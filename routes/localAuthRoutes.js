const express = require("express");
const router = express.Router();

//Bring in User Model

let User = require("../models/UserLocal");

// Register Form

router.get("/register", (req, res) => {
    console.log("ON REGISTER");
})

router.post("/register", (req, res) => {
    console.log("POSTING!");
    const {first_name, last_name, email, password, password2, EMPLID} = req.body;
    let displayName = (first_name + " " + last_name);
    console.log(displayName);
    

    req.checkBody('first_name', 'First name is required!').notEmpty();
    req.checkBody('last_name', 'Last Name is required!').notEmpty();
    req.checkBody('email', 'Email is required!').notEmpty();
    req.checkBody('password', 'Password is required!').notEmpty();
    req.checkBody('password2', 'Passwords do not match!').equals(req.body.password);
    req.checkBody('EMPILID', 'EMPLID is required!').notEmpty();

    
})

module.exports = router;