import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'
import { axe } from 'vitest-axe'

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('handles user input', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} placeholder="test input" />)
    const input = screen.getByPlaceholderText('test input')
    fireEvent.change(input, { target: { value: 'hello' } })
    expect(handleChange).toHaveBeenCalled()
    // Note: Since we didn't pass value prop, it's uncontrolled in this test usage,
    // but verifying the event handler is enough for unit test.
  })

  it('displays error state', () => {
    const { container } = render(<Input error="Invalid input" />)
    // Assuming the Input component applies a red border or specific class on error
    // If the component logic isn't known perfectly, we can check if it renders the error message if it's part of the component
    // Or check for aria-invalid
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('passes accessibility checks', async () => {
    const { container } = render(
      <div>
        <label htmlFor="test-input">Label</label>
        <Input id="test-input" />
      </div>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
