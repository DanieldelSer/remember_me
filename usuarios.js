const express = require("express");
const router = express.Router();

router.post("/", function (req, res) {
    let db = req.app.locals.db;
    const username = req.body.username;
    const password = req.body.password;
    db.collection("usuarios").find({ username, password }).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            if (datos.length > 0) {
                res.send(datos);
            } else {
                res.send(datos);
            }
        }
    });
});

// router.post("/nuevoUsuario", function (req, res) {
//     let db = req.app.locals.db;
//     const username = req.body.username;
//     const password = req.body.password;
//     let usuario = {
//         username,
//         password
//     };
//     db.collection("usuarios").insertOne(usuario, function (err, datos) {
//         if (err !== null) {
//             res.send(err);
//         } else {
//             db.collection("usuarios").find().toArray(function (err, data) {
//                 if (err !== null) {
//                     res.send(err);
//                 } else {
//                     res.send(data);
//                 }
//             });
//         }
//     });
// });

router.post("/nuevoUsuario", function (req, res) {
    let db = req.app.locals.db;
    const username = req.body.username;
    const password = req.body.password;
    let usuario = {
        username,
        password
    };
    db.collection("usuarios").find({ username }).toArray(function (err, arrayUsuario) {
        if (err !== null) {
            res.send(err);
        } else {
            if (arrayUsuario.length === 0) {
                db.collection("usuarios").insertOne(usuario, function (er, datos) {
                    if (er !== null) {
                        res.send(er);
                    } else {
                        res.send(true);
                    }
                });
            } else {
                res.send(false)
            }
        }
    })
});


module.exports = router;