//=================================== Importations  ==================================
//importation de express
const express = require("express");
const app = express();
//importation helmet
const helmet = require("helmet");
//importation bodyparser
const bodyParser = require("body-parser");
//Importation du module userRouter
const userRouter = require("./routes/userRouter");
//Importation des models
const models = require("./models");
//Importation du module messageRouter
const messageRouter = require("./routes/messageRouter");
//Importation de jwutil
const jwtUtil = require("./utils/jwtUtil");
//Importation Auth
const auth = require("./middlewares/auth");

//============================== configuration de la  BD =================================
models.sequelize
    .authenticate()
    .then(() => {
        console.log("Connexion à la base de donnée REUSSIE");
    })
    .catch((error) => {
        console.error(`Connexion ECHOUEE : ${error}`);
    });
//============================== conf middleware de express et les endpoints  ========================
//importation de cors
const cors = require("cors");
app.use(cors()); // autorisation d'accés à mon api à tout le monde
app.use(helmet());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/jwtid", auth, (req, res) => {
    const userId = jwtUtil.getUserId(req.headers.authorization);
    res.status(200).json(userId);
});
app.use("/api/users", userRouter); //chemin d'enregistrement et de login du user
app.use("/api/users", messageRouter); //chemin pour poster des messages

//======================  exportation de app   =====================================
module.exports = app;