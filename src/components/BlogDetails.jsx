import PropTypes from "prop-types";

const BlogDetails = ({ blog, disp, handleLike, handleDelete, currentUser }) => {
  const deleteButtonStyle = {
    display: currentUser.username === blog.user.username ? "" : "none",
  };
  return (
    <div style={disp}>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes{" "}
        <button className="likeButton" onClick={() => handleLike(blog)}>
          like
        </button>
      </p>
      <p>Added by {blog.user.name}</p>
      <div style={deleteButtonStyle}>
        <button className="deleteButton" onClick={() => handleDelete(blog.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  disp: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default BlogDetails;
