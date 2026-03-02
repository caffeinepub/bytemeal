# Specification

## Summary
**Goal:** Simplify the ByteMeal app by removing unused pages/navigation links, cleaning up the Home page, and adding NGO status actions (Accept/Collected) to donation listings.

**Planned changes:**
- Remove Dashboard page route and its navigation link; navigating to /dashboard redirects to home or shows 404.
- Remove Admin NGO Approval page route and its "Admin: NGOs" navigation link.
- Update Navigation to show only: Home, Donate, Get Help, Volunteer, NGO Register, and Food Listings (kept for NGO actions).
- Add "Accept" and "Mark as Collected" action buttons to each donation card on the Food Listings page.
- Add `updateDonationStatus` function to the backend to persist donation status (Available → Accepted → Collected).
- Display a color-coded status badge on each donation card: Available (green), Accepted (sky-blue), Collected (gray).
- Show a toast notification on successful status update.
- Update Home page to remove platform stats counters and any CTA buttons/links pointing to Dashboard or Food Listings; keep only "Donate Food" and "Get Help" CTAs.

**User-visible outcome:** The app has a clean navigation with only the core forms and Food Listings. NGOs can open Food Listings, accept donations, and mark them as collected with real-time status badges and toast feedback. The Home page shows only the two primary CTAs with no stats counters.
