import express, { Request, Response } from "express";
import Book from "../models/Book.model";
import Person from "../models/Person.model";

export const app = express.Router({ mergeParams: true });

app.get("/", async (req, res) => {
  const persons = await Person.findAll();

  res.send(JSON.stringify(persons));
});

app.post("/", async (req, res) => {
  const person = new Person({ name: req.body.name });
  await person.save();

  res.sendStatus(200);
});

app.get("/:id", async (req, res) => {
  const person = await Person.findByPk(req.params.id, { include: [Book] });

  if (person) {
    res.send(JSON.stringify(person));
  } else {
    res.sendStatus(404);
  }
});

app.put("/:id", async (req, res) => {
  const person = await Person.findByPk(req.params.id);

  if (person) {
    if (req.body.name) person.name = req.body.name;
    await person.save();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/:id", async (req, res) => {
  const person = await Person.findByPk(req.params.id);

  if (person) {
    await person.destroy();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
