const express = require("express");
const userController = require("../controller/user");
const userRouter = express.Router();

userRouter.post('/auth/register', userController.createUser);
userRouter.post('/auth/login', userController.checkUser);

module.exports = userRouter;