const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function createUser(req, res) {
    let hash = null;
    if (req.body.password) {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!re.test(req.body.password)) {
            res.status(400).json({
                error: "Password must be with 8 minimum characters, 1 upercase letter, 1 upercase letter and 1 special character."
            });
        };
        const salt = bcrypt.genSaltSync(10);
        hash = bcrypt.hashSync(req.body.password, salt);
    }
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
    };
    User.create(userData).then((user) => {
        res.json(user);
    })
    .catch((err) => {
        res.status(400).json(err.errors);
    })
}

function checkUser(req, res) {
    const password = req.body.password;
    if (!password) {
        res.status(400).json({
            error: 'Password is missing.'
        });
    }
    User.findOne({ where: { email: req.body.email }}).then((user) => {
        if (user == null) {
            res.status(400).json({
               error: "User does not exist."
            });
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                var token = jwt.sign({ id: user.id }, 'jayesh chauhan', { expiresIn: '1h' });
                res.cookie('token', token);
                res.json(user);
            } else {
                res.status(400).send('Please enter correct password.');
            }
        }
    })
    .catch((err) => {
        res.status(400).json(err);
    })
}

module.exports = {
    createUser,
    checkUser
}