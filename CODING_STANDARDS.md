# Review standards

Judgement calls for reviewing a change before it is handed back. Mechanical rules are enforced by the checks in [README.md](README.md#builds-and-checks) instead.

## Suchio copy

- Keep team size out of it. No "small team", "kleines Studio", "weil wir wenige sind", and no inflation either ("Spezialisten", "Kernteam"); Suchio is more than one person. Sell the direct contact: "you talk directly to the people who do the work".
- Address German readers as „Sie“, English readers as “you” and French readers as “vous”.
- Do not present one framework or tool as Suchio's standard stack. Suchio chooses the technology per project; name a tool only as what a specific project used.
- Keep services as broad as they are. Ads covers Google and social ads, search covers Google and AI answers; a heading must not narrow a service to one platform.
- Write specific, plain sentences instead of agency filler or template slots ("Ideal für / Das Ergebnis / Was dazugehört", eyebrow labels over every heading).
- No invented proof: no figures, timelines, guarantees or quotes nobody confirmed. Ask before stating how long a service takes to work.
- German, English and French say the same thing; a change in one locale is made in all three.
- For a copy rewrite, show before and after for every changed string.

## Visual design (all pages)

Alexios rejected these patterns many times between October and November 2026, on Suchio's own pages and on client concepts.

- Load the `frontend-design` skill before you change layout, components or styles. Plan palette, type and layout from the brand first, and spend boldness in one place.
- Do not use divider lines between rows or under headings, eyebrow labels, pills with dots, lists of check icons, glow effects, glowing pill buttons or large stat numbers, unless Alexios asks for them.
- Do not use plain card grids as the main idea of a section, diagrams that mean nothing, sticky-left/scrolling-right sections, reveal-on-scroll everywhere, or a navbar that only jumps to sections.
- Do not repeat one section layout on the same page, or the same section, such as a process section, on every page. Show each CTA and rating only once per screen.
- Keep each heading to two lines or fewer at phone and desktop width. Do not break a word across lines.
- Use the same button and hover styles on all pages. Do not give one element motion that the others do not have.
- Use a reference site as a guide for layout only. Do not copy its parts.
- Change only the elements and the screen size that Alexios names. If he asks for a redesign, change the structure and the visual design, not only the order of sections. If you do not know which one he means, ask.
- If you show options, make each option good enough to ship.
- If you changed a section or a layout, run `bun run capture <changed paths>` before handback. Look for empty space, gaps, layouts that lean left, misalignment, overlaps, small text and elements that show twice. Do not capture for small edits such as a link, an icon or a few words.

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
- Follow "Visual design (all pages)". Plan palette, type and layout from the client's trade and brand.
- Website A and Website B shown side by side (`/projekte/handwerker-work/website-a`, `/projekte/handwerker-work/website-b`) share routes and content but each has its own layouts and visual language.
- Draft code stays out of `src/components`. A concept keeps its "Hinweise" pitch-annotation layer and its `/konzept` pitch page.
- Keep each client's code and photos in `src/projekte/<client>/`, thin routes in `src/pages/projekte/<client>/`, and static files in `public/projekte/<client>/`.
