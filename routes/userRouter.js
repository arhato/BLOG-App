const express = require('express');
const controller = require('../controllers/userControllers');

createUser
const userRouter = express.Router();

userRouter.post('/signup', controller.createUser);
userRouter.post('/login', controller.loginUser);

module.exports = userRouter;