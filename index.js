const express = require("express");
const app = express();
const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

const objectID = mongodb.ObjectID();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const usuarios = require("./usuarios");
const eventos = require("./eventos");
const categorias = require("./categorias");


MongoClient.connect("mongodb://localhost:27017", function (err, client) {
    if (err !== null) {
        console.log(err);
    } else {
        app.locals.db = client.db("RememberMe");
    }
});

app.use("/usuarios", usuarios);
app.use("/eventos", eventos);
app.use("/categorias", categorias);

app.listen(3000, function () {
    console.log("Puerto 3000 abierto");
});