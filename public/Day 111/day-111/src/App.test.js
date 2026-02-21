import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the post composer input', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/what's on your mind\?/i);
  expect(input).toBeInTheDocument();
});
