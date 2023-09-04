import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { kijiToJson } from "../../util/index";
import { filenameToDateString, languageFromFilename } from "@/util";

export async function get(context: APIContext) {
  const kiji = await getCollection(
    "kiji",
    ({ slug }) => languageFromFilename(slug) === "en"
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
