import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("Add Idea form is present in the document", () => {
  render(<App />);
  const ideaFormTitle = screen.getByText("Add an idea");
  expect(ideaFormTitle).toBeInTheDocument();
});
