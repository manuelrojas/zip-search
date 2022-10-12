import { render, screen } from '@testing-library/react';
import { RecentSearchs, RecentSearchsProps, SearchInput } from './components/RecentSearchs';

test('renders a warning when there is not data', async () => {
  const mocks: [] = [];
  render(<RecentSearchs searchs={mocks} onClear={() => {}} />);
  const alertElement = await screen.findByRole('alert');
  expect(alertElement).toHaveTextContent('No search history');
});


test('renders a info when there is data', async () => {
  const mocks: RecentSearchsProps = {
    searchs: [{ country: 'US', postalCode: '00210' }] as [SearchInput],
  };
 
  render(<RecentSearchs searchs={mocks.searchs} onClear={() => {}} />);
  const alertElement = await screen.findByRole('alert');
  expect(alertElement).toHaveTextContent('Country: US');
});
