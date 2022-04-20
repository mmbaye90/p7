const jwt = require("jsonwebtoken");

module.exports = {
    getUserId: function(data) {
        if (data !== null) {
            try {
                let token;

                if (data.split(" ").length > 1) {
                    token = jwt.verify(data.split(" ")[1], "RANDOM_TOKEN_SECRET");
                } else {
                    token = jwt.verify(data, "RANDOM_TOKEN_SECRET");
                }
                return token;
            } catch (err) {
                return err.message;
            }
        }
    },
};