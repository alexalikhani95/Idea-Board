
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
      <Ideas />
    </IdeaProvider>
  );

  // expect all the ideas to be present
  const title1 = screen.getAllByText('test title');
  expect(title1[0]).toBeVisible();
  expect(title1[1]).toBeInTheDocument()

  const title2 = screen.getAllByText('test title 2');
  expect(title2[0]).toBeVisible();
  expect(title2[1]).toBeInTheDocument()

  const title3 = screen.getAllByText('test title 3');
  expect(title3[0]).toBeVisible();
  expect(title3[1]).toBeInTheDocument()
});

