import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from './Modal'
import { axe } from 'vitest-axe'

// Mock createPortal since it's not fully supported in JSDOM the same way
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom')
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node,
  }
})

describe('Modal', () => {
  it('renders content when open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    )
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    )
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
  })

  it('calls onClose when clicking close button', () => {
    const handleClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    )

    // The close button is the one with the X icon
    // We can find it by finding the button inside the header
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(handleClose).toHaveBeenCalled()
  })

  it('passes accessibility checks when open', async () => {
    const { container } = render(
      <Modal isOpen={true} onClose={() => {}} title="A11y Modal">
        <p>Accessible Content</p>
      </Modal>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
