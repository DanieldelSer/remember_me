const express = require("express");
const router = express.Router();
ObjectID = require('mongodb').ObjectID

router.get("/:username", function (req, res) {
    const username = req.params.username;
    //console.log(username)
    let db = req.app.locals.db;
    db.collection("eventos").find({ name: username }).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});

router.post("/buscar/", function (req, res) {
    const username = req.body.username;
    const category = req.body.category;
    const eventName = req.body.eventName;
    let db = req.app.locals.db;
    db.collection("eventos").find({ name: username, category, eventName: {$regex: `.*${eventName}.*`} }).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});

router.get("/id/:_id", function (req, res) {
    let db = req.app.locals.db;
    const _id = req.params._id;
    db.collection("eventos").find({_id: ObjectID(_id) }).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});

router.post("/nuevoEvento", function (req, res) {
    let db = req.app.locals.db;
    const name = req.body.name;
    const category = req.body.category;
    const eventName = req.body.eventName;
    const fechaCategory = req.body.fechaCategory;
    let evento = {
        name,
        category,
        eventName,
        fechaCategory
    };
    db.collection("eventos").insertOne(evento, function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            db.collection("eventos").find().toArray(function (err, data) {
                if (err !== null) {
                    res.send(err);
                } else {
                    res.send(data);
                }
            });
        }
    });
});

router.put("/modificarEvento", function (req, res) {
    let db = req.app.locals.db;
    const _id = req.body._id;
    const category = req.body.category;
    const eventName = req.body.eventName;
    const fechaCategory = req.body.fechaCategory;
    db.collection("eventos").updateOne({_id: ObjectID(_id) }, { $set: { category, eventName,fechaCategory } }, function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    }
    );
});

router.delete("/deleteEvent/:_id", function (req, res) {
    let db = req.app.locals.db;
    const _id = req.params._id;
    db.collection("eventos").deleteOne({_id: ObjectID(_id) }, function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
  });

module.exports = router;