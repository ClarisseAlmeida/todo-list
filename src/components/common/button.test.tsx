import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button';

describe('Component: Button', () => {
  it('should render with default primary variant', () => {
    render(<Button>Submit</Button>);

    const button = screen.getByText('Submit');

    expect(button).toHaveClass('button--submit');
  });

  it('should renders with secondary variant', () => {
    render(<Button variant="filter">Filter</Button>);

    const button = screen.getByText('Filter');

    expect(button).toHaveClass('button--filter');
  });

  it('should renders with third variant', () => {
    render(<Button variant="icon">Icon</Button>);

    const button = screen.getByText('Icon');

    expect(button).toHaveClass('button--icon');
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Clicar</Button>);

    fireEvent.click(screen.getByText('Clicar'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});