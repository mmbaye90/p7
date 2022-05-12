//Importation du pckg multer
const multer = require("multer");

//configuration dictionaire de l'extension des fichiers
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
};

//Config du stockage des fichier avec la méthode diskStorage
//il contiendra deux fonctions: 1fction de destination/2-fction configurant le nom du fichier
const storage = multer.diskStorage({
    //fonction de destination
    destination: (req, file, callback) => {
        callback(null, "images"); // indique que les fichiers vont etre sauvegardés dans le dossier images
    },
    filename: (req, file, callback) => {
        //formatage du nom de fichier reçu par le frontend :on remplace les espaces par des _
        const name = file.originalname.split(" ").join("_");
        //définition de l'extension du fichier
        const extension = MIME_TYPES[file.mimetype];
        //Définition du chemin complet.Le null indique que tout s'est bien passé
        callback(null, name + Date.now() + "." + extension);
    },
});

//Exportation du fichier configuration avec la methode single qui gére uniquement les fichers images
module.exports = multer({ storage: storage }).single("image");