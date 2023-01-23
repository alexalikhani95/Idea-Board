import { fireEvent, render, screen } from "@testing-library/react";
import IdeaProvider from "../context/IdeaContext";
import IdeaForm from "../components/IdeaForm";

const mockAddIdea = () => {}


test("Idea Title is present in the document with its title text when there is an idea", () => {
  render(
    <IdeaProvider>
      <IdeaForm />
    </IdeaProvider>
  );

  expect(screen.getByText("Add an idea")).toBeInTheDocument();
});


test("Text under the description updates to show how many characters of the description are left out of 140", () => {
  render(
    <IdeaProvider>
      <IdeaForm />
    </IdeaProvider>
  );

  const descriptionInput = screen.getByLabelText("Description")
  
  expect(screen.getByText("Description Characters remaining: 140 / 140")).toBeInTheDocument();

  fireEvent.change(descriptionInput, { target: { value: 'abc' } })

  expect(screen.getByText("Description Characters remaining: 137 / 140")).toBeInTheDocument();
});

