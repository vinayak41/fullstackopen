const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      name: 1,
      username: 1,
      _id: 1,
    });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const body = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    if (!body.title || !body.url) {
      return res.status(400).json({ error: "title or url is missing" });
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", {
      name: 1,
      username: 1,
      _id: 1,
    });
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const token = req.token;

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken) {
      return response.status(401).json({
        error: "token missing or invalid",
      });
    }

    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (blog.user.toString() === decodedToken.id) {
      await Blog.findByIdAndDelete(id);
      res.status(204).end();
    } else {
      return res.status(401).json({
        error: "Unauthorized to access the blog",
      });
    }
  } catch (error) {
    res.status(400).send(error);
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (req.body.likes) {
      const blog = {
        likes: request.body.likes,
      };
      const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
      res.json(updatedBlog);
    } else {
      res.status(400).send({ error: "Likes property is missing" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getBlogs, createBlog, deleteBlog, updateBlog, getBlog };
