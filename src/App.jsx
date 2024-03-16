import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddUser = () => {
    if (name.trim() !== "" && age.trim() !== "" && comment.trim() !== "") {
      setUsers([...users, { id: Date.now(), name, age, comment }]);
      setName("");
      setAge("");
      setComment("");
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleToggleHighlight = (id) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          return { ...user, highlighted: !user.highlighted };
        }
        return user;
      })
    );
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="title">User Information</h1>
        <input
          className="input"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter name"
        />
        <input
          className="input"
          type="number"
          value={age}
          onChange={handleAgeChange}
          placeholder="Enter age"
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Enter comment"
        ></textarea>
        <button className="AddUser" onClick={handleAddUser}>
          Add User
        </button>

        <table className="table">
          <thead className="TableHead">
            <tr className="TableRow">
              <th className="TableHeadItem">Name</th>
              <th className="TableHeadItem">Age</th>
              <th className="TableHeadItem">Comment</th>
              <th className="TableHeadItem">Actions</th>
            </tr>
          </thead>
          <tbody className="TableBody">
            {users.map((user) => (
              <tr
                className="TablerRow"
                key={user.id}
                style={{
                  backgroundColor: "white",
                }}
              >
                <td className="tableD">{user.name}</td>
                <td className="tableD">{user.age}</td>
                <td className="tableD">{user.comment}</td>
                <td className="tableDD">
                  <a onClick={() => handleDeleteUser(user.id)} href="#">
                    <span>Delete</span>
                  </a>
                  <div class="checkbox-wrapper-3">
                    <input
                      checked={user.highlighted}
                      type="checkbox"
                      id="cbx-3"
                      onChange={() => handleToggleHighlight(user.id)}
                    />
                    <label for="cbx-3" class="toggle">
                      <span></span>
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
