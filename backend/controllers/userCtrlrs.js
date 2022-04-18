//============================== Importations userModel , bcrypt & jwt =================================
const jwt = require("jsonwebtoken");
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
            message: `le mot de passe doit contenir 
        au minimun huit caractères, au moins une lettre majuscule,
        une lettre minuscule, un chiffre et un caractère spécial`,
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
                    }
                    res.status(201).json({
                        userId: user.id,
                        pseudo: user.pseudo,
                        avatar: user.avatar,
                        admin: user.admin,
                        token: jwt.sign({
                                userId: user.id,
                            },
                            "RANDOM_TOKEN_SECRET", { expiresIn: "1h" }
                        ),
                    });
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
                    .json({ message: "Profile utilisateur non retrouvé !!!" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

exports.updateProfile = (req, res) => {
    const id = req.params.id;
    //Pour prendre en compte les deux cas de figure:
    const data = req.file ?
        {
            //on traite la modification contenant une image
            bio: req.body.bio,
            avatar: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        } :
        {
            //s'il ne contient pas d'image
            bio: req.body.bio,
        };
    models.User.findByPk(id)
        .then((user) => {
            const filename = user.avatar ?
                {
                    name: user.avatar.split("3000/")[1],
                } :
                {
                    name: user.avatar,
                };
            fs.unlink(`images/${filename.name}`, () => {
                models.User.update(data, {
                    where: { id: id },
                });
            }).then((num) => {
                if ((num = 1)) {
                    res.status(201).json({ message: "Profil mis à jour avec succés" });
                } else {
                    res.status(401).json({ message: "Profil non mis à jour" });
                }
            });
        })
        .catch((error) => {
            res
                .status(500)
                .send({ message: "Impossible de modifier l'image du profil" });
        });
};

exports.deleteProfile = (req, res) => {
    if (!req.params.id || !req.headers.authorization) {
        res.status(400).json({ message: "Requête erronée." });
    } else {
        const token = jwt.getUserId(req.headers.authorization);
        const userId = token.userId;

        models.User.findOne({ where: { id: userId } })
            .then((user) => {
                if (user.id === userId) {
                    const filename = user.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, (err) => {
                        if (err) throw err;
                    });
                    models.User.update({
                            imageUrl: null,
                            updatedAt: new Date(),
                        }, { where: { id: user.id } })
                        .then(() => {
                            models.User.findOne({ where: { id: userId } })
                                .then((user) => res.status(200).json(user))
                                .catch((error) => res.status(404).json(error));
                        })
                        .catch((error) => res.status(501).json(error));
                } else {
                    res.status(403).json({ message: "Action non autorisée." });
                }
            })
            .catch((error) => res.status(500).json(error));
    }
};