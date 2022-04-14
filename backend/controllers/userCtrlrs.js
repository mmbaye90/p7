//============================== Importations userModel , bcrypt & jwt =================================
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
//============================= Regex pour vérification mail et psswrd ================================
//Minimum huit caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial
const pwdRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const mailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//==================================             register function            ==================================
exports.register = (req, res) => {
    //Je procéde au vérification du mail et du mdp avec des regex
    if (!mailRegex.test(req.body.email)) {
        return res.status(400).json({ message: "Veuillez saisir un mail valide" });
    }
    if (!pwdRegex.test(req.body.password)) {
        return res.status(400).json({
            message: `le mot de passe doit contenir 
        au minimun huit caractères, au moins une lettre majuscule,
        une lettre minuscule, un chiffre et un caractère spécial`,
        });
    }
    //Aprés vérification, je vérifie dans la bd si le user existe
    db.User.findOne({
            where: { email: req.body.email },
        })
        .then((userFound) => {
            //si le user n'existe pas:j'utilise le bcrypt pour hasher avant enregistrer ds la BD
            if (!userFound) {
                bcrypt.hash(req.body.password, 10).then((hash) => {
                    db.User.create({
                        email: req.body.email,
                        password: hash,
                        pseudo: req.body.pseudo,
                        bio: req.body.bio,
                        admin: 0,
                    }).then((user) => {
                        res.status(201).json({
                            id: user.id,
                        });
                    });
                });
            } else {
                res.status(400).json({ message: "Cet user existe déjà" });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};