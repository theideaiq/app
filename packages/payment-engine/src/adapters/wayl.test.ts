import { describe, it, expect } from 'vitest';
import { WaylAdapter } from './wayl';
import crypto from 'node:crypto';

describe('WaylAdapter Webhook Verification', () => {
  const secret = 'test-secret';
  const adapter = new WaylAdapter({ apiKey: 'key', webhookSecret: secret });

  it('verifies valid signature with raw payload', async () => {
    const rawPayload = JSON.stringify({
      id: 'evt_123',
      status: 'Complete',
      referenceId: 'ref_123'
    });
    const signature = crypto
      .createHmac('sha256', secret)
      .update(rawPayload)
      .digest('hex');

    const event = await adapter.verifyWebhook(rawPayload, signature);
    expect(event.type).toBe('payment.success');
    expect(event.id).toBe('evt_123');
  });

  it('rejects invalid signature', async () => {
    const rawPayload = JSON.stringify({ id: 'evt_123' });
    const signature = 'invalid-sig';

    await expect(adapter.verifyWebhook(rawPayload, signature)).rejects.toThrow();
  });

  it('rejects missing signature when secret is configured', async () => {
    const rawPayload = JSON.stringify({ id: 'evt_123' });
    // currently allows missing signature, so we expect this to fail once we enforce it
    await expect(adapter.verifyWebhook(rawPayload, undefined)).rejects.toThrow();
  });
});
