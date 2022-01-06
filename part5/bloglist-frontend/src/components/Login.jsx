import propTypes from "prop-types";
import React, { useState } from "react";
import blogService from "../services/blogs";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleInputChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await blogService.login(formData);
      window.localStorage.setItem("logged-blog-user", JSON.stringify(user));
      blogService.setToken(user.token);
      setFormData({ username: "", password: "" });
      setUser(user);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handelSubmit}>
        <div>
          username:
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            name="username"
          ></input>
        </div>
        <div>
          password:
          <input
            id="password"
            type="text"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
          ></input>
        </div>
        <button type="Submit" id="submit" >Submit</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setUser: propTypes.func.isRequired,
};

export default Login;
