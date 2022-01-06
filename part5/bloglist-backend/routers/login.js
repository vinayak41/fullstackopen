const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const { login } = require("../controllers/login");

loginRouter.post("/", login);

module.exports = loginRouter;
