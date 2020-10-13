const bodyParser = require('body-parser');
const { response } = require('express');
const express = require('express');
const app = express();
const {pokemon} = require("./pokedex.json");

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
app.post("/pokemon",(req, res, next)=>{
    return res.status(200).send(req.body);
});

app.get("/pokemon", (req, res, next)=>{
    return res.status(200).send(pokemon);

})
app.get('/pokemon/:id([0-9]{1,3})', (req, res, next)=>{
    const id = req.params.id-1;
    if (id >= 0 && id <= 151){
        return res.status(200).send(pokemon[req.params.id-1]);
    }else{
        return res.status(404).send("Pokemon no encontrado");
    }


});
app.get('/pokemon/:name([A-Za-z]+)', (req, res, next)=>{
    const name = req.params.name;

    const pk = pokemon.filter((p)=>{
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });
    (pk.length>0) ? res.status(200).send(pk) : res.status(404).send("Pokemon no encontrado");
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running...");
});