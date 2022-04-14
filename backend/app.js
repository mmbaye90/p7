//=================================== Importations  ==================================
//importation de express
const express = require("express");
const app = express();
//importation de cors
const cors = require("cors");
//Importation du module userRouter
const userRouter = require("./routes/userRouter");
//Importation des models
const fichierModel = require("./models");
//============================== configuration de la  BD =================================
fichierModel.sequelize
    .authenticate()
    .then(() => {
        console.log("Connexion à la base de donnée REUSSIE");
    })
    .catch((error) => {
        console.error(`Connexion ECHOUEE : ${error}`);
    });
//============================== conf middleware de express et les endpoints  ========================
app.use(express.json()); // accés au corp de la requete
app.use(cors()); // autorisation d'accés à mon api à tout le monde
app.use("/api/auth", userRouter); //chemin d'enregistrement et de login du user

//======================  exportation de app   =====================================
module.exports = app;