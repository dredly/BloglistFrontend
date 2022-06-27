import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import BlogDetails from "./BlogDetails";

const Blog = ({ blog, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false);

  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const detailsStyle = { display: showDetails ? "" : "none" };

  const handleLike = (id) => {
    dispatch(likeBlog(id));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        dispatch(deleteBlog(id));
        dispatch(
          setNotification(
            {
              content: "Successfully deleted",
              messageType: "success",
            },
            3000
          )
        );
      } catch (err) {
        dispatch(
          setNotification({
            content: err.response.data.error,
            messageType: "error",
          })
        );
      }
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button
        className="showButton"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "hide" : "view"}
      </button>
      <BlogDetails
        blog={blog}
        disp={detailsStyle}
        handleLike={() => handleLike(blog.id)}
        handleDelete={() => handleDelete(blog.id)}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Blog;
