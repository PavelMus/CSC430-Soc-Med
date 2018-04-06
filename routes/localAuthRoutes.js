const express = require("express");
const router = express.Router();

//Bring in User Model

let User = require("../models/UserLocal");

// Register Form

router.get("/register", (req, res) => {
    console.log("ON REGISTER");
})

module.exports = router;