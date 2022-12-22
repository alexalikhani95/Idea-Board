import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Add Idea form is present in the document", () => {
  render(<App />);
  const ideaForm = screen.getByTestId("idea-form");
  expect(ideaForm).toBeInTheDocument();
});
