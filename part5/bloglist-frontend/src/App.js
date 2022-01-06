import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import CreateNewBlog from "./components/CreateNewBlog";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import User from "./components/User";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const handleCreateNewBlog = (event) => {
    event.preventDefault();
    blogService.createBlog(newBlog).then(() => {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    });
  };

  const handleLogout = () => {
    localStorage.setItem("logged-blog-user", null);
    setUser(null);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("logged-blog-user"));
    if (user) setUser(user);
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  return (
    <div>
      <h1>Blogs</h1>
      {!user ? (
        <Togglable buttonLabel="login">
          <Login setUser={setUser} />
        </Togglable>
      ) : (
        <>
          <User user={user} logout={handleLogout} />
          <Togglable buttonLabel="create new blog">
            <CreateNewBlog
              newBlog={newBlog}
              setNewBlog={setNewBlog}
              handleCreateNewBlog={handleCreateNewBlog}
            />
          </Togglable>
          <Blogs blogs={blogs} setBlogs={setBlogs} />
        </>
      )}
    </div>
  );
};

export default App;
