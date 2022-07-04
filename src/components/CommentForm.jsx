import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { commentOnBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Button, Form, Row, Col } from "react-bootstrap";

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
    <Form
      className="med-high-width"
      onSubmit={(evt) => handleSubmit(evt, text)}
    >
      <Form.Group as={Row} controlId="commentText">
        <Col sm={8}>
          <Form.Control
            id="textInput"
            type="text"
            value={text}
            onChange={(evt) => {
              setText(evt.target.value);
            }}
          />
        </Col>
        <Col sm={4}>
          <Button variant="success" type="submit">
            add comment
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default CommentForm;
