import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userService from "../services/users";

const User = ({ id }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await userService.getOne(id);
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
