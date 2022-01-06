import React from "react";

const User = ({ user, logout }) => {
  return (
    <div>
      {user.username} logged in <button onClick={logout}>logout</button>
    </div>
  );
};

export default User;
