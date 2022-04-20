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
router.get("/", msgCtrlrs.getAllMessages);
//Afficher un seul message
router.get("/:id", msgCtrlrs.getOneMessage);
//Modifier un message
router.put("/update/:id", msgCtrlrs.update);
//Supprimer un message
router.delete("/delete/:id", msgCtrlrs.deletePost);

//====================================================== Exportation de router ================================================
module.exports = router;