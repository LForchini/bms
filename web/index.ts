import express from "express";
import { engine } from "express-handlebars";
import { Book, Person, Review } from "./types";

const app = express();
const PORT: any = process.env.PORT || 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/book", async (req, res) => {
  const bookId = req.query.id;

  if (bookId) {
    const response = await fetch(`http://bms-api/books/${bookId}`);
    const book: Book = await response.json();

    res.render("book", book);
  } else {
    res.redirect("search");
  }
});

app.get("/search", async (req, res) => {
  res.render("search");
});

app.get("/results", async (req, res) => {
  const query = req.query;

  let filtered_books: Book[] = [];
  console.log(query);

  if (query.title) {
    const response = await fetch(`http://bms-api/books`);
    const books: Book[] = await response.json();

    filtered_books = books.filter((book) =>
      book.title.includes(query.title as string)
    );
  } else if (query.id) {
    const response = await fetch(`http://bms-api/books/${query.id}`);
    const book: Book = await response.json();

    filtered_books = [book];
  }

  console.log(query, filtered_books);

  res.render("results", {
    query: query,
    books: filtered_books,
  });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
