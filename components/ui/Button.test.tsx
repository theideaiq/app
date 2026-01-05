import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'
import { axe } from 'vitest-axe'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button', { name: /click me/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders loading state', () => {
    render(<Button isLoading>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
    // Depending on how Loader2 renders, we might look for specific attributes or classes
    // But mostly we check if it is disabled
  })

  it('renders disabled state', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies variant classes', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>)
    // Check for a class unique to secondary variant
    expect(container.firstChild).toHaveClass('bg-brand-yellow')
  })

  it('passes accessibility checks', async () => {
    const { container } = render(<Button>Accessible Button</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
