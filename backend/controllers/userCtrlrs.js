//============================== Importations userModel , bcrypt & jwt =================================
const jwt = require("jsonwebtoken");
const jwtUtil = require("../utils/jwtUtil");
const bcrypt = require("bcrypt");
const models = require("../models");
const fs = require("fs");
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
            message: `MDP doit contenir 
        au minimun 8 caractères, au moins 1 majuscule,
        1 minuscule, 1 chiffre et 1 caractère spécial`,
        });
    }
    //Aprés vérification, je vérifie dans la bd si le user existe
    models.User.findOne({
            where: { email: req.body.email },
        })
        .then((userFound) => {
            //si le user n'existe pas:j'utilise le bcrypt pour hasher avant enregistrer ds la BD
            if (!userFound) {
                bcrypt.hash(req.body.password, 10).then((hash) => {
                    models.User.create({
                        email: req.body.email,
                        password: hash,
                        pseudo: req.body.pseudo,
                        bio: req.body.bio,
                        avatar: req.body.avatar,
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

exports.login = (req, res) => {
    models.User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ message: "Cet utilisateur n'existe pas !!!" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ message: "Mot de passe invalide !!!" });
                    } else {
                        const token = jwt.sign({
                                userId: user.id,
                            },
                            "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }
                        );
                        res.cookie("jwt", token);
                        res.status(201).json({
                            userId: user.id,
                            pseudo: user.pseudo,
                            avatar: user.avatar,
                            admin: user.admin,
                            bio: user.bio,
                            token: token,
                        });
                    }
                })
                .catch((error) => {
                    res.status(401).json({ error });
                });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

exports.getUserProfile = (req, res) => {
    models.User.findOne({
            //Ce que je veux afficher. Jamais le MDP // si non la req nous renvoie toutes les clefs et leur val
            attributes: ["id", "email", "pseudo", "avatar", "bio", "admin"],
            //recherche dans la BD avec l'ID
            where: { id: req.params.id },
        })
        .then((user) => {
            if (user) {
                res.status(201).json(user);
            } else {
                res
                    .status(401)
                    .json({ message: "Profile utilisateur non retrouvé ou inexistant" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

exports.updateProfile = (req, res) => {
    const profilObject = req.file ?
        {
            ...JSON.parse(req.body.user),
            avatar: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        } :
        {...req.body };
    models.User.update(profilObject, { where: { id: req.params.id } })
        .then(() => {
            res.status(201).json({ message: "Profil Modifié" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteProfile = (req, res) => {
    models.User.findOne({
            where: { id: req.params.id },
        })
        .then((userFound) => {
            if (userFound) {
                models.User.findOne({
                        attributes: ["admin"],
                        where: { id: req.params.id },
                    })
                    .then((userIsAdmin) => {
                        // Si c'est le profil de l'utilisateur ou l'admin, on supprime le commentaire
                        if (req.params.id == userFound.id || userIsAdmin.admin == true) {
                            models.User.destroy({
                                    where: { id: req.params.id },
                                })
                                .then(() =>
                                    res.status(201).json({ message: "Compte supprimé" })
                                )
                                .catch((error) => res.status(404).json({ error }));
                        } else {
                            // Si ce n'est pas le profil de l'utilisateur ni l'admin qui demande la suppression
                            // Status 403 : non autorisé
                            res.status(403).json({
                                error: "Vous n'êtes pas autorisé à supprimer le compte",
                            });
                        }
                    })
                    .catch((error) => res.status(404).json({ error: error }));
            } else {
                res.status(404).json({ error: "Profil non trouvé" });
            }
        })
        .catch((error) =>
            res.status(500).json({ error: "Impossible de supprimer le compte" })
        );
};