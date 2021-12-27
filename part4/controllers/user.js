const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const User = require("../models/user");

const createUser = async (request, response) => {
  const body = request.body;

  if (body.password.length <= 3 && body.username.length <= 3) {
    return response
      .status(400)
      .send({ error: "username and password length must be atleast 3" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
};

const getUsers = async (request, response) => {
  const users = await User.find({}).populate("blogs");
  return response.json(users);
};

module.exports = { createUser, getUsers };
