import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IdeaForm from "../components/IdeaForm";
import { render } from "./utils/test-utils";

const mockIdea = {
  id: "123",
  title: "test title",
  description: "test description",
  createdAt: "14/01/2023, 20:19:34"
}

const user = userEvent.setup()


test("Add an idea text shows when the Form has no idea passed into it", () => {

  render(
      <IdeaForm />
  );

  expect(screen.getByText("Add an idea")).toBeInTheDocument();
});

test("Add an idea text does not show when the Form has an idea passed into it", () => {

  render(
      <IdeaForm idea={mockIdea}/>
  );

  expect(screen.queryByText("Add an idea")).not.toBeInTheDocument();
});


test("Text under the description updates to show how many characters of the description are left out of 140", async () => {
  render(
      <IdeaForm />
  );

  const descriptionInput = screen.getByLabelText("Description")
  
  expect(screen.getByText("Description Characters remaining: 140 / 140")).toBeInTheDocument();

  await user.type(descriptionInput, 'abc')

  expect(screen.getByText("Description Characters remaining: 137 / 140")).toBeInTheDocument();
});


test("Delete idea is called", async () => {

  const mockDeleteIdea = jest.fn()

  render(
      <IdeaForm  idea={mockIdea}/>, {handleDeleteIdea:  mockDeleteIdea}
  );

  const title = screen.getByRole("textbox", { name: /title/i })

  expect(title).toHaveValue('test title')

  const deleteBtn = screen.getByText('Delete')

  await user.click(deleteBtn)

  expect(mockDeleteIdea).toHaveBeenCalled()

});

test("Idea displays with a default title value from the idea in context and will update when changed", async () => {
  const mockIdea = {  id: '123',  title: 'test title',  description: 'test description',  createdAt: '14/01/2023, 20:19:34'}

  render(<IdeaForm idea={mockIdea}/>)

  expect(screen.getByRole("textbox", { name: /title/i })).toHaveValue(
    "test title"
  );
  
  await user.type(screen.getByRole("textbox", { name: /title/i }), '123');

  expect(screen.getByRole("textbox", { name: /title/i })).toHaveValue(
    "test title123"
  );
}
)

test("Idea displays with an empty title when user removes the text", async () => {
  const mockIdea = {  id: '123',  title: 'test title',  description: 'test description',  createdAt: '14/01/2023, 20:19:34'}

  render(<IdeaForm idea={mockIdea}/>)

  expect(screen.getByRole("textbox", { name: /title/i })).toHaveValue(
    "test title"
  );
  
  await user.clear(screen.getByRole("textbox", { name: /title/i }));

  expect(screen.getByRole("textbox", { name: /title/i })).toHaveValue(
    ""
  );
}
)

