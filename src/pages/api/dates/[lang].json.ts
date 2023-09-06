import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { filenameToDateString, getTitleMd, languageFromFilename } from "@/util";
import { languages } from "@/util/languages";

export async function get(context: APIContext) {
  const {
    params: { lang = "en" },
  } = context;
  const kijis = await getCollection(
    "kiji",
    ({ slug }) => languageFromFilename(slug) === lang
  ).then((posts) =>
    posts.sort((a, b) =>
      new Date(filenameToDateString(b.slug)) >
      new Date(filenameToDateString(a.slug))
        ? 1
        : -1
    )
  );
  return new Response(
    JSON.stringify(
      kijis.map((kiji) => ({
        title: getTitleMd(kiji.body),
        date: filenameToDateString(kiji.slug),
      }))
    ),
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    }
  );
}

export async function getStaticPaths() {
  return languages.map((lang) => ({
    params: {
      lang,
    },
  }));
}
