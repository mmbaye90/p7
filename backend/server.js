//Importation du fichier app et du package http pourla création du serevr
const http = require("http");
const app = require("./app");

//Création d'une fonction pour normaliser (parser) leport en integer
const normalizePort = (val) => {
    const port = parseInt(val, 10); // convertir la val de l'argument en integer
    if (!isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    } else {
        return false;
    }
};

//Parametrage du port de l'app  avec des méthodes de express sur le port 3000
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//Création d'une fonction chargée de la gestion des erreurs
const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const adress = server.adress();
    const bind = typeof adress === "string" ? "pipe" + adress : "port" + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + "Requiert des droits élevés");
            process.exit(1);
            break;
        case "ADDRINUSE":
            console.error(bind + "Est déjà utilisé");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//Création du server avec des méthodes de express
const server = http.createServer(app);
server.on("error", errorHandler);
server.on("listen", () => {
    const adress = server.adress();
    const bind = typeof adress === "string" ? "pipe" + adress : "port" + port;
    console.log("listening on " + bind);
});
server.listen(port, () => {
    console.log(`App runing on port  ${port}`);
});