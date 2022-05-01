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
router.post("/postMessage", auth, msgCtrlrs.addMessage);
//Afficher tous les messages
router.get("/", auth, msgCtrlrs.getAllMessages);
//Afficher un seul message
router.get("/:id", auth, msgCtrlrs.getOneMessage);
//Modifier un message
router.put("/update/:id", auth, msgCtrlrs.update);
//Supprimer un message
router.delete("/delete/:id", auth, msgCtrlrs.addLikeMessage);

//Ajouter un Like à un message
router.post("/:id/likes", auth, msgCtrlrs.addLikeMessage);
//Ajouter un dislike
router.post("/:id/dislikes", auth, msgCtrlrs.dislikePost);

//====================================================== Exportation de router ================================================
module.exports = router;