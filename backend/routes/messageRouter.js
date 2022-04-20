//======================================================= Importations ==========================================================
//Importations expresst et router
const express = require("express");
const router = express.Router();

//Importation du moule messageCtrlers
const msgCtrlrs = require("../controllers/messageCrtlrs");

//Importation de multer
const multer = require("../middlewares/multer-confi");

//IMportation du middleware auth
const auth = require("../middlewares/auth");

//=================================================== Les endpoints ===========================================================
//Poster un message
router.post("/postMessage", msgCtrlrs.addMessage);
//Afficher tous les messages
router.get("/allMessage", msgCtrlrs.getAllMessages);
//====================================================== Exportation de router ================================================
module.exports = router;