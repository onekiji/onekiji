import type { CollectionEntry } from "astro:content";
import markdownIt from "markdown-it";

const parser = markdownIt();
type Kiji = CollectionEntry<"kiji">;

function breakMd(md: string) {
  return md.split("\n\n");
}

export function getTitleMd(markdown: string) {
  return breakMd(markdown)[0].replace("# ", "").trim();
}

export function removeTitleMd(markdown: string) {
  return breakMd(markdown).slice(1).join("\n\n").trim();
}

export function getFirstParagraphMd(markdown: string) {
  return breakMd(markdown)[1].trim();
}

export function readingTimeMd(markdown: string) {
  const words = breakMd(markdown).reduce((acc, curr) => {
    return acc + curr.split(" ").length;
  }, 0);
  return Math.ceil(words / 200);
}

export function filenameToDateString(filename: string) {
  return filename.slice(0, 10);
}

export function languageFromFilename(filename: string) {
  return filename.split("-")[3] || "en";
}

export function kijiToJson(kiji: Kiji) {
  return new Response(
    JSON.stringify({
      title: getTitleMd(kiji.body),
      pubDate: filenameToDateString(kiji.slug),
      content: removeTitleMd(kiji.body),
      sources: kiji.data.sources,
    }),
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    }
  );
}
