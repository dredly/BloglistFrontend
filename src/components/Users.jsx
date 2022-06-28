import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userService from "../services/users";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await userService.getAll();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);
  return (
    <>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
