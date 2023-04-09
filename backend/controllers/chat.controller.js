'use strict'
var fs=require('fs');
const path=require('path');
var Usuario=require('../models/usuario');
var Chat=require('../models/chat');
const session = require('express-session');

var controller={
    saveChat:function(req,res){
        console.log(req.body);
    },
    obtenerChatsPorUsuario(req,res){
        console.log(req.params);
    }
}

module.exports=controller;
