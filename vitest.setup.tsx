import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import * as matchers from 'vitest-axe/matchers'
import { expect } from 'vitest'

// Extend expect with axe-core matchers
expect.extend(matchers)

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

// Mock next/navigation (Commonly used in Next.js apps)
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/image (since it's not supported in jsdom)
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />
  },
}))

// Mock HTMLCanvasElement
HTMLCanvasElement.prototype.getContext = vi.fn();

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))
