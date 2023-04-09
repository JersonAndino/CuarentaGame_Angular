'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var MensajeSchema=Schema({
    chat:String,
    emisor:String,
    receptor:String,
    contenido:String,
    fecha:Date
});

module.exports=mongoose.model('Mensaje',MensajeSchema);