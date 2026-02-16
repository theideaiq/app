import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initiateCheckout } from './checkout';

// Mock Supabase
const mockSingle = vi.fn();
const mockEq = vi.fn(() => ({ single: mockSingle, eq: vi.fn() })); // Chainable
const mockSelect = vi.fn(() => ({ eq: mockEq }));
const mockFrom = vi.fn(() => ({ select: mockSelect, insert: vi.fn() }));
const mockAuth = {
  getUser: vi.fn(),
};

vi.mock('@/lib/supabase/server', () => ({
  createClient: () => ({
    auth: mockAuth,
    from: mockFrom,
  }),
}));

// Mock Navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

// Mock Config/Env/Utils
vi.mock('@/lib/payment/config', () => ({
  paymentFactory: {
    getProvider: () => ({
      createCheckoutSession: vi.fn().mockResolvedValue({
        url: 'https://checkout.url',
        sessionId: 'sess_123',
        provider: 'stripe',
      }),
    }),
  },
}));

vi.mock('@repo/env/web', () => ({
  webEnv: { NEXT_PUBLIC_SITE_URL: 'http://localhost:3000' },
}));

vi.mock('@repo/utils', () => ({
  Logger: { error: vi.fn() },
}));

describe('initiateCheckout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw error if cart belongs to another user (IDOR prevention)', async () => {
    const attackerId = 'attacker-123';
    const victimCartId = 'cart-victim-456';
    const victimUserId = 'victim-789';

    // 1. Mock Attacker logged in
    mockAuth.getUser.mockResolvedValue({
      data: { user: { id: attackerId } },
    });

    // 2. Mock Database returning cart owned by Victim
    // This mocks the 'carts' table lookup
    mockFrom.mockImplementation((table) => {
      if (table === 'carts') {
        return {
          select: () => ({
            eq: () => ({
              single: () =>
                Promise.resolve({ data: { user_id: victimUserId } }),
            }),
          }),
        };
      }
      return { select: mockSelect, insert: vi.fn() };
    });

    // Act & Assert
    await expect(initiateCheckout(victimCartId)).rejects.toThrow(
      'Unauthorized: Cart does not belong to user',
    );
  });
});
