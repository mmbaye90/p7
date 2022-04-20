//==================================== Importations ==============================================
const models = require("../models");
const fs = require("fs");
const jwtUtil = require("../utils/jwtUtil");

//==================================  Les dfrtes functions =======================================
//Création d'un message
exports.addMessage = (req, res) => {
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