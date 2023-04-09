'use strict'
var express=require('express');
var router=express.Router();
var usuarioController=require('../controllers/usuario.controller');
var multiparty=require('connect-multiparty');
var multipartyMiddleWare=multiparty({uploadDir:'./uploads'});

router.post('/usuario',usuarioController.saveUsuario);
router.get('/usuario',usuarioController.obtenerUsuarios);
// router.get('/usuario/:id',cuentasController.validarCuenta);
// router.delete('/usuario/:id', cuentasController.desactivarCuenta);
router.post('/login',usuarioController.login);
router.get('/logout',usuarioController.logout);
router.get('/login',usuarioController.getLogin);

module.exports=router;