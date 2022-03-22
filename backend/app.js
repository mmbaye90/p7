//=================================== Importations  ==================================
//importation de express
const express = require("express");
const app = express();

//importation de cors
const cors = require("cors");

//=================================  fin importation  ===============================

//============================== conf middleware de express  ========================
app.use(express.json()); // accés au corp de la requete
app.use(cors()); // autorisation d'accés à mon api à tout le monde

//======================  exportation de app   =====================================
module.exports = app;