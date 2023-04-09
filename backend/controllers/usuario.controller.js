'use strict'
var fs=require('fs');
const path=require('path');
var Usuario=require('../models/usuario');
const session = require('express-session');

var controller={
    saveUsuario:function(req,res){
        var usuario=new Usuario();
        var params=req.body;
        usuario.username=params.username;
        usuario.password=params.password;
        usuario.nombre=params.nombre;
        usuario.apellido=params.apellido;
        usuario.imagen=null;
        
        Usuario.findOne({username:usuario.username})
        .then(result=>{
            if(!result){
                usuario.save()
                .then(result => {
                    if (!result) return res.status(404).send({message:"No se ha guardado el usuario"});
                    return res.status(200).send({result});
                })
                .catch(err => {
                    console.log(err);
                });   
            }else{
                return res.status(405).send({message:"Este usuario ya existe"});
            }
        })
        .catch(err=>{});

        
    },
    obtenerUsuarios:function(req,res){
        Usuario.find({}).sort()
        .then(result=>{
            console.log(result);
            if (!result) return res.status(404).send({message:'no usuario'});

            return res.status(200).send({result:result});
        })
        .catch(err=>{console.log(err)})
    },
    login:function(req,res){
        var username=req.body.username;
        var password=req.body.password;
        if (username==null || password==null) return res.status(404).send({message:'Algo ha fallado'});
        Usuario.findOne({username})
        .then(resultUser => {
            if (!resultUser){ 
                res.status(404).send({message:'no usuario'});
            }else{
                if (resultUser.password==password){
                    req.session.user=resultUser.username;
                    res.status(200).send({result:{message:'Has iniciado sesión correctamente'}, session:req.session});
                }else{
                    res.status(404).send({message:'no password'});
                }
            }
        })
        .catch(err => {
            //return res.status(404).send({message:'Algo ha fallado'});
            console.log("ALGO SALIO MAL");
        })
    },
    getLogin:function(req,res){
        console.log(req.session);
        req.session.user ? res.status(200).send({loggedIn: true,user:req.session.user}) : res.status(200).send({loggedIn: false});        
    },
    logout:function(req,res){
        req.session.destroy((err)=>{
            if (err) {
                res.status(500).send('Could not log out.');
            } else {
                res.status(200).send({});
            }
        });
    },
    visits:function(req,res){
        if(req.session.page_views){
            req.session.page_views++;
            res.send("You visited this page " + req.session.page_views + " times");
         } else {
            req.session.page_views = 1;
            res.send("Welcome to this page for the first time!");
         }
    }
}

module.exports=controller;