const express = require("express");
const router = express.Router();

router.get("/:name", function (req, res) {
    let db = req.app.locals.db;
    const name = req.params.name;
    db.collection("categorias").find({name}).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});

router.post("/nuevaCategoria", function (req, res) {
    let db = req.app.locals.db;
    const name = req.body.name;
    const category = req.body.category;
    let evento = {
        name,
        category
    };
    db.collection("categorias").insertOne(evento, function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            db.collection("categorias").find().toArray(function (err, data) {
                if (err !== null) {
                    res.send(err);
                } else {
                    res.send(data);
                }
            });
        }
    });
});

module.exports = router;