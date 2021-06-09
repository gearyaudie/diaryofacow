const express = require("express");
const Blog = require("../models/blogModel");

const router = express.Router();

// Show all (Index)
router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create
router.get("/new", (req, res) => {
  res.render("create");
});

// ------ Handle Create
router.post("/", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Read (Single Posts)
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("show", { blog });
});

// Update
router.get("/edit/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("edit", { blog });
});

// ------ Handle Update
router.put("/:id", async (req, res) => {
  let blog = await Blog.findById(req.params.id);

  blog.title = req.body.title;
  blog.body = req.body.body;

  try {
    blog = await blog.save();
    res.redirect(`/blogs/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
