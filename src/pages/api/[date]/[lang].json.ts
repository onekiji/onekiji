import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { filenameToDateString, kijiToJson, languageFromFilename } from "@/util";
import { languages } from "@/util/languages";

export async function get(context: APIContext) {
  const {
    params: { lang = "en", date },
  } = context;
  const kiji = await getCollection(
    "kiji",
    ({ slug }) =>
      languageFromFilename(slug) === lang && filenameToDateString(slug) === date
  ).then((posts) => posts[0]);
  return kijiToJson(kiji);
}

export async function getStaticPaths() {
  const kijis = await getCollection("kiji");
  return kijis.map((kiji) =>
    languages.map((lang) => ({
      params: {
        date: filenameToDateString(kiji.slug),
        lang,
      },
    }))
  );
}
