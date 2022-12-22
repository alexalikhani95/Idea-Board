import React from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import App from "../App";
import IdeaProvider from "../context/IdeaContext";
import IdeaTile from "../components/IdeaTile";

test("Idea Title is present in the document with its title text when there is an idea", async () => {
  render(
    <IdeaProvider>
      <IdeaTile
        idea={{
          id: "123",
          title: "test title",
          description: "test description",
          createdAt: new Date().toLocaleString(),
        }}
      />
    </IdeaProvider>
  );
  const ideaTile = screen.getByTestId("idea-tile");
  expect(ideaTile).toBeInTheDocument();
  expect(screen.getByText("test title")).toBeInTheDocument();
});
