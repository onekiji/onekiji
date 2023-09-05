import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { filenameToDateString, languageFromFilename, kijiToJson } from "@/util";

export async function get(context: APIContext) {
  const {
    params: { date },
  } = context;
  const kiji = await getCollection(
    "kiji",
    ({ slug }) =>
      languageFromFilename(slug) === "en" && filenameToDateString(slug) === date
  ).then((posts) => posts[0]);
  return kijiToJson(kiji);
}

export async function getStaticPaths() {
  const kijis = await getCollection(
    "kiji",
    ({ slug }) => languageFromFilename(slug) === "en"
  ).then((posts) => posts);
  return kijis.map((kiji) => ({
    params: {
      date: filenameToDateString(kiji.slug),
    },
  }));
}
