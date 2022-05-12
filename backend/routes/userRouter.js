//======================================================= Importations ==========================================================
//Importations expresst et router
const express = require("express");
const router = express.Router();

//Importation du moule uerControllers
const userCtrlrs = require("../controllers/userCtrlrs");

//Importation de multer
const multer = require("../middlewares/multer-confi");

//IMportation du middleware auth
const auth = require("../middlewares/auth");

//=================================================== Les endpoints ===========================================================
//Inscription
router.post("/register", userCtrlrs.register);

//Authentification
router.post("/login", userCtrlrs.login);

//Récupérer un user
router.get("/profile/:id", auth, userCtrlrs.getUserProfile);

//Modifier un user
router.put("/profile/:id", auth, multer, userCtrlrs.updateProfile);

//Supprimer un user
router.delete("/profile/:id", auth, userCtrlrs.deleteProfile);
//====================================================== Exportation de router ================================================
module.exports = router;