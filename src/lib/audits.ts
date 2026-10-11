import { getCollection, type CollectionEntry } from "astro:content";

export type Audit = CollectionEntry<"audits">["data"] & { id: string };

export async function getAudits(): Promise<Audit[]> {
  return (await getCollection("audits")).map(({ id, data }) => ({ id, ...data }));
}
