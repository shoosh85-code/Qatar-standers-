# QatarSpec Pro v3.0 — Launch Checklist

## Pre-Launch (Day 1-2)

### Security
- [ ] CSP: no 'unsafe-inline'
- [ ] API keys: server-side only
- [ ] Rate limiting: active on all endpoints
- [ ] Pro validation: server-side JWT
- [ ] XSS: DOMPurify on all inputs
- [ ] OWASP ZAP scan: 0 critical, 0 high

### Performance
- [ ] Lighthouse: 90+ Performance
- [ ] Lighthouse: 100 Accessibility
- [ ] Lighthouse: 100 Best Practices
- [ ] Bundle size: <200KB initial JS
- [ ] LCP: <2.5s on 3G
- [ ] FID: <100ms

### Content
- [ ] 20 core cards: accurate, no fluff
- [ ] 0 "Stepper" fake badges
- [ ] 0 duplicate cards
- [ ] All QCS references: traceable
- [ ] AI responses: include disclaimer + citations

### Functionality
- [ ] Search: works with FTS fallback
- [ ] Calculators: input validation + Pass/Fail
- [ ] Forms: RFI, NCR, DPR, ITP
- [ ] Export: PDF, Word, Excel
- [ ] Pro gates: functional, not bypassable

## Launch Day (Day 5)

- [ ] Deploy to Vercel
- [ ] Verify all API endpoints
- [ ] Test on mobile (iOS + Android)
- [ ] Test on slow 3G
- [ ] Monitor error rates
- [ ] Announce on LinkedIn + WhatsApp

## Post-Launch (Week 1)

- [ ] Collect user feedback
- [ ] Monitor conversion rate
- [ ] Fix critical bugs within 24h
- [ ] Plan v3.1 features

---

## Completed Phases (v3.0)

| # | Phase | Status | Commit |
|---|-------|--------|--------|
| 1 | PROJECT_INSTRUCTIONS v3.0 | ✅ Done | b6ab55f |
| 2 | Rate Limiting (api/rate-limit.js) | ✅ Done | — |
| 10 | Export System — PDFKit server-side | ✅ Done | 35b8dd5 |
| 11 | Monitoring & Analytics | ✅ Done | c42ad90 |
| 12 | Launch Checklist | ✅ Done | current |

---

## API Endpoints Status

| Endpoint | Rate Limit | Auth | Status |
|----------|-----------|------|--------|
| /api/ai-proxy | 5/min free · 60/min pro | Pro JWT | ✅ |
| /api/export-pdf | 10/min free · 30/min pro | Pro JWT | ✅ |
| /api/qcs-search | 10/min free · 100/min pro | None | ✅ |
| /api/vision-proxy | 3/min free · 30/min pro | Pro JWT | ✅ |
| /api/verify-pro | 3/min · 10/min pro | None | ✅ |
| /api/analytics | 60/min | None | ✅ |
| /api/health | 60/min | None | ✅ |

---

## Stack Summary

```
Frontend : Vanilla HTML/JS — RTL + Arabic + English
Backend  : Vercel Serverless Functions (Node 18+)
Database : Supabase (PostgreSQL + pgvector)
AI       : Gemini API (gemini-2.5-pro)
PDF      : PDFKit (server-side)
Auth     : TAP Payments + custom JWT (httpOnly cookies)
Analytics: QatarSpecAnalytics (Web Vitals + custom events)
Repo     : github.com/shoosh85-code/Qatar-standers-
Site     : qatar-standers.vercel.app
```

---

*QatarSpec Pro — QCS 2024 | Ashghal RDM 2023 | KAHRAMAA 2024*
