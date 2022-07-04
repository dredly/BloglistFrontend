import { useState } from "react";
import { Button, Form } from "react-bootstrap";

//Form for adding a new blog
const NewBlogForm = ({ handleNew }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  return (
    <>
      <h2>Add a new blog</h2>
      <Form
        onSubmit={(evt) => {
          handleNew(evt, { title, author, url });
          setTitle("");
          setAuthor("");
          setUrl("");
        }}
        className="med-width"
      >
        <Form.Group className="mb-3" controlId="titleInput">
          <Form.Label>title</Form.Label>
          <Form.Control
            id="titleInput"
            type="text"
            value={title}
            onChange={(evt) => {
              setTitle(evt.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="authorInput">
          <Form.Label>author</Form.Label>
          <Form.Control
            id="authorInput"
            type="text"
            value={author}
            onChange={(evt) => {
              setAuthor(evt.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="urlInput">
          <Form.Label>url</Form.Label>
          <Form.Control
            id="urlInput"
            type="text"
            value={url}
            onChange={(evt) => {
              setUrl(evt.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" id="submitButton" type="submit">
          Add
        </Button>
      </Form>
    </>
  );
};

export default NewBlogForm;
