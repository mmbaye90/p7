//======================================================= Importations ==========================================================
//Importations expresst et router
const express = require("express");
const router = express.Router();

//Importation du moule uerControllers
const userCtrlrs = require("../controllers/userCtrlrs");

//=================================================== Les endpoints ===========================================================
router.post("/register", userCtrlrs.register);
router.post("/login", userCtrlrs.login);
router.get("/profile", userCtrlrs.getUserProfile);
//====================================================== Exportation de router ================================================
module.exports = router;