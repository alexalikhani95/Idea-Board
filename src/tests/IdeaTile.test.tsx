import React from "react";
import { fireEvent, getByTestId, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import App from "../App";
import IdeaProvider from "../context/IdeaContext";
import IdeaTile from "../components/IdeaTile";

const mockDeleteIdea = () => {}
const mockUpdateIdea = () => {}

const mockIdea = {
  id: '123',
  title: 'test title',
  description: 'test description',
  createdAt: '14/01/2023, 20:19:34'
}

test("Idea Title is present in the document with its title text when there is an idea", () => {
  render(
    <IdeaProvider>
      <IdeaTile idea={mockIdea} updateIdea={mockDeleteIdea} deleteIdea={mockUpdateIdea}/>
    </IdeaProvider>
  );

  // expect the containg div to be present
  expect(screen.getByTestId("idea-tile123")).toBeInTheDocument();

  //expect the title element in an idea with the id of '123' to be present and contain the correct text
  expect(screen.getByTestId('idea-title123')).toBeInTheDocument()  
  expect(screen.getByTestId('idea-title123')).toHaveTextContent('test title')
});

test("Clicking the delete button on an idea removes the idea from the DOM", async () => {
  render(
    <IdeaProvider>
      <IdeaTile idea={mockIdea} updateIdea={mockDeleteIdea} deleteIdea={mockUpdateIdea}/>
    </IdeaProvider>
  );

  expect(screen.getByTestId("idea-tile123")).toBeInTheDocument();

  //expect the title element in an idea with the id of '123' to be present and contain the correct text
  expect(screen.getByTestId('delete-idea123')).toBeInTheDocument()  
  fireEvent.click(screen.getByTestId('delete-idea123'))
  expect(screen.queryByTestId("idea-tile123")).not.toBeInTheDocument();

});
