import propTypes from "prop-types";
import React from "react";
const Blog = ({ blog }) => (
  <div>
    <p>{blog.title}</p>
    <p>{blog.author}</p>
    <p>{blog.url}</p>
  </div>
);

Blog.prototype = {
  blog: propTypes.object.isRequired
}
export default Blog;
