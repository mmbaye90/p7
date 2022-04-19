//======================================================= Importations ==========================================================
//Importations expresst et router
const express = require("express");
const router = express.Router();

//Importation du moule messageCtrlers
const userCtrlrs = require("../controllers/messageCrtlrs");

//Importation de multer
const multer = require("../middlewares/multer-confi");

//IMportation du middleware auth
const auth = require("../middlewares/auth");

//=================================================== Les endpoints ===========================================================
//Inscription
router.post("/postMessage", userCtrlrs.addMessage);
//====================================================== Exportation de router ================================================
module.exports = router;