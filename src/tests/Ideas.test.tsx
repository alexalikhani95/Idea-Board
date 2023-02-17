
import Ideas from "../components/Ideas";
import { render } from "./utils/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


const user = userEvent.setup()

test("Idea displays with a default title value from the idea in context and will update when changed", async () => {
  const mockIdeas = [{  id: '123',  title: 'test title',  description: 'test description',  createdAt: '14/01/2023, 20:19:34'}];

  render(<Ideas />, {ideas: mockIdeas})

  expect(screen.getByRole("textbox", { name: /title/i })).toHaveValue(
    "test title"
  );
  
  await user.type(screen.getByRole("textbox", { name: /title/i }), '123');

  expect(screen.getByRole("textbox", { name: /title/i })).toHaveValue(
    "test title123"
  );
}
)


test("2 ideas from the context render with their correct default titles", () => {
  const mockIdeas = [
    {  id: '1',  title: 'test title',  description: 'test description',  createdAt: '14/01/2023, 20:19:34'}, 
    {  id: '2',  title: 'test title 2',  description: 'test description 2',  createdAt: '15/01/2023, 15:19:34'}];

  render(<Ideas />, {ideas: mockIdeas})

  const titles = screen.getAllByRole("textbox", { name: /title/i })

  expect(titles[0]).toHaveValue('test title')
  expect(titles[1]).toHaveValue('test title 2')
}
)



