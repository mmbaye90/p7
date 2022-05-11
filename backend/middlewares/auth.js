//Importation du pckg jwt pour décoder le token
const jwt = require("jsonwebtoken");

//Fonction de l'authentification
module.exports = (req, res, next) => {
    try {
        // 1-récupération du token reçu par le front
        const token = req.headers.authorization.split(" ")[1];
        // 2-token décodé avec l'utilisation de jwt.verify
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        // 3-Récupération de userId reçu également par le front et décodé précédemment
        const userId = decodedToken.userId;
        // 4- Ajouter un objet auth incluant le userId à l'objet REQ pour s'en servir pour améliorer la function Delete
        req.auth = { userId };
        // 5- On vérifie si le userId de la requete correspond à celui contenu dans le token
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID invalide";
        } else {
            console.log(userId);
            next();
        }
    } catch (error) {
        res.status(401).json({ error: new Error("requete inavlide !!!") });
    }
};