import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("render blog content", () => {
  const blog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent(
    "Go To Statement Considered Harmful"
  );
});
