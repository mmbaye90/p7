//======================================================= Importations ==========================================================
//Importations expresst et router
const express = require("express");
const router = express.Router();

//Importation du moule uerControllers
const userCtrlrs = require("../controllers/userCtrlrs");

//=================================================== Les endpoints ===========================================================
router.post("/register", userCtrlrs.register);
//====================================================== Exportation de router ================================================
module.exports = router;