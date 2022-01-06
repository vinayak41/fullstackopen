import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";

const Blogs = ({ blogs }) => {
  console.log(blogs);
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

Blogs.prototype = {
  blogs: propTypes.array.isRequired
}

export default Blogs;
