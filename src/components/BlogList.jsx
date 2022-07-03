import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { initializeBlogs, addNewBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const BlogList = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleNewBlog = (evt, blogObj) => {
    evt.preventDefault();
    blogFormRef.current.toggleVisibility();
    try {
      dispatch(addNewBlog(blogObj));
      dispatch(
        setNotification(
          {
            content: `A new blog - ${blogObj.title} - added`,
            messageType: "success",
          },
          3000
        )
      );
    } catch (err) {
      dispatch(
        setNotification(
          {
            content: err.response.data.error,
            messageType: "error",
          },
          3000
        )
      );
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <>
      <Togglable buttonLabel="add a new blog" ref={blogFormRef}>
        <NewBlogForm handleNew={handleNewBlog} />
      </Togglable>
      {blogs.map((blog, idx) => (
        <div key={blog.id} className={`blog${idx}`} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </>
  );
};

export default BlogList;
