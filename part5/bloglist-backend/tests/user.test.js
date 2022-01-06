const app = require("../app");
const supertest = require("supertest");
const helper = require("./test_helper");
const mongoose = require("mongoose");
const User = require("../models/user");
const api = supertest(app);

jest.setTimeout(30000);

beforeEach(async () => {
  await User.deleteMany({});
  await Promise.all(
    helper.initialUsers.map((user) => {
      const newUser = new User(user);
      return newUser.save();
    })
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("invalid users are not created and invalid add user operation returns a suitable status code and error message", async () => {
  const response = await api
    .post("/api/users")
    .send({
      username: "jm",
      name: "Janeen Matteoni",
      password: "pU",
    })
    .expect(400)
    .expect("Content-Type", /application\/json/);
});


