import { getOgImage } from "@/components/OgImage";
import { getTitleMd } from "@/util";
import type { APIContext } from "astro";
import { getCollection, getEntryBySlug } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("kiji");

  return posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
}

export async function get({ params }: APIContext) {
  const post = await getEntryBySlug("kiji", params.slug!);
  const body = await getOgImage(getTitleMd(post!.body));

  return {
    body,
    encoding: "binary",
  };
}
