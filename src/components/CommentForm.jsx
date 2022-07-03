import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { commentOnBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const CommentForm = ({ id }) => {
  const [text, setText] = useState("");
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  const handleSubmit = (evt, commentText) => {
    evt.preventDefault();
    const newComment = { text: commentText };
    try {
      dispatch(commentOnBlog(id, newComment));
      dispatch(
        setNotification(
          {
            content: `New comment - ${commentText} - added`,
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
    setText("");
  };

  return (
    <form onSubmit={(evt) => handleSubmit(evt, text)}>
      <input
        id="textInput"
        type="text"
        value={text}
        onChange={(evt) => {
          setText(evt.target.value);
        }}
      />
      <button type="submit">add comment</button>
    </form>
  );
};

export default CommentForm;
