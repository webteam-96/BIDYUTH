<!-- FRONTEND-RULES:START -->
## Frontend Design Rules (Anti-Slop)

These patterns make a UI look generic and AI-generated. Do not use them on any UI task in this project unless the user explicitly asks for one. When reviewing or writing UI, flag any violation.

### Color
1. No harsh gradients. Use solid colors or very subtle tonal shifts.
2. No rainbow coloring. Use one brand color plus neutrals and at most one accent.
3. No pure white (#FFFFFF) backgrounds. Use an off-white or tinted neutral.
4. No purple-and-black palettes.
5. No neon colors.
6. No basic, default pastel palettes. If pastels are used, tune them to the brand.

### Typography & Copy
7. No Inter, Geist, or Space Grotesk. Pick a typeface with character that fits the brand.
8. No em dashes in UI copy. Use periods, commas, or colons.
9. No emoji in UI or copy.
10. No "It's not X, it's Y" phrasing.
11. No fake testimonials. Use real quotes with real names, or leave the section out.

### Icons & Decoration
12. No Lucide icons by default. Use a different set, custom icons, or no icons.
13. No sparkle icons.
14. No animated arrows.
15. No radial glow orbs in backgrounds.
16. No dot-grid backgrounds.
17. No liquid glass / glassmorphism.
18. No drop shadows as the default way to separate elements. Use spacing, borders, or tonal contrast.

### Layout & Components
19. No row of 3 feature cards.
20. No 3-tier pricing table by default. Match pricing to the actual business model.
21. No colored left strip on cards or callouts.
22. No checkmark bullet lists.
23. No soft, uniform rounded corners on everything. Choose a deliberate radius (including sharp) and keep it consistent.

### Motion
24. No hover animations on everything. Animate only where it gives feedback or meaning.

### Must Include
25. Skeleton loaders for every async content area. No blank screens or lone spinners.
26. A real product demo: actual screenshots, video, or an interactive preview. No placeholder mockups.
27. A Terms of Service page, linked in the footer.
28. A Privacy Policy page, linked in the footer.
<!-- FRONTEND-RULES:END -->

<!-- SECURITY-CHECKLIST:START -->
## Security Checklist

Check every change in this project against these items. When writing or reviewing code, flag any item being violated. Never trade one of these away for speed without telling the user.

**Rules of thumb**
- Every endpoint checks authentication AND that this user may access this specific record (no IDOR).
- Never trust the client: validation, prices, roles, and permissions are enforced on the server.
- Secrets live only in env vars or a secret manager. Never in code, the repo, frontend bundles, or logs.
- Parameterize every query and never pass user input to a shell, file path, or outbound URL unchecked.
- Production shows generic errors; details go to logs (with secrets and PII stripped).
- Least privilege everywhere: DB users, cloud roles, API keys, AI tools.

### Secrets & Config
1. Exposed DB credentials · 2. Public `.env` files · 3. Hardcoded secrets · 12. Secrets in JavaScript · 15. Secrets in Git · 26. JWT secrets · 30. Default credentials

### Authentication & Sessions
4. Weak authentication · 24. Broken password reset · 25. Weak session management · 47. Insecure cookie settings · 54. Misconfigured OAuth

### Authorization & Access Control
5. Missing authorization checks · 6. Cross-user access · 9. Unprotected admin routes · 16. Client-only security · 33. IDOR / BOLA · 49. Poor tenant isolation · 51. Mass assignment

### Injection & Input Handling
13. Input validation · 14. SQL injection · 19. Cross-Site Scripting (XSS) · 22. Path traversal · 23. Server-Side Request Forgery (SSRF) · 34. APIs + user input · 52. Command injection · 53. Insecure deserialization

### APIs & Web
18. Insecure API endpoints · 20. Cross-Site Request Forgery (CSRF) · 27. Permissive CORS · 28. Rate limits · 31. Unsigned webhooks · 32. Frontend payment checks · 46. Missing security headers

### Files
21. Insecure file uploads

### Exposure & Information Leaks
10. Exposed production debug tools · 11. Verbose production errors · 17. Logs leaking secrets · 29. Exposed environments · 35. Exposed logs · 36. Exposed source maps · 45. Exposed internal dashboards

### Data & Infrastructure
7. Open database permissions · 8. Cloud service misconfigurations · 41. Excessive DB permissions · 44. No backups / restore · 48. Unencrypted data

### Supply Chain
37. Vulnerable dependencies · 38. Malicious packages

### AI Features
39. Prompt injection · 40. Unpermissioned AI access

### Monitoring & Process
42. Missing audit logs · 43. No security monitoring · 50. Unreviewed code
<!-- SECURITY-CHECKLIST:END -->
