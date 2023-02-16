import { fireEvent, screen } from "@testing-library/react";
import IdeaForm from "../components/IdeaForm";
import { render } from "./utils/test-utils";

const dummyIdea1 = {
  id: "123",
  title: "test title",
  description: "test description",
  createdAt: "14/01/2023, 20:19:34",
};

test("Add an idea shows when no idea", () => {
  render(<IdeaForm />);

  expect(screen.getByText("Add an idea")).toBeInTheDocument();
});

test("Add an idea does not show when idea", () => {
  render(<IdeaForm idea={dummyIdea1} />);

  // if this fails try findByText
  expect(screen.queryByText("Add an idea")).not.toBeInTheDocument();
});

test("Text under the description updates to show how many characters of the description are left out of 140", () => {
  render(<IdeaForm idea={dummyIdea1} />);

  const descriptionInput = screen.getByLabelText("Description");

  expect(
    screen.getByText("Description Characters remaining: 140 / 140")
  ).toBeInTheDocument();

  // use userEvent
  // user.type(descriptionInput, 'abc')
  // fireEvent for dropdowns
  fireEvent.change(descriptionInput, { target: { value: "abc" } });

  expect(
    screen.getByText("Description Characters remaining: 137 / 140")
  ).toBeInTheDocument();
});

/// thinks this is the add form, not edit form

test("Delete idea is called", () => {
  const initialState = [
    {
      id: "123",
      title: "test title",
      description: "test description",
      createdAt: "14/01/2023, 20:19:34",
    },
  ];
  const mockDeleteIdea = jest.fn();

  const idea = {
    id: "123",
    title: "test title",
    description: "test description",
    createdAt: "14/01/2023, 20:19:34",
  };

  render(<IdeaForm idea={idea} />, { handleDeleteIdea: mockDeleteIdea });

  const title = screen.getByRole("textbox", { name: /title/i });

  expect(title).toHaveValue(idea.title);

  const deleteBtn = screen.getByText("Delete");

  // use userEvent
  fireEvent.click(deleteBtn);

  expect(mockDeleteIdea).toHaveBeenCalled();
});
