'use strict'
var express=require('express');
var router=express.Router();
var chatController=require('../controllers/chat.controller');
var multiparty=require('connect-multiparty');
var multipartyMiddleWare=multiparty({uploadDir:'./uploads'});

router.post('/chat',chatController.saveChat);
// router.get('/logout',usuarioController.logout);
// router.get('/login',usuarioController.getLogin);

module.exports=router;