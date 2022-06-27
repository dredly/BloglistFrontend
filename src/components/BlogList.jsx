import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs, addNewBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const BlogList = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user.current);

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

  return (
    <>
      <Togglable buttonLabel="add a new blog" ref={blogFormRef}>
        <NewBlogForm handleNew={handleNewBlog} />
      </Togglable>
      {blogs.map((blog, idx) => (
        <div key={blog.id} className={`blog${idx}`}>
          <Blog blog={blog} currentUser={user} />
        </div>
      ))}
    </>
  );
};

export default BlogList;
