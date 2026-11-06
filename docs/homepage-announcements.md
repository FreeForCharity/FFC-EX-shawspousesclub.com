# Homepage design and announcements

Approved November 6, 2026 in the Shaw Spouses Club homepage design chat, continuing the ChatGPT conversation **Create Banner Example** and **Continue Website Work**.

The approved design uses the existing blue, pale blue, and white palette. Compact SHAW SPOUSES CLUB branding sits at the left of navigation, with COMMUNITY • CONNECTION • SERVICE underneath. The homepage opens with the Upcoming Events strip, the centered welcome, the club mission, and the Connect, Scholarships, and Give back cards. Existing additional homepage content and footer are retained.

Edit `src/data/announcement.ts` to change the banner title, message, optional links, dismissal mode, or expiration. Change `id` for a new announcement so visitors who dismissed the old announcement see the new one. `persistence: 'local'` remembers dismissal in the same browser; `'session'` remembers it for the tab session. This does not sync across browsers or devices.

`expiresAt: null` means no automatic end date. To expire an announcement, use an ISO timestamp with an explicit timezone, for example `2026-12-16T00:00:00-05:00`. No event dates have been assumed for the current banner. Expiration is checked in the visitor's browser, including while the page remains open. Invalid expiration dates hide the banner. Browser storage restrictions do not disable the close button.

The current banner links to Monthly Social, Cookie Drive, and Charity Auction. Preview-only controls, automatic refresh, and preview labels are not part of the production site.
