import express, { Request, Response } from "express";
import Book from "../models/Book.model";
import Person from "../models/Person.model";
import Review from "../models/Review.model";

export const app = express.Router({ mergeParams: true });

app.get("/", async (req, res) => {
  const books = await Book.findAll({
    include: [Person, Review],
  });

  res.send(JSON.stringify(books));
});

app.post("/", async (req, res) => {
  if (req.body.authorId && !(await Person.findByPk(req.body.authorId))) {
    res.sendStatus(500);
  } else {
    const book = new Book({
      title: req.body.title,
      authorId: req.body.authorId,
    });
    await book.save();

    res.sendStatus(200);
  }
});

app.get("/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id, {
    include: [Person, Review],
  });

  if (book) {
    res.send(JSON.stringify(book));
  } else {
    res.sendStatus(404);
  }
});

app.put("/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);

  if (book) {
    if (req.body.title) book.title = req.body.title;
    if (req.body.authorId) book.authorId = req.body.authorId;
    await book.save();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
