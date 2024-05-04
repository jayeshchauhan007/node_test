const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
    const token = req.cookies.token;
    jwt.verify(token, 'jayesh chauhan', (err, decoded) => {
        if (err){
            res.status(400).json(err);
        } else {
            next();
        }
    })
}

module.exports = {
    authenticateUser
};