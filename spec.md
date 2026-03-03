# ByteMeal

## Current State
ByteMeal is built with React + TypeScript + Motoko backend. The backend connection is broken causing all forms to fail. User wants a working website using only HTML, CSS, and JavaScript (no backend dependency).

## Requested Changes (Diff)

### Add
- Replace the entire React frontend with a pure HTML/CSS/JS implementation embedded in the existing Vite/React shell
- All data stored in localStorage (no backend calls)
- Pages: Home, Donor Form, NGO Registration, Volunteer Form, Assistance Request Form, Feedback Form, Food Listings

### Modify
- Replace all React pages with a single-page app (SPA) approach using vanilla JS routing inside the React shell
- OR: rebuild App.tsx and all pages to be pure HTML-rendering components with no backend hooks at all
- All forms submit to localStorage and show success toasts
- Food Listings reads from localStorage donations

### Remove
- All backend actor calls (useActor, useQueries backend calls)
- AdminNGOApproval page (not needed)
- Dashboard page (not needed)

## Implementation Plan
1. Rewrite App.tsx to use React Router with all pages
2. Rewrite every page component to use localStorage instead of backend calls
3. Create a simple localStorage utility
4. Keep all glassmorphism styling (glass-card, btn-orange, btn-sky, etc.)
5. Keep food background image
6. All forms: submit → save to localStorage → show success toast
7. Food Listings: read from localStorage
8. Typecheck and build
