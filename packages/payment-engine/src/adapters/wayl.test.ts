import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { WaylAdapter } from './wayl';

describe('WaylAdapter', () => {
  const secret = 'test-secret';
  const adapter = new WaylAdapter({
    apiKey: 'test-key',
    webhookSecret: secret,
  });

  it('verifies valid signature', async () => {
    const payloadObject = {
      id: 'evt_123',
      status: 'Complete',
      referenceId: 'ref_123',
    };
    const payload = JSON.stringify(payloadObject);
    const signature = createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    const event = await adapter.verifyWebhook(payload, signature);
    expect(event.type).toBe('payment.success');
    expect(event.id).toBe('evt_123');
  });

  it('rejects invalid signature', async () => {
    const payload = JSON.stringify({ id: 'evt_123' });
    const signature = 'invalid_signature';

    // We expect it to throw.
    // Note: Vitest expects async function for rejects
    await expect(adapter.verifyWebhook(payload, signature)).rejects.toThrow(
      'Invalid signature',
    );
  });

  it('rejects valid signature for different payload', async () => {
    const payload1 = JSON.stringify({ id: 'evt_1' });
    const payload2 = JSON.stringify({ id: 'evt_2' });
    const signature1 = createHmac('sha256', secret)
      .update(payload1)
      .digest('hex');

    await expect(adapter.verifyWebhook(payload2, signature1)).rejects.toThrow(
      'Invalid signature',
    );
  });

  it('throws if secret is missing', async () => {
    const adapterNoSecret = new WaylAdapter({ apiKey: 'test' });
    await expect(adapterNoSecret.verifyWebhook('{}', 'sig')).rejects.toThrow(
      'Webhook secret not configured',
    );
  });
});
