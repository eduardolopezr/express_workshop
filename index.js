const bodyParser = require('body-parser');
const morgan =  require("morgan");
const { response } = require('express');
const express = require('express');
const app = express();
const pokemon=require('./routes/pokemon');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/*
Los verbos HTTP
GET -> Obtiene recursos
POST -> almacena/crea recursos
PUT -> Modifica un recurso
PATCH -> Modifica una parte de recurso
DELETE -> Borra un recurso
*/
app.get("/",(req, res, next)=>{
    return res.status(200).send("Bienvenido a pokedex");
});

app.use("/pokemon", pokemon); 

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running...");
});