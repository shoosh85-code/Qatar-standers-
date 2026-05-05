# 🔒 Security Policy — QatarSpec Pro

## Supported Versions

| Version | Supported |
|---------|-----------|
| 2.10.x  | ✅ Active |
| < 2.10  | ❌ No     |

## Reporting a Vulnerability

If you discover a security vulnerability in QatarSpec Pro, **please report it responsibly**.

### How to Report

1. **Email:** Send details to `security@qatarspec.app` (or open a private GitHub issue)
2. **Include:**
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

3. **Do NOT:**
   - Open a public GitHub issue for security vulnerabilities
   - Share the vulnerability publicly before it's fixed
   - Access or modify other users' data

### Response Timeline

| Action | Timeline |
|--------|----------|
| Acknowledgment | Within 48 hours |
| Initial assessment | Within 5 business days |
| Fix deployed | Within 14 business days (critical) |

### Scope

The following are in scope:
- XSS, CSRF, or injection vulnerabilities in the web application
- Authentication/authorization bypasses
- API rate limiting bypasses
- Sensitive data exposure
- Server-side request forgery (SSRF)

The following are **out of scope:**
- Social engineering attacks
- Denial of service (DoS) attacks
- Issues in third-party CDN libraries (report to their maintainers)
- Vulnerabilities requiring physical access to user's device

## Security Architecture

- **Authentication:** JWT with HMAC-SHA256, httpOnly cookies
- **API Keys:** Server-side only (Vercel env vars) — never exposed to client
- **Rate Limiting:** Per-endpoint with IP hashing (SHA-256)
- **XSS Protection:** DOMPurify + sanitizeText() + CSP headers
- **CORS:** Origin-restricted (no wildcard)
- **Headers:** HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP
