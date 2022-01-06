import React from "react";

const CreateNewBlog = ({ setNewBlog, handleCreateNewBlog }) => {
  const handeleInputChange = (event) => {
    setNewBlog((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          title:
          <input
            type="text"
            name="title"
            id="title"
            onChange={handeleInputChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            id="author"
            onChange={handeleInputChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            id="url"
            onChange={handeleInputChange}
          />
        </div>
        <button type="submit" id="submit" >Create</button>
      </form>
    </div>
  );
};

export default CreateNewBlog;
