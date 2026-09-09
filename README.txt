THE BOWLING LAB — HOMEPAGE REWORK
==================================

What's in this file:
- Complete homepage rebuilt around three co-equal pillars: Club Programs,
  1:1 & Small Group, and Video Analysis
- Colors, fonts and spacing pulled directly from the live site's CSS
  (maroon #4A0F1C / #6B1A2A, cream #F5F0E8, blue accent #A8C8E0,
  Barlow Condensed + Inter + DM Mono)
- 1:1 pricing lists what's included (travel, video analysis, write-up,
  net hire) plus a $70 no-travel outdoor rate
- Club pricing shows all three tiers (1 / 3 / 5 session) instead of just
  "From $200"
- Tuesday night in-season sessions added under Club Programs
- Video analysis section, positioned as low-commitment feedback rather
  than a geography-only offer, $50, delivered via private link, 7 days
- Wandin Cricket Club testimonial attributed by name (confirmed cleared
  with their head coach)
- Real about photo embedded directly in the HTML as base64, no separate
  image file needed for it to display

Fixed in critical review pass:
- Nav "Book a session" button text was nearly invisible (a CSS
  specificity bug made it inherit the nav's off-white text color instead
  of its own dark maroon)
- "View pricing" / "See how it works" links inside the three pillar
  cards were low-contrast light blue on a cream background, now maroon
- Testimonial quote marks were doubling up (both the HTML tag and the
  typed text were adding quotation marks), now shows single quotes
- 1:1 pricing intro line said every session includes travel and net
  hire, directly above the one option that excludes both, reworded to
  be accurate
- Removed an invented "Australia-wide" claim from the footer

Still worth doing before this goes live:
- This is a standalone file, not merged into your existing site's file
  structure. Whoever implements it will be pasting these sections into
  your current templates rather than replacing a file wholesale.
- All page content was written from the live site at time of writing.
  Worth a quick check that nothing's changed there since, if time has
  passed before this gets implemented.

Second critical pass:
- Nav and footer links relied entirely on flexbox "gap" for spacing.
  Modern browsers support this fine, but it's the one failure mode
  where an unsupported context turns navigation into an unreadable
  run-together string. Replaced with margin-based spacing so there's
  no single point of failure, no visible change in a normal browser.
- Everything else from the last review (contrast, pricing, quotes,
  photo) re-checked and still holding.
