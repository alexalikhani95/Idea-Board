import Ideas from '../components/Ideas';
import { render } from './utils/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

const mockIdeas = [
  {
    id: '1',
    title: 'test title',
    description: 'test description',
    createdAt: '14/01/2023, 20:19:34',
  },
  {
    id: '2',
    title: 'test title 2',
    description: 'test description 2',
    createdAt: '15/01/2023, 15:19:34',
  },
];

test('No ideas added yet text shows when there are no ideas', () => {
  render(<Ideas />);

  expect(screen.getByText('No Ideas added yet...')).toBeInTheDocument();
});

test('No ideas added yet text does not show when is an idea/ideas', () => {
  render(<Ideas />, { ideas: mockIdeas });
});

test('2 ideas from the context render with their correct default titles', () => {
  render(<Ideas />, { ideas: mockIdeas });

  const titles = screen.getAllByRole('textbox', { name: /title/i });

  expect(titles[0]).toHaveValue('test title');
  expect(titles[1]).toHaveValue('test title 2');

  expect(screen.queryByText('No Ideas added yet...')).not.toBeInTheDocument();
});

test('The sort buttons do not show if there are not at least 2 ideas', () => {
  const mockIdea = {
    id: '1',
    title: 'test title',
    description: 'test description',
    createdAt: '14/01/2023, 20:19:34',
  };

  render(<Ideas />, { ideas: [mockIdea] });

  expect(
    screen.queryByText('Sort Ideas alphbetically')
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText('Sort Ideas by creation date')
  ).not.toBeInTheDocument();
});

test('Clicking on both the sort buttons calls their respective functions', async () => {
  const mockSortAlphabetical = jest.fn();

  const mockSortCreated = jest.fn();

  render(<Ideas />, {
    ideas: mockIdeas,
    handleSortAlphabetical: mockSortAlphabetical,
    handleSortCreated: mockSortCreated,
  });

  const sortAlphabeticalBtn = screen.getByText('Sort Ideas alphbetically');
  const sortCreatedBtn = screen.getByText('Sort Ideas by creation date');

  await user.click(sortAlphabeticalBtn);

  expect(mockSortAlphabetical).toHaveBeenCalled();

  await user.click(sortCreatedBtn);

  expect(mockSortCreated).toHaveBeenCalled();
});
