// Entwurf A is a single page; navigation jumps to its sections.
import { project } from "../shared/content";

export const base = `${project}/entwurf-a`;

export const sections = {
  leistungen: `${base}#leistungen`,
  projekte: `${base}#projekte`,
  ablauf: `${base}#ablauf`,
  bewertungen: `${base}#bewertungen`,
  kontakt: `${base}#kontakt`,
};

export const nav = [
  { label: "Leistungen", href: sections.leistungen },
  { label: "Projekte", href: sections.projekte },
  { label: "Ablauf", href: sections.ablauf },
  { label: "Bewertungen", href: sections.bewertungen },
  { label: "Kontakt", href: sections.kontakt },
];
