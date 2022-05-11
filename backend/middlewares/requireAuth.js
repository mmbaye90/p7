const jwt = require("jsonwebtoken");
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "RANDOM_SECRET_TOKEN", (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(200).json("no token");
            } else {
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log("No token");
    }
};