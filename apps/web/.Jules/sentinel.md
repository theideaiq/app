## 2025-02-14 - Webhook Signature Bypass
**Vulnerability:** The payment webhook endpoint (`api/webhooks/payment`) trusted the payload without verifying the `x-signature` header, allowing attackers to forge payment success events.
**Learning:** `JSON.parse(request.body)` consumes the stream, making raw body unavailable for HMAC verification. Always use `request.text()` first when signature verification is needed.
**Prevention:** Enforce signature verification in `PaymentProvider` interface and implementation. Ensure raw body is preserved for verification before parsing.
