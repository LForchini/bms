import express, { Request, Response } from "express";
import Book from "../models/Book.model";
import Review from "../models/Review.model";

export const app = express.Router({ mergeParams: true });

app.get("/", async (req, res) => {
  const reviews = await Review.findAll();

  res.send(JSON.stringify(reviews));
});

app.post("/", async (req, res) => {
  if (req.body.bookId && (await Book.findByPk(req.body.bookId))) {
    const review = new Review({
      title: req.body.title,
      body: req.body.body,
    });
    await review.save();

    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

app.get("/:id", async (req, res) => {
  const review = await Review.findByPk(req.params.id, { include: [Book] });

  if (review) {
    res.send(JSON.stringify(review));
  } else {
    res.sendStatus(404);
  }
});

app.put("/:id", async (req, res) => {
  const review = await Review.findByPk(req.params.id);

  if (review) {
    if (req.body.title) review.title = req.body.title;
    if (req.body.body) review.body = req.body.body;
    await review.save();

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/:id", async (req, res) => {
  const review = await Review.findByPk(req.params.id);

  if (review) {
    await review.destroy();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
