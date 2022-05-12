const jwt = require("jsonwebtoken");

module.exports = {
    getUserId: function(data) {
        if (data.length > 1) {
            let token = data.split(" ")[1];
            try {
                let decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
                userId = decodedToken.userId;
                return userId;
            } catch (err) {
                return err;
            }
        }
    },
};