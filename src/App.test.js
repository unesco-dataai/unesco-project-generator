import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Fills every required field with valid values, so individual tests can then
// invalidate one field and assert the Generate button reacts.
const fillRequiredFields = () => {
  fireEvent.change(screen.getByPlaceholderText('e.g., Her Atlas AI Chat'), { target: { value: 'Test Project' } });
  fireEvent.change(screen.getByPlaceholderText('e.g., AI Chat Solutions'), { target: { value: 'AI Chat' } });
  fireEvent.change(screen.getByPlaceholderText('e.g., 001'), { target: { value: '001' } });
  fireEvent.change(screen.getByPlaceholderText('e.g., Aguiar, Nina'), { target: { value: 'Doe, Jane' } });
  fireEvent.change(screen.getByPlaceholderText('e.g., n.aguiar@unesco.org'), { target: { value: 'j.doe@unesco.org' } });
  fireEvent.change(screen.getByPlaceholderText('8500'), { target: { value: '8500' } });
  fireEvent.change(screen.getByPlaceholderText('2500'), { target: { value: '2500' } });
};

const generateButton = () => screen.getByRole('button', { name: /generate project proposal/i });

test('renders the form on first load', () => {
  render(<App />);
  expect(screen.getByText('UNESCO - Project Proposal Generator')).toBeInTheDocument();
  expect(generateButton()).toBeInTheDocument();
});

test('Generate button is disabled until all required fields are filled', () => {
  render(<App />);
  expect(generateButton()).toBeDisabled();

  fillRequiredFields();
  expect(generateButton()).toBeEnabled();
});

test('transaction ID must be exactly 3 characters', () => {
  render(<App />);
  fillRequiredFields();

  fireEvent.change(screen.getByPlaceholderText('e.g., 001'), { target: { value: '01' } });
  expect(generateButton()).toBeDisabled();

  fireEvent.change(screen.getByPlaceholderText('e.g., 001'), { target: { value: '012' } });
  expect(generateButton()).toBeEnabled();
});

test('generating the proposal subtracts regular support per section', () => {
  render(<App />);
  fillRequiredFields();
  fireEvent.click(generateButton());

  // Building: 8500 - 1500 = 7000. Running: 2500 - 1500 = 1000.
  expect(screen.getByText('$7,000')).toBeInTheDocument();
  expect(screen.getByText('$1,000')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /edit information/i })).toBeInTheDocument();
});
