
import Ideas from "../components/Ideas";
import { render } from "./utils/test-utils";
import { screen } from "@testing-library/react";


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



