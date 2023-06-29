import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function get(context) {
  const kiji = await getCollection("kiji");
  return rss({
    title: "One Kiji",
    description:
      "One Kiji writes on the single most important piece of news published everyday.",
    site: context.site,
    items: kiji.map(({ data, slug, body }) => ({
      title: data.title,
      pubDate: slug,
      description: data.description,
      link: `/${slug}`,
      content: sanitizeHtml(parser.render(body)),
    })),
    customData: `<language>en-us</language>`,
  });
}
