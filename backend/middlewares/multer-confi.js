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
// const multer = require("multer");

// const MIME_TYPES = {
//     "image/jpg": "jpg",
//     "image/jpeg": "jpg",
//     "image/png": "png",
//     "image/gif": "gif",
// };

// const storage = multer.diskStorage({
//     // Determiner la destination du fichier
//     destination: (req, file, callback) => {
//         callback(null, "images");
//     },

//     // Determiner le nouveau nom du fichier
//     filename: (req, file, callback) => {
//         const name = file.originalname.split(".")[0].split(" ").join("_");
//         const extension = MIME_TYPES[file.mimetype];
//         callback(null, "client_" + name + Date.now() + "." + extension);
//     },
// });

// // Vérifier la compatibilité de l'extention du fichier
// const fileFilter = (req, file, callback) => {
//     const extension = MIME_TYPES[file.mimetype];
//     if (
//         extension === "jpg" ||
//         extension === "jpeg" ||
//         extension === "png" ||
//         extension === "gif"
//     ) {
//         callback(null, true);
//     } else {
//         callback("Erreur : Mauvais type de fichier", false);
//     }
// };

// module.exports = multer({
//     storage,
//     limits: { fileSize: 104857600 },
//     fileFilter,
// }).single("file");