import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { filenameToDateString, languageFromFilename, kijiToJson } from "@/util";
import { languages } from "@/util/languages";

export async function get(context: APIContext) {
  const {
    params: { lang = "en" },
  } = context;
  const kiji = await getCollection(
    "kiji",
    ({ slug }) => languageFromFilename(slug) === lang
  ).then(
    (posts) =>
      posts.sort((a, b) =>
        new Date(filenameToDateString(b.slug)) >
        new Date(filenameToDateString(a.slug))
          ? 1
          : -1
      )[0]
  );
  return kijiToJson(kiji);
}

export async function getStaticPaths() {
  return languages.map((lang) => ({
    params: {
      lang,
    },
  }));
}
