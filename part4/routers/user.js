const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const { createUser, getUsers } = require("../controllers/user");

usersRouter.post("/", createUser);
usersRouter.get("/", getUsers);

module.exports = usersRouter;
