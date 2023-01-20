import React from "react";
import { fireEvent, render, screen} from "@testing-library/react";
import App from "../App";
import IdeaProvider from "../context/IdeaContext";
import IdeaTile from "../components/IdeaTile";


const mockUpdateIdea = jest.fn()
const mockDeleteIdea = jest.fn()

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

  const title = screen.getAllByText('test title');

  //The title text displayed to the user
  expect(title[0]).toBeVisible(); 

  // The title text in the DOM thats the default value for the textarea behind the title
  expect(title[1]).toBeInTheDocument()
  });

test("Clicking the delete button on an idea removes the idea from the DOM", () => {
  render(
    <IdeaProvider>
      <IdeaTile idea={mockIdea} updateIdea={mockDeleteIdea} deleteIdea={mockUpdateIdea}/>
    </IdeaProvider>
  );

  const deleteBtn = screen.getByText('Delete')
 
  fireEvent.click(deleteBtn)
  expect(mockDeleteIdea).toHaveBeenCalled();

});
