# Specification

## Summary
**Goal:** Create a fully self-contained, downloadable standalone HTML/CSS/JS version of ByteMeal that works directly in a browser without any server or build tools.

**Planned changes:**
- Create/update `frontend/standalone/index.html`, `donor-form.html`, `assistance-form.html`, `volunteer-form.html`, `food-listings.html`, and `dashboard.html` with correct relative paths to shared `styles.css` and `script.js`
- Create/update `frontend/standalone/styles.css` with the ByteMeal Glassmorphism design system: Vibrant Orange (#FF6B2B) and Sky Blue (#38BDF8) accents, frosted-glass cards, dark food-themed gradient background, Inter font from Google Fonts CDN, and responsive media queries for mobile/tablet/desktop
- Create/update `frontend/standalone/script.js` with globally accessible utilities: hamburger nav toggle, toast notifications, localStorage helpers for donations/assistance/volunteer records, form validation, and button loading state management
- Each HTML page includes an inline script block calling the appropriate page-specific logic (form submission, data rendering, stats counting)
- All navigation links between pages work via relative paths on the `file://` protocol

**User-visible outcome:** Users can download the `frontend/standalone/` folder and open `index.html` directly in a browser to use the full ByteMeal app — including forms, food listings, and dashboard — with no server, Node.js, or build tools required.
