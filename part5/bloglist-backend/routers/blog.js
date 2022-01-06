const blogRouter = require("express").Router();
const {getBlogs, createBlog, deleteBlog, updateBlog, getBlog} = require("../controllers/blog");

blogRouter.get("/", getBlogs);
blogRouter.post("/", createBlog);
blogRouter.get("/:id", getBlog)
blogRouter.delete("/:id", deleteBlog);
blogRouter.patch("/:id", updateBlog);

module.exports = blogRouter;
