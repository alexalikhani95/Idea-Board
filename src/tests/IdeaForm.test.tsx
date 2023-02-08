import { fireEvent, screen } from "@testing-library/react";
import IdeaForm from "../components/IdeaForm";
import customRender from "./utils/test-utils";


test("Idea Title is present in the document with its title text when there is an idea", () => {
  const initialState = [{  id: '123',  title: 'test title',  description: 'test description',  createdAt: '14/01/2023, 20:19:34'}];
  const mockDeleteIdea = jest.fn()

  customRender(
      <IdeaForm />, initialState, mockDeleteIdea
  );

  expect(screen.getByText("Add an idea")).toBeInTheDocument();
});


test("Text under the description updates to show how many characters of the description are left out of 140", () => {
  const initialState = [{  id: '123',  title: 'test title',  description: 'test description',  createdAt: '14/01/2023, 20:19:34'}];
  const mockDeleteIdea = jest.fn()
  customRender(
      <IdeaForm />, initialState, mockDeleteIdea
  );

  const descriptionInput = screen.getByLabelText("Description")
  
  expect(screen.getByText("Description Characters remaining: 140 / 140")).toBeInTheDocument();

  fireEvent.change(descriptionInput, { target: { value: 'abc' } })

  expect(screen.getByText("Description Characters remaining: 137 / 140")).toBeInTheDocument();
});


/// thinks this is the add form, not edit form

test("Delete idea is called", () => {
  const initialState = [{  id: '123',  title: 'test title',  description: 'test description',  createdAt: '14/01/2023, 20:19:34'}];
  const mockDeleteIdea = jest.fn()
  customRender(
      <IdeaForm idea={{  id: '123',  title: 'test title',  description: 'test description',  createdAt: '14/01/2023, 20:19:34'}}/>, initialState, mockDeleteIdea
  );

  const title = screen.getByRole("textbox", { name: /title/i })

  expect(title).toHaveValue('test title')

  const deleteBtn = screen.getByText('Delete')

  fireEvent.click(deleteBtn)

  expect(mockDeleteIdea).toHaveBeenCalled()

});

