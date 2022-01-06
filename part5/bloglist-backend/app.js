const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./routers/blog");
const { MONGODB_URI } = require("./utils/config");
const logger = require("./utils/logger");
const usersRouter = require("./routers/user");
const loginRouter = require("./routers/login");
const { errorHandler, unknownEndpoint } = require("./utils/middleware");

const app = express();
app.use(express.json());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "development") {
  const testingRouter = require("./routers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
