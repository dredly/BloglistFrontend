import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, likeBlog } from "../reducers/blogReducer";
import CommentForm from "./CommentForm";

const Blog = ({ id }) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blog = blogs.find((b) => b.id === id);

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
      <CommentForm id={blog.id} />
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
