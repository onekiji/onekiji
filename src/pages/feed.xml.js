import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import {
  filenameToDateString,
  getFirstParagraphMd,
  getTitleMd,
} from "@/util/markdown";
import { localizePath } from "astro-i18next";
const parser = new MarkdownIt();

export async function get(context) {
  const kijis = await getCollection("kiji");
  return rss({
    title: "One Kiji",
    description:
      "One Kiji summarizes the single most important piece of news published every day.",
    site: context.site,
    items: kijis.map((kiji) => ({
      title: getTitleMd(kiji.body),
      pubDate: filenameToDateString(kiji.slug),
      description: getFirstParagraphMd(kiji.body),
      link: localizePath(`/${filenameToDateString(kiji.slug)}`),
      content: sanitizeHtml(parser.render(kiji.body)),
    })),
    customData: `<language>en-us</language>`,
  });
}
