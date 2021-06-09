const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blogRoutes");
const methodOverride = require("method-override");

const app = express();

app.use(express.static("public"));

// DB
mongoose
  .connect(
    "mongodb+srv://geary:vXnKBuG9ER7KZ5w@blog-cluster.j6ler.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Mongo DB Connected"));

app.use(express.static("public"));
// View Engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use("/blogs", blogRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Connected to port ${PORT}`));
