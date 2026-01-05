import { wayl } from './wayl'

describe('wayl lib', () => {
  const originalFetch = global.fetch
  const mockFetch = vi.fn()

  beforeAll(() => {
    global.fetch = mockFetch
  })

  afterAll(() => {
    global.fetch = originalFetch
  })

  beforeEach(() => {
    mockFetch.mockReset()
    // Reset env vars if we modified them (we won't modify process.env directly here usually)
  })

  it('creates a payment link successfully', async () => {
    const mockResponse = {
      data: {
        url: 'https://payment.url'
      }
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    const url = await wayl.createPayment(1000, 'IQD', 'Test Item')
    expect(url).toBe('https://payment.url')

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.thewayl.com/api/v1/Links',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.stringContaining('"total":1000')
      })
    )
  })

  it('handles API errors correctly', async () => {
    const mockError = {
      message: 'Invalid amount'
    }

    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => mockError
    })

    await expect(wayl.createPayment(0, 'IQD', 'Test')).rejects.toThrow('Invalid amount')
  })

  it('handles network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))
    await expect(wayl.createPayment(1000, 'IQD', 'Test')).rejects.toThrow('Network error')
  })
})
