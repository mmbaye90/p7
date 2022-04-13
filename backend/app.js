//=================================== Importations  ==================================
//importation de express
const express = require("express");
const app = express();

//importation de cors
const cors = require("cors");

//Importation du module userRouter
const userRouter = require("./routes/userRouter");
//============================== conf middleware de express et les endpoints  ========================
app.use(express.json()); // accés au corp de la requete
app.use(cors()); // autorisation d'accés à mon api à tout le monde
app.use("/api/auth", userRouter); //chemin d'enregistrement et de login du user

//======================  exportation de app   =====================================
module.exports = app;