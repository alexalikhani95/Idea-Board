
import Ideas from "../components/Ideas";
import customRender from "./utils/test-utils";
import { screen } from "@testing-library/react";



test("Idea Title is present in the document with its title text when there is an idea", () => {
  const initialState = [{  id: '123',  title: 'test title',  description: 'test description',  createdAt: '14/01/2023, 20:19:34'}];

  customRender(<Ideas />, initialState)

  const title = screen.getByText('test title');
  expect(title).toBeInTheDocument();
}
)

