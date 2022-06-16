import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";

test("when a new blog is created, the form calls the event handler with the right details", async () => {
  const handleNew = jest.fn();
  const user = userEvent.setup();

  const testData = {
    title: "A blog title",
    author: "Alice Blogger",
    url: "wordpress.com/theblog",
  };

  const { container } = render(<NewBlogForm handleNew={handleNew} />);

  const titleInput = container.querySelector("#titleInput");
  const authorInput = container.querySelector("#authorInput");
  const urlInput = container.querySelector("#urlInput");

  const submitButton = container.querySelector("#submitButton");

  await user.type(titleInput, testData.title);
  await user.type(authorInput, testData.author);
  await user.type(urlInput, testData.url);

  await user.click(submitButton);

  const handlerDetails = handleNew.mock.calls[0][1];
  expect(handlerDetails).toEqual(testData);
});
