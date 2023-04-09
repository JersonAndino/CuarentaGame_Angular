'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ChatSchema=Schema({
    user1:String,
    user2:String
});

module.exports=mongoose.model('Chat',ChatSchema);