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
    </div>
  );
};

export default Blog;
