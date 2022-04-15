//======================================================= Importations ==========================================================
//Importations expresst et router
const express = require("express");
const router = express.Router();

//Importation du moule uerControllers
const userCtrlrs = require("../controllers/userCtrlrs");

//=================================================== Les endpoints ===========================================================
router.post("/register", userCtrlrs.register);
router.post("/login", userCtrlrs.login);
router.get("/profile/:id", userCtrlrs.getUserProfile);
router.put("/profile/:id", userCtrlrs.updateProfile);
//====================================================== Exportation de router ================================================
module.exports = router;