import express from "express";
import { engine } from "express-handlebars";

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

app.get("/book", (req, res) => {
  const bookId = req.query.id;

  if (bookId) {
    // get book information
    // this might be a different microservice

    res.render("book", { id: bookId });
  } else {
    res.redirect("search");
  }
});

app.get("/search", (req, res) => {
  const query = req.query;

  res.render("search", {
    query: query,
    helpers: {
      hasParams(query: any) {
        return query.title || query.id;
      },
    },
  });
});

app.post("/search", (req, res) => {});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
