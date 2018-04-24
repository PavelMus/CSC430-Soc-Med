var express = require("express");
var mongoose = require("mongoose");
var Users = require("../models/Users");
var ChatHistory = require("../models/ChatHistory");

var chatRouter = express.Router();

chatRouter
  .route("/chat_history/:chat_id")
  .get((req, res) => {
    ChatHistory.find({chat_id: req.params.chat_id})
    .exec( (err, chat) => {
        //console.log("IN CHAT HISTORY");
        //console.log(chat);
        if(err) throw err;
        if(!chat.length){
            res.send({message: "NOT FOUND"});
        } else {
            res.json(chat[0]);
        }
    });
});
chatRouter.route("/chat_history/:chat_id/:user1/:user2").post((req, res) => {
    new_chatLog = new ChatHistory();
    new_chatLog.chat_id = req.params.chat_id;
    new_chatLog.user_ids.push(req.params.user1);
    new_chatLog.user_ids.push(req.params.user2);
    new_chatLog.save((err)=> {
        if(err) res.send(err);
        res.send({message: "new chat log created"});
    });
});
chatRouter.route("/chat_history_save/:chat_id").put((req, res) => {
    //console.log("IN SAVE CHAT");
    ChatHistory.find({chat_id: req.params.chat_id}, (err, chat) => {
        if(err) console.log(err);
        chat[0].content.push(req.body);
        chat[0].save(err =>{
            if(err) console.log(err);
        });
    });
});

module.exports = chatRouter;