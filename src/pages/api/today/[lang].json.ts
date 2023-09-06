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
  let sources = kiji.data.sources;
  if (lang !== "en") {
    sources = await getCollection(
      "kiji",
      ({ slug }) =>
        languageFromFilename(slug) === "en" &&
        filenameToDateString(slug) === filenameToDateString(kiji.slug)
    ).then((posts) => posts[0].data.sources);
  }
  return kijiToJson({
    ...kiji,
    data: {
      ...kiji.data,
      sources,
    },
  });
}

export async function getStaticPaths() {
  return languages.map((lang) => ({
    params: {
      lang,
    },
  }));
}
