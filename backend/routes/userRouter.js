//======================================================= Importations ==========================================================
//Importations expresst et router
const express = require("express");
const router = express.Router();

//Importation du moule uerControllers
const userCtrlrs = require("../controllers/userCtrlrs");

//Importation de multer
const multer = require("../middlewares/multer-confi");

//=================================================== Les endpoints ===========================================================
router.post("/register", userCtrlrs.register);
router.post("/login", userCtrlrs.login);
router.get("/profile/:id", userCtrlrs.getUserProfile);
router.put("/profile/:id", multer, userCtrlrs.updateProfile);
router.delete("/profile/:id", userCtrlrs.deleteProfile);
//====================================================== Exportation de router ================================================
module.exports = router;