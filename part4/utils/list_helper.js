const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((prevValue, crntBlog) => {
    return prevValue + crntBlog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  return blogs.reduce((prvBlog, crntBlog) => {
    return prvBlog.likes > crntBlog.likes ? prvBlog : crntBlog;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const authors = blogs.map((blog) => blog.author);
  let maxCount = 0;
  let count = 0;
  let AUTHOR = "";
  authors.forEach((author) => {
    count = 0;
    authors.forEach((_author) => {
      if (_author === author) count++;
    });
    if (count > maxCount) {
      AUTHOR = author;
      maxCount = count;
    }
  });
  return {
    author: AUTHOR,
    blogs: maxCount,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const authors = blogs.map((blog) => blog.author);
  let maxCount = 0;
  let count = 0;
  let AUTHOR = "";
  authors.forEach((author) => {
    count = 0;
    blogs.forEach((blog) => {
      if (author === blog.author) {
        count = count + blog.likes;
      }
    });
    if (count > maxCount) {
      AUTHOR = author;
      maxCount = count;
    }
  });
  return {
    author: AUTHOR,
    likes: maxCount,
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
