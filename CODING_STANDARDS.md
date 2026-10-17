# Review standards

Judgement calls for reviewing a change before it is handed back. Mechanical rules are enforced by the checks in [README.md](README.md#builds-and-checks) instead.

## Suchio copy

- Keep team size out of it. No "small team", "kleines Studio", "weil wir wenige sind", and no inflation either ("Spezialisten", "Kernteam"); Suchio is more than one person. Sell the direct contact: "you talk directly to the people who do the work".
- Keep services as broad as they are. Ads covers Google and social ads, search covers Google and AI answers; a heading must not narrow a service to one platform.
- Write specific, plain sentences instead of agency filler or template slots ("Ideal für / Das Ergebnis / Was dazugehört", eyebrow labels over every heading).
- No invented proof: no figures, timelines, guarantees or quotes nobody confirmed. Ask before stating how long a service takes to work.
- German, English and French say the same thing; a change in one locale is made in all three.
- For a copy rewrite, show before and after for every changed string.

## Offer illustrations

`src/components/offer-animations`, shown on the home and service pages.

- Improve what the user already likes; change only what they named, one thing at a time. Replacing a concept they asked to refine is a regression.
- The four illustrations are one system: every scene uses the shared stage in `stage.ts` (`useStage`, `STAGE_BOX`, `FLAT_FILL`) and the slot in `offer-visual.astro`. A scene with its own sizing or per-breakpoint patch fails review.
- Follow colour and wording instructions literally ("keep the orange on the card" does not mean an orange graph). When a reference such as "the first visual" or "the cards" is ambiguous, ask.
- Motion runs once and takes about 3–4 s. No gimmicks (decorative arrows, fake counts), and no zoom or tilt on layers with small text, which blurs it.
- Evidence: all four side by side after their animations end, at desktop and phone width, in at least two locales (`bun run capture --visuals --locales=de,fr`). Check for clipped edges, gaps, wrapped labels and labels covering the chart line.

## Client concepts (`/projekte/<client>`)

Industry concepts under `/examples` are fictional businesses, carry a visible "Konzept · fiktiv" banner, use only licensed photos with sources recorded, and use no real business's name, photos or text.

Pitch websites for prospective clients. They must read as a clear improvement of the client's own site, not as a template.

- Build the navigation from the client's real pages, one real page per item, and move their real content into it. Big changes are fine; invented services, claims or visuals are not, and extras only mirror something the client already offers.
- Unconfirmed client facts carry a pitch note. Reviews are quoted verbatim. Every project photo opens at full size.
- Reject the patterns the user called AI slop: an eyebrow label with a line above every heading, the same headline-plus-split layout repeated, glowing pill buttons, diagrams that mean nothing, sticky-left/scrolling-right sections, reveal-on-scroll everywhere, and a navbar that only jumps to sections.
- Plan palette, type and layout from the client's trade and brand first, and spend boldness in one place; see `.agents/skills/frontend-design/SKILL.md`.
- Website A and Website B shown side by side (`/projekte/handwerker-work/website-a`, `/projekte/handwerker-work/website-b`) share routes and content but each has its own layouts and visual language.
- Draft code stays out of `src/components`. A concept keeps its "Hinweise" pitch-annotation layer and its `/konzept` pitch page.
- Keep each client's code and photos in `src/projekte/<client>/`, thin routes in `src/pages/projekte/<client>/`, and static files in `public/projekte/<client>/`.
