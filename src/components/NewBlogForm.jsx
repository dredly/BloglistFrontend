import { useState } from "react";

//Form for adding a new blog
const NewBlogForm = ({ handleNew }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  return (
    <>
      <h2>Add a new blog</h2>
      <form
        onSubmit={(evt) => {
          handleNew(evt, { title, author, url });
          setTitle("");
          setAuthor("");
          setUrl("");
        }}
      >
        <div>
          <label>
            title:
            <input
              id="titleInput"
              type="text"
              value={title}
              onChange={(evt) => {
                setTitle(evt.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              id="authorInput"
              type="text"
              value={author}
              onChange={(evt) => {
                setAuthor(evt.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              id="urlInput"
              type="text"
              value={url}
              onChange={(evt) => {
                setUrl(evt.target.value);
              }}
            />
          </label>
        </div>
        <button id="submitButton" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default NewBlogForm;
