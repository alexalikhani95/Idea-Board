
import Ideas from "../components/Ideas";
import customRender from "./utils/test-utils";
import { fireEvent, screen } from "@testing-library/react";



test("Idea displays with a default title value from the idea in context and will update when changed", () => {
  const initialState = [{  id: '123',  title: 'test title',  description: 'test description',  createdAt: '14/01/2023, 20:19:34'}];
  const mockDeleteIdea = jest.fn()

  customRender(<Ideas />, initialState, mockDeleteIdea)

  expect(screen.getByRole("textbox", { name: /title/i })).toHaveValue(
    "test title"
  );
  
  fireEvent.input(screen.getByRole("textbox", { name: /title/i }), {
    target: {
      value: "updated test title"
    }
  });

  expect(screen.getByRole("textbox", { name: /title/i })).toHaveValue(
    "updated test title"
  );
}
)

test("2 ideas from the context render with their correct default titles", () => {
  const initialState = [
    {  id: '1',  title: 'test title',  description: 'test description',  createdAt: '14/01/2023, 20:19:34'}, 
    {  id: '2',  title: 'test title 2',  description: 'test description 2',  createdAt: '15/01/2023, 15:19:34'}];

    const mockDeleteIdea = jest.fn()

  customRender(<Ideas />, initialState, mockDeleteIdea)

  const titles = screen.getAllByRole("textbox", { name: /title/i })

  expect(titles[0]).toHaveValue('test title')
  expect(titles[1]).toHaveValue('test title 2')
}
)



