import express from "express";
import { sequelize } from "./src/sequelize";
import { app as BookRoute } from "./src/routes/book";

import Book from "./src/models/Book.model";
import Person from "./src/models/Person.model";
import Review from "./src/models/Review.model";

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use("/books", BookRoute);

app.listen(PORT, async () => {
  await sequelize.sync({ force: true });

  const a = new Person({ name: "Richard Wolff" });
  await a.save();

  const b = new Book({
    title: "An Introduction to Political Philosophy",
    authorId: a.id,
  });
  await b.save();

  console.log(`Started HTTP on Port ${PORT}`);
});
