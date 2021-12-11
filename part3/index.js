require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
app.use(express.static("build"));

const databaseUrl = process.env.MONGODB_URI;
mongoose
  .connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Database connection faild"));

app.get("/info", (req, res, next) => {
  Person.find({})
    .then((persons) =>
      res.send(
        `Phonebook has info for ${
          persons.length
        }  people <br><br> ${new Date()}`
      )
    )
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  if (name && number) {
    const person = new Person({
      name,
      number,
    });
    person
      .save()
      .then((person) => res.json(person))
      .catch((error) => next(error));
  } else {
    res.status(400).send("Name or Number missing");
  }
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => res.json(person))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then(() => res.end())
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndUpdate(id, req.body)
    .then((person) => res.json(person))
    .catch((error) => next(error));
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
  return;
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
