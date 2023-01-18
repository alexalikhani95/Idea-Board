
import { render, screen } from "@testing-library/react";
import IdeaProvider from "../context/IdeaContext";
import Ideas from "../components/Ideas";

const mockDeleteIdea = () => {}
const mockUpdateIdea = () => {}

const mockIdeas = [
{
  id: '123',
  title: 'test title',
  description: 'test description',
  createdAt: '14/01/2023, 20:19:34'
},
{
    id: 'abc',
    title: 'test title 2',
    description: 'test description 2',
    createdAt: '14/01/2023, 21:19:34'
},
{
    id: '456',
    title: 'test title 3',
    description: 'test description 3',
    createdAt: '15/01/2023, 21:19:34'
},
]

test("Idea Title is present in the document with its title text when there is an idea", () => {
  render(
    <IdeaProvider>
      <Ideas ideas={mockIdeas} updateIdea={mockDeleteIdea} deleteIdea={mockUpdateIdea}/>
    </IdeaProvider>
  );

  // expect all the ideas to be present
  expect(screen.getByTestId("idea-tile123")).toBeInTheDocument();
  expect(screen.getByTestId("idea-tileabc")).toBeInTheDocument();
  expect(screen.getByTestId("idea-tile456")).toBeInTheDocument();
});

