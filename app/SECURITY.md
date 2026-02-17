# Security Review and Roadmap

## Executive Summary

This document outlines the security posture of the Action for Ukraine application. While the current application is a client-side React app with no backend, there are still security considerations regarding data privacy, cross-site scripting (XSS), and dependency management.

## Current State Analysis

### 1. Architecture

- **Type**: Client-side Single Page Application (SPA).
- **Hosting**: Static hosting (assumed).
- **Data flow**:
  - User input -> Local State -> Email Client URL / API (Postcodes.io).
  - No critical data stored server-side by this app.

### 2. Vulnerability Assessment

#### Low Risk

- **XSS (Cross-Site Scripting)**: React naturally escapes content, reducing XSS risk. However, `dangerouslySetInnerHTML` is not used, which is good.
- **CSRF (Cross-Site Request Forgery)**: Not applicable as there is no backend session to exploit.

#### Medium Risk

- **Dependency Vulnerabilities**: `package.json` shows standard dependencies. Regular audits are needed.
- **Data Privacy**: User enters Name and Postcode. This data stays local or is sent to `postcodes.io`.
  - *Risk*: `postcodes.io` is a third-party service.
  - *Mitigation*: Ensure only necessary data is sent (just the postcode).

#### High Risk

- **Social Engineering / Phishing**: The app generates email links. Malicious actors could theoretically clone the site to generate emails to incorrect recipients if they controlled the DNS/hosting.
  - *Mitigation*: HTTPS enforcement, rigid Content Security Policy (CSP).

## Security Roadmap

### Phase 1: Immediate Hardening (Current Sprint)

- [/] **Dependency Audit**: Run `npm audit` and fix high-severity issues.
  - *Note*: `xlsx` has a high-severity vulnerability but is used in `scripts/` data pipeline. Recommended to migrate to `exceljs` in future.
- [x] **Input Sanitization**: Ensure postcode input is strictly validated before sending to API (Alphanumeric only, max length).
- [ ] **HTTP Headers**: If managing hosting (e.g., Vercel/Netlify), configure:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`

### Phase 2: Short-term Improvements (Next Sprint)

- [ ] **Content Security Policy (CSP)**: Implement a strict CSP to prevent loading malicious scripts.
  - `default-src 'self'; script-src 'self' 'unsafe-inline' (for analytics if needed); connect-src 'self' https://api.postcodes.io;`
- [ ] **Rate Limiting**: If we add a backend later, rate limiting on the API is crucial. For now, rely on `postcodes.io` limits.

### Phase 3: Long-term / Production Readiness

- [ ] **Subresource Integrity (SRI)**: Use SRI tags for any CDN-loaded scripts.
- [ ] **Privacy Policy**: Explicitly state that user data (name, postcode) is processed locally and not stored.
- [ ] **Regular Scanning**: Set up GitHub Dependabot or similar to auto-scan for new vulnerabilities.

## Specific Code Recommendations

### `src/services/postcodeApi.ts`

Current:

```typescript
const cleanPostcode = postcode.replace(/\s/g, '');
```

Recommendation:

```typescript
// Add strict validation
if (!/^[a-z0-9]{5,7}$/i.test(cleanPostcode)) {
    throw new Error("Invalid postcode format");
}
```

### `src/services/emailUrlBuilder.ts`

Current uses `encodeURIComponent` which is correct for URL parameters. Ensure strict typing for `provider` to avoid injection of arbitrary protocols.
