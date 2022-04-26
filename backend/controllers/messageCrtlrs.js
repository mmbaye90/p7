//==================================== Importations ==============================================
const models = require("../models");
const fs = require("fs");
const jwtUtil = require("../utils/jwtUtil");

//==================================  Les dfrtes functions =======================================
//Création d'un message
exports.addMessage = (req, res) => {
    //Récupération userId dans la requête
    const userId = jwtUtil.getUserId(req.headers.authorization);
    models.User.findOne({
            attributes: ["id", "email", "pseudo"],
            where: { id: userId },
        })
        .then((user) => {
            if (user !== null) {
                let attachment;
                if (req.file != undefined) {
                    attachment = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
                } else {
                    attachment == null;
                }
                if (req.body.content == "" && req.file == undefined) {
                    res.status(400).json({ error: "Il n'y a aucun contenu à ajouter !" });
                } else {
                    models.Message.create({
                            title: req.body.title,
                            content: req.body.content,
                            attachment: attachment,
                            UserId: user.id,
                        })
                        .then((newMsg) => {
                            res.status(201).json(newMsg);
                        })
                        .catch((err) => {
                            res.status(500).json(err);
                        });
                }
            } else {
                res.status(400).json();
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "erreur serveur" });
        });
};

//Lister tous les messages
//Pour le moment sans les commentaires associés
exports.getAllMessages = (req, res) => {
    models.Message.findAll({
            //Je récupére le user qui a créé le message(ici le mail)
            include: [{
                model: models.User,
                attributes: ["email"],
            }, ],
            //J'ordonne l'affichage des messages par date de création:ordre décroissant c a d msg rec au plus ancien
            order: [
                ["createdAt", "DESC"]
            ],
        })
        .then((posts) => {
            //Vérification s'il ya des messages ou non
            if (posts.length != null) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({ error: "Aucun message à afficher" });
            }
        })
        .catch((err) => res.status(500).json(err));
};

//Afficher un seul message
exports.getOneMessage = (req, res) => {
    models.Message.findOne({
            where: { id: req.params.id },
            include: [{
                model: models.User,
                attributes: ["id", "pseudo", "avatar"],
            }, ],
        })
        .then((post) => {
            if (!post) {
                return res.status(400).json({ error: "Pas de message à afficher !" });
            }
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(401).json({ error });
        });
};

//Modification d'un post
exports.update = (req, res) => {
    const userId = jwtUtil.getUserId(req.headers.authorization);

    models.User.findOne({
            attributes: ["id", "email", "pseudo", "admin"],
            where: { id: userId },
        })
        .then((userFound) => {
            if (userFound == null) {
                return res
                    .status(401)
                    .json({ message: "Vous n'êtes pas authorisé à modifier le message" });
            }
            if (userFound.id != req.params.id) {
                return res.status(401).json({
                    message: "id du params différent du userID,modification impossible",
                });
            }
            if (userFound || userFound.admin == true) {
                const messageObject = req.file ?
                    {
                        attachment: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
                    } :
                    {...req.body };
                models.Message.update(messageObject, { where: { id: req.params.id } })
                    .then(() => {
                        res.status(201).json({ message: "Message Modifié" });
                    })
                    .catch((error) => {
                        res.status(401).json({ error: "Message non modifié" });
                    });
            }
        })
        .catch(() => res.status(500).json({ error: "erreur serveur" }));
};

//Suppression d'un post
exports.deletePost = (req, res) => {
    const userId = jwtUtil.getUserId(req.headers.authorization);

    models.User.findOne({
            where: { id: userId },
        })
        .then((userFound) => {
            if (userFound == null) {
                return res
                    .status(401)
                    .json({ message: "Vous n'êtes pas authorisé à modifier le message" });
            }
            if (userFound.id != req.params.id) {
                return res.status(401).json({
                    message: "id du params différent du userID,modification impossible",
                });
            }
            if (
                userFound ||
                userFound.admin == true ||
                userFound.id == req.params.id
            ) {
                models.Message.findOne({
                    where: { id: userId },
                }).then((messageFound) => {
                    let filename;
                    if (filename != null) {
                        let filename = messageFound.attachment.split("/images/")[1];
                        fs.unlink(`images/${filename}`, () => {
                            models.Message.destroy({ where: { id: userId, ...req.body } })
                                .then(() => {
                                    res.status(204).json({ message: "Message supprimée !" });
                                })
                                .catch((error) => res.status(400).json({ error }));
                        });
                    } else {
                        models.Message.destroy({ where: { id: userId, ...req.body } })
                            .then(() => {
                                res.status(204).json({ message: "Message supprimée !" });
                            })
                            .catch((error) => res.status(400).json({ error }));
                    }
                });
            }
        })
        .catch(() => res.status(500).json({ error: "erreur serveur" }));
};