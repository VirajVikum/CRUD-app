import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Show() {
  const [users, setUsers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      alert(location.state.message);
    }
  }, [location]);

  const fetchUsers = () => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          fetchUsers(); // Refresh the user list
        });
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <Link to="/insert">To Insert Page</Link>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> – {user.email} &nbsp;
            <Link to={`/update/${user.id}`}>Edit</Link> &nbsp;
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Show;
