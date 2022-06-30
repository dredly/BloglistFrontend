import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";

const Blog = ({ id }) => {
  const blogs = useSelector((state) => state.blogs);

  const blog = blogs.find((b) => b.id === id);

  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeBlog(id));
  };

  if (!blog) {
    return null;
  }

  console.log("COMMENTS", blog.comments);

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </p>
      <p>Added by {blog.user.name}</p>
      {blog.comments.length ? (
        <>
          <h3>Comments</h3>
          <ul>
            {blog.comments.map((c) => (
              <li key={c.id}>{c.text}</li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default Blog;
